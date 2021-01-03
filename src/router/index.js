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
    path: "/about",
    name: "About",
    meta: {
      title: "ゲーム紹介"
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/music",
    name: "Music",
    meta: {
      title: "収録楽曲リスト"
    },
    component: () =>
      import(/* webpackChunkName: "music" */ "../views/Music.vue")
  },
  {
    path: "/story",
    name: "Story",
    meta: {
      title: "オリジナルストーリー"
    },
    component: () =>
      import(/* webpackChunkName: "story" */ "../views/Story.vue")
  },
  {
    path: "/character",
    name: "Character",
    alias: "/char",
    meta: {
      title: "キャラクター紹介"
    },
    component: () =>
      import(/* webpackChunkName: "character" */ "../views/Character.vue")
  },
  {
    path: "/fuda",
    name: "Fuda",
    meta: {
      title: "札紹介"
    },
    component: () =>
      import(/* webpackChunkName: "character" */ "../views/Fuda.vue")
  },
  {
    path: "/special",
    name: "Special",
    meta: {
      title: "天ノ葉神社日本支部 コラボ特設ページ"
    },
    component: () =>
      import(/* webpackChunkName: "special" */ "../views/Special.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(to => {
  if (to.meta)
    document.title = to.meta.title
      ? `${to.meta.title} | 音札 おとふだ`
      : "音札 -おとふだ-";
});

export default router;
