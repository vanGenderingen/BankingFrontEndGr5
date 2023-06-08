<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
        try {
            const response = await axios.post('http://localhost:8080/login', {
            email: this.email,
            password: this.password
            });
            
            if(response.status === 200) {
                console.log('Logged in successfully');
                this.$router.push('/login');
            }
            else {
                 console.log('Wrong email or password');
            }
        } catch (error) {
            console.log(error);
        }
    }
  }
};
</script>

<style>
input {
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
</style>

