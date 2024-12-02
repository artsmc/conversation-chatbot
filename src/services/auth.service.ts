// services/auth.service.ts
import api from './api';

const login = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};
const authService = {
  login,
  // other methods...
};

export default authService;
