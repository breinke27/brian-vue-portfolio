<script setup>
import Button from '../components/buttons/Button.vue';
import banner from './Banner.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="flex flex-col items-center mt-20">
    <banner />
    <div class="mt-16 text-center">
      <div class="flex flex-col md:flex-row items-center justify-center">
        <img src="../assets/headshot.PNG" alt="Brian Reinke" class="w-64 h-auto rounded-full shadow-lg mb-6 md:mb-0 md:mr-8" />
        <p class="text-lg leading-relaxed max-w-lg">
          Welcome to my portfolio! Here you will find a collection of projects I have worked on and my resume. I'm passionate about data engineering, data science, and web development. Thank you for taking the time to explore!
        </p>
      </div>
      <Button title="Resume" :link="'/assets/Brian Reinke Resume.pdf'" target="_blank" class="mt-8" /> <!--Fix routing issue -->
    </div>
  </div>
</template>

