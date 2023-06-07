<template>
  <div class="container">
    <div class="container-image" :style="{ backgroundImage: 'url(' + imageSource + ')' }"></div>
    <div class="container-text">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <button>Explore this option</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductContainer",
  props: {
    imageSource: String,
    title: String,
    description: String
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.container-image {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
}

.container-text {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  padding: 20px;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
}

button {
  background-color: #2196f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}
</style>