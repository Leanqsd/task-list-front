<script setup lang="ts">
import { ref } from 'vue'
import SignInComponent from '@/components/SignInComponent.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'

// Variable de estado para controlar la visualización del componente
const isSignInVisible = ref(true)

// Funciones para alternar
function toggleComponent() {
  isSignInVisible.value = !isSignInVisible.value
}
</script>

<template>
  <div class="fixed inset-0 h-screen w-full flex justify-center items-center bg-gray-950">
    <div class="flex flex-col items-center space-y-4">
      <!-- Botones para alternar entre Sign In y Register -->

      <!-- Mostrar el componente basado en el estado -->
      <div class="mt-4">
        <SignInComponent v-if="isSignInVisible" />
        <RegisterComponent v-else />
      </div>
      <div class="flex space-x-4">
        <button
          @click="toggleComponent"
          class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ isSignInVisible ? 'Create Account' : 'Sign In' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales para los botones (opcional) */
</style>
