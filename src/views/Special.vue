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
      ></iframe>
    </div>

    <div class="otofuda-collabs uk-grid uk-child-width-1-2@m" uk-grid>
      <div class="otofuda-collabs__item">
        <h3>コラボ企画①</h3>
        <h2>「おとふだNET」アイコン追加！</h2>
        <img
          data-src="https://pbs.twimg.com/media/ErBu2R5VQAAY5rM?format=jpg&name=large"
          alt="「おとふだNET」アイコン追加"
          uk-img
        />
        <p>
          「音札」のプレイヤー向けWebサイト「おとふだNET」のプロフィール設定の「アイコン変更」機能に、「つむぎ」と「武者丸」の2種類の新アイコンが追加！
        </p>
        <p>
          おとふだNETに登録しているユーザーなら、ログインして「プロフィール設定」→「アイコン変更」から、どなたでも新アイコンを設定することができます！
        </p>
        <a
          href="https://j.mp/otfdnet"
          target="_blank"
          rel="noopener noreferrer"
          class="uk-button uk-button-secondary uk-width-1-1 uk-button-small"
          uk-icon="link"
        >
          「おとふだNET」はこちら
        </a>
      </div>
      <div class="otofuda-collabs__item">
        <h3>コラボ企画②</h3>
        <h2>「コラボチャプター」追加！</h2>
        <img
          data-src="https://pbs.twimg.com/media/Er2hFinUcAMY0MR?format=jpg&name=large"
          alt="「コラボチャプター」追加"
          uk-img
        />
        <p>
          天ノ葉神社日本支部との「コラボチャプター」を追加！「つむぎ」や「武者丸」が登場するオリジナルストーリーをお楽しみください！
        </p>
        <p>
          STORYにて「サイド」を選択するとコラボチャプターを見ることができます！STORYページは以下のリンクから！
        </p>
        <router-link to="/story">
          <span
            class="uk-button uk-button-secondary uk-width-1-1 uk-button-small"
            uk-icon="arrow-right"
          >
            「STORY」ページはこちら
          </span>
        </router-link>
      </div>
      <div class="otofuda-collabs__item">
        <h3>コラボ企画③</h3>
        <h2>コラボ4コマ公開！</h2>
        <img
          data-src="https://pbs.twimg.com/media/Esa0CEjU4AAvpMM.jpg"
          alt="コラボ4コマ公開"
          uk-img
        />
        <p>
          天ノ葉神社日本支部と音札のキャラクターが登場する、特別なコラボ「おとふだびより♪」をTwitterおよび公式ホームページで公開！
        </p>
        <p>
          「おとふだびより♪」の全アーカイブは以下のリンクから！
        </p>
        <router-link to="/story">
          <span
            class="uk-button uk-button-secondary uk-width-1-1 uk-button-small"
            uk-icon="arrow-right"
          >
            「STORY」ページはこちら
          </span>
        </router-link>
      </div>
      <div class="otofuda-collabs__item">
        <h3>コラボ企画④</h3>
        <h2>コラボ楽曲追加！</h2>
        <img
          data-src="https://pbs.twimg.com/media/EsJ1KUoVkAALNfX?format=jpg&name=large"
          alt="コラボ楽曲追加"
          uk-img
        />
        <p>
          つむぎと武者丸が歌う、音札初となるボーカル曲である「いつも一緒に」と、いつものお部屋のBGM「私たちのお部屋」が音札にプレイアブル楽曲として収録されます！
        </p>
        <p>
          音札の収録楽曲リスト、および譜面の紹介動画などは以下のリンクから！
        </p>
        <router-link to="/music">
          <span
            class="uk-button uk-button-secondary uk-width-1-1 uk-button-small"
            uk-icon="arrow-right"
          >
            「楽曲リスト」ページはこちら
          </span>
        </router-link>
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
    img {
      margin-top: 20px;
      border: 4px solid rgba(255, 255, 255, 0.25);
      box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.5);
      border-radius: 12px;
    }
  }
}
</style>
