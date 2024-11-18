<template>
  <div v-if="tasksStore.loading" class="flex justify-center items-center py-4">
    <div class="spinner border-t-4 border-indigo-500 rounded-full w-16 h-16 animate-spin"></div>
  </div>
  <div v-else>
    <div
      v-for="task in tasksStore.tasks"
      :key="task.id"
      :class="[
        'bg-gray-100 dark:bg-gray-800 p-4 mb-2 rounded-md shadow transition-all',
        task.isCompleted ? 'completed-task' : '',
      ]"
    >
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {{ task.title }}
      </h2>
      <p class="text-gray-600 dark:text-gray-400">{{ task.description }}</p>
      <div class="flex gap-2 mt-2">
        <button
          @click="tasksStore.markAsCompleted(task.id)"
          class="text-green-500 hover:text-green-700"
          :disabled="task.isCompleted"
        >
          {{ task.isCompleted ? "Completed" : "Mark as Completed" }}
        </button>
        <button
          @click="tasksStore.deleteTask(task.id)"
          class="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
        <button
          @click="editTask(task)"
          class="text-blue-500 hover:text-blue-700"
        >
          Edit
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
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/tasksStore';
import { onMounted, ref } from 'vue';

const tasksStore = useTasksStore();

// Variables para editar tareas
const editingTask = ref(null);
const editTitle = ref('');
const editDescription = ref('');

// Llamada a la función para obtener las tareas cuando se monta el componente
onMounted(() => {
  tasksStore.fetchTasks();
});

// Función para editar una tarea
const editTask = (task) => {
  editingTask.value = task;
  editTitle.value = task.title;
  editDescription.value = task.description;
};

// Función para guardar los cambios de una tarea editada
const saveTask = async () => {
  if (editingTask.value) {
    await tasksStore.updateTask(editingTask.value.id, {
      title: editTitle.value,
      description: editDescription.value,
    });
    editingTask.value = null;
  }
};

// Función para cancelar la edición
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
