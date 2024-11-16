<script setup lang="ts">
import { useTasksStore } from '@/stores/tasksStore';
import { onMounted } from 'vue';

// Usamos la store de tareas
const tasksStore = useTasksStore();

// Llamamos a la función para obtener las tareas cuando el componente se monta
onMounted(() => {
  tasksStore.fetchTasks();
});
</script>

<template>
  <div class="p-1">
    <!-- Botones de filtro -->
    <button
      class="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      Incomplete
    </button>
    <button
      class="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      Complete
    </button>
    <button
      class="inline-flex items-center gap-2 rounded-full border border-[#7629c8] px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    >
      All
    </button>
  </div>

  <!-- Condicional para mostrar spinner o lista de tareas -->
  <div v-if="tasksStore.loading" class="flex justify-center items-center py-4">
    <div class="spinner border-t-4 border-indigo-500 rounded-full w-16 h-16 animate-spin"></div>
  </div>
  <div v-else>
    <div v-for="task in tasksStore.tasks" :key="task.id" class="bg-gray-100 dark:bg-gray-800 p-4 mb-2 rounded-md shadow">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ task.title }}</h2>
      <p class="text-gray-600 dark:text-gray-400">{{ task.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: #6366f1;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
