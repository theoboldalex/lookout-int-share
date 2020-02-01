<template>
  <div class="wrapper">
    <div class="container">
      <form id="form" class="form" @submit.prevent="signup">
        <h2>Signup</h2>
        <div class="form-control">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter email"
            v-model="email"
          />
          <small>Error message</small>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            v-model="password"
          />
          <small>Error message</small>
        </div>
        <button>Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
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
    signup() {
      if (this.email && this.password) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
            this.feedback = err.message;
          });
        this.feedback = "this alias is free to use.";
      } else {
        this.feedback = "You must populate all fields.";
      }
    }
  }
};
</script>

<style scoped>
:root {
  --success-color: #2ecc71;
  --error-color: #e74c3c;
}

* {
  box-sizing: border-box;
}

.wrapper {
  background: #fff;
  font-family: "Muli", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  margin: 0;
}

.container {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 400px;
}

h2 {
  text-align: center;
  margin: 0 0 20px;
}

.form {
  padding: 30px 40px;
}

.form-control {
  margin-bottom: 10px;
  padding-bottom: 20px;
  position: relative;
}

.form-control label {
  color: #777;
  display: block;
  margin-bottom: 5px;
}

.form-control input {
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 14px;
}

.form-control input:focus {
  outline: 0;
  border-color: #777;
}

.form-control.success input {
  border-color: var(--success-color);
}

.form-control.error input {
  border-color: var(--error-color);
}

.form-control small {
  color: var(--error-color);
  position: absolute;
  bottom: 0;
  left: 0;
  visibility: hidden;
}

.form-control.error small {
  visibility: visible;
}

.form button {
  cursor: pointer;
  background: #3498db;
  border: 2px solid #3498db;
  border-radius: 4px;
  color: #fff;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
  transition: 0.3s ease-in-out;
}

.form button:hover {
  filter: brightness(80%);
}
</style>
