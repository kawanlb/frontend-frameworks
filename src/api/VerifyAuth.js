// authGuard.js

import axiosInstance from "./AxiosInstance";
import jwt from "jsonwebtoken"; // Importa a biblioteca para decodificar o JWT

// Função para obter o valor do cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

// Função para verificar se o usuário está autenticado e redirecionar se não estiver
export const checkAuthentication = async () => {
  try {
    // Obtém o token do cookie
    const token = getCookie('authToken');
    
    if (!token) {
      throw new Error("Token não encontrado");
    }

    // Decodifica o token JWT para extrair o ID do usuário
    const decodedToken = jwt.decode(token); // Decodifica o JWT sem verificar a assinatura
    if (!decodedToken || !decodedToken.id) {
      throw new Error("Token inválido ou ID não encontrado");
    }

    const userId = decodedToken.id; // Extrai o ID do usuário

    // Faz uma requisição para verificar se o usuário tem permissão de acessar o dashboard
    await axiosInstance.get(`/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Se o token e os dados do usuário forem válidos, nada acontece, o usuário pode acessar a dashboard
  } catch (error) {
    console.error("Erro ao verificar o token ou acessar o usuário:", error.message);

    // Redireciona para a página de login em caso de erro
    window.location.href = '/sign-in';
  }
};
