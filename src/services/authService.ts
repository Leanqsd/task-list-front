import axiosInstance from '@/api/axios';
import type { CredentialsModel } from '@/models/CredentialsModel';
import type { AuthApiResponseModel } from '@/models/AuthApiResponseModel';

// Función para registrar un nuevo usuario
export async function registerUser(credentials: CredentialsModel, csrfToken: string) {
    const response = await axiosInstance.post('/auth/signup', credentials, {
      headers: {
        'X-CSRF-Token': csrfToken,
      },
    });
    return response.data;
  }

// Función para iniciar sesión
export const loginUser = async (credentials: CredentialsModel) => {
  console.log('[AuthService] Logging in with credentials:', credentials);
  return await axiosInstance.post<AuthApiResponseModel>('/auth/login', credentials);
};

// Función para renovar el token
export const renewToken = async (refreshToken: string) => {
  return await axiosInstance.post('/auth/renew-token', { refreshToken });
};

export async function getCsrfToken(): Promise<string> {
    try {
      const response = await axiosInstance.get('/auth/csrf');
      return response.data.csrfToken; // Suponiendo que la respuesta tiene un campo csrfToken
    } catch (error) {
      throw new Error('Error obteniendo CSRF Token');
    }
  }
  