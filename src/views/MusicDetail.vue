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
        :src="song.jacket.url"
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

      <div class="music-detail--bpm">BPM: {{ song.dispbpm }}</div>

      <div class="music-detail--illustrator">
        ILLUSTRATOR: {{ song.illustrator }}
      </div>

      <div v-show="song.comment" class="music-detail--comment">
        {{ song.comment }}
      </div>

      <h3>関連楽曲</h3>

      <div
        class="music-detail--related"
        v-for="relsong in relatedSongs"
        :key="relsong.id"
      >
        <p>{{ relsong.name }}</p>
      </div>

      <h3>SNSで共有</h3>
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MusicDetail",
  data() {
    return {
      isLoaded: false,
      error: null,
      apiKey: "91c69bf8-3df5-445f-81e7-30b54ab4a7d4",
      apiUrl: "https://otofuda.microcms.io/api/v1/songs",
      allSongs: [],
      song: null
    };
  },
  mounted() {
    axios
      .get(this.apiUrl, {
        headers: { "X-API-KEY": this.apiKey },
        params: { limit: 1000 }
      })
      .then(response => {
        this.allSongs = [...response.data.contents];
        this.song = this.allSongs.find(
          song => song.song_id === this.$route.params.id
        );
        if (!this.song) {
          this.error = "楽曲が見つかりません。";
        } else this.isLoaded = true;
      });
  },
  computed: {
    relatedSongs() {
      return this.song
        ? this.allSongs.filter(song => {
            return (
              song.id !== this.song.id &&
              (song.artist === this.song.artist ||
                song.illustrator === this.song.illustrator)
            );
          })
        : [];
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Poppins:wght@400;600&display=swap");

.MusicDetail {
  .music-detail {
    font-family: "Poppins", "Noto Sans JP", sans-serif;
    text-align: center;
    font-size: 24px;

    &--header {
      text-align: left;
      margin: 20px 0;
      font-size: 18px;
    }

    &--jacket {
      width: 400px;
      max-height: 400px;
      margin: 10px 10px;
      border: 8px solid #f0f0f0;
      border-radius: 16px;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
      margin-bottom: 24px;
    }

    &--name {
      font-size: 44px;
      border: none;
      font-weight: bold;
      margin-bottom: 8px;
    }

    &--artist {
      font-size: 32px;
      padding-bottom: 12px;
      border-bottom: 4px solid #a0a0a0;
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
  }
}
</style>
