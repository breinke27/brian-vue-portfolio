<script setup>
import Button from '../components/buttons/Button.vue';
import banner from './Banner.vue';
import { useRoute } from 'vue-router';
import headshot from '/headshot.png';

const route = useRoute();
</script>

<template>
  <div class="flex flex-col items-center mt-20 bg-gray-200 min-h-screen">
    <banner />
    <div class="mt-16 text-center border-black border-4 rounded-lg p-8 bg-white">
      <div class="flex flex-col md:flex-row items-center justify-center">
        <img :src="headshot" alt="Brian Reinke" class="w-64 h-auto shadow-lg mb-6 md:mb-0 md:mr-8 rounded-md" />
        <p class="text-lg leading-relaxed max-w-lg">
          Hello and welcome to my portfolio! Here you will find a collection of projects I have worked on in the past year as well as my resume. I'm a rising senior at the University of Richmond and am passionate about data engineering, data science, and web development. Thank you for taking the time to explore!
        </p>
      </div>
      <Button title="Resume" :link="'/Brian Reinke Resume.pdf'" target="_blank" class="mt-8" />
    </div>
    <div> 
      <div class="mt-16 text-center border-black border-4 rounded-lg p-8 bg-white">
        <h3 class="font-bold">This Project was built using Vue.js and JavaScript</h3>
      </div>
    </div>
  </div>
</template>