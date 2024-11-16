<script setup lang="ts">
import TaskFormComponent from '@/components/TaskFormComponent.vue'
import TaskListComponent from '@/components/TaskListComponent.vue'
</script>

<template>
  <div class="fixed inset-0 bg-white dark:bg-gray-950">
    <div
      class="header h-16 px-10 py-8 border-b-2 border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900"
    >
      <div class="flex items-center h-16 space-x-2 text-gray-300">
        <h1 class="text-2xl">Task List</h1>
      </div>
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
