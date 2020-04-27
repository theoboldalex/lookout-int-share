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
  --font: "Rubik", sans-serif;
}
</style>
