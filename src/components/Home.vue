<template>
  <div class="homepage">
    <div class="logo">
      <img src="/src/assets/images/logo-redbank.png" alt="Logo" />
      <div class="welcome-text">
        <h1>Welcome to the Red Bank</h1>
      </div>
    </div>
    <div class="content">
      <div class="grid">
        <div class="text-block block1">
          <h2>Block 1</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="text-block block2">
          <h2>Block 2</h2>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="text-block block3">
          <h2>Block 3</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="text-block block4">
          <h2>Block 4</h2>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="text-block block5">
          <h2>Block 5</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="text-block block6">
          <h2>Block 6</h2>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
};
</script>

<style>
h1 {
  font-size: 100px;
}

h2 {
  font-size: 100px;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(45deg, #ca0426 0%, #b0328b 100%);
}

.homepage {
  min-height: 100%;
  display: flex;
  flex-direction: column;
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

.welcome-text {
  display: flex;
  align-items: center;
  margin-left: 100px;
  color: white;
  text-align: center;
}

.content {
  display: flex;
  justify-content: center;
  padding: 0 150px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px;
}

.text-block {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 20px;
}

.block1 {
  border-radius: 0 30px 0 30px;
  transform: skewX(-10deg);
  grid-column: 1 / span 2;
}

.block2 {
  border-radius: 30px 0 30px 0;
  transform: skewX(10deg);
  grid-column: 2 / span 2;
}

.block3 {
  border-radius: 0 30px 0 30px;
  transform: skewX(-10deg);
  grid-column: 1 / span 2;
}

.block4 {
  border-radius: 30px 0 30px 0;
  transform: skewX(10deg);
  grid-column: 2 / span 2;
}

.block5 {
  border-radius: 0 30px 0 30px;
  transform: skewX(-10deg);
  grid-column: 1 / span 2;
}

.block6 {
  border-radius: 30px 0 30px 0;
  transform: skewX(10deg);
  grid-column: 2 / span 2;
}

.text-block h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.text-block p {
  font-size: 16px;
  line-height: 1.4;
}
</style>