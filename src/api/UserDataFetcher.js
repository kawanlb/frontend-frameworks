// UserDataFetcher.js
'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/api/AxiosInstance'; 
import CookieManager from '@/api/CookieManager'; 

function parseJwt(token) {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

const UserDataFetcher = ({ onDataFetch }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = CookieManager.getCookie('authToken'); // Obtém o token do cookie
        const decodedToken = parseJwt(token); // Decifra o token
        const userId = decodedToken?.id; // Obtém o ID do usuário

        if (!userId) {
          throw new Error('ID do usuário não encontrado no token');
        }

        const response = await axiosInstance.get(`/users/${userId}`); // Faz a requisição para obter os dados do usuário
        onDataFetch(response.data); // Chama a função callback com os dados do usuário
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [onDataFetch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null; // Não renderiza nada se não houver loading ou erro
};

export default UserDataFetcher;
