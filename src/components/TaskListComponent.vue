<template>
  <div class="w-full bg-gray-900 shadow-md p-6 h-full">
    <div class="flex space-x-2 py-2 border-b-2 border-gray-800">
      <!-- Botón All -->
      <button
        @click="setFilter('all')"
        :class="[
          'align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 border rounded-xl',
          filter === 'all' ? 'bg-indigo-500 text-white' : 'border-indigo-500 text-indigo-500 hover:opacity-75'
        ]"
        type="button"
      >
        All
      </button>
      <!-- Botón Completed -->
      <button
        @click="setFilter('completed')"
        :class="[
          'align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 border rounded-xl',
          filter === 'completed' ? 'bg-indigo-500 text-white' : 'border-indigo-500 text-indigo-500 hover:opacity-75'
        ]"
        type="button"
      >
        Completed
      </button>
      <!-- Botón Incompleted -->
      <button
        @click="setFilter('incompleted')"
        :class="[
          'align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 border rounded-xl',
          filter === 'incompleted' ? 'bg-indigo-500 text-white' : 'border-indigo-500 text-indigo-500 hover:opacity-75'
        ]"
        type="button"
      >
        Incompleted
      </button>
    </div>

    <div v-if="tasksStore.loading" class="flex justify-center items-center py-4">
      <div class="spinner border-t-4 border-indigo-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
    <div v-else>
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        :class="[ 'bg-gray-100 dark:bg-gray-800 p-4 mb-2 rounded-md shadow transition-all', task.isCompleted ? 'completed-task' : '' ]"
      >
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">{{ task.title }}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ task.description }}</p>
        <div class="flex gap-2 mt-2">
          <button
  @click="tasksStore.markAsCompletedLocally(task.id)"
  class="flex items-center space-x-2 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-4 py-2.5 focus:outline-none"
  :disabled="task.isCompleted"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
  </svg>
  <span>{{ task.isCompleted ? 'Completed' : 'Mark as Completed' }}</span>
</button>
<button
  @click="tasksStore.deleteTask(task.id)"
  class="flex items-center space-x-2 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-4 py-2.5 focus:outline-none"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7L12 14l-7-7" />
  </svg>
  <span>Delete</span>
</button>
<button
  @click="editTask(task)"
  class="flex items-center space-x-2 text-blue-500 bg-transparent hover:bg-blue-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2.5 focus:outline-none border border-blue-500"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16 3l5 5-10 10H6v-5L16 3z" />
  </svg>
  <span>Edit</span>
</button>
        </div>
      </div>

      <!-- Modal para editar tareas -->
      <div v-if="editingTask" class="modal">
        <div class="modal-content bg-white p-6 rounded shadow-lg">
          <h3 class="text-xl font-bold mb-4">Edit Task</h3>
          <input
            v-model="editTitle"
            class="w-full mb-4 border rounded p-2"
            placeholder="Task Title"
          />
          <textarea
            v-model="editDescription"
            class="w-full mb-4 border rounded p-2"
            placeholder="Task Description"
          ></textarea>
          <div class="flex gap-2">
            <button
              @click="saveTask"
              class="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              @click="cancelEdit"
              class="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/tasksStore';
import { onMounted, ref, computed } from 'vue';

const tasksStore = useTasksStore();

// Variables para editar tareas
const editingTask = ref(null);
const editTitle = ref('');
const editDescription = ref('');

// Filtro seleccionado
const filter = ref('all'); // Puede ser 'all', 'completed', 'incompleted'

// Computed para las tareas filtradas
const filteredTasks = computed(() => {
  if (filter.value === 'completed') {
    return tasksStore.tasks.filter(task => task.isCompleted);
  } else if (filter.value === 'incompleted') {
    return tasksStore.tasks.filter(task => !task.isCompleted);
  }
  return tasksStore.tasks; // Retorna todas las tareas
});

// Función para cambiar el filtro
const setFilter = (newFilter: string) => {
  filter.value = newFilter;
};

// Función para obtener las tareas al montar el componente
onMounted(() => {
  tasksStore.fetchTasks();
});

// Funciones para editar tareas
const editTask = (task) => {
  editingTask.value = task;
  editTitle.value = task.title;
  editDescription.value = task.description;
};

const saveTask = async () => {
  if (editingTask.value) {
    await tasksStore.updateTask(editingTask.value.id, {
      title: editTitle.value,
      description: editDescription.value,
    });
    editingTask.value = null;
  }
};

const cancelEdit = () => {
  editingTask.value = null;
};
</script>


<style scoped>
/* Animación de transición para el tachado */
.completed-task {
  text-decoration: line-through;
  opacity: 0.6;
  transition: opacity 0.3s ease, text-decoration 0.3s ease;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  max-width: 500px;
  width: 100%;
}
</style>
