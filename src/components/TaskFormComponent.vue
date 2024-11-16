<script setup lang="ts">
import { useTasksStore } from '@/stores/tasksStore';

const tasksStore = useTasksStore();
const title = ref('');
const description = ref('');

const createTask = async () => {
  await tasksStore.createTask({ title: title.value, description: description.value });
  title.value = '';
  description.value = '';
};

</script>

<template>
  <div class="w-full bg-white dark:bg-gray-900 shadow-md p-6 h-full">
    <form class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3 mb-6">
        <label
          class="block uppercase tracking-wide text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          for="task_name"
        >
          Create your Task
        </label>
        <input
          class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-300 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-indigo-500"
          type="text"
          placeholder="Task Name"
          required
        />
      </div>
      <div class="w-full px-3 mb-6">
        <textarea
          rows="4"
          class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-300 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-indigo-500"
          placeholder="Description"
        ></textarea>
      </div>
      <div class="w-full px-3 mb-6">
        <button
          class="appearance-none block w-full text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:ring-indigo-500"
          type="submit"
        >
          Add Task
        </button>
      </div>
    </form>
  </div>
</template>
