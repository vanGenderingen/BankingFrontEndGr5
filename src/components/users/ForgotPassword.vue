<template>
    <div>
      <h1>Forgot Password</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: ''
      }
    },
    methods: {
      submitForm() {
        const data = { email: this.email };
        fetch('/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Show success message to user
        })
        .catch(error => {
          console.error(error);
          // Show error message to user
        });
      }
    }
  }
  </script>