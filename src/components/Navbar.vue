<template>
  <div>
    <nav class="navbar navbar-expand-md fixed-top">
      <div class="container">
        <router-link :to="{ name: 'Index' }" class="navbar-brand">
          <img src="@/assets/osint-src-logo.png" alt="logo" height="50px" /> OSINT : SRC
        </router-link>
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
            <li v-if="user" class="nav-item" @click="logout">
              <router-link :to="{ name: 'Login' }" class="nav-link">Logout</router-link>
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

<style scoped>
.navbar {
  background-color: var(--dark);
}

.navbar-brand {
  font-family: var(--font);
  font-weight: 900;
  font-size: 24px;
  color: var(--light);
}

.red {
  color: var(--red);
}

.nav-link {
  color: var(--light);
  font-family: var(--font);
  transition: filter 0.3s ease;
}

.nav-link:hover {
  filter: brightness(70%);
}
</style>
