import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/generalViews/Home.vue';

import ProductOverview from "@/views/generalViews/ProductOverview.vue";
import Login from "@/views/generalViews/Login.vue";
import UsersOverview from "@/views/userViews/UsersOverview.vue";
import UserAccountsOverview from '@/views/accountViews/UserAccountsOverview.vue';
import GetAllAccounts from "@/views/accountViews/getAllAccounts.vue";
import SingleAccount from "@/views/accountViews/SingleAcountOverview.vue";
import CreateAccount from "@/views/accountViews/CreateAccount.vue";
import CreateUser from '@/views/userViews/CreateUser.vue';
import UserOverview from '@/views/userViews/UserOverview.vue';
import EditUser from '@/views/userViews/EditUser.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductOverview },
  { path: '/login', component: Login },
  { path: '/users', component: UsersOverview },
  { path: '/accounts', component: GetAllAccounts},
  { path: '/accounts/:accountId', component: SingleAccount},
  { path: '/accounts/user/:userId/accounts', component: UserAccountsOverview },
  { path: '/users/:userId/createAccount', component: CreateAccount },
  { path: '/accounts/user/:userId/accounts', component: UserAccountsOverview },
  { path: '/users/create', component: CreateUser },
  { path: '/users/:userId', component: UserOverview },
  { path: '/users/:userId/edit', component: EditUser },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;