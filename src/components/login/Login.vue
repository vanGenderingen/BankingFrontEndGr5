<template>
  <div class="login">
    <h2 class="h2-login">Login</h2>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Log in</button>
    </form>
  </div>

  <div class="square-container">
  <div class="square"></div>
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

.h2-login {    
    color: white;
}

.login {
  max-width: 33%;
  margin-top: 5%;
  margin-left: 33%;
  text-align: center;

}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  width: 50%;
  text-align: center;
    margin-left: 25%;
}

button {
    width: 25%;
  background-color: #6f00ff;
  color: #fff;
  text-align: center;
  margin-left: 50%;
  border: none;
  cursor: pointer;
}
</style>

