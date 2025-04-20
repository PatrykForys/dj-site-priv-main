import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import pool from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'twoj-tajny-klucz';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Pobierz użytkownika z bazy danych
    const [users]: any = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: 'Nieprawidłowy email lub hasło' },
        { status: 401 }
      );
    }

    // Wygeneruj token JWT używając jose
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new jose.SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    // Przygotuj odpowiedź
    const response = NextResponse.json(
      { 
        message: 'Zalogowano pomyślnie',
        user: {
          id: user.id,
          email: user.email
        }
      },
      { status: 200 }
    );

    // Ustaw token w ciasteczku
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 godziny
    });

    return response;
  } catch (error) {
    console.error('Błąd podczas logowania:', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas logowania' },
      { status: 500 }
    );
  }
} 