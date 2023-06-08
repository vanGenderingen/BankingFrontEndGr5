<template>
    <tr class="user-item" @click="navigateToUser">
      <td class="user-cell">{{ user.UserID }}</td>
      <td class="user-cell">{{ user.FirstName }}</td>
      <td class="user-cell">{{ user.LastName }}</td>
      <td class="user-cell">{{ user.Email }}</td>
      <td class="user-cell">{{ user.Role ? 'User' : 'Employee' }}</td>
      <td class="user-cell">{{ user.Active ? 'Active' : 'Inactive' }}</td>
      <td class="user-cell">{{ user.TransactionLimit }}</td>
      <td class="user-cell">{{ user.DailyLimit }}</td>
    </tr>
  </template>
  
  
  <script>
  export default {
    name: "UsersListItem",
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    methods: {
      navigateToUser() {
        
        this.$router.push(`/users`);
      },
    getAccountsLink(userId) {
      return `/accounts/user/${userId}/accounts`;
    }
  
    }
  }
  </script>
  
  <style scoped>
  .account-item {
    font-size: 20px;
    text-align: left;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
  }
  
  .account-cell {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 8px;
  }
  </style>