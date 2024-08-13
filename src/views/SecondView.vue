<script setup>
import Button from '../components/buttons/Button.vue';
import banner from './Banner.vue';
</script>

<template>
  <div class="flex flex-col items-center mt-20">
    <banner />
    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-8">My Projects</h2>
      <div class="flex flex-col space-y-8">
        <div class="flex flex-row justify-center space-x-4">
          <div class="flex flex-col items-center border-black border-4 p-4 rounded-lg">
            <img src="../assets/smlogo.png" alt="SeedMetrics" class="w-72 h-auto object-cover mb-4 rounded-lg">
            <Button title="SeedMetrics" link="/sm_project" class="flex justify-center" />
          </div>
          <div class="flex flex-col items-center border-black border-4 p-4 rounded-lg">
            <img src="../assets/vaulted_logo.png" alt="Vaulted" class="w-72 h-auto object-cover mb-4 rounded-lg">
            <Button title="Vaulted Baseball" link="/vault_project" class="flex justify-center" />
          </div>
          <div class="flex flex-col items-center border-black border-4 p-4 rounded-lg">
            <img src="../assets/db_logo.png" alt="dataBase" class="w-72 h-auto object-cover mb-4 rounded-lg">
            <Button title="dataBase Sabermetrics" link="/db_project" class="flex justify-center" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

