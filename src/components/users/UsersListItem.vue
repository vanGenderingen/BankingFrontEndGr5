<template>
  <tr class="user-item" @click="navigateToUser">
    <td class="user-cell">{{ user.UserID }}</td>
    <td class="user-cell">{{ user.FirstName }}</td>
    <td class="user-cell">{{ user.LastName }}</td>
    <td class="user-cell">{{ user.Email }}</td>
    <td class="user-cell">
      <ul>
        <li v-for="role in user.Roles" :key="role">{{ role }}</li>
      </ul>
    </td>
    <td class="user-cell">{{ user.Active ? "Active" : "Inactive" }}</td>
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
      required: true,
    },
  },
  methods: {
    navigateToUser() {
      this.$router.push(`/users`);
    },
  },
};
</script>

<style scoped>
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
