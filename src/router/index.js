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
      title: "収録楽曲リスト",
      desc:
        "音札の収録楽曲一覧はこちら！アーティスト情報や譜面情報による並び替えもできます"
    },
    component: () =>
      import(/* webpackChunkName: "music" */ "../views/Music.vue")
  },
  {
    path: "/music/:id",
    name: "MusicDetail",
    meta: {
      title: "楽曲詳細情報"
    },
    component: () =>
      import(/* webpackChunkName: "musicdetail" */ "../views/MusicDetail.vue")
  },
  {
    path: "/story",
    name: "Story",
    meta: {
      title: "オリジナルストーリー",
      desc:
        "「音札」オリジナルストーリー「メインチャプター」「コラボチャプター」と4コマ「おとふだびより♪」を公開中！"
    },
    component: () =>
      import(/* webpackChunkName: "story" */ "../views/Story.vue")
  },
  {
    path: "/character",
    name: "Character",
    alias: "/char",
    meta: {
      title: "キャラクター紹介",
      desc: "音札のオリジナルキャラクターのプロフィールをご紹介"
    },
    component: () =>
      import(/* webpackChunkName: "character" */ "../views/Character.vue")
  },
  {
    path: "/fuda",
    name: "Fuda",
    meta: {
      title: "札紹介",
      desc:
        "「音札」では、12の「月」の中から5つの「月」を選んで自分の山札とします。それぞれの月には特徴的な効果を持つ札があります。 "
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
  base: "/",
  routes
});

router.afterEach(to => {
  if (to.meta) {
    if (to.meta.title)
      document.title = to.meta.title
        ? `${to.meta.title} | 音札 おとふだ`
        : "音札 -おとふだ-";
    if (to.meta.desc)
      document
        .querySelector("meta[name='description']")
        .setAttribute("content", to.meta.desc);
  }
});

export default router;
