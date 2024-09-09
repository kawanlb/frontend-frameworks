import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Middleware para proteger as rotas usando Clerk
export default clerkMiddleware((req) => {
  return NextResponse.next();
});

// Define as rotas onde o middleware será aplicado
export const config = {
  matcher: "/dashboard/:path*",
};
