<template>
  <div class="Character">
    <h1>ゲーム紹介</h1>
    <img
      src="@/assets/about/p1.png"
      alt="花札をモチーフにした「音札」というカードを使って戦略性のある2P演奏バトルが可能な、新感覚対戦型音楽カードゲームです。LeapMotionを使用することによって、直感的で空間を操るようなジェスチャーを実現します。既存の音楽ゲームの「対戦」とは異なり、お互いのプレーがお互いの戦い方・スコアに影響してくる競技性の高い対戦が楽しめます。 "
      class="uk-visible@s"
    />
    <img
      src="@/assets/about/m1.png"
      alt="花札をモチーフにした「音札」というカードを使って戦略性のある2P演奏バトルが可能な、新感覚対戦型音楽カードゲームです。LeapMotionを使用することによって、直感的で空間を操るようなジェスチャーを実現します。既存の音楽ゲームの「対戦」とは異なり、お互いのプレーがお互いの戦い方・スコアに影響してくる競技性の高い対戦が楽しめます。 "
      class="uk-hidden@s"
    />
    <div class="uk-margin" uk-lightbox>
      <a
        class="uk-button uk-button-secondary uk-button-large"
        href="./images/about/handout.png"
      >
        <span uk-icon="file-text"></span>
        遊び方説明を見る(イベント出展時配布資料)
      </a>
    </div>
    <div class="uk-margin" uk-lightbox>
      <router-link to="/fuda">
        <a class="uk-button uk-button-secondary uk-button-large">
          <span uk-icon="database"></span>
          札と効果の一覧を見る
        </a>
      </router-link>
    </div>
    <div
      class="uk-position-relative uk-visible-toggle uk-light"
      tabindex="-1"
      uk-slideshow="ratio: 7:3; animation: push"
    >
      <ul class="uk-slideshow-items">
        <li>
          <img src="@/assets/photo/a01.png" alt="音札" uk-cover />
        </li>
        <li>
          <img src="@/assets/photo/a02.png" alt="音札" uk-cover />
        </li>
        <li>
          <img src="@/assets/photo/a03.jpg" alt="音札" uk-cover />
        </li>
      </ul>
      <a
        class="uk-position-center-left uk-position-small uk-hidden-hover"
        href="#"
        uk-slidenav-previous
        uk-slideshow-item="previous"
      ></a>
      <a
        class="uk-position-center-right uk-position-small uk-hidden-hover"
        href="#"
        uk-slidenav-next
        uk-slideshow-item="next"
      ></a>
      <ul class="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin"></ul>
    </div>
    <img
      src="@/assets/about/p2.png"
      alt="「音札」では、LeapMotionという三次元入力デバイスを筐体に2機埋め込み、手札選択ジェスチャーとフリックノーツの判定のため、高精度のハンドトラッキングを実現しています。"
      class="uk-visible@s"
    />
    <img
      src="@/assets/about/m2.png"
      alt="お手持ちのアミューズメント用ICカード（バナパスポートカードやNESiCAカードなど）または交通系ICカードを筐体にかざすだけでプレイヤーログインとプレーデータ保存が可能です。"
      class="uk-hidden@s"
    />
    <div class="uk-margin">
      <a
        class="uk-button uk-button-secondary"
        href="https://j.mp/otfdnet"
        ref="noreferer noopener"
        >プレイヤー向けWebサービス 「おとふだNET」はこちら</a
      >
    </div>
    <div
      class="uk-position-relative uk-visible-toggle uk-light"
      tabindex="-1"
      uk-slideshow="ratio: 7:3; animation: push"
    >
      <ul class="uk-slideshow-items">
        <li>
          <img src="@/assets/photo/b01.png" alt="音札" uk-cover />
        </li>
        <li>
          <img src="@/assets/photo/b02.jpg" alt="音札" uk-cover />
        </li>
        <li>
          <img src="@/assets/photo/b03.jpg" alt="音札" uk-cover />
        </li>
      </ul>
      <a
        class="uk-position-center-left uk-position-small uk-hidden-hover"
        href="#"
        uk-slidenav-previous
        uk-slideshow-item="previous"
      ></a>
      <a
        class="uk-position-center-right uk-position-small uk-hidden-hover"
        href="#"
        uk-slidenav-next
        uk-slideshow-item="next"
      ></a>
      <ul class="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin"></ul>
    </div>
    <img
      src="@/assets/about/0.png"
      alt="紹介映像"
      class="uk-margin uk-width-medium"
    />
    <iframe
      src="https://www.youtube-nocookie.com/embed/3U9wZaMz6QY?showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1"
      width="1920"
      height="1080"
      frameborder="0"
      allowfullscreen
      uk-responsive
    ></iframe>
    <article class="uk-margin uk-comment uk-comment-primary">
      <header class="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid>
        <div class="uk-width-expand">
          <h4 class="uk-comment-title uk-margin-remove">
            <a class="uk-link-reset">音札のソリューション</a>
          </h4>
          <ul
            class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top"
          >
            <li>e-sports編</li>
          </ul>
        </div>
      </header>
      <div class="uk-comment-body uk-text-emphasis">
        <p>
          既存の音楽ゲームにおいては、勝つべき相手は「過去の自分のスコア」であることが多く、対戦モードが存在しても、実際には独立した複数人のプレイヤーが同時に同じ曲を演奏するだけのものがほとんどでした。
        </p>
        <p>
          e-sportsが興隆する中、その主役は格闘ゲームや、FPSゲームなどであり、音楽ゲームが登場することはあまりありません。これは音楽ゲームの先述の競技性の低さに起因していると我々は考えています。
        </p>
        <p>
          音札は、カードゲームの戦略性とその相互の演奏に影響を与える効果設定および格闘ゲームに見られるようなライフ制度により従来の音楽ゲームにはない演奏バトルの競技性・楽しさを実現します。
        </p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Character"
};
</script>

<style lang="scss" scoped></style>
