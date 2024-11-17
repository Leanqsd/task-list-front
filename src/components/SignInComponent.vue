<script setup lang="ts">
import { ref } from 'vue'; // Importación de ref
import { useAuthStore } from '@/stores/authStore';

// Uso de la store de autenticación
const authStore = useAuthStore();

// Variables reactivas para email y password
const email = ref('');
const password = ref('');

// Función para iniciar sesión
const login = async () => {
  try {
    await authStore.fetchCsrfToken();
    await authStore.login({ email: email.value, password: password.value });
  } catch (error) {
    console.error('Error during login:', error);
  }
};
</script>

<template>
  <!-- Componente de inicio de sesión -->
  <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 w-96">
    <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Sign In</h1>
    <form @submit.prevent="login">
      <!-- Campo de correo -->
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="your@email.com"
          required
        />
      </div>
      <!-- Campo de contraseña -->
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <!-- Botón de inicio de sesión -->
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Login
      </button>
    </form>
  </div>
</template>

<style></style>
