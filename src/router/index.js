import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';

import ProductOverview from "@/components/products/ProductOverview.vue";
import Login from "@/components/login/Login.vue";
import UsersOverview from "@/components/users/usersOverview/UsersOverview.vue";
import UserAccountsOverview from '@/components/accounts/userAccountsOverview/UserAccountsOverview.vue';
import GetAllAccounts from "@/components/accounts/allAccounts/getAllAccounts.vue";


const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductOverview },
  { path: '/login', component: Login },
  { path: '/users', component: UsersOverview },
  { path: '/accounts', component: GetAllAccounts},
  { path: '/accounts/user/:userId/accounts', component: UserAccountsOverview }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;