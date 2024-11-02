'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/api/AxiosInstance'; // Certifique-se de que o caminho está correto

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Obtendo o token do cookie
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('authToken='))
          ?.split('=')[1];

        if (!token) {
          throw new Error('Token não encontrado');
        }

        // Decodificando o token usando a função parseJwt
        const decodedToken = parseJwt(token);
        console.log(decodedToken); // Verifique se o token foi decodificado corretamente
        const userId = decodedToken.id; // Acesse o ID do usuário

        // Fazendo a requisição à API
        const response = await axiosInstance.get(`/api/v1/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Atualiza o estado de carregamento
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Mensagem de carregamento
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Balance: {user.balance}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserProfile;
