import { defineStore } from 'pinia';
import router from '@/router';
import { registerUser, loginUser, renewToken } from '@/services/authService';
import axiosInstance from '@/api/axios';
import type { SesionStateModel } from '@/models/SesionStateModel';
import type { CredentialsModel } from '@/models/CredentialsModel';
import type { AuthApiResponseModel } from '@/models/AuthApiResponseModel';

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): SesionStateModel => ({
    isAuthenticated: false,
    user: null,
    jwtExpires: undefined,
    crsfToken: undefined,
    loading: false,
    error: '',
  }),
  actions: {
    // Actualizar token CSRF
    async changeCrsfToken() {
      try {
        const headers = axiosInstance.defaults.headers;
        this.crsfToken = headers['X-CSRF-Token']?.toString();
        console.info('[AuthStore] CSRF Token Actualizado:', this.crsfToken);
      } catch (error) {
        console.error('[AuthStore] Error actualizando CSRF Token:', error);
      }
    },

    // Registrar usuario
    async registerUser(credentials: CredentialsModel) {
        this.loading = true;
        try {
          console.info('[AuthStore] Intentando registrar usuario con:', credentials);
          const response = await registerUser(credentials);
      
          if (response.status === 201) {
            console.info('[AuthStore] Usuario registrado correctamente:', response.data);
            this.login(credentials); // Inicia sesión automáticamente
          } else {
            console.warn('[AuthStore] Respuesta inesperada al registrar:', response);
          }
        } catch (error: any) {
          console.error('[AuthStore] Error al registrar usuario:', error.response?.data || error.message);
          this.error = error.response?.data?.message || 'Error al registrar usuario';
        } finally {
          this.loading = false;
        }
      },
      

    // Iniciar sesión
    async login(credentials: CredentialsModel) {
      this.loading = true;
      try {
        const { data }: { data: AuthApiResponseModel } = await loginUser(credentials);
        this.user = {
          userId: data.userId,
          email: credentials.email,
          token: data.token,
          refreshToken: data.refreshToken,
        };
        this.isAuthenticated = true;
        this.jwtExpires = Math.floor(Date.now() / 1000) + 3 * 60; // El token expira en 3 minutos
        console.info('[AuthStore] Usuario logueado correctamente:', data);
        router.push('/tasks');
      } catch (error: any) {
        console.error('[AuthStore] Error al iniciar sesión:', error.response?.data || error.message);
        this.error = error.response?.data?.message || 'Error al iniciar sesión';
      } finally {
        this.loading = false;
      }
    },

    // Cerrar sesión
    async logout() {
      try {
        await axiosInstance.post('/auth/logout');
        this.isAuthenticated = false;
        this.user = null;
        this.jwtExpires = undefined;
        console.info('[AuthStore] Usuario cerrado sesión');
        router.push('/login');
      } catch (error) {
        console.error('[AuthStore] Error al cerrar sesión:', error);
      }
    },

    // Renovar token
    async renewToken() {
      try {
        const { data } = await renewToken(this.user?.refreshToken || '');
        this.jwtExpires = Math.floor(Date.now() / 1000) + 3 * 60; // Renueva el JWT
        console.info('[AuthStore] Token renovado correctamente');
      } catch (error) {
        console.error('[AuthStore] Error al renovar token:', error);
      }
    },
  },
});
