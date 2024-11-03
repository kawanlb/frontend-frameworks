'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/api/AxiosInstance'; 

function parseJwt(token) {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

const UserData = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('authToken='))
          ?.split('=')[1];

        if (!token) {
          throw new Error('Token não encontrado');
        }

        const decodedToken = parseJwt(token);
        const userId = decodedToken?.id;
        if (!userId) {
          throw new Error('ID do usuário não encontrado no token');
        }

        const response = await axiosInstance.get(`/users/${userId}`);
        
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <ul>
        <li><strong>ID:</strong> {user.id}</li>
        <li><strong>Name:</strong> {user.name}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Balance:</strong> {user.balance}</li>
        <li><strong>Role:</strong> {user.role}</li>
      </ul>
    </div>
  );
};

export default UserData;
