<template>
    <div>
      <h1 id="forgot-header">Forgot Password</h1>
      <p class="resetp">Below you can enter the email of the account you want to reset the password</p>
      <p class="resetp">A email will be send to the email-address if there is an account</p>
      <form @submit.prevent="forgotpasswordform">
        <div class="login">
          <div id="login-div">
            <label id="loginlabel" for="email">Email:</label>

          <input  type="email" id="login-input" v-model="email" required>
            </div>
        </div>
        <div class="button">
          <button id="login-button" type="submit">Submit</button>
        </div>
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
        email: '',
        message: '',
        isSuccess: false,
      }
    },
    methods: {
    forgotpasswordform() {
      const requestBody = {
        email: this.email
      };
      let storageemail = this.email;
      sessionStorage.setItem('email', storageemail);
      axios.post('http://localhost:8080/forgot-password', requestBody)
        .then(response => {
          // Handle the response if needed
          this.message = 'Password reset Mail send successfully';
            this.isSuccess = true;
        })
        .catch(error => {
          // Handle the error if needed
          this.message = 'An error occurred. Please try again later.';
          this.isSuccess = false;
        });
    }
  }
  }
  </script>
  <style scoped>
  .creating-account {
    text-align: center;
    width: 40%;
    margin-left: 30%;
    margin-top: 5%;
    border: #fff solid 2px;
    border-radius: 20px;
  }

  #h2-create {
    color: white;
    font-weight: 800;
  }
  #forgot-header {
    color: white;
    font-weight: 800;
    text-align: center;
    padding: 5%;
  }
  #p-login {
    margin: 2%;
    color: white;
    font-weight: 300;
  }
  .resetp{
    color: white;
    font-weight: 300;
    text-align: center;
  }
  .h2-login {
    color: white;
    font-weight: 800;
  }
  #loginlabel{
    color: white;
    font-weight: 800;
  }
  .login {
    max-width: 100%;
    text-align: center;
  }
  #login-div {
    width: 50%;
    margin-left: 25%;
    margin-top: 5%;

  }

  #login-form {
    display: flex;
    flex-direction: column;
  }

  #login-input {
    margin-bottom: 10px;
    width: 50%;
    text-align: center;
    margin-left: 25%;
    border: 1px solid #fff;
    border-radius: 10px;
  }

  #login-button {

    background-color: #6f00ff;
    color: #fff;
    text-align: center;
    /* width: 10%; */
    /* margin-right: -5%; */
    border: 1px solid #6f00ff;
    border-radius: 10px;
    cursor: pointer;
  }
  .button{
    padding-top: 10%;
    padding-left: 15%;
    padding-right: 15%;
  }
  .success {
    color: green;
    font-weight: bold;
  }

  .error {
    color: white;
    font-weight: bold;
  }
  </style>