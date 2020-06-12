<template>
  <div class="Story">
    <ul class="otofuda-story-tab" uk-tab>
      <li><a>ストーリー本編</a></li>
      <li><a>4コマ「おとふだびより♪」</a></li>
    </ul>

    <div class="uk-switcher uk-margin">
      <section>
        <unity
          src="./story_teller/Build/Build.json"
          unityLoader="story_teller/Build/UnityLoader.js"
        ></unity>
        <p class="uk-text-center">
          操作説明 ... クリックでストーリー選択・会話進行
        </p>
      </section>
      <section>
        <div>
          Twitterで公開している4コマ漫画「おとふだびより♪」のアーカイブを閲覧できます。
        </div>
        <div>
          <a
            href="https://twitter.com/otofuda"
            target="_blank"
            rel="noopener noreferrer"
            >「音札」公式Twitterアカウントはこちら</a
          >
        </div>
        <div
          class="uk-grid-small uk-child-width-1-4@m uk-text-center"
          uk-grid
          uk-lightbox="animation: slide"
        >
          <div v-if="comics.length == 0">
            読み込み中
          </div>
          <div v-for="c in comics" :key="c.title">
            <a
              class="uk-inline otofuda-biyori"
              :href="c.image.url"
              :data-caption="c.title"
            >
              <img :src="c.image.url" alt="c.title" />
              <div class="otofuda-biyori--title">
                {{ c.title }}
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Unity from "vue-unity-webgl";
import axios from "axios";

export default {
  name: "Story",
  components: { Unity },
  mounted() {
    axios
      .get(this.apiUrl, { headers: { "X-API-KEY": this.apiKey } })
      .then(response => {
        this.comics = response.data.contents;
      });
  },
  data() {
    return {
      apiKey: "91c69bf8-3df5-445f-81e7-30b54ab4a7d4",
      apiUrl: "https://otofuda.microcms.io/api/v1/comics",
      comics: []
    };
  }
};
</script>

<style lang="scss" scoped>
/deep/ #unity-container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.5);
}
/deep/ .webgl-content {
  position: relative;
  width: 100%;
  &::before {
    content: "";
    display: block;
    padding-top: 56.25%;
  }
}
/deep/ .footer .fullscreen {
  display: none;
}
.otofuda-story-tab {
  margin-top: 8px;
  li > a {
    font-size: 20px;
  }
  .uk-active > a {
    color: #f0f0f0;
  }
}
.otofuda-biyori {
  margin-top: 20px;
  background: #f0f0f0;
  width: 100%;
  text-decoration: none;
  color: #303030;
  border-radius: 4px;
  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    background: linear-gradient(
      45deg,
      #e60012,
      #f39800,
      #fff100,
      #009944,
      #0068b7,
      #1d2088,
      #920783,
      #e60012,
      #f39800,
      #fff100,
      #009944,
      #0068b7,
      #1d2088,
      #920783,
      #e60012
    );
    background-size: 200%;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(6px);
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 200px;
    border-radius: 4px 4px 0 0;
  }
  .otofuda-biyori--title {
    padding: 12px 0;
  }
}
</style>
