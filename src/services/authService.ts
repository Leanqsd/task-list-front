import axiosInstance from '@/api/axios';
import type { CredentialsModel } from '@/models/CredentialsModel';
import type { AuthApiResponseModel } from '@/models/AuthApiResponseModel';

// Función para registrar un nuevo usuario
export const registerUser = async (credentials: CredentialsModel) => {
  return await axiosInstance.post<AuthApiResponseModel>('/auth/signup', credentials);
};

// Función para iniciar sesión
export const loginUser = async (credentials: CredentialsModel) => {
  console.log('[AuthService] Logging in with credentials:', credentials);
  return await axiosInstance.post<AuthApiResponseModel>('/auth/login', credentials);
};

// Función para renovar el token
export const renewToken = async (refreshToken: string) => {
  return await axiosInstance.post('/auth/renew-token', { refreshToken });
};
