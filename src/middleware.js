// middleware.js

import { NextResponse } from 'next/server';
import jwt from "jsonwebtoken"; // Importa a biblioteca para decodificar o JWT

export function middleware(req) {
  const token = req.cookies.get('authToken');

  // Se não há token, verifica se o usuário está tentando acessar o dashboard
  if (!token) {
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  } else {
    // Decodifica o token para verificar sua validade
    let decodedToken;
    try {
      decodedToken = jwt.decode(token);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    // Verifica se o token tem uma data de expiração e se está expirado
    if (decodedToken && decodedToken.exp) {
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        return NextResponse.redirect(new URL('/sign-in', req.url)); // Redireciona para o login se o token estiver expirado
      }
    }

    // Se o usuário está autenticado e tenta acessar páginas de login ou cadastro
    if (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up') {
      return NextResponse.redirect(new URL('/dashboard', req.url)); // Redireciona para o dashboard
    }
  }

  return NextResponse.next(); // Continua o processamento
}

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in', '/sign-up'], // Define as rotas que o middleware irá monitorar
};
