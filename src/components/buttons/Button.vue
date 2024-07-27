<script setup>
  defineProps({
    title: String,
    link: String,
});
</script>

<template>
  <router-link :to="link" class="bg-blue-500 p-4 rounded">{{ title }}</router-link>
</template>
