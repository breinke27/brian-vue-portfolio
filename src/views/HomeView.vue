<template>
  <div class="text-center py-10 bg-gray-100 min-h-screen">
    <img 
      src="@/assets/headshot.PNG" 
      alt="Home Image" 
      class="w-1 h-1 mx-auto mb-8 rounded-full border-4 border-gray-300 shadow-md" 
    />
    <p class="text-lg text-gray-600 mb-8">
      This is the home page of the portfolio website.
    </p>
    <p class="text-base text-gray-700 mb-4">
      Explore my work and projects through the navigation menu.
    </p>
    <div class="flex justify-center space-x-40">
      <Button @click="navigateToPage">Read More</Button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from '../components/buttons/Button.vue';

const router = useRouter();
const navigateToPage = () => {
  router.push('/read-more');
};
</script>
