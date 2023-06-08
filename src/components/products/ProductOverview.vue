<template>
  <div>
    <div class="logo">
      <img src="/src/assets/images/logo-redbank.png" alt="Logo" />
      <div class="what-we-can-offer-text">
        <h1>What Red Bank can offer you</h1>
      </div>
    </div>

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
  </div>
</template>

<script>
import ProductContainer from "@/components/products/ProductContainer.vue";

export default {
  name: "ProductOverview",
  components: {
    ProductContainer
  }
}
</script>

<style scoped>
h1{
  font-size: 100px;
}

.logo {
  align-content: center;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
}

.logo img {
  width: 250px;
  height: 250px;
}

.what-we-can-offer-text {
  display: flex;
  align-items: center;
  margin-left: 100px;
  color: white;
  text-align: center;
}

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