<template>
    <div>
      <Header title="Users"></Header>
      <div class="users-overview">
        <table class="user-table">
          <thead>
            <tr>
              <th class="user-table-head"><h2>UserID</h2></th>
              <th class="user-table-head"><h2>FirstName</h2></th>
              <th class="user-table-head"><h2>LastName</h2></th>
              <th class="user-table-head"><h2>Email</h2></th>
              <th class="user-table-head"><h2>Role</h2></th>
              <th class="user-table-head"><h2>Active</h2></th>
              <th class="user-table-head"><h2>TransactionLimit</h2></th>
              <th class="user-table-head"><h2>DailyLimit</h2></th>
            </tr>
          </thead>
          <tbody>
            <UsersListItem
              v-for="user in users"
              :key="user.UserID"
              :user="user"
            ></UsersListItem>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import UsersListItem from '@/components/users/UsersListItem.vue';
  import axios from 'axios';
  import Header from "@/components/Header.vue";
  
  export default {
    name: "UsersOverview",
    components: {
      Header,
      UsersListItem
    },
    data() {
      return {
        users: []
      };
    },
    methods: {
      fetchUsers() {
        const url = 'http://localhost:8080/users';
  
        axios
          .get(url)
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error('Error retrieving users:', error);
          });
      }
    },
    mounted() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .user-table {
    width: calc(100% - 300px); /* Adjust the value based on your requirements */
    margin: 0 auto;
    color: white;
    border-collapse: collapse;
  }
  
  .user-table-head {
    padding-left: 8px;
    padding-top: 10px;
    background-color: #f2f2f2;
    color: black;
  }
  
  .users-overview {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  
  .user-item {
    font-size: 20px;
    text-align: left;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
  }
  
  .user-cell {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 8px;
  }
  </style>
  