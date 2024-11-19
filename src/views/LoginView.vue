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
  <div class="fixed inset-0 min-h-screen flex flex-col justify-between bg-gray-950">
    <div class="flex flex-col items-center space-y-4">
      <!-- Botones para alternar entre Sign In y Register -->

      <!-- Mostrar el componente basado en el estado -->
      <div class="mt-10 flex-1">
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

    <!-- Footer -->
    <footer class="w-full bg-gray-800 text-gray-200 py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-end justify-between">
          <!-- Texto del footer -->
          <p class="text-sm mb-4 md:mb-0">
            &copy; 2024 - Creado por
            <span class="font-semibold text-indigo-400">Leandro Quesada</span> y
            <span class="font-semibold text-indigo-400">Enzo Beltran</span>.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Estilos adicionales para los botones (opcional) */
</style>
