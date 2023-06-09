<template>
  <div>
    <Header title="Creating a new User"></Header>
    <div class="create-user">
      <h2>User Credentials</h2>
      <form @submit.prevent="createUser">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="user.firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="user.lastName" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
        <div class="form-group">
          <label for="role">Role:</label>
          <select type="text" id="role" v-model="user.role" required>
            <option value="User">User</option> <!-- Update value to "USER" -->
            <option value="Employee">Employee</option> <!-- Update value to "EMPLOYEE" -->
        </select>
        </div>
        <div class="form-group">
          <label for="transactionLimit">Transaction Limit:</label>
          <input type="number" id="transactionLimit" v-model="user.transactionLimit" required />
        </div>
        <div class="form-group">
          <label for="dailyLimit">Daily Limit:</label>
          <input type="number" id="dailyLimit" v-model="user.dailyLimit" required />
        </div>
        <div class="form-actions">
          <button type="submit">Create</button>
          <button type="button" @click="cancel">Go back</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "axios";

export default {
  name: "CreateUser",
  components: {
    Header,
  },
  data() {
    return {
      user: { 
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "User", 
        transactionLimit: 1000,
        dailyLimit: 250,
      }
    };
  },
  methods: {
    createUser() {
      const createUserDTO = {
        FirstName: this.user.firstName,
        LastName: this.user.lastName,
        Email: this.user.email,
        Password: this.user.password,
        Role: this.user.role,
        TransactionLimit: this.user.transactionLimit,
        DailyLimit: this.user.dailyLimit
      };

      axios
        .post('http://localhost:8080/users', createUserDTO)
        .then(response => {
          console.log('User created:', response.data);
          this.$router.push("/users");
        })
        .catch(error => {
          console.error('Error creating user:', error.response.data);
          
        });
    },
    cancel() {
      this.$router.push("/users");
    },
  },
};
</script>

<style scoped>
.create-user {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: #ffffff solid 3px;
  border-radius: 5%;
}

.create-user h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
}

.create-user form {
  display: flex;
  flex-direction: column;
  color: #ffffff;
}

.create-user .form-group {
  margin-bottom: 10px;
}

.create-user label {
  font-weight: bold;
}

.create-user input[type="email"],
.create-user input[type="text"],
.create-user input[type="password"],
.create-user input[type="number"],
.create-user select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.create-user .form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.create-user .form-actions button {
  margin-left: 10px;
  background-color: #6f00ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-user .form-actions button:last-child {
  background-color: #323f77;
}
</style>
