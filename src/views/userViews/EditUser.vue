<template>
  <div>
    <Header :title="`Edit User: ${user.FirstName}`"></Header>
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
              <label for="password">Password:</label>
              <input
                v-model="user.Password"
                type="password"
                id="password"
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
      user: {},
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
  border: 3px solid #ffffff;
  border-radius: 5px;
  margin-bottom: 20px;
}

.user-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: white;
}

.form-control {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
