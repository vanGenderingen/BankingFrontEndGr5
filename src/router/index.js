import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import ProductOverview from "@/components/products/ProductOverview.vue";
import Login from "@/components/login/Login.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductOverview },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
