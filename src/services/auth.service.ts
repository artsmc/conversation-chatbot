// services/auth.service.ts
import axios from 'axios';

const API_URL = 'https://yourapi.com/auth/';

const login = (username: string, password: string) => {
  return axios.post(API_URL + 'login', { username, password });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  logout,
};

export default authService;
