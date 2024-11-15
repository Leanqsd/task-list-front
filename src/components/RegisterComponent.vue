<script setup lang="ts"></script>

<template>
  <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 w-96">
    <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Create Account</h1>
    <form action="#">
      <div class="mb-4">
        <label for="Name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >User Name</label
        >
        <input
          type="username"
          id="username"
          class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Email Address</label
        >
        <input
          type="email"
          id="email"
          class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="your@email.com"
          required
        />
      </div>
      <div class="mb-4">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >Password</label
        >
        <input
          type="password"
          id="password"
          class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        onclick="alert()"
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Account
      </button>
    </form>
  </div>
</template>
