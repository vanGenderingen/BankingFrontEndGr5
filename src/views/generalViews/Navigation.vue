<template>
  <MyComponent :key="navKey"/>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <!-- Add a router link to the homepage (don't use the a tag!) -->
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <!-- add a router link to the products page (don't use the a tag!) -->
          <router-link to="/products" class="nav-link" active-class="active">Products</router-link>
        </li>
        <li class="nav-item"  v-if="userRole === 'ROLE_USER' || userRole === 'ROLE_EMPLOYEE'">
          <!-- Add a router link to the user's accounts page (don't use the a tag!) -->
          <router-link :to="`/accounts/user/${userID}/accounts`" class="nav-link" active-class="active" @click="updateComponent">My Accounts</router-link>
        </li>
        <li class="nav-item" v-if="userRole === 'ROLE_EMPLOYEE'">
          <!-- add a router link to the all users page (don't use the a tag!) -->
          <router-link to="/users" class="nav-link" active-class="active">All Users</router-link>
        </li>
        <li class="nav-item" v-if="userRole === 'ROLE_EMPLOYEE'">
          <!-- add a router link to the all accounts page (don't use the a tag!) -->
          <router-link to="/accounts" class="nav-link" active-class="active">All Accounts</router-link>
        </li>
        <li class="nav-item">
          <!-- add a router link to the login page (don't use the a tag!) -->
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import eventBus from "@/components/EventBus.vue";
export default {
  name: "Navigation",
  data() {
    return {
      userRole: '',
      userID: '',
      loggedIn: false,

      navKey: 0,
    }
  },
  created() {
    eventBus.on('login', () => {
      this.loggedIn = true;
    });
  },
  methods: {
    updateComponent() {
      this.navKey++;
    },
  },
  mounted() {
    //TODO: ONCE NEW LOGIN REFRESH TOKEN THATS HERE
    let token = sessionStorage.getItem('token');
    try {
      const decodedToken = VueJwtDecode.decode(token);
      const hasEmployeeRole = decodedToken.auth.some(auth => auth.role === 'ROLE_EMPLOYEE');
      this.userID = decodedToken.sub;

      if (hasEmployeeRole) {
        this.userRole = 'ROLE_EMPLOYEE';
      } else {
        this.userRole = 'ROLE_USER';
      }
    } catch (err) {
      console.log('Token is null: ', err);
    }
  }
};
</script>

<style>
</style>