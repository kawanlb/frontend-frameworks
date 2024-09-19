import axios from 'axios';

// Configurar a instância do axios
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Certifique-se de que o nome da variável está correto
  timeout: 10000, // Tempo de timeout das requisições em milissegundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar interceptores de resposta
axiosInstance.interceptors.response.use(
  (response) => {
    // Qualquer código de status 2xx cai aqui
    return response;
  },
  (error) => {
    // Qualquer código fora do intervalo 2xx cai aqui
    if (error.response) {
      // O servidor respondeu com um código de status fora do 2xx
      console.error('Erro na resposta da API', error.response);
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error('Nenhuma resposta do servidor', error.request);
    } else {
      // Algo deu errado ao configurar a requisição
      console.error('Erro ao configurar a requisição', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
