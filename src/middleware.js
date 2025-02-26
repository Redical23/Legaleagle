import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Exclude paths starting with /api/ and other conditions
  if (
    pathname.startsWith('/api/') || // Exclude /api/ paths
    pathname === '/' ||
    pathname === '/Login' ||
    pathname === '/Register' ||
    pathname === '/about' ||
    pathname === '/termsofservice' ||
    pathname === '/privacypolicy' ||
    pathname === '/contact' ||

    pathname.startsWith('/_next') ||
    pathname.endsWith('.css')
  ) {
    return NextResponse.next(); // Allow access without restriction
  }

  // Redirect to home page if not authenticated and accessing restricted paths
  if (!session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next(); // Allow access if authenticated
}

 
