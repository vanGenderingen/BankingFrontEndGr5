<template>
  <div>
    <div class="create-transaction">
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <h2>Make a transfer</h2>
      <form @submit.prevent="createTransaction">
        <div class="form-group">
          <label for="transaction-type">Transaction Type:</label>
          <select id="transaction-type" v-model="type" @change="updateFieldsVisibility">
            <option value="Transfer">Transfer</option>
            <option value="Withdrawal">Withdrawal</option>
            <option value="Deposit">Deposit</option>
          </select>
        </div>
        <div class="form-group" v-if="showFromIBANField">
          <label for="fromIBAN">From account:</label>
          <input type="string" id="fromIBAN" :disabled="!isAdmin" v-model="transaction.fromIBAN" required />
        </div>
        <div class="form-group" v-if="showToIBANField">
          <label for="toIBAN">To account:</label>
          <input type="text" id="toIBAN" :disabled="!showFromIBANField" v-model="transaction.toIBAN" required />
        </div>
        <div class="form-group">
          <label for="amount">Amount:</label>
          <input type="number" min="0.00" vue-number-format id="amount" v-model="transaction.amount"
            required />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input type="string" id="description" v-model="transaction.description" required />
        </div>
        <button id="create-button" type="submit">Transfer</button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from "axios";
import router from "@/router";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "CreateTransaction",
  components: {
    Header,
  },
  data() {
    return {
      errorMessage: null,
      account: {},
      accountID: this.$route.params.accountId,
      showToIBANField: true,
      showFromIBANField: true,
      type: "Transfer",
      transaction: {
        fromIBAN: "",
        toIBAN: "",
        amount: null,
        description: "",
      },
      isAdmin: false,
    };
  },
  methods: {
    fetchAccount() {
      const url = `http://localhost:8080/accounts/${this.accountID}`;

      const token = sessionStorage.getItem("token");

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.account = response.data;
          this.transaction.fromIBAN = response.data.IBAN;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          console.error("Error retrieving account:", error);
        });
    },
    createTransaction() {
      const url = `http://localhost:8080/transactions`;

      const token = sessionStorage.getItem("token");

      const createTransactionDTO = {
        fromIBAN: this.transaction.fromIBAN,
        toIBAN: this.transaction.toIBAN,
        amount: this.transaction.amount,
        transactionType: this.type,
        description: this.transaction.description,
      };

      axios
        .post(url, createTransactionDTO, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Transaction created:", response.data);
          router.push(`/accounts/${this.accountID}`);
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          console.error("Error retrieving account:", error);
        });
    },
    updateFieldsVisibility() {
      if (
        this.type === "Withdrawal"
      ) {
        this.showToIBANField = false;
        this.showFromIBANField = true;
        this.transaction.fromIBAN = this.account.IBAN;
        this.transaction.toIBAN = "NL01INHO0000000001";
      } else if (this.type === "Deposit") {
        this.showToIBANField = true;
        this.showFromIBANField = false;
        this.transaction.toIBAN = this.account.IBAN;
        this.transaction.fromIBAN = "NL01INHO0000000001";
        this.maxAmount = 999999999999;
      } else {
        this.showToIBANField = true;
        this.showFromIBANField = true;
      }
    },
  },
  mounted() {
    this.fetchAccount();

    let token = sessionStorage.getItem("token");
    try {
      const decodedToken = VueJwtDecode.decode(token);
      const hasEmployeeRole = decodedToken.auth.some(
        (auth) => auth.role === "ROLE_EMPLOYEE"
      );

      if (hasEmployeeRole) {
        this.isAdmin = true;
      }
    } catch (err) {
      this.errorMessage = "Something went wrong. Please try again later.";
      console.log("Token is null: ", err);
    }
  },
};
</script>
