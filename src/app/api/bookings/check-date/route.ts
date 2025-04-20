import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { message: 'Data jest wymagana' },
        { status: 400 }
      );
    }

    const [existingBookings]: any = await pool.query(
      'SELECT COUNT(*) as count FROM bookings WHERE DATE(event_date) = DATE(?)',
      [date]
    );

    return NextResponse.json({
      isAvailable: existingBookings[0].count === 0
    });
  } catch (error) {
    console.error('Błąd podczas sprawdzania dostępności terminu:', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas sprawdzania dostępności terminu' },
      { status: 500 }
    );
  }
} 