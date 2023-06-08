<template>
  <div class="homepage">
    <Header title="Welcome to the Red Bank"></Header>
    <div class="grid">
      <div class="text-block block1">
        <h2 classs="h2-home">Block 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div class="text-block block2">
        <h2>Block 2</h2>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div class="text-block block3">
        <h2>Block 3</h2>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "Home",
  components:{
    Header
  }
};
</script>

<style>
h1 {
  font-size: 100px;
}
h2{

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

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  margin-top: 100px;
  padding: 0 150px;
}

.text-block {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 20px;
  border-radius: 20px;
}

.block1 {
  grid-column: 1;
  grid-row: 1 / span 2;
}

.block2 {
  grid-column: 2 / span 2;
  grid-row: 1;
}

.block3 {
  grid-column: 2 / span 2;
  grid-row: 2;
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