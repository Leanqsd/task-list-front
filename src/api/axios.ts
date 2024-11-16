import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tasks.api.hvdevs.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  if (!config.url.includes('/auth/csrf')) {
    const { data } = await axiosInstance.get('/auth/csrf');
    config.headers['X-CSRF-Token'] = data.csrfToken; // Incluye el token CSRF en la solicitud
    console.log('CSRF Token actualizado:', data.csrfToken);
  }
  return config;
});

export default axiosInstance;
