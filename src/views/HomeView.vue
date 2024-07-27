<script setup>
  import Button from '../components/buttons/Button.vue';
  import hey from './hey.vue';
</script>

<template>
  <div class="flex flex-col items-center mt-20">
    <hey />
    This is page 1!
    <Button title="Go to page 2" link="/page2"/>
  </div>
</template>
