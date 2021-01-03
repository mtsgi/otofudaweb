<template>
  <div class="Special">
    <img
      src="@/assets/special/title.png"
      alt="天ノ葉神社日本支部コラボ特設ページ"
      class="special-title"
    />

    <div class="otofuda-about-amanoha uk-grid uk-child-width-1-2@m" uk-grid>
      <div>
        <h2>天ノ葉神社日本支部 とは？</h2>
        <p>
          YouTubeの「天ノ葉神社日本支部」チャンネルにて、「ここから紡ぐ、物語。」をテーマに、異世界から日本に迷い込んだ天ノ葉つむぎ・武者丸の日常を投稿・配信しています。
        </p>
      </div>
      <iframe
        class="uk-right otofuda-about-amanoha__video"
        src="https://www.youtube.com/embed/videoseries?list=PLBR98kmPGF9Az__V0vCjRMglP5URaxvk-"
        frameborder="0"
        uk-video="automute: true"
      ></iframe>
    </div>

    <div class="otofuda-collabs uk-grid uk-child-width-1-2@m" uk-grid>
      <div class="otofuda-collabs__item">
        <h3>コラボ企画①</h3>
        <h2>？？？？？</h2>
        <p>Coming soon...</p>
      </div>
      <div class="otofuda-collabs__item">
        <h3>コラボ企画②</h3>
        <h2>？？？？？</h2>
        <p>Coming soon...</p>
      </div>
      <div class="otofuda-collabs__item">
        <h3>コラボ企画③</h3>
        <h2>？？？？？</h2>
        <p>Coming soon...</p>
      </div>
      <div class="otofuda-collabs__item">
        <h3>コラボ企画④</h3>
        <h2>？？？？？</h2>
        <p>Coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Special"
};
</script>

<style lang="scss" scoped>
.special-title {
  margin-top: 20px;
  margin-bottom: -15%;
}

.otofuda-about-amanoha {
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 0;
  margin-left: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  border-radius: 12px;
  position: relative;
  z-index: 1;
  > div,
  &__video {
    padding: 0;
  }
  h2 {
    font-size: 28px;
    color: #ffffff;
    margin: 0;
    font-weight: bold;
  }
  p {
    line-height: 2;
    margin: 12px 12px 0 0;
  }
}

.otofuda-collabs {
  box-sizing: border-box;
  padding: 20px;
  margin-left: 0;
  margin-top: 16px;
  position: relative;
  z-index: 1;
  &__item {
    margin: 0;
    padding: 18px;
    border-bottom: 1px solid white;
    h3 {
      font-size: 20px;
      color: #ffffff;
      margin: 0;
    }
    h2 {
      font-size: 28px;
      color: #ffffff;
      margin: 0;
      font-weight: bold;
    }
  }
}
</style>
