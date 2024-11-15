<script setup lang="ts"></script>

<template>
  <!-- component -->
  <div class="fixed inset-0 bg-gray-100">
    <div
      class="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between"
    >
      <div class="flex items-center h-16 space-x-2 text-gray-400">
        <span class="text-green-700 tracking-wider font-thin text-md"><a href="#">Home</a></span>
        <span>/</span>
        <span class="tracking-wide text-md">
          <span class="text-base">TASKS</span>
        </span>
        <span>/</span>
      </div>
    </div>
    <div class="header my-3 h-12 px-10 flex items-center justify-between">
      <h1 class="font-medium text-2xl">Task List</h1>
      <div class="fixed inset-0 flex items-start mt-28 justify-center">
        <button
          class="inline-flex items-center gap-2 rounded-full border border-[#7629c8] mx-1 px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          All
        </button>
        <button
          class="inline-flex items-center gap-2 rounded-full border border-[#7629c8] mx-1 px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Incomplete
        </button>
        <button
          class="inline-flex items-center gap-2 rounded-full border border-[#7629c8] mx-1 px-6 py-2 text-sm font-semibold text-[#7629c8] transition-all hover:bg-[#7629c8] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Complete
        </button>
      </div>
    </div>
    <div class="flex flex-col mx-3 mt-6 lg:flex-row h-full">
      <div class="mb-40 w-full lg:w-1/3 m-1">
        <form class="w-full bg-white shadow-md p-6 h-full">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                htmlFor="category_name"
                >Task Name</label
              >
              <input
                class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                type="text"
                name="name"
                placeholder="Task Name"
                required
              />
            </div>
            <div class="w-full px-3 mb-6">
              <textarea
                textarea
                rows="4"
                class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none focus:border-[#98c01d]"
                type="text"
                name="description"
                required
              >
              </textarea>
            </div>

            <div class="w-full md:w-full px-3 mb-6">
              <button
                class="appearance-none block w-full bg-green-700 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-green-600 focus:outline-none focus:bg-white focus:border-gray-500"
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        class="mb-40 w-full lg:w-2/3 m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200"
      >
        <div class="overflow-x-auto rounded-lg p-3">
          <table class="table-auto w-full">
            <thead class="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
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
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
