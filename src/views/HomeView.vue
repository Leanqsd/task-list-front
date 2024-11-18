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
  <div class="fixed inset-0 bg-white dark:bg-gray-950">
    <div class="header h-16 px-10 py-8 border-b-2 border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900">
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
      <div class="mb-28 w-full lg:w-1/3 m-1 mt-12">
        <TaskFormComponent />
      </div>

      <!-- Task List -->
      <div class="mb-40 w-full lg:w-2/3 m-1">
        <TaskListComponent />
      </div>
    </div>
  </div>
</template>
