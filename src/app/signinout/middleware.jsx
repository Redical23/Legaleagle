// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//   const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const { pathname } = req.nextUrl;

//   // if (!session && pathname !== '/') {
//   //   return NextResponse.redirect(new URL('/', req.url));
//   // }
//   if (     pathname === '/' || pathname === '/login' || pathname.startsWith('/_next') || pathname.endsWith('.css')) {
//     return NextResponse.next();
//   }
//   else (!session && pathname !== '/') 

//       return NextResponse.redirect(new URL('/', req.url));
    

 
// }
 
