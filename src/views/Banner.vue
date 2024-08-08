 <script setup>
 import Button from '../components/buttons/Button.vue';
 import { useRoute } from 'vue-router';
 
 const route = useRoute();
 </script>
 
 <template>
   <div class="bg-gray-800 text-white py-4 w-full fixed top-0 left-0 flex justify-between items-center">
     <span class="font-bold text-xl ml-4 border border-white px-2 py-1">
       Brian Reinke's Portfolio
     </span>
     <div class="flex items-center">
       <template v-if="route.path !== '/'">
         <Button title="Home" link="/" />
       </template>
       <template v-if="route.path !== '/page2'">  
         <Button title="Read More About My Projects" link="/page2" class="font-bold mr-4"/>
       </template>
       <Button title="LinkedIn" link="https://www.linkedin.com/in/brianreinke21" target="_blank" class="font-bold mr-4" />
     </div>
   </div>
 </template>
 