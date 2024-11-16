<script setup lang="ts"></script>

<template>
  <div class="p-1">
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
  <div
    class="w-full h-full bg-white dark:bg-gray-900 shadow-lg text-lg rounded-sm border border-gray-900"
  >
    <div class="overflow-x-auto rounded-lg p-2">
      <table class="table-auto w-full">
        <thead class="text-sm font-semibold uppercase text-gray-200 bg-gray-800">
          <tr>
            <th class="p-2">
              <div class="font-semibold">Name</div>
            </th>
            <th class="p-2">
              <div class="font-semibold text-left">Description</div>
            </th>
            <th class="p-2">
              <div class="font-semibold text-center">Action</div>
            </th>
          </tr>
        </thead>

        <!-- Task Card
         podes usar v-for en esta card para añadir las task creadas en el componente
         -->
        <tbody class="border-2 border-gray-800">
          <tr>
            <td class="p-2 text-center text-gray-200">Sample Task</td>
            <td class="p-2 text-gray-200">This is a sample description.</td>
            <td class="p-2 text-center">
              <input
                type="checkbox"
                class="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
