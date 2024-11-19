<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore'; // Importar el store de autenticación
import TaskFormComponent from '@/components/TaskFormComponent.vue'; // Importar correctamente el componente TaskFormComponent
import TaskListComponent from '@/components/TaskListComponent.vue';

const authStore = useAuthStore(); // Instanciar el store

// Función para llamar al logout del store
const logout = async () => {
  await authStore.logout(); // Invoca el logout del store
};
</script>

<template>
  <div class="fixed inset-0 flex flex-col bg-gray-950">
    <div class="header h-16 px-10 py-8 border-b-2 border-gray-800 flex items-center justify-between bg-gray-900">
      <div class="flex items-center h-16 space-x-2 text-gray-300">
        <h1 class="text-2xl">Task List</h1>
      </div>
      <!-- Botón de Logout solo visible si el usuario está autenticado -->
      <button
        v-if="authStore.isAuthenticated"
        @click="logout"
        class="text-white bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>

    <div class="flex flex-col mx-3 mt-6 lg:flex-row h-full">
      <!-- Task Form -->
      <div class=" mb-10  lg:w-1/3 m-1">
        <TaskFormComponent />
      </div>

      <!-- Task List -->
      <div class="mb-10  lg:w-2/3 m-1">
        <TaskListComponent />
      </div>

    </div>
    <footer class="bg-gray-800 text-gray-200 py-6">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row items-center justify-between">
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
