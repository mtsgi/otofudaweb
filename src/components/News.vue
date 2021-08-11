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
        headers: { "X-API-KEY": this.apiKey },
        params: { limit: 1000 }
      })
      .then(response => {
        this.news = [...response.data.contents];
        this.limit = this.news[0].limit || 2;
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
}
</style>
