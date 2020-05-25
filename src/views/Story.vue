<template>
  <div class="Story">
    <ul class="otofuda-story-tab" uk-tab>
      <li><a>ストーリー本編</a></li>
      <li><a>4コマ「おとふだびより♪」</a></li>
    </ul>

    <div class="uk-switcher uk-margin">
      <section>
        StoryTeller
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
          <div v-for="c in comics" :key="c.title">
            <a
              class="uk-inline otofuda-biyori"
              :href="c.url"
              :data-caption="c.title"
            >
              <img :src="c.url" alt="c.title" />
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
// import {  } from "";

export default {
  name: "Story",
  data() {
    return {
      comics: [
        {
          title: "第0話 華音編",
          url:
            "https://pbs.twimg.com/media/EYwt55oU4AA8GTI?format=jpg&name=orig"
        },
        {
          title: "第0話 門音編",
          url:
            "https://pbs.twimg.com/media/EY13fmwU0AANDDH?format=jpg&name=large"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
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
