import { defineStore } from 'pinia';
import router from '@/router';  // Para la navegación
import { registerUser, loginUser, renewToken } from '@/services/authService';  // Importamos las funciones del servicio
import axiosInstance from '@/api/axios';
import type { AuthModel } from '@/models/AuthModels';
import type { CredentialsModel } from '@/models/CredentialsModel';
import type { SesionStateModel } from '@/models/SesionStateModel';
import type { AuthApiResponseModel } from '@/models/AuthApiResponseModel';

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): { 
    loading: boolean; // Estado separado para loading
    data: SesionStateModel;
    error: string;
  } => ({
    loading: false,
    data: {
      isAuthenticated: false, // Asegúrate de inicializar este valor
      user: null,
      loading: false,
    },
    error: '',
  }),

  actions: {
    // Acción para actualizar el token CSRF
    changeCrsfToken() {
      const headers = axiosInstance.defaults.headers;
      this.data!.crsfToken = headers['csrf-token']?.toString(); // Actualiza el CSRF token
      console.info('[AuthStore] CRSF Token Actualizado');
    },

    // Acción asincrónica para registrar un nuevo usuario
    async registerUser(credentials: CredentialsModel) {
      this.loading = true;
      try {
        const response = await registerUser(credentials); // Usamos la función del servicio
        if (response.status === 201) {
          console.log('[AuthStore] Usuario Creado, código de respuesta:', response.status);
          this.login(credentials); // Autologin después de registrar al usuario
        }
        this.loading = false;
      } catch (e) {
        console.error('[AuthStore] Error al registrar usuario', e);
        this.error = e!.toString();
        this.loading = false;
      }
    },

    // Acción asincrónica para iniciar sesión
    async login(credentials: CredentialsModel) {
        this.loading = true;
        try {
          const { data }: { data: AuthApiResponseModel } = await loginUser(credentials);
          console.log('Login response:', data); // Agrega este log
       if (data) {
                // Guardar datos del usuario en el estado
                this.data!.user = {
                  userId: data.userId,
                  email: credentials.email,
                  token: data.token,
                  refreshToken: data.refreshToken,
                };
                const currentEpochTime = Math.floor(Date.now() / 1000);
                this.data!.jwtExpires = currentEpochTime + 3 * 60; // El token expira en 3 minutos
      
                console.info('[AuthStore] Usuario Logeado, código de respuesta:', data);
      
                this.loading = false;
                router.push('/tasks'); // Redirigir al usuario a la página de tareas
              }
        } catch (e: any) {
          console.error('Login error:', e.response?.data || e.message); // Log completo del error
          this.error = e.response?.data?.message || 'Error desconocido al iniciar sesión';
          this.loading = false;
        }
      },

    // Acción para cerrar sesión
    async logout(): Promise<void> {
      try {
        await axiosInstance.post('/auth/logout'); // Usamos la instancia de Axios
        this.data!.user = null;
        this.data!.jwtExpires = undefined;
        console.info('[AuthStore] Usuario cerrado sesión');
        router.push('/login'); // Redirigir al login después de logout
      } catch (e) {
        console.error('[AuthStore] Error al cerrar sesión', e);
      }
    },

    // Acción para obtener información del usuario
    async fetchUser(): Promise<void> {
      try {
        const { data }: { data: AuthModel } = await axiosInstance.get('/user'); // Usamos la instancia de Axios
        this.data!.user = data;
        this.data!.jwtExpires = Math.floor(Date.now() / 1000) + 3 * 60; // Renueva el JWT
      } catch (e) {
        console.error('[AuthStore] Error al obtener el usuario', e);
      }
    },

    // Acción para verificar si el JWT ha expirado
    checkJwtExpiration(): boolean {
      const currentEpochTime = Math.floor(Date.now() / 1000);
      if (this.data?.jwtExpires && currentEpochTime > this.data.jwtExpires) {
        console.warn('[AuthStore] El JWT ha expirado');
        return true;
      }
      return false;
    },

    // Acción para renovar el token (si lo implementas en tu backend)
    async renewToken(): Promise<void> {
      try {
        const response = await renewToken(this.data!.user!.refreshToken); // Usamos la función del servicio
        if (response.status === 200) {
          this.data!.jwtExpires = Math.floor(Date.now() / 1000) + 3 * 60; // Renueva el JWT
          console.info('[AuthStore] Token renovado exitosamente');
        }
      } catch (e) {
        console.error('[AuthStore] Error al renovar el token', e);
      }
    },
  },
});
