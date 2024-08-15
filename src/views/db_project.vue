<script setup>
import banner from './Banner.vue';
</script>

<template>
  <div>
    <banner />
    <div class="flex flex-col items-center mt-20">
    </div> 
  </div>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">Role: Data Engineer</h1>
    <h2 class="text-2xl font-semibold mb-2">Technologies Used:</h2>
    <ul class="list-disc list-inside mb-4">
      <li>Python</li>
      <li>Django</li>
    </ul>
    <p class="text-lg mb-4">
      As a data engineer, I was given the opportunity to test some of the statistical models built in a Django web app called dataBase. This exercise provided me with an introduction to web applications and more specifically the importance of testing statistical models within the apps themselves. This has led me down the path to build the web app you see here! As I continue to progress with building using Django I will be more hands-on with the creation of further statistical models and the overall functionality of the app.
    </p>
    <a href="https://github.com/breinke27/brian-vue-portfolio/blob/main/dataBase" 
   target="_blank" 
   class="text-blue-500 py-2 px-4 rounded border border-transparent hover:border-red-500 hover:text-red-500">
   View Code on GitHub
</a>
  </div>
</template>
