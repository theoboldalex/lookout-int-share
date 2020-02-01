<template>
  <div>
    <nav>
      <div class="wrapper">
        <div class="nav-container">
          <div class="left">
            <router-link :to="{ name: 'Index' }" class="logo">
              L<span class="blue">OO</span>KOUT
            </router-link>
            <small class="grey">The Intelligence Sharing Platform</small>
          </div>
          <div class="right">
            <ul>
              <li v-if="!user">
                <router-link :to="{ name: 'Signup' }">Signup</router-link>
              </li>
              <li v-if="!user">
                <router-link :to="{ name: 'Login' }">Login</router-link>
              </li>
              <li v-if="user">
                <p>{{ user.email }}</p>
              </li>
              <li v-if="user">
                <a @click="logout">Logout</a>
              </li>
              <li v-if="user && this.$route.path == '/'">
                <router-link :to="{ name: 'CMS' }">Publish</router-link>
              </li>
            </ul>
          </div>
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
:root {
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
}
</style>
