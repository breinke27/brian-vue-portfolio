<script setup>
import banner from './Banner.vue';
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <banner />
    <div class="flex flex-col items-center mt-20"></div> 
    <div class="container mx-auto p-4">
      <div class="border border-black p-6 rounded-lg bg-white">
        <h1 class="text-3xl font-bold mb-4">Role: Data Engineer</h1>
        <h2 class="text-2xl font-semibold mb-2">Technologies Used:</h2>
        <ul class="list-disc list-inside mb-4">
          <li>Python</li>
          <li>Django</li>
        </ul>
        <p class="text-lg mb-4">
          As a data engineer, I was tasked with testing the accuracy of the pre-existing statistical models for the web app dataBase. This exercise provided me with an introduction to building web applications and more specifically the importance of testing statistical models within the apps themselves. This experience has prepared me with the necessary knowledge to produce the web app you see here! My next project is to build more advanced statistical models for our players and a bullpen feature to be used in training sessions for our clients.        </p>
        <a href="https://github.com/breinke27/brian-vue-portfolio/blob/main/dataBase" 
           target="_blank" 
           class="text-blue-500 py-2 px-4 rounded-lg border border-transparent hover:border-red-500 hover:text-red-500">
           View Code on GitHub
        </a>
      </div>
    </div>
  </div>
</template>
