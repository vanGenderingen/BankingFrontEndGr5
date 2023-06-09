<template>
  <Header :title="`Account: ${account.IBAN}`"></Header>
  <div class="container">
    <div class="content">
      <div class="account-info">
        <div class="account-details">
          <div class="label"><h2>Account Name:</h2></div>
          <div class="value"><h2>{{ account.Name }}</h2></div>
          <div class="label"><h2>Balance:</h2></div>
          <div class="value"><h2>{{ account.Balance }}</h2></div>
          <div class="label"><h2>Account Type:</h2></div>
          <div class="value"><h2>{{ account.Type }}</h2></div>
          <div class="label"><h2>Minimum Balance:</h2></div>
          <div class="value"><h2>{{ account.MinBal }}</h2></div>
        </div>
        <div id="account-logo">
          <img src="/src/assets/images/logo-redbank.png" alt="Logo" />
        </div>
      </div>
      <div class="transaction-overview">
        <div class="pagination-and-amount-and-search">
          <div class="pagination-and-amount">
            <div class="amount-info">Amount of items to list: </div>
            <div class="dropdown">
              <select v-model="itemsPerPage" @change="updateDisplayedTransactions" class="items-per-page-dropdown">
                <option v-for="option in availableItemsPerPage" :value="option" :key="option">{{ option }}</option>
              </select>
            </div>
            <div class="pagination">
              <button @click="previousPage" :disabled="currentPage === 1" class="pagination-button">Previous Page</button>
              <div class="pagination-info">
                Current Page: {{ currentPage }}
              </div>
              <button @click="nextPage" class="pagination-button">Next Page</button>
            </div>
          </div>
          <div class="search-bar">
            <input
                type="text"
                v-model="searchQuery"
                @input="search"
                placeholder="Search"
                class="search-input"
            />
          </div>
        </div>
        <table class="transaction-table">
          <thead>
          <tr>
            <th class="transaction-table-head"><h2>Date</h2></th>
            <th class="transaction-table-head"><h2>Description</h2></th>
            <th class="transaction-table-head"><h2>Type</h2></th>
            <th class="transaction-table-head"><h2>amount</h2></th>
          </tr>
          </thead>
          <tbody>
          <transaction-list-item
              v-for="transaction in displayedTransactions"
              :key="transaction.transactionID"
              :transaction="transaction"
          ></transaction-list-item>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from "axios";
import TransactionListItem from "@/components/accounts/TransactionListItem.vue";

export default {
  name: "SingleAccount",
  components: {
    Header,
    TransactionListItem
  },
  data() {
    return {
      accountID: this.$route.params.accountId,
      account: {},

      currentPage: 1,
      itemsPerPage: 10,
      availableItemsPerPage: [10, 20, 30],
      searchQuery: "",
      transactions: [],
      displayedTransactions: [],
    };
  },
  methods: {
    fetchAccount() {
      const url = `http://localhost:8080/accounts/${this.accountID}`;
      axios
          .get(url)
          .then((response) => {
            this.account = response.data;
            this.fetchTransactions();
          })
          .catch((error) => {
            console.error("Error retrieving account:", error);
          });
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchTransactions();
      }
    },
    nextPage() {
      if (this.displayedTransactions.length > 0) {
        this.currentPage++;
        this.fetchTransactions();
      }
    },
    updateDisplayedTransactions() {
      this.currentPage = 1;
      this.fetchTransactions();
    },
    fetchTransactions() {
      const limit = this.itemsPerPage;
      const offset = this.currentPage - 1;
      const searchstrings = this.searchQuery | undefined;

      const url = `http://localhost:8080/transactions?IBAN=${this.IBAN}`;
      const params = { limit, offset, searchstrings };
      axios
          .get(url, { params })
          .then((response) => {
            this.transactions = response.data;
          })
          .catch((error) => {
            console.error("Error retrieving transactions:", error);
          });
    },
    search() {
      // Perform a search when the search query changes
      this.currentPage = 1;
      this.updateDisplayedTransactions();
    },
  },
  mounted() {
    this.fetchAccount();
    this.fetchTransactions();
  },
  computed: {
    displayedTransactions(){
      return this.transactions.slice(0, this.itemsPerPage);
    },
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

.account-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 20px;
  border: #ffffff solid 3px;
  border-radius: 5%;
}

.account-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.label {
  font-weight: bold;
}

#account-logo img {
  margin-left: 150px;
  width: 200px;
  height: 200px;
}

.transaction-table {
  color: white;
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.transaction-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination-and-amount-and-search {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-and-amount {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3px;
  color: white;
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
.pagination {
  margin-left: 40px;
}

.pagination-button {
  display: inline-block;
  position: relative;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: none;
  box-shadow: none;
  margin-left: 10px;
  margin-right: 10px;
}

.pagination-button:hover,
.pagination-button:active {
  background-color: transparent;
}

.pagination-button::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.pagination-button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.search-bar {
  display: flex;
  width: 20%;
  margin-left: 40px;
  border-bottom: 1px solid #ddd;
}

.search-input {
  flex: 1; /* Take up remaining space */
  border: none;
  margin-right: 10px;
  background-color: transparent;
  color: white;
  outline: none;
}

.search-input::placeholder {
  color: white;
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.transaction-table-head {
  padding-left: 48px;
  padding-top: 10px;
  background-color: #f2f2f2;
  color: black;
}

td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
</style>