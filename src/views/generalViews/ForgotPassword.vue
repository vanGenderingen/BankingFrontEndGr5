<template>
    <div>
      <h1>Forgot Password</h1>
      <form @submit.prevent="forgotpasswordform">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        email: ''
      }
    },
    methods: {
    forgotpasswordform() {
      const requestBody = {
        email: this.email
      };

      axios.post('http://localhost:8080/forgot-password', requestBody)
        .then(response => {
          // Handle the response if needed
          console.log('Email sent successfully');
        })
        .catch(error => {
          // Handle the error if needed
          console.error('Failed to send email');
        });
    }
  }
  }
  </script>