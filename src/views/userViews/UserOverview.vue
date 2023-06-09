<template>
  <div>
    <Header :title="`User: ${user.FirstName + user.LastName}`"></Header>
    <div class="container">
      <div class="content">
        <div class="user-info">
          <div class="user-details">
            <div class="label"><h2>Name:</h2></div>
            <div class="value">
              <h2>{{ user.FirstName + " " + user.LastName }}</h2>
            </div>
             <div class="label"><h2>Email:</h2></div>
            <div class="value">
              <h2>{{ user.Email }}</h2>
            </div>
            <div class="label"><h2>Roles:</h2></div>
            <div class="value">
              <h2>{{ user.Roles }}</h2>
            </div>
            <div class="label"><h2>Active:</h2></div>
            <div class="value">
              <h2>{{ user.Active }}</h2>
            </div>
            <div class="label"><h2>Transaction Limit:</h2></div>
            <div class="value">
              <h2>{{ user.TransactionLimit }}</h2>
            </div>
            <div class="label"><h2>Daily Limit:</h2></div>
            <div class="value">
              <h2>{{ user.DailyLimit }}</h2>
            </div>
          </div>
          <div id="user-avatar">
            <img src="/src/assets/images/logo-redbank.png" alt="Red Bank Logo" />
          </div>
        </div>
        <div class="account-overview">
          <div class="pagination-and-amount-and-search">
            <div class="pagination-and-amount">
              <div class="amount-info">Amount of accounts to list:</div>
              <div class="dropdown">
                <select
                  v-model="itemsPerPage"
                  @change="updateDisplayedAccounts"
                  class="items-per-page-dropdown"
                >
                  <option
                    v-for="option in availableItemsPerPage"
                    :value="option"
                    :key="option"
                  >
                    {{ option }}
                  </option>
                </select>
              </div>
              <div class="pagination">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="pagination-button"
                >
                  Previous Page
                </button>
                <div class="pagination-info">Current Page: {{ currentPage }}</div>
                <button
                  @click="nextPage"
                  :disabled="!hasMoreAccounts"
                  class="pagination-button"
                >
                  Next Page
                </button>
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
          <table class="account-table">
        <thead>
          <tr>
            <th class="account-table-head"><h2>IBAN</h2></th>
            <th class="account-table-head"><h2>Account Name</h2></th>
            <th class="account-table-head"><h2>Type</h2></th>
            <th class="account-table-head"><h2>Balance</h2></th>
            <th class="account-table-head">
              <h2>Minimum Balance</h2>
            </th>
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
    </div>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from "axios";
import AccountListItem from "@/components/accounts/AccountListItem.vue";

export default {
  name: "SingleUser",
  components: {
    Header,
    AccountListItem,
  },
  data() {
    return {
      userID: this.$route.params.userId,
      user: {},
      currentPage: 1,
      itemsPerPage: 10,
      availableItemsPerPage: [10, 20, 30],
      searchQuery: "",
      accounts: [],
      displayedAccounts: [],
    };
  },
  methods: {
    fetchUser() {
      const url = `http://localhost:8080/users/${this.userID}`;
      axios
        .get(url)
        .then((response) => {
          this.user = response.data;
          this.fetchAccounts();
        })
        .catch((error) => {
          console.error("Error retrieving user:", error);
        });
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchAccounts();
      }
    },
    nextPage() {
      if (this.hasMoreAccounts) {
        this.currentPage++;
        this.fetchAccounts();
      }
    },
    updateDisplayedAccounts() {
      this.currentPage = 1;
      this.fetchAccounts();
    },
    fetchAccounts() {
  const limit = this.itemsPerPage;
  const offset = (this.currentPage - 1) * this.itemsPerPage;
  const searchstrings = this.searchQuery ? this.searchQuery.split(" ") : undefined;

  const url = `http://localhost:8080/accounts/user/${this.userID}/accounts`;
  const params = { limit, offset, searchstrings };
  axios
    .get(url, { params })
    .then((response) => {
      this.accounts = response.data;
      this.displayedAccounts = this.accounts.slice(0, this.itemsPerPage); // Add this line to update the displayed accounts
    })
    .catch((error) => {
      console.error("Error retrieving accounts:", error);
    });
},
  },
  mounted() {
    this.fetchUser();
  },
  computed: {
    displayedAccounts() {
      return this.accounts.slice(0, this.itemsPerPage);
    },
    hasMoreAccounts() {
      return this.accounts.length > this.itemsPerPage * this.currentPage;
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

.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 20px;
  border: #ffffff solid 3px;
  border-radius: 5%;
}

.user-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.label {
  font-weight: bold;
}

#user-avatar img {
  margin-left: 150px;
  width: 200px;
  height: 200px;
}

.account-table {
  color: white;
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.account-overview {
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
  content: "";
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
  flex: 1;
  border: none;
  margin-right: 10px;
  background-color: transparent;
  color: white;
  outline: none;
}

.search-input::placeholder {
  color: white;
}

.account-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.account-table-head {
  padding-left: 8px;
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
