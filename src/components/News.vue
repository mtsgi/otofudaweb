<template>
  <div class="news">
    <h1>ニュース</h1>
    <div
      v-for="(article, index) in news"
      :key="article.id"
      v-show="showAll || index < limit"
      class="news--item"
    >
      <h3 v-text="article.title"></h3>
      <div v-html="article.content"></div>
      <div v-if="article.popup" class="news--modal uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button
            class="uk-modal-close-default"
            type="button"
            uk-close
          ></button>
          <h2 class="uk-modal-title" v-text="article.title"></h2>
          <div v-html="article.content"></div>
        </div>
      </div>
    </div>
    <!-- 切り替えボタン -->
    <a
      class="uk-button uk-button-secondary uk-button-large"
      @click="showAll = !showAll"
    >
      <span :uk-icon="showAll ? 'arrow-up' : 'arrow-down'"></span>
      {{ showAll ? "表示を少なくする" : "もっと見る" }}
    </a>
  </div>
</template>

<script>
import axios from "axios";
import UIkit from "uikit";

export default {
  name: "News",
  data() {
    return {
      news: [],
      apiKey: "91c69bf8-3df5-445f-81e7-30b54ab4a7d4",
      apiUrl: "https://otofuda.microcms.io/api/v1/news",
      showAll: false,
      limit: 2
    };
  },
  mounted() {
    axios
      .get(this.apiUrl, {
        headers: { "X-MICROCMS-API-KEY": this.apiKey },
        params: { limit: 1000 }
      })
      .then(response => {
        this.news = [...response.data.contents];
        this.limit = this.news[0].limit || 2;
        // ポップアップを開く(最大1つまで)
        setTimeout(() => {
          const modalElem = document.querySelector(".news--modal");
          if (modalElem) UIkit.modal(modalElem).show();
        }, 500);
      });
  }
};
</script>

<style lang="scss" scoped>
.news {
  line-height: 2;
  &--item {
    h3 {
      color: #ffffff;
      font-weight: bold;
    }
  }
  &--modal {
    line-height: 2;
    .uk-modal-title {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
