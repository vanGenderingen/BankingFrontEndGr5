<template>
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
          <!-- add a router link to the user's accounts page (don't use the a tag!) -->
          <router-link :to="`/accounts/user/${userId}/accounts`" class="nav-link" active-class="active">My Accounts</router-link>
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

export default {
  name: "Navigation",
  data() {
    return {
      userRole: '',
    }
  },
  mounted() {
    let token = sessionStorage.getItem('token');
    try {
      const decodedToken = VueJwtDecode.decode(token);
      const hasEmployeeRole = decodedToken.auth.some(auth => auth.role === 'ROLE_EMPLOYEE');

      if (hasEmployeeRole) {
        this.userRole = 'ROLE_EMPLOYEE';
        this.userId = decodedToken.sub; // Set the userId property to the decoded user ID
      } else {
        this.userRole = 'ROLE_USER';
        this.userId = decodedToken.sub; // Set the userId property to the decoded user ID
      }
    } catch (err) {
      console.log('Token is null: ', err);
    }
  }
};
</script>

<style>
</style>