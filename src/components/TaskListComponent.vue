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
  <div v-if="tasksStore.loading" class="flex justify-center items-center py-4">
    <div class="spinner border-t-4 border-indigo-500 rounded-full w-16 h-16 animate-spin"></div>
  </div>
  <div v-else>
    <div
      v-for="task in tasksStore.tasks"
      :key="task.id"
      class="bg-gray-100 dark:bg-gray-800 p-4 mb-2 rounded-md shadow"
    >
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {{ task.title }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400">{{ task.description }}</p>
      <div class="flex gap-2 mt-2">
        <button
          @click="tasksStore.markAsCompleted(task.id)"
          class="text-green-500 hover:text-green-700"
          :disabled="task.completed"
        >
          Mark as Completed
        </button>
        <button
          @click="tasksStore.deleteTask(task.id)"
          class="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
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
