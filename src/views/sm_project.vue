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
          <li>SQL</li>
          <li>SciKit Learn</li>
        </ul>
        <p class="text-lg mb-4">
          As a data engineer, I had the opportunity to build a principal data pipeline for CRM and billing data to bolster SeedMetrics' ELT processes. My job was to construct classes to extract, transform, and load the data. I also had the ability to create a workflow that runs the classes I built and pulls the data from end to end. This process consisted of moving the data through four different stages: landing, normalized, processed, and curated. Attached is a link to the code for these three classes and allows SeedMetrics to identify SaaS KPIs for each of their tenants! I also had the opportunity to build a machine learning model using Scikit Learn that predicts if a case would be won or lost, enhancing SeedMetric's ability to predict cases won for future clients.        </p>
        <a href="https://github.com/breinke27/brian-vue-portfolio/blob/main/SeedMetrics" 
           target="_blank" 
           class="text-blue-500 py-2 px-4 rounded border border-transparent hover:border-red-500 hover:text-red-500">
           View Code on GitHub
        </a>
      </div>
    </div>
  </div>
</template>
