import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'twoj-tajny-klucz';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Brak autoryzacji' },
        { status: 401 }
      );
    }

    try {
      // Weryfikacja tokenu
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jose.jwtVerify(token, secret);

      return NextResponse.json({
        message: 'Autoryzacja poprawna',
        user: {
          id: payload.userId,
          email: payload.email
        }
      });
    } catch (error) {
      console.error('Błąd weryfikacji tokenu:', error);
      return NextResponse.json(
        { message: 'Nieprawidłowy token' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Błąd sprawdzania autoryzacji:', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas sprawdzania autoryzacji' },
      { status: 500 }
    );
  }
} 