<template>
  <div>
    <Header :title="`Edit User: ${user.FirstName + user.LastName}`"></Header>
    <div class="container">
      <div class="content">
        <div class="user-info">
          <div class="user-details">
            <div class="form-group">
              <label for="first-name">First Name:</label>
              <input
                v-model="user.FirstName"
                type="text"
                id="first-name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="last-name">Last Name:</label>
              <input
                v-model="user.LastName"
                type="text"
                id="last-name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input v-model="user.Email" type="email" id="email" class="form-control" />
            </div>
            <div class="form-group">
              <label for="role">Role:</label>
              <select v-model="user.Role" id="role" class="form-control">
                <option value="User">User</option>
                <option value="Employee">Employee</option>
                <!-- Add more role options if needed -->
              </select>
            </div>
            <div class="form-group">
              <label for="active">Active:</label>
              <input
                v-model="user.Active"
                type="checkbox"
                id="active"
                class="form-boxl"
              />
            </div>
            <div class="form-group">
              <label for="transaction-limit">Transaction Limit:</label>
              <input
                v-model="user.TransactionLimit"
                type="number"
                id="transaction-limit"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="daily-limit">Daily Limit:</label>
              <input
                v-model="user.DailyLimit"
                type="number"
                id="daily-limit"
                class="form-control"
              />
            </div>
            <!-- Add more form inputs for other properties -->
          </div>
        </div>
        <div class="actions">
          <button @click="updateUser" class="btn btn-primary">Update User</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from "axios";

export default {
  name: "EditUser",
  components: {
    Header,
  },
  data() {
    return {
      userID: this.$route.params.userId,
      user: {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        Active: false,
        TransactionLimit: 0,
        DailyLimit: 0,
        Role: "User", // Set the default role value here
      },
    };
  },
  methods: {
    fetchUser() {
      const url = `http://localhost:8080/users/${this.userID}`;
      axios
        .get(url)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Error retrieving user:", error);
        });
    },
    updateUser() {
      const url = `http://localhost:8080/users/${this.userID}`;
      axios
        .put(url, this.user)
        .then((response) => {
          console.log("User updated successfully:", response.data);
          // You can redirect to a different page or perform other actions here
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          // Handle error
        });
    },
  },
  mounted() {
    this.fetchUser();
  },
};
</script>

<style>
.container {
  width: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  flex: 1;
}

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: #ffffff solid 3px;
  border-radius: 5%;
}

.user-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.form-group {
  margin-bottom: 10px;
}

.form-control {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.btn-primary:active {
  background-color: #0062cc;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}
</style>
