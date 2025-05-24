import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Tutaj umieść logikę rejestracji użytkownika
    console.log(data);
    return NextResponse.json({ message: 'Rejestracja udana' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Błąd serwera' }, { status: 500 });
  }
} 