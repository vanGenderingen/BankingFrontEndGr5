import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue';
import ProductOverview from "@/components/products/ProductOverview.vue";
import Login from "@/components/login/Login.vue";
import UserAccountsOverview from "@/components/accounts/userAccountsOverview/UserAccountsOverview.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductOverview },
  { path: '/login', component: Login },
  { path: '/accounts/user/{userId}/accounts', component: UserAccountsOverview }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
