import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Wylogowano pomyślnie' },
    { status: 200 }
  );

  // Usuń ciasteczko z tokenem
  response.cookies.delete('auth_token');

  return response;
} 