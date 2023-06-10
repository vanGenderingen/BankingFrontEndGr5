<template>
  <div>
    <Header :title="`Edit User: ${user.FirstName} ${user.LastName}`" />
    <div class="container">
      <div class="content">
        <div class="user-info">
          <div id="user-avatar">
            <img src="/src/assets/images/logo-redbank.png" alt="Red Bank Logo" />
          </div>
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
              <label for="active">Active:</label>
              <input v-model="user.Active" type="checkbox" id="active" class="form-box" />
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
          </div>

          <div class="update-button">
            <button @click="updateUser" class="update-btn">
              Update User
            </button>
            <button
              @click="this.$router.push(`/users/${this.user.UserID}`)"
              class="update-btn"
              id="cancel-btn"
            >
              Cancel
            </button>
          </div>
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
      user: {
        FirstName: "",
        LastName: "",
        Email: "",
        Active: false,
        TransactionLimit: 1000,
        DailyLimit: 250,
      },
    };
  },
  methods: {
    fetchUser() {
      const userId = this.$route.params.userId;
      const url = `http://localhost:8080/users/${userId}`;
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
      const userID = this.$route.params.userId;
      const url = `http://localhost:8080/users/${userID}`;

      const updateUserDTO = {
        firstName: this.user.FirstName,
        lastName: this.user.LastName,
        email: this.user.Email,
        active: this.user.Active,
        transactionLimit: this.user.TransactionLimit,
        dailyLimit: this.user.DailyLimit,
      };

      console.log("Updating user:", updateUserDTO);
      axios
        .put(url, updateUserDTO)
        .then((response) => {
          console.log("User updated successfully:", response.data);
          this.$router.push(`/users`);
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
  display: grid;
  align-items: center;
  padding: 20px;
  border: #ffffff solid 3px;
  border-radius: 5%;
}

#user-avatar img {
  margin-left: 25%;
  width: 150px;
  height: 150px;
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

.update-button {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  
}

.update-btn {
  display: inline-block;
  position: relative;
  background-color: #6f00ff;
  color: white;
  border: none;
  cursor: pointer;
  transition: none;
  box-shadow: none;
  width: 70%;
  padding: 5px;
}

.update-btn:hover,
.update-btn:active {
  background-color: #6f00ffbb;
}

.update-btn::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.update-btn:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

#cancel-btn {
  margin-left: 5%;
  background-color: #ff0000;
}

#cancel-btn:hover{
  background-color: #ff000094;
}
</style>
