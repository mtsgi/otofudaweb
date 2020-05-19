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
        <div class="otofuda-cover-container--bg"></div>
      </div>
    </div>

    <section class="otofuda-home">
      <img src="/home/home_visual.png" alt="" />
    </section>

    <div class="uk-padding">
      「音札」は、リズムに乗って演奏する爽快な<strong>音楽ゲーム</strong>に、花札をモチーフにした<strong>「音札」</strong>によるカードバトルを組み合わせたゲームです。
    </div>

    <h1>トピックス</h1>

    <div class="uk-position-relative" uk-slideshow="animation: fade">
      <ul class="uk-slideshow-items">
        <li v-for="t in topics" :key="t">
          <img
            :src="`${t}?format=jpg&name=large`"
            alt="音札トピックス"
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

      <div class="uk-position-bottom-center uk-position-small">
        <ul class="uk-thumbnav">
          <li v-for="(t, i) in topics" :key="i" :uk-slideshow-item="i">
            <a href="#"
              ><img :src="`${t}?format=jpg&name=thumb`" width="40" alt=""
            /></a>
          </li>
        </ul>
      </div>
    </div>

    <h1>Twitter</h1>
    <Timeline
      id="otofuda"
      sourceType="profile"
      widget-class="otofuda-twitter-widget"
      :options="{
        theme: 'dark',
        chrome: 'noheader nofooter transparent',
        tweetLimit: '3',
        height: 200,
        dnt: true
      }"
    />
  </div>
</template>

<script>
import { Timeline } from "vue-tweet-embed";

export default {
  components: {
    Timeline
  },
  name: "Home",
  data() {
    return {
      topics: [
        "https://pbs.twimg.com/media/EXF2XEHUwAA6A7A",
        "https://pbs.twimg.com/media/EXPEyrNUEAA1s7K"
      ]
    };
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
  .otofuda-cover-container--box {
    height: 100vh;
  }
  .otofuda-cover-container--bg {
    height: 100vh;
    z-index: 1;
    position: absolute;
    width: 100vw;
    background-image: url(/home/container_bg.png);
    opacity: 0.5;
  }
}
.otofuda-home {
  height: 100vh;
  display: flex;
  img {
    max-height: calc(100% - 100px);
    object-fit: contain;
  }
}
</style>
