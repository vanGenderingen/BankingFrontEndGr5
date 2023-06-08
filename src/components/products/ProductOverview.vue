<template>
  <Header title="What Red Bank has to offer"></Header>
    <!-- Two containers side by side -->
    <div class="containers">
      <!-- Container 1 -->
      <div class="container">
        <product-container
            image-source="/src/assets/images/currentProductPhoto.jpg"
            title="Debit Accounts"
            description="Pay with your own debit card, fast, secure and simple"
        ></product-container>
      </div>

      <!-- Container 2 -->
      <div class="container">
        <product-container
            image-source="/src/assets/images/savingsProductPhoto.jpg"
            title="Savings Accounts"
            description="Save money with our record braking interest rates"
        ></product-container>
      </div>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ProductContainer from "@/components/products/ProductContainer.vue";

export default {
  name: "ProductOverview",
  components: {
    ProductContainer,
    Header
  }
}
</script>

<style scoped>
.containers {
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
</style>