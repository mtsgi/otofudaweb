import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/music",
    name: "Music",
    component: () =>
      import(/* webpackChunkName: "music" */ "../views/Music.vue")
  },
  {
    path: "/story",
    name: "Story",
    component: () =>
      import(/* webpackChunkName: "story" */ "../views/Story.vue")
  },
  {
    path: "/character",
    name: "Character",
    component: () =>
      import(/* webpackChunkName: "character" */ "../views/Character.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
