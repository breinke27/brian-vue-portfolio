<script setup>
defineProps({
  title: String,
  link: String,
  target: {
    type: String,
    default: '_self',
  },
});
</script>

<template>
  <a :href="link" :target="target" class="bg-gray-800 p-4 rounded text-white ml-4 border border-white">
    {{ title }}
  </a>
</template>