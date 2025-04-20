import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from "mysql2";

export async function GET() {
  let connection;
  try {
    connection = await pool.getConnection();

    // Pobierz statystyki rezerwacji
    const [totalBookings] = await connection.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM bookings"
    );

    const [todayBookings] = await connection.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM bookings WHERE DATE(created_at) = CURDATE()"
    );

    const [weeklyBookings] = await connection.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM bookings WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)"
    );

    const [monthlyBookings] = await connection.query<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM bookings WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)"
    );

    // Pobierz statystyki typów wydarzeń
    const [eventTypes] = await connection.query<RowDataPacket[]>(`
      SELECT 
        event_type,
        COUNT(*) as count
      FROM bookings 
      GROUP BY event_type
      ORDER BY count DESC
    `);

    // Pobierz statystyki dla poszczególnych stron
    const [pageStats] = await connection.query<RowDataPacket[]>(`
      SELECT 
        page,
        COUNT(*) as total_views,
        COUNT(DISTINCT user_agent) as unique_views,
        COUNT(CASE WHEN device_type = 'mobile' THEN 1 END) as mobile_views,
        COUNT(CASE WHEN device_type = 'desktop' THEN 1 END) as desktop_views,
        MAX(timestamp) as last_visit
      FROM page_views
      GROUP BY page
      ORDER BY total_views DESC
    `);

    // Pobierz dzisiejsze odwiedziny
    const [todayStats] = await connection.query<RowDataPacket[]>(`
      SELECT 
        COUNT(*) as total_views,
        COUNT(DISTINCT user_agent) as unique_views
      FROM page_views 
      WHERE DATE(timestamp) = CURDATE()
    `);

    // Pobierz odwiedziny z ostatnich 7 dni
    const [weeklyStats] = await connection.query<RowDataPacket[]>(`
      SELECT 
        COUNT(*) as total_views,
        COUNT(DISTINCT user_agent) as unique_views
      FROM page_views 
      WHERE timestamp >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    `);

    // Pobierz odwiedziny z ostatnich 30 dni
    const [monthlyStats] = await connection.query<RowDataPacket[]>(`
      SELECT 
        COUNT(*) as total_views,
        COUNT(DISTINCT user_agent) as unique_views
      FROM page_views 
      WHERE timestamp >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `);

    // Pobierz statystyki urządzeń
    const [deviceStats] = await connection.query<RowDataPacket[]>(`
      SELECT 
        device_type,
        COUNT(*) as total_views,
        COUNT(DISTINCT user_agent) as unique_views
      FROM page_views 
      GROUP BY device_type
    `);

    // Pobierz najczęstsze źródła ruchu (referrery)
    const [referrerStats] = await connection.query<RowDataPacket[]>(`
      SELECT 
        CASE 
          WHEN referrer = '' THEN 'Bezpośrednie'
          WHEN referrer LIKE '%google%' THEN 'Google'
          WHEN referrer LIKE '%facebook%' THEN 'Facebook'
          WHEN referrer LIKE '%instagram%' THEN 'Instagram'
          ELSE 'Inne'
        END as source,
        COUNT(*) as count
      FROM page_views 
      GROUP BY 
        CASE 
          WHEN referrer = '' THEN 'Bezpośrednie'
          WHEN referrer LIKE '%google%' THEN 'Google'
          WHEN referrer LIKE '%facebook%' THEN 'Facebook'
          WHEN referrer LIKE '%instagram%' THEN 'Instagram'
          ELSE 'Inne'
        END
      ORDER BY count DESC
    `);

    // Pobierz statystyki dla konkretnych stron
    const [specificPageStats] = await connection.query<RowDataPacket[]>(`
      SELECT 
        page,
        COUNT(*) as total_views,
        COUNT(DISTINCT user_agent) as unique_views,
        COUNT(CASE WHEN device_type = 'mobile' THEN 1 END) as mobile_views,
        COUNT(CASE WHEN device_type = 'desktop' THEN 1 END) as desktop_views,
        DATE_FORMAT(MAX(timestamp), '%Y-%m-%d %H:%i:%s') as last_visit
      FROM page_views
      WHERE page IN ('/', '/galeria', '/polityka-prywatnosci')
      GROUP BY page
      ORDER BY total_views DESC
    `);

    connection.release();

    return NextResponse.json({
      totalBookings: totalBookings[0].total,
      todayBookings: todayBookings[0].total,
      weeklyBookings: weeklyBookings[0].total,
      monthlyBookings: monthlyBookings[0].total,
      eventTypes,
      pageStats,
      specificPageStats,
      todayStats: todayStats[0],
      weeklyStats: weeklyStats[0],
      monthlyStats: monthlyStats[0],
      deviceStats,
      referrerStats
    });
  } catch (error) {
    console.error('Błąd podczas pobierania statystyk:', error);
    if (connection) {
      connection.release();
    }
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas pobierania statystyk' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  let connection;
  try {
    const data = await request.json();
    const allowedPages = ['/', '/galeria', '/polityka-prywatnosci'];

    if (!data.page) {
      return NextResponse.json(
        { message: 'Brak wymaganego pola page' },
        { status: 400 }
      );
    }

    // Sprawdź czy strona jest na liście dozwolonych
    if (!allowedPages.includes(data.page)) {
      return NextResponse.json(
        { message: 'Analityka nie jest zbierana dla tej strony' },
        { status: 400 }
      );
    }

    try {
      connection = await pool.getConnection();

      // Sprawdź czy nie ma już wizyty z tego samego user-agent w ciągu ostatniej sekundy
      const [existingVisits] = await connection.query(
        `SELECT id FROM page_views 
         WHERE page = ? 
         AND user_agent = ? 
         AND timestamp >= DATE_SUB(NOW(), INTERVAL 1 SECOND)`,
        [data.page, data.userAgent]
      );

      if (Array.isArray(existingVisits) && existingVisits.length > 0) {
        connection.release();
        return NextResponse.json({ message: 'Wizyta już została zarejestrowana' });
      }

      const values = [
        data.page,
        data.userAgent || 'unknown',
        data.deviceType || 'desktop',
        data.referrer || '',
        data.timestamp || new Date().toISOString()
      ];

      await connection.query(
        `INSERT INTO page_views (
          page, 
          user_agent, 
          device_type, 
          referrer, 
          timestamp
        ) VALUES (?, ?, ?, ?, ?)`,
        values
      );
      
      return NextResponse.json({ message: 'Wizyta została zapisana' });
    } catch (dbError: any) {
      console.error('Database error:', dbError.message);
      throw dbError;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas zapisywania wizyty' },
      { status: 500 }
    );
  }
} 