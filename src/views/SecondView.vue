<script setup>
import Button from '../components/buttons/Button.vue';
import banner from './Banner.vue';
import smlogo from '/smlogo.png';
import vaultlogo from '/vaulted_logo.png'; 
import dblogo from '/db_logo.png';
</script>

<template>
  <div class="flex flex-col items-center mt-20">
    <banner />
    <div class="mt-16">
      <h2 class="text-2xl font-bold mb-8">My Projects</h2>
      <div class="flex flex-col space-y-8">
        <div class="flex flex-row justify-center space-x-4">
          <div class="flex flex-col items-center border-black border-4 p-4 rounded-lg">
            <img :src="smlogo" alt="SM Logo"  class="w-72 h-auto object-cover mb-4 rounded-lg">
            <Button title="SeedMetrics" link="/seedmetrics_project" class="flex justify-center" />
          </div>
          <div class="flex flex-col items-center border-black border-4 p-4 rounded-lg">
            <img :src="vaultlogo" alt="Vaulted Logo"  class="w-72 h-auto object-cover mb-4 rounded-lg">
            <Button title="Vaulted Baseball" link="/vaulted_project" class="flex justify-center" />
          </div>
          <div class="flex flex-col items-center border-black border-4 p-4 rounded-lg">
            <img :src="dblogo " alt="dataBase Logo" class="w-72 h-auto object-cover mb-4 rounded-lg">
            <Button title="dataBase Sabermetrics" link="/database_project" class="flex justify-center" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

