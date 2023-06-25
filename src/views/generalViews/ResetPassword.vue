<template>
    <div>
      <h2>Reset Password</h2>
      <form @submit.prevent="submitForm">
        <label>Email:</label>
        <input type="email" v-model="email" required>
        <br>
        <label>New Password:</label>
        <input type="password" v-model="newPassword" required>
        <br>
        <label>Confirm Password:</label>
        <input type="password" v-model="confirmPassword" required>
        <br>
        <button type="submit">Reset Password</button>
      </form>
      <div v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        message: '',
        isSuccess: false,
      };
    },
    methods: {
      async submitForm() {
        if (this.newPassword !== this.confirmPassword) {
          this.message = 'Passwords do not match';
          this.isSuccess = false;
          return;
        }
        const queryParams = new URLSearchParams(window.location.search);
        const request = {
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
          email: this.email,
          token : queryParams.get('token')
        };
  
        try {
          const response = await axios.post('http://localhost:8080/reset-password', request);
          if (response.status === 200) {
            this.message = 'Password reset successfully';
            this.isSuccess = true;
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.message = 'Passwords do not match';
            this.isSuccess = false;
          } else {
            this.message = 'An error occurred. Please try again later.';
            this.isSuccess = false;
          }
        }
      },
    },
  };
  </script>
  
  <style>
  .success {
    color: green;
  }
  
  .error {
    color: red;
  }
  </style>
  