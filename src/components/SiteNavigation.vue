<template>
    <header class="sticky top-0 bg-Blue shadow-lg">
        <nav class="flex flex-col sm:flex-row items-center
         gap-4 text-black py-6"
         >
        <RouterLink :to="{name: 'home'}">
            <div class="flex items-center gap-3 flex-1">
                <i class="fa-solid fa-sun text-2xl"></i>
                <p class="text-2xl">Portfolio Navigation</p>
            </div>
        </RouterLink>
        </nav>
    </header>

</template>

<!-- <script setup>
import {RouterLink} from "vue-router";
</script> -->