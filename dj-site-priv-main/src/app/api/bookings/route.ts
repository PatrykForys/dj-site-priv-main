import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { validateBookingData } from '@/lib/validation';
import { Booking } from '@/types';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const [rows] = await pool.query<(Booking & RowDataPacket)[]>(
      'SELECT * FROM bookings WHERE is_deleted = false ORDER BY event_date DESC'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Błąd podczas pobierania rezerwacji:', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas pobierania rezerwacji' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Walidacja danych
    const { name, email, phone, event_date, event_type, message } = body;

    // Sprawdzenie czy termin jest dostępny
    const [existingBookings]: any = await pool.query(
      'SELECT COUNT(*) as count FROM bookings WHERE DATE(event_date) = DATE(?) AND is_deleted = false',
      [event_date]
    );

    if (existingBookings[0].count > 0) {
      return NextResponse.json(
        { message: 'Wybrany termin jest już zajęty' },
        { status: 409 }
      );
    }

    const [result]: any = await pool.query(
      'INSERT INTO bookings (name, email, phone, event_date, event_type, message, is_deleted) VALUES (?, ?, ?, ?, ?, ?, false)',
      [name, email, phone, event_date, event_type, message]
    );

    return NextResponse.json({ 
      id: result.insertId,
      name,
      email,
      phone,
      event_date,
      event_type,
      message,
      created_at: new Date(),
      is_deleted: false
    });
  } catch (error) {
    console.error('Błąd podczas dodawania rezerwacji:', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas dodawania rezerwacji' },
      { status: 500 }
    );
  }
} 