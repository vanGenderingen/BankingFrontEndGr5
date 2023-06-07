<template>
  <div>
    <!-- Full width image on top -->
    <div class="header-image">
      <h1 class="header-text">What we have to offer</h1>
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

.header-image {
  position: relative;
  height: 30vh; /* 30% of the viewport height */
  background-image: url('@/assets/images/bezigmetbanner.jpg');
  background-size: cover;
  background-position: center;
}

.header-text {
  position: absolute;
  bottom: 20%;
  left: 10%;
  width: 90%;
  color: white;
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