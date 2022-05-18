<template>
  <div class="MusicDetail">
    <div v-if="isLoaded" class="music-detail">
      <p class="music-detail--header">
        <router-link to="/music">
          <span uk-icon="chevron-left"></span>
          楽曲一覧に戻る
        </router-link>
        「音札」収録楽曲情報
      </p>
      <img
        :src="`${song.jacket.url}?h=1080&w=1080`"
        :alt="song.name"
        class="music-detail--jacket"
        :style="{
          borderColor: `rgba(${song.color.split(', ')[0]}, ${
            song.color.split(', ')[1]
          }, ${song.color.split(', ')[2]}, 0.75)`
        }"
      />

      <div class="music-detail--name">{{ song.name }}</div>

      <div class="music-detail--artist">{{ song.artist }}</div>

      <div v-if="song.character" class="music-detail--character">
        担当キャラクター：{{ song.character }}
      </div>

      <div v-if="song.youtube_music">
        <a
          :href="song.youtube_music"
          class="music-detail--link-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span uk-icon="play-circle"></span>
          楽曲を試聴する
          <div>外部サイトに遷移します</div>
        </a>
      </div>

      <div v-if="song.copyright" class="music-detail--copyright">
        {{ song.copyright }}
      </div>

      <div class="divider"></div>

      <div class="music-detail--bpm">BPM: {{ song.dispbpm }}</div>

      <div class="music-detail--illustrator">
        ILLUSTRATOR: {{ song.illustrator }}
      </div>

      <div v-show="song.comment" class="music-detail--comment">
        {{ song.comment }}
      </div>

      <div v-if="song.coming" class="music-detail--coming">
        <h3>Coming Soon...</h3>
        <p>この楽曲は準備中です。譜面詳細は実装までお待ちください。</p>
      </div>

      <div v-else class="music-detail--table">
        <div
          class="music-detail--level -easy"
          :class="song.easy === -1 ? '-disabled' : null"
        >
          <h5>LEVEL</h5>
          <strong>{{ song.easy === -1 ? "-" : song.easy }}</strong>
          <div class="music-detail--level--info" v-show="song.easy !== -1">
            <h4>Notes Count</h4>
            <p>{{ song.easy_notes }}</p>
            <h4>Notes Designer</h4>
            <p>{{ song.easy_nd }}</p>
            <a
              v-if="song.easy_video"
              :href="song.easy_video"
              class="music-detail--level--video"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span uk-icon="youtube"></span>
              譜面紹介動画を見る
            </a>
            <a
              v-if="song.easy_chart"
              class="music-detail--level--image"
              @click="selectedDifficulty = 'easy'"
            >
              <span uk-icon="album"></span>
              譜面画像を見る
            </a>
          </div>
        </div>

        <div
          class="music-detail--level -normal"
          :class="song.normal === -1 ? '-disabled' : null"
        >
          <h5>LEVEL</h5>
          <strong>{{ song.normal === -1 ? "-" : song.normal }}</strong>
          <div class="music-detail--level--info" v-show="song.normal !== -1">
            <h4>Notes Count</h4>
            <p>{{ song.normal_notes }}</p>
            <h4>Notes Designer</h4>
            <p>{{ song.normal_nd }}</p>
            <a
              v-if="song.normal_video"
              :href="song.normal_video"
              class="music-detail--level--video"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span uk-icon="youtube"></span>
              譜面紹介動画を見る
            </a>
            <a
              v-if="song.normal_chart"
              class="music-detail--level--image"
              @click="selectedDifficulty = 'normal'"
            >
              <span uk-icon="album"></span>
              譜面画像を見る
            </a>
          </div>
        </div>

        <div
          class="music-detail--level -hard"
          :class="song.hard === -1 ? '-disabled' : null"
        >
          <h5>LEVEL</h5>
          <strong>{{ song.hard === -1 ? "-" : song.hard }}</strong>
          <div class="music-detail--level--info" v-show="song.hard !== -1">
            <h4>Notes Count</h4>
            <p>{{ song.hard_notes }}</p>
            <h4>Notes Designer</h4>
            <p>{{ song.hard_nd }}</p>
            <a
              v-if="song.hard_video"
              :href="song.hard_video"
              class="music-detail--level--video"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span uk-icon="youtube"></span>
              譜面紹介動画を見る
            </a>
            <a
              v-if="song.hard_chart"
              class="music-detail--level--image"
              @click="selectedDifficulty = 'hard'"
            >
              <span uk-icon="album"></span>
              譜面画像を見る
            </a>
          </div>
        </div>
      </div>

      <div v-if="song.youtube_chart">
        <a
          :href="song.youtube_chart"
          class="music-detail--link-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span uk-icon="youtube"></span>
          譜面攻略動画を見る
          <div>全難易度の譜面を比較できます</div>
        </a>
      </div>

      <div>
        <a
          :href="tweetLink"
          class="music-detail--link-button -tweet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span uk-icon="twitter"></span>
          Twitterで共有
          <div>{{ song.name }}をつぶやく</div>
        </a>
      </div>

      <h3>関連楽曲</h3>

      <router-link
        class="music-detail--related"
        v-for="relsong in relatedSongs"
        :key="relsong.id"
        :to="{ name: 'MusicDetail', params: { id: relsong.song_id } }"
      >
        <img
          :src="`${relsong.jacket.url}?h=150&w=150`"
          :alt="relsong.name"
          class="music-detail--related--jacket"
          :style="{
            borderColor: `rgba(${relsong.color.split(', ')[0]}, ${
              relsong.color.split(', ')[1]
            }, ${relsong.color.split(', ')[2]}, 0.75)`
          }"
        />
        <div class="music-detail--related--info">
          <h5>{{ relsong.name }}</h5>
          {{ relsong.artist }}
        </div>
      </router-link>

      <p v-if="relatedSongs.length === 0">関連楽曲が見つかりません</p>
    </div>
    <div v-else-if="error">
      <h1>エラー</h1>
      <p>{{ error }}</p>
      <p>
        <router-link to="/music">楽曲一覧に戻る</router-link>
      </p>
    </div>
    <div v-else>
      <div uk-spinner="ratio: 6"></div>
    </div>

    <ChartImage
      :song="song"
      :difficulty="selectedDifficulty"
      @close-image="closeImage"
    />
  </div>
</template>

<script>
import axios from "axios";
import ChartImage from "@/components/ChartImage";

export default {
  name: "MusicDetail",
  components: { ChartImage },
  data() {
    return {
      isLoaded: false,
      error: null,
      apiKey: "91c69bf8-3df5-445f-81e7-30b54ab4a7d4",
      apiUrl: "https://otofuda.microcms.io/api/v1/songs",
      allSongs: [],
      song: null,
      selectedDifficulty: null
    };
  },
  mounted() {
    axios
      .get(this.apiUrl, {
        headers: { "X-MICROCMS-API-KEY": this.apiKey },
        params: { limit: 1000 }
      })
      .then(response => {
        this.allSongs = [...response.data.contents].filter(song => song.for_ac);
        this.song = this.allSongs.find(
          song => song.song_id === this.$route.params.id
        );
        if (!this.song) this.error = "楽曲が見つかりません。";
        else this.isLoaded = true;
      });
  },
  beforeRouteUpdate(to, from, next) {
    this.song = this.allSongs.find(song => song.song_id === to.params.id);
    if (!this.song) this.error = "楽曲が見つかりません。";
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 20);
    next();
  },
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  computed: {
    relatedSongs() {
      return this.song
        ? this.allSongs.filter(song => {
            return (
              song.id !== this.song.id &&
              (song.artist === this.song.artist ||
                song.illustrator === this.song.illustrator ||
                (song.character && song.character === this.song.character))
            );
          })
        : [];
    },
    pageTitle() {
      return this.error
        ? "エラー｜音札 おとふだ"
        : this.song
        ? `${this.song.name} - 楽曲情報｜音札 おとふだ`
        : "楽曲詳細情報｜音札 おとふだ";
    },
    tweetLink() {
      return [
        "https://twitter.com/intent/tweet?text=",
        encodeURI(document.title),
        "%20",
        location.origin,
        "/~proj2019-13",
        this.$route.fullPath,
        "&related=otofuda&hashtags=音札"
      ].join("");
    }
  },
  methods: {
    // 譜面画像モーダルを閉じる
    closeImage() {
      this.selectedDifficulty = null;
    }
  },
  watch: {
    pageTitle(title) {
      document.title = title;
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Poppins:wght@400;600&display=swap");

.MusicDetail {
  text-align: center;
  .music-detail {
    font-family: "Poppins", "Noto Sans JP", sans-serif;
    font-size: 24px;

    &--header {
      text-align: left;
      margin: 20px 0;
      font-size: 18px;
    }

    &--jacket {
      width: 400px;
      height: 400px;
      max-height: calc(100vw - 24px);
      object-fit: contain;
      margin: 10px 0;
      border: 8px solid #f0f0f0;
      border-radius: 16px;
      box-sizing: border-box;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
      margin-bottom: 24px;
    }

    &--name {
      font-size: 44px;
      border: none;
      font-weight: bold;
    }

    &--artist {
      font-size: 28px;
      margin-bottom: 16px;
    }

    &--character {
      display: inline-block;
      font-size: 16px;
      border: 2px solid #f0f0f0;
      border-radius: 999px;
      padding: 2px 20px;
      margin-bottom: 20px;
    }

    &--link-button {
      display: inline-block;
      padding: 12px;
      background: #1461dc;
      font-size: 18px;
      color: #ffffff;
      border-radius: 8px;
      margin-bottom: 20px;
      &.-tweet {
        background: #1da1f2;
      }
      > div {
        font-size: 12px;
      }
    }

    &--copyright {
      font-size: 16px;
      margin-bottom: 16px;
    }

    &--bpm {
      margin-bottom: 8px;
    }

    &--illustrator {
      margin-bottom: 16px;
    }

    &--comment {
      border-radius: 8px;
      padding: 12px;
      font-size: 18px;
      color: #505050;
      background: rgba(255, 255, 255, 0.8);
      margin-bottom: 16px;
    }

    &--coming {
      background: #505050;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 16px;
      p {
        margin: 0;
        font-size: 16px;
      }
    }

    &--table {
      display: grid;
      column-gap: 16px;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    &--level {
      background: gray;
      margin: 20px 1%;
      border-radius: 12px;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;

      &.-easy {
        background: #25ca25;
      }
      &.-normal {
        background: #ffb223;
      }
      &.-hard {
        background: #ff0984;
      }
      &.-disabled {
        opacity: 0.3;
      }

      > h5 {
        margin: 0;
        color: #ffffff;
        font-family: "Poppins", "Noto Sans JP", sans-serif;
        font-weight: bold;
        padding-top: 8px;
        font-size: 14px;
      }
      > strong {
        display: block;
        margin: 0 0 8px 0;
        font-size: 32px;
      }

      &--info {
        background: rgba(0, 0, 0, 0.5);
        padding: 0 12px 16px;
        border-radius: 0 0 12px 12px;
        flex-grow: 1;
        h4 {
          margin: 0;
          color: #ffffff;
          font-family: "Poppins", "Noto Sans JP", sans-serif;
          font-weight: bold;
          padding-top: 12px;
          font-size: 16px;
        }
        p {
          margin: 0;
          font-size: 20px;
          padding-bottom: 8px;
        }
      }

      &--video {
        display: inline-block;
        padding: 8px;
        background: #dc143c;
        font-size: 18px;
        color: #ffffff;
        border-radius: 8px;
        margin: 8px;
      }

      &--image {
        display: inline-block;
        padding: 8px;
        background: #17b659;
        font-size: 18px;
        color: #ffffff;
        border-radius: 8px;
        margin: 8px;
      }
    }

    &--related {
      display: flex;
      transition: 0.1s all ease;
      color: transparent;
      &--jacket {
        width: 82px;
        height: 72px;
        margin-right: 12px;
        border-left: 10px solid silver;
      }
      &--info {
        color: #a0a0a0;
        font-size: 18px;
        text-align: left;
        h5 {
          margin: 4px 0;
          font-family: "Poppins", "Noto Sans JP", sans-serif;
          font-size: 24px;
          color: #ffffff;
          font-weight: bold;
        }
      }
      &:hover {
        transition: none;
        background: rgba(255, 255, 255, 0.25);
      }
    }
  }

  .divider {
    height: 2px;
    background: #a0a0a0;
    margin-bottom: 16px;
  }
  h3 {
    color: #ffffff;
    font-family: "Poppins", "Noto Sans JP", sans-serif;
    font-weight: bold;
  }
}
</style>
