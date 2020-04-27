<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300;900&display=swap");

:root {
  --dark: #232323;
  --light: #dedede;
  --red: #bb4935;
  --hover-red: #a2301c;
  --font: "Rubik", sans-serif;
}

.btn-custom {
  background-color: var(--red);
  color: var(--light);
  transition: all 0.5s ease;
}

.btn-custom:hover {
  color: var(--light);
  background-color: var(--hover-red);
}
</style>
