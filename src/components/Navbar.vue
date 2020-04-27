<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link :to="{ name: 'Index' }" class="navbar-brand">OSINT : SRC</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav ml-auto">
            <li v-if="!user" class="nav-item">
              <router-link :to="{ name: 'Signup' }" class="nav-link">Signup</router-link>
            </li>
            <li v-if="!user" class="nav-item">
              <router-link :to="{ name: 'Login' }" class="nav-link">Login</router-link>
            </li>
            <li v-if="user" class="nav-item">
              <router-link :to="{ name: 'Profile' }" class="nav-link">{{ user.email }}</router-link>
            </li>
            <li v-if="user" class="nav-item">
              <a @click="logout" class="nav-link">Logout</a>
            </li>
            <li
              v-if="user && this.$route.path == '/' || this.$route.path == '/profile'"
              class="nav-item"
            >
              <router-link :to="{ name: 'CMS' }" class="nav-link">Publish</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {
      user: null
    };
  },

  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "Login" });
        });
    }
  },

  created() {
    //let user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<style>
/* :root {
  --blue-color: #1976d2;
  --grey-color: #757575;
}

* {
  font-family: "Muli", sans-serif;
}

.wrapper {
  height: 75px;
  background: #fff;
}

.nav-container {
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin: 0 10%;
  height: 100%;
}

.right ul li {
  display: inline-block;
  margin-left: 1.4rem;
  z-index: 3;
}

.logo {
  font-size: 2rem;
  font-weight: 900;
}

.logo,
.right ul li a {
  text-decoration: none;
  color: #000;
  cursor: pointer;
}

.right ul li a {
  font-weight: 300;
  transition: 0.3s;
  -webkit-transition: 0.3s;
}

.grey,
.right ul li a:hover {
  color: var(--grey-color);
}

.blue {
  color: var(--blue-color);
} */
</style>
