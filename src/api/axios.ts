import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tasks.api.hvdevs.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  // Obtener CSRF Token antes de cada solicitud si es necesario
  if (!config.url.includes('/auth/csrf')) {
    const { data } = await axiosInstance.get('/auth/csrf');
    config.headers['X-CSRF-Token'] = data.csrfToken;
  }
  return config;
});

export default axiosInstance;
