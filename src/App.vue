<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <header class="bg-gray-700 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Brian Reinke's Portfolio</h1>
        <nav class="flex space-x-40">
          <router-link to="/" class="hover:text-gray-300 transition-colors">Home</router-link>
          <router-link to="/read-more" class="hover:text-gray-300 transition-colors">Read More</router-link>
        </nav>
      </div>
    </header>

    <main class="container mx-auto mt-8 px-4">
      <div class="flex flex-col items-center">
      </div>
      <router-view class="mt-8"></router-view>
    </main>
  </div>
</template>

<script setup>
// No additional setup needed
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.router-link-active {
  font-weight: bold;
}
</style>

