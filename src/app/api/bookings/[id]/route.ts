import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await pool.query('DELETE FROM bookings WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Rezerwacja została usunięta' });
  } catch (error) {
    console.error('Błąd usuwania rezerwacji:', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas usuwania rezerwacji' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (body.is_deleted !== undefined) {
      // Obsługa soft delete
      await pool.query(
        'UPDATE bookings SET is_deleted = ? WHERE id = ?',
        [body.is_deleted, id]
      );
    } else if (body.event_date) {
      // Obsługa aktualizacji daty
      await pool.query(
        'UPDATE bookings SET event_date = ? WHERE id = ?',
        [body.event_date, id]
      );
    }

    return NextResponse.json({ message: 'Rezerwacja została zaktualizowana' });
  } catch (error) {
    console.error('Błąd aktualizacji rezerwacji:', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas aktualizacji rezerwacji' },
      { status: 500 }
    );
  }
} 