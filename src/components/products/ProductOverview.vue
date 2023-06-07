<template>
  <div>
    <!-- Full width image on top -->
    <div class="header-image">
      <h1 class="header-text">What we have to offer</h1>
    </div>

    <!-- Whitespace -->
    <div class="whitespace"></div>

    <!-- Two containers side by side -->
    <div class="containers">
      <!-- Container 1 -->
      <div class="container">
        <product-container
            image-source="/src/assets/images/currentProductPhoto.jpg"
            title="Debit Accounts"
            description="Text explaining the products"
        ></product-container>
      </div>

      <!-- Container 2 -->
      <div class="container">
        <product-container
            image-source="/src/assets/images/savingsProductPhoto.jpg"
            title="Savings Accounts"
            description="Text explaining the products"
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
.header-image {
  position: relative;
  height: 30vh; /* 30% of the viewport height */
  background-image: url('@/assets/images/bezigmetbanner.jpg');
  background-size: cover;
  background-position: center;
}

.header-text {
  position: absolute;
  bottom: 40%;
  left: 25%;
  width: 50%;
  color: white;
}

.whitespace {
  height: 20px;
}

.containers {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* Adjust the margin-top as needed */
}

.container {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
</style>