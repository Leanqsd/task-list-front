import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/login', component: () => import('@/views/LoginView.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Configurar navegación global
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Cargar el token CSRF desde localStorage o solicitar uno nuevo
  await authStore.loadCsrfToken();

  // Verificar autenticación si la ruta no es "/login"
  if (!authStore.isAuthenticated && to.path !== '/login') {
    return next('/login'); // Redirigir a login si no está autenticado
  }

  next(); // Continuar a la siguiente ruta
});

export default router;
