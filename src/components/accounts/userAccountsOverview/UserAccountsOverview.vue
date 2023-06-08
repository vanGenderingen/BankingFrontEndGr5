<template>
  <div>
    <Header title="Your Accounts"></Header>
    <div class="account-overview">
      <div class="pagination">
        <div class="amount-info">Amount of items to list: </div>
        <div class="dropdown">
          <select v-model="itemsPerPage" @change="updateDisplayedAccounts" class="items-per-page-dropdown">
            <option v-for="option in availableItemsPerPage" :value="option" :key="option">{{ option }}</option>
          </select>
        </div>
        <div class="pagination-info">
          | Page {{ currentPage }} of {{ totalPages }}
        </div>
      </div>
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
        <account-list-item
            v-for="account in displayedAccounts"
            :key="account.AccountID"
            :account="account"
        ></account-list-item>
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
        accounts: [],
        currentPage: 1,
        itemsPerPage: 20,
        availableItemsPerPage: [20, 30, 40, 50],
        searchQuery: '',
        totalAccounts: 0,
        totalPages: 0 // Add totalPages property
      };
    },
    methods: {
      updateDisplayedAccounts() {
        this.currentPage = 1;
        this.fetchAccounts();
      },
      fetchAccounts() {
        const userId = 'c0bf2769-79ef-40ca-8410-0c02652028e0'; // Replace with the actual user ID
        const limit = this.itemsPerPage;
        const offset = (this.currentPage - 1) * this.itemsPerPage;
        const searchstrings = this.searchQuery || undefined;

        const url = `http://localhost:8080/accounts/user/${userId}/accounts`;
        const params = { limit, offset, searchstrings };

        axios
            .get(url, { params })
            .then(response => {
              this.accounts = response.data;

              // Get the total account count from the response headers
              const totalAccounts = parseInt(response.headers['x-total-count'], 10);
              this.totalAccounts = totalAccounts || 0;

              // Get the total number of pages from the response headers
              const totalPages = parseInt(response.headers['x-total-pages'], 10);
              this.totalPages = totalPages || 0;
            })
            .catch(error => {
              console.error('Error retrieving accounts:', error);
            });
      },
  computed: {
    totalPages() {
      return Math.ceil(this.totalAccounts / this.itemsPerPage);
    },
    displayedAccounts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      return this.accounts.slice(startIndex, endIndex);
    }
  },
  watch: {
    currentPage() {
      this.fetchAccounts();
    }
  },
  mounted() {
    this.fetchAccounts();
  }
},
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  color: white;
}

.pagination-info {
  margin-right: 10px;
}

.dropdown {
  position: relative;
}

.items-per-page-dropdown {
  color: white;
  background-color: transparent;
  border: none;
  padding: 5px 10px;
}

.items-per-page-dropdown option {
  color: black;
  background-color: white;
}
</style>