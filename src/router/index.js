import { createRouter, createWebHistory } from "vue-router";
//createWebHashHistory

import HomeNote from "../views/HomeNotes.vue";

const routes = [
  {
    path: "/", //localhost:8080/
    component: HomeNote,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes, //routes: routes
});

export default router;
routes;
