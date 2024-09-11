import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // URL base da sua API
  // Se a API requer autenticação, você pode configurar o header aqui
  // headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
});

export default api;
