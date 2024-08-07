import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ReadMoreView from '../views/ReadMoreView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/read-more',
    name: 'ReadMore',
    component: ReadMoreView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;