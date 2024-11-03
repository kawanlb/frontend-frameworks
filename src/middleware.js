

import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"; 

export function middleware(req) {
  const token = req.cookies.get('authToken');

  
  if (!token) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  } else {
    
    let decodedToken;
    try {
      decodedToken = jwt.decode(token);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    
    if (decodedToken && decodedToken.exp) {
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        return NextResponse.redirect(new URL('/sign-in', req.url)); 
      }
    }

    
    if (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up') {
      return NextResponse.redirect(new URL('/dashboard', req.url)); 
    }
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up'], 
};
