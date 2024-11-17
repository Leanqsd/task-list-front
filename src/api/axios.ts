import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

// Crear una instancia de Axios con configuración inicial
const instance = axios.create({
  baseURL: 'https://tasks.api.hvdevs.com/',
  withCredentials: true, // Importante para cookies y CSRF
});

// Interceptor para agregar CSRF Token en las solicitudes
instance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.csrfToken) {
    config.headers['csrf-token'] = authStore.csrfToken;
    console.log('[Axios] CSRF Token usado en solicitud:', authStore.csrfToken);
  }
  return config;
}, (error) => {
  console.error('[Axios] Error en la solicitud:', error);
  return Promise.reject(error);
});

export default instance;
