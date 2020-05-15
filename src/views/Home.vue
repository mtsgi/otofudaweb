<template>
  <div class="home">
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

    <section>
      <div class="common-medium uk-padding uk-margin-top">
        「音札」は、リズムに乗って演奏する爽快な<strong>音楽ゲーム</strong>に、花札をモチーフにした<strong>「音札」</strong>によるカードバトルを組み合わせたゲームです。
      </div>
      <a class="scroll"></a>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home"
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
    opacity: 0.25;
  }
}
</style>
