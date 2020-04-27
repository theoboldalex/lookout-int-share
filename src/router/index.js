import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import CMS from "@/components/CMS";
import Profile from "@/components/profile";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/cms",
      name: "CMS",
      component: CMS,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    }
  ]
});

router.beforeEach((to, from, next) => {
  // check if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser;
    if (user) {
      // user signed in. proceed to route
      next();
    } else {
      // no user signed in. redirect to login
      next({
        name: "Login"
      });
    }
  } else {
    next();
  }
});

export default router;
