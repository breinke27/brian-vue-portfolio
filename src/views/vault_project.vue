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
        During my time as a data scientist with Vaulted, I was given the opportunity to help create and validate the accuracy of machine learning models. The models that we built were used for creating expected player and team statistics. Along with aiding in the building of these machine learning models using XGBoost, I was able to test their accuracy and reliability using statistical analysis in R for both MLB (American Professional) and NPB (Japanese Professional) data. Below you will see the testing of the swing decision and the ball in play outcome models. Also, attached are SQL querys I was tasked with creating to identify different key player statistics.
      </p>
      <div class="border border-gray-300 p-6 rounded-lg w-full max-w-4xl mx-auto">
        <h3 class="text-xl font-semibold mb-2">Code:</h3>
        <pre class="text-sm bg-gray-100 p-4 rounded-lg text-blue-500 overflow-x-auto">
Link or File to Github Code w/ Dummy Data
        </pre>
      </div>
      <div class="border border-gray-300 p-6 rounded-lg w-full max-w-4xl mx-auto">
        <h3 class="text-xl font-semibold mb-2">SQL File/ or same thing:</h3>
        <pre class="text-sm bg-gray-100 p-4 rounded-lg text-blue-500 overflow-x-auto">
Code #2   
  </pre>
      </div>
    </div>
  </template>