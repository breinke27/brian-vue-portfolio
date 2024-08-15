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
    <h1 class="text-3xl font-bold mb-4">Role: Data Scientist</h1>
    <h2 class="text-2xl font-semibold mb-2">Technologies Used:</h2>
    <ul class="list-disc list-inside mb-4">
      <li>R</li>
      <li>SQL</li>
    </ul>
    <p class="text-lg mb-4">
      During my time as a data scientist with Vaulted, I was given the opportunity to help create and validate the accuracy of machine learning models. The models we built were used to create expected player and team statistics. Along with aiding in the building of these machine learning models using XGBoost, I was able to test their accuracy and reliability using statistical analysis in R for both MLB (American Professional) and NPB (Japanese Professional) data. Below is a link to the code which tests the validity of the ball in play outcome model. Also, attached are SQL queries I was tasked with creating to identify different key player statistics.
    </p>
    <a href="https://github.com/breinke27/brian-vue-portfolio/blob/main/Vaulted Baseball" 
   target="_blank" 
   class="text-blue-500 py-2 px-4 rounded border border-transparent hover:border-red-500 hover:text-red-500">
   View Code on GitHub
</a>
  </div>
</template>
