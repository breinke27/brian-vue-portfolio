import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/HomeView.vue'), name: 'HomeView'},
  { path: '/more_about_projects', component: () => import('./views/SecondView.vue'), name: 'more_about_projects'},
  { path: '/seedmetrics_project', component: () => import('./views/sm_project.vue'), name: 'seedmetrics_project'},
  { path: '/vaulted_project', component: () => import('./views/vault_project.vue'), name: 'vaulted_project'},
  { path: '/database_project', component: () => import('./views/db_project.vue'), name: 'database_project'},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
