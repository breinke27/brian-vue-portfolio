import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/HomeView.vue'), name: 'HomeView'},
  { path: '/page2', component: () => import('./views/SecondView.vue'), name: 'SecondView'},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
