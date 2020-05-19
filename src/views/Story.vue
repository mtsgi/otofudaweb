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
              <img :src="c.url" alt="" />
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
export default {
  name: "Story",
  data() {
    return {
      comics: []
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
  border-radius: 8px;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 200px;
  }
  .otofuda-biyori--title {
    padding: 12px 0;
  }
}
</style>
