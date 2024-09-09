import jwt from 'jsonwebtoken';

const clerkPublicKey = process.env.CLERK_PUBLIC_KEY;  // Carregue a chave pública do Clerk

export function validateToken(token) {
  try {
    const decoded = jwt.verify(token, clerkPublicKey);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
}
