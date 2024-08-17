<script setup>
import Button from '../components/buttons/Button.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="bg-gray-800 text-white py-4 w-full fixed top-0 left-0 flex justify-between items-center">
    <span class="font-bold text-xl ml-4 border border-white rounded-lg px-2 py-3">
      Brian Reinke's Portfolio
    </span>
    <div class="flex items-center">
      <template v-if="route.path !== '/'">
        <Button title="Home" link="/" class="font-bold" />
      </template>
      <template v-if="route.path === '/database_project' || route.path === '/seedmetrics_project' || route.path === '/vaulted_project'">
        <Button title="Back to Projects" link="/more_about_projects" class="font-bold mr-4 rounded-lg" />
      </template>
      <template v-else-if="route.path !== '/more_about_projects'">
        <Button title="Read More About My Projects" link="/more_about_projects" class="font-bold mr-4 rounded-lg"/>
      </template>
      <Button title="LinkedIn" link="https://www.linkedin.com/in/brianreinke21" target="_blank" class="font-bold mr-4 rounded-lg" />
    </div>
  </div>
</template>
