<template>
  <div class="Home">
    <div class="sticky-container otofuda-cover-container">
      <div class="uk-cover-container otofuda-cover-container--box">
        <iframe
          title="Otofuda"
          src="https://www.youtube-nocookie.com/embed/WouN3DO9HyE?mute=1&amp;autoplay=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;modestbranding=1&amp;wmode=transparent"
          width="1920"
          height="1080"
          frameborder="0"
          allowfullscreen
          uk-cover
        ></iframe>
        <div
          class="otofuda-cover-container--bg"
          :style="{
            backgroundImage: 'url(./images/home/container_bg.png)'
          }"
        ></div>
      </div>
    </div>

    <section class="otofuda-home">
      <img src="@/assets/home/home_visual.png" alt="キャラクター" />
    </section>

    <div class="uk-padding">
      「音札」は、リズムに乗って演奏する爽快な<strong>音楽ゲーム</strong>に、花札をモチーフにした<strong>「音札」</strong>によるカードバトルを組み合わせたゲームです。
    </div>

    <div class="otofuda-links uk-grid-small uk-child-width-1-2@m" uk-grid>
      <router-link to="/character">
        <img src="@/assets/home/link_character.png" alt="キャラクター紹介" />
      </router-link>
      <router-link to="/music">
        <img src="@/assets/home/link_music.png" alt="収録楽曲リスト" />
        <img
          src="@/assets/home/otofuda.png"
          alt="収録曲"
          class="otofuda-links--jacket"
        />
      </router-link>
    </div>

    <div class="uk-text-center">
      <h3 class="uk-heading-line uk-text-center otofuda-special--title">
        <span>おうちで「エア音札」が楽しめるpdfファイルを配布中！</span>
      </h3>
      <p>
        <img data-src="https://i.imgur.com/xwG7LVl.png" alt="エア音札" uk-img />
      </p>
      <div class="uk-button-group">
        <a
          href="./air_otofuda.pdf"
          class="uk-button uk-button-secondary"
          target="_blank"
          rel="noopener noreferer"
          >開く</a
        >
        <a
          download="air_otofuda.pdf"
          href="./air_otofuda.pdf"
          class="uk-button uk-button-primary"
          >ダウンロードする</a
        >
      </div>
      <p></p>
      <p>A4サイズの用紙に余白を少なめにして印刷するとほぼ実物大になります！</p>
    </div>

    <h1>トピックス</h1>

    <div class="uk-position-relative" uk-slideshow="animation: fade">
      <ul class="uk-slideshow-items">
        <li v-for="topic in topics" :key="topic.id">
          <img
            :src="`${topic.image}?format=jpg&name=large`"
            :alt="topic.alt"
            uk-cover
          />
        </li>
      </ul>

      <a
        class="uk-position-center-left uk-position-small uk-hidden-hover"
        uk-slidenav-previous
        uk-slideshow-item="previous"
      ></a>
      <a
        class="uk-position-center-right uk-position-small uk-hidden-hover"
        uk-slidenav-next
        uk-slideshow-item="next"
      ></a>

      <div class="uk-margin-top">
        <ul class="uk-thumbnav uk-flex-center">
          <li
            v-for="(topic, idx) in topics"
            :key="idx"
            :uk-slideshow-item="idx"
          >
            <a href="#">
              <img
                :src="`${topic.image}?format=jpg&name=thumb`"
                width="40"
                :alt="topic.alt"
            /></a>
          </li>
        </ul>
      </div>
    </div>

    <p class="uk-text-center">このページを共有する</p>
    <div class="uk-margin otofuda-share">
      <ShareNetwork
        v-for="network in networks"
        :network="network.network"
        :key="network.key"
        :style="{
          backgroundColor: network.color,
          boxShadow: `0 2px 8px 0 ${network.color}a0`
        }"
        :url="sharing.url"
        :title="sharing.title"
        :description="sharing.description"
        :hashtags="sharing.hashtags"
        :twitterUser="sharing.twitterUser"
      >
        <span>{{ network.name }}</span>
      </ShareNetwork>
    </div>

    <h1>Twitter</h1>
    <Timeline
      id="otofuda"
      sourceType="profile"
      widget-class="otofuda-twitter-widget"
      :options="{
        theme: 'dark',
        chrome: 'noheader nofooter transparent',
        tweetLimit: '10',
        height: 200,
        dnt: true
      }"
    />

    <div class="otofuda-member">
      <h1>Member</h1>
      <h4>Otofuda Project</h4>
      <ul class="uk-list">
        <li>やますぎ(mtsgi)</li>
        <li>イダディ</li>
        <li>味噌卍</li>
        <li>メルヴィル</li>
        <li>Minure</li>
        <li>SIMO</li>
        <li>たかちゃん</li>
        <li>しげの</li>
        <li>高槻</li>
        <li>めがね</li>
        <li>フケ</li>
        <li>こてつ</li>
      </ul>
      <h4>Unity Engineer</h4>
      <ul class="uk-list">
        <li>しげの</li>
      </ul>
      <h4>Composer / Sound Creator</h4>
      <ul class="uk-list">
        <li>idady</li>
        <li>simo</li>
        <li>こてつ</li>
      </ul>
      <h4>Illustrator</h4>
      <ul class="uk-list">
        <li>高槻</li>
        <li>めがね</li>
      </ul>
      <h4>Web Engineer</h4>
      <ul class="uk-list">
        <li>mtsgi</li>
        <li>イダディ</li>
        <li>めがね</li>
      </ul>
      <h4>Graphic Designer</h4>
      <ul class="uk-list">
        <li>フケ</li>
      </ul>
      <h4>UI Designer</h4>
      <ul class="uk-list">
        <li>フケ</li>
      </ul>
      <h4>Hardware Engineer</h4>
      <ul class="uk-list">
        <li>Minure</li>
        <li>味噌卍</li>
        <li>SIMO</li>
      </ul>
      <h4>Notes Designer</h4>
      <ul class="uk-list">
        <li>mtsgi a.k.a. マテ茶</li>
        <li>OTOFUDA Sound Team "minure"</li>
        <li>SIMO</li>
        <li>めがね</li>
        <li>メルヴィル</li>
        <li>たかちゃん</li>
      </ul>
      <h4>Scenario Writer</h4>
      <ul class="uk-list">
        <li>高槻</li>
      </ul>
      <h4>Tools Engineer</h4>
      <ul class="uk-list">
        <li>しげの</li>
        <li>mtsgi</li>
      </ul>
      <h4>Video Creator</h4>
      <ul class="uk-list">
        <li>mtsgi</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Timeline } from "vue-tweet-embed";
