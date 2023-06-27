<template>
    <div class="container">
      <h2 id="resetheader">Reset Password</h2>
      <p class="resetp">Below you can enter the email of the account you want to reset the password</p>
      <p class="resetp">Then a new password and then you repeat the password</p>
      <form @submit.prevent="submitForm">
        <label class="label">Email:</label>
        <input id="login-input" type="email" v-model="email" required>
        <br>
        <label class="label">New Password:</label>
        <input id="login-input" type="password" v-model="newPassword" required>
        <br>
        <label class="label">Confirm Password:</label>
        <input id="login-input" type="password" v-model="confirmPassword" required>
        <br>
        <button id="login-button" type="submit">Reset Password</button>
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
  .container{
    display: flex;
  justify-content: center;
  align-items: center;
  }
  .success {
    color: green;
    font-weight: bold;
  }
  
  .error {
    color: white;
    font-weight: bold;
  }
  .label{
    color: white;
    font-weight: bold;
    display: inline-block;
    margin-right: 10px; 
  }
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

#p-login {
  margin: 2%;
  color: white;
  font-weight: 300;
}

.h2-login {
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
  text-align: center;
  margin-left: 25%;
  border: 1px solid #fff;
  border-radius: 10px;
  float: right;
}

#login-button {
 
  background-color: #6f00ff;
  color: #fff;
  text-align: center;
  width: 50%;
  margin-left: 25%;
  border: 1px solid #6f00ff;
  border-radius: 10px;
  cursor: pointer;
}
#resetheader{
  color: white;
  font-weight: bold;
  text-align: center;
  margin: 5%;
}
.resetp{
    color: white;
    font-weight: 300;
    text-align: center;
  }
  </style>
  