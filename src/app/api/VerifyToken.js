// api/VerifyToken.js

import axiosInstance from "./axios";

// Função para obter o valor do cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const verifyToken = async () => {
  try {
    const token = getCookie('authToken');
    
    if (!token) {
      throw new Error("Token não encontrado");
    }

    console.log('Fazendo requisição com token:', token);

    const response = await axiosInstance.get('/api/v1/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("Token válido. Dados protegidos:", response.data);

  } catch (error) {
    console.error("Erro ao verificar o token:", error.message);
    if (error.response) {
      console.error('Erro na resposta da API', error.response.data);
    } else if (error.request) {
      console.error('Nenhuma resposta do servidor', error.request);
    } else {
      console.error('Erro ao configurar a requisição', error.message);
    }
    window.location.href = '/sign-in';
  }
};
