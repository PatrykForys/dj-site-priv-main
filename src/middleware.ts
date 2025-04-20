import { NextResponse, type NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'twoj-tajny-klucz';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  try {
    // Sprawdź autoryzację dla ścieżek admin
    if (pathname.startsWith('/admin')) {
      const token = request.cookies.get('auth_token')?.value;

      if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
      }

      try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        await jose.jwtVerify(token, secret);
      } catch (error) {
        console.error('Błąd weryfikacji tokenu:', error);
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    return response;
  } catch (error) {
    console.error('Błąd w middleware:', error);
    return response;
  }
}

// Konfiguracja matchera - określa, które ścieżki powinny przechodzić przez middleware
export const config = {
  matcher: ['/admin/:path*', '/login'],
}; 