import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tasks.api.hvdevs.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar el token CSRF
axiosInstance.interceptors.request.use(async (config) => {
  if (!config.url?.includes('/auth/csrf')) {
    try {
      const { data } = await axiosInstance.get('/auth/csrf');
      config.headers['X-CSRF-Token'] = data.csrfToken;
      console.log('[Axios] CSRF Token actualizado:', data.csrfToken);
    } catch (error) {
      console.error('[Axios] Error obteniendo CSRF Token:', error);
    }
  }
  return config;
});

export default axiosInstance;
