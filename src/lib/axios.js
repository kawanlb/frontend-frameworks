import axios from 'axios';

// Configurar a instância do axios
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 1000, // Tempo de timeout das requisições em milissegundos
    headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
