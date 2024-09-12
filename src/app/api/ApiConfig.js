const API_BASE_URL = 'http://localhost:8080/api/v1';

export const apiEndpoints = {
  transactions: `${API_BASE_URL}/transactions`,
  users: `${API_BASE_URL}/users`,
  auth: `${API_BASE_URL}/auth`,
};

export default API_BASE_URL;
