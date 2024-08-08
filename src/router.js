import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/HomeView.vue'), name: 'HomeView'},
  { path: '/page2', component: () => import('./views/SecondView.vue'), name: 'SecondView'},
  { path: '/sm_project', component: () => import('./views/sm_project.vue'), name: 'sm_project'},
  { path: '/vault_project', component: () => import('./views/vault_project.vue'), name: 'vault_project'},
  { path: '/db_project', component: () => import('./views/db_project.vue'), name: 'db_project'},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
