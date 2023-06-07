import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import ProductOverview from "@/components/products/ProductOverview.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductOverview },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
