<template>
  <div class="bg">
    <div class="container form-page">
      <div class="card">
        <div class="card-body">
          <h2>Signup</h2>
          <form id="form" class="form" @submit.prevent="signup">
            <div class="form-group">
              <label for="alias">Alias *</label>
              <input
                type="text"
                id="alias"
                placeholder="Choose an alias"
                v-model="alias"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter email"
                v-model="email"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                v-model="password"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <button class="form-control btn btn-custom">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";
import functions from "firebase/functions";

export default {
  name: "Signup",
  data() {
    return {
      alias: null,
      email: null,
      password: null,
      feedback: null,
      slug: null,
    };
  },

  methods: {
    // register a user
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });

        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((cred) => {
            db.collection("users").doc(this.slug).set({
              alias: this.alias,
              geolocation: null,
              user_id: cred.user.uid,
            });
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch((err) => {
            console.log(err);
            this.feedback = err.message;
          });
        this.feedback = "this alias is free to use.";
        //   }
        // });
      } else {
        this.feedback = "You must populate all fields.";
      }
    },
  },
};
</script>

<style scoped></style>
