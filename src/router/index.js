import { createRouter, createWebHistory } from "vue-router";
//createWebHashHistory

const SignUp = () => import("../views/SignUp.vue");
const Login = () => import("../views/Login.vue");
const HomeNotes = () => import("../views/HomeNotes.vue");
const LetsNote = () => import("../views/LetsNote.vue");

const routes = [
  {
    path: "/signup", //localhost:8080/
    component: SignUp,
  },
  {
    path: "/",
    component: Login,
  },
  {
    path: "/letsnote",
    component: LetsNote,
    beforeEnter() {
      if (localStorage.getItem("user")) {
        return true;
      } else {
        return "/";
      }
    },
  },
  {
    path: "/home",
    component: HomeNotes,
    beforeEnter() {
      if (localStorage.getItem("user")) {
        return true;
      } else {
        return "/";
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes, //routes: routes
});

export default router;
routes;
