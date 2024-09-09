import { validateToken } from '../../lib/validateToken';

export default function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).send('Token não fornecido');
  }

  try {
    const user = validateToken(token);
    res.status(200).json({ message: 'Acesso autorizado', user });
  } catch (error) {
    res.status(401).send('Acesso negado');
  }
}
