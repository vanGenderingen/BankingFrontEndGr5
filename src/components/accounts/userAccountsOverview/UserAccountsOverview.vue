<template>
  <div>
    <Header title="Your Accounts"></Header>
    <div class="account-overview">
      <table class="account-table">
        <thead>
        <tr>
          <th class="account-table-head"><h2>IBAN</h2></th>
          <th class="account-table-head"><h2>Type</h2></th>
          <th class="account-table-head"><h2>Balance</h2></th>
          <th class="account-table-head"><h2>Minimum Balance needed to perform transactions</h2></th>
          <th class="account-table-head"><h2>Status</h2></th>
        </tr>
        </thead>
        <tbody>
        <AccountListItem v-for="account in accounts" :key="account.AccountID" :account="account" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AccountListItem from '@/components/accounts/AccountListItem.vue';
import axios from 'axios';
import Header from "@/components/Header.vue";
export default {
  name: "UserAccountsOverview",
  components: {
    Header,
    AccountListItem
  },
  data() {
    return {
      accounts: []
    };
  },
  mounted() {
    const userId = '8b5839e9-fad0-4695-8bdd-c1cd863e6b02'; // Replace with the actual user ID
    const url = `http://localhost:8080/accounts/user/${userId}/accounts`;

    axios
        .get(url)
        .then(response => {
          this.accounts = response.data;
        })
        .catch(error => {
          console.error('Error retrieving accounts:', error);
        });
  }
};
</script>

<style scoped>
.account-table {
  width: calc(100% - 300px); /* Adjust the value based on your requirements */
  margin: 0 auto;
  color: white;
  border-collapse: collapse;
}
.account-table-head {
  padding-left: 8px;
  padding-top: 10px;
  background-color: #f2f2f2;
  color: black;
}
</style>