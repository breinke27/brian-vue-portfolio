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
      <h1 class="text-3xl font-bold mb-4">Data Engineer</h1>
      <h2 class="text-2xl font-semibold mb-2">Technologies Used:</h2>
      <ul class="list-disc list-inside mb-4">
        <li>Python</li>
        <li>SQL</li>
        <li>SciKit Learn</li>
      </ul>
      <p class="text-lg mb-4">
        As a data engineer, I had the opportunity to build a principle data pipeline for CRM and billing data to bolster SeedMetrics' ELT processes. My job was to construct classes to extract, transform, and load the data. I also had the ability to create a workflow that runs the classes I built and pulls the data from end to end. This process consisted of moving the data through four different stages, landing, normalized, processed, and curated. Attached below is the code of the three classes that completes this process and allows SeedMetrics to render custom dashboards for each of their tenants! Also, I had the opportunity to perform EDA for one of our clients and built a machine learning model to predict if a case will be won or lost using Scikit Learn. 
      </p>
      <div class="border border-gray-300 p-4 rounded">
        <h3 class="text-xl font-semibold mb-2">Code:</h3>
        <pre class="text-sm bg-gray-100 p-2 rounded">
          ```python
          def my_function():
            # Function code here
          ```
        </pre>
      </div>
    </div>
  </template>
  