import axios from 'axios';

// Configurar a instância do axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar um interceptor de requisição para incluir o token JWT
axiosInstance.interceptors.request.use((config) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Adicionar interceptores de resposta
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Erro na resposta da API', error.response);
    } else if (error.request) {
      console.error('Nenhuma resposta do servidor', error.request);
    } else {
      console.error('Erro ao configurar a requisição', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
