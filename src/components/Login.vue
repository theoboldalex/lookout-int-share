<template>
  <div class="bg">
    <div class="container login-page">
      <div class="card">
        <div class="card-body">
          <h2>Login</h2>
          <form id="form" class="form" @submit.prevent="login">
            <div class="form-group">
              <label for="email">Email: *</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                v-model="email"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Password: *</label>
              <input
                type="password"
                id="email"
                placeholder="Enter Password"
                v-model="password"
                class="form-control"
                required
              />
            </div>
            <div class="form-group">
              <button class="form-control btn btn-custom">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },

  methods: {
    login() {
      if (this.email && this.password) {
        console.log("working");
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user);
            this.$router.push({ name: "CMS" });
          })
          .catch(err => {
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.feedback = "Please populate both fields.";
      }
    }
  }
};
</script>

<style scoped>
.bg {
  background-color: var(--dark);
}

.login-page {
  height: 100vh;
  display: grid;
  place-items: center;
  font-family: var(--font);
}

.card {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  background-color: var(--light);
}

.form {
  width: 400px;
}
</style>
