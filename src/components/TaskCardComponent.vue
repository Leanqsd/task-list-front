<script setup lang="ts"></script>

<template>
  <tr>
    <td>1</td>
    <td>Task Name</td>
    <td>Task Description</td>
    <td class="p-2">
      <div class="flex justify-center">
        <a
          href="#"
          class="rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center"
        >
          <span><FaEdit class="w-4 h-4 mr-1" /> </span> Edit
        </a>
        <button
          class="rounded-md hover:bg-red-100 text-red-600 p-2 flex justify-between items-center"
        >
          <span><FaTrash class="w-4 h-4 mr-1" /></span> Delete
        </button>
      </div>
    </td>
  </tr>
</template>

<style scoped></style>