import { ShareNetwork } from "vue-social-sharing";

export default {
  components: {
    Timeline,
    ShareNetwork
  },
  name: "Home",
  data() {
    return {
      topics: [],
      apiKey: "91c69bf8-3df5-445f-81e7-30b54ab4a7d4",
      apiUrl: "https://otofuda.microcms.io/api/v1/topics",
      sharing: {
        url: "https://j.mp/otofuda",
        title:
          "音札 (おとふだ)「花札 × 対戦 × 音楽」これまでにない新感覚対戦型音楽カードゲーム",
        description:
          "「音札」は、リズムに乗って演奏する爽快な<strong>音楽ゲーム</strong>に、花札をモチーフにした<strong>「音札」</strong>によるカードバトルを組み合わせたゲームです。",
        hashtags: "音札",
        twitterUser: "otofuda"
      },
      networks: [
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2"
        },
        {
          network: "line",
          name: "Line",
          icon: "fab fah fa-lg fa-line",
          color: "#00c300"
        },
        {
          network: "pocket",
          name: "Pocket",
          icon: "fab fah fa-lg fa-get-pocket",
          color: "#ef4056"
        },
        {
          network: "reddit",
          name: "Reddit",
          icon: "fab fah fa-lg fa-reddit-alien",
          color: "#ff4500"
        },
        {
          network: "tumblr",
          name: "Tumblr",
          icon: "fab fah fa-lg fa-tumblr",
          color: "#35465c"
        }
      ]
    };
  },
  mounted() {
    axios
      .get(this.apiUrl, {
        headers: { "X-API-KEY": this.apiKey },
        params: { limit: 1000 }
      })
      .then(response => {
        this.topics = [...response.data.contents];
      });
  }
};
</script>

<style lang="scss" scoped>
.otofuda-cover-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.8);
  .otofuda-cover-container--box {
    height: 100vh;
  }
  .otofuda-cover-container--bg {
    height: 100vh;
    z-index: 1;
    position: absolute;
    width: 100vw;
    opacity: 0.5;
  }
}
.otofuda-home {
  height: 100vh;
  display: flex;
  justify-content: center;
  img {
    max-height: calc(100% - 100px);
    object-fit: contain;
  }
}
.otofuda-special--title span {
  color: #ffffff;
  font-size: 20px;
}
.otofuda-share {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  a {
    color: #f0f0f0;
    padding: 4px 8px;
    margin: 4px 8px;
    border-radius: 4px;
    &:hover {
      text-decoration: none;
      opacity: 0.8;
    }
  }
}
.otofuda-links {
  align-items: flex-end;
  margin-top: -20px;
  a {
    padding: 0;
    position: relative;
  }
  a:hover {
    opacity: 0.8;
  }
  .otofuda-links--jacket {
    position: absolute;
    height: 50%;
    left: calc(10% + 0px);
    transform: rotate(-4deg);
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.2);
    animation: otofuda-jacket 2s linear infinite;
  }
}
.otofuda-member {
  text-align: center;
  h4 {
    font-family: inherit;
    font-weight: bold;
    color: #ffffff;
  }
}
@keyframes otofuda-jacket {
  0% {
    margin-top: 0px;
  }
  50% {
    margin-top: 10px;
  }
  100% {
    margin-top: 0px;
  }
}
</style>
