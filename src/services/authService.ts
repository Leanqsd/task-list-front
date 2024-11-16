import axiosInstance from '@/api/axios';  // Usamos la instancia de Axios que ya está configurada
import type { CredentialsModel } from '@/models/CredentialsModel';
import type { AuthApiResponseModel } from '@/models/AuthApiResponseModel';

// Función para registrar un nuevo usuario
export const registerUser = (credentials: CredentialsModel) => {
  return axiosInstance.post('/auth/signup', credentials);
};

// Función para iniciar sesión
export const loginUser = (credentials: CredentialsModel) => {
    console.log('Logging in with credentials:', credentials); // Agrega este log
    return axiosInstance.post('/auth/login', credentials);
  };

// Función para renovar el token (si lo implementas en tu backend)
export const renewToken = (refreshToken: string) => {
  return axiosInstance.post('/auth/renew-token', { refreshToken });
};
