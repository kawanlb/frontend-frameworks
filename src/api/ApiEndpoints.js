const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiEndpoints = {
  transactions: `${API_BASE_URL}/transactions`,
  users: `${API_BASE_URL}/users`,
  userById: (id) => `${API_BASE_URL}/users/${id}`,
  auth: `${API_BASE_URL}/auth`,
};

export default API_BASE_URL;
