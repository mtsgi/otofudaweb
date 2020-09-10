<template>
  <div class="Music">
    <h1>収録楽曲リスト</h1>
    <div class="uk-margin uk-text-right">
      <div uk-form-custom="target: button span">
        <select v-model="order">
          <option value="default">並び替え</option>
          <option value="name">曲名順</option>
          <option value="artist">アーティスト名順</option>
          <option value="illustrator">イラストレーター名順</option>
          <option value="bpm">BPM順</option>
          <option value="updated_at">新着順</option>
          <option value="easy">楽曲レベル順(緑)</option>
          <option value="normal">楽曲レベル順(橙)</option>
          <option value="hard">楽曲レベル順(赤)</option>
          <option value="easy_notes">ノーツ数順(緑)</option>
          <option value="normal_notes">ノーツ数順(橙)</option>
          <option value="hard_notes">ノーツ数順(赤)</option>
        </select>
        <button class="uk-button uk-button-secondary" type="button">
          <span></span>
        </button>
      </div>
      <button
        class="uk-button uk-button-secondary"
        type="button"
        @click="switchReverse()"
      >
        <span uk-icon="triangle-down" v-if="reverse"></span>
        <span uk-icon="triangle-up" v-else></span>
      </button>
    </div>
    <legend>
      楽曲名／アーティスト名／イラストレーター名／譜面制作者名で検索できます
    </legend>
    <form class="uk-search uk-search-large otofuda-search-form">
      <span uk-search-icon></span>
      <input
        class="uk-search-input"
        type="search"
        placeholder="Search"
        v-model="search"
      />
    </form>

    <div class="uk-text-center" v-if="!loaded">
      <div uk-spinner="ratio: 3"></div>
    </div>
    <div
      v-else
      class="otofuda-song"
      v-for="song in filteredSongs"
      :key="song.id"
    >
      <!-- 楽曲データ -->
      <div class="otofuda-song--info">
        <img
          :src="song.jacket.url"
          :alt="song.name"
          class="otofuda-song--jacket"
          :style="{
            borderColor: `rgb(${song.color.split(', ')[0]}, ${
              song.color.split(', ')[1]
            }, ${song.color.split(', ')[2]})`
          }"
        />
        <div>
          <h3>{{ song.name }}</h3>
          <div class="otofuda-song--detail">{{ song.artist }}</div>
          <div class="otofuda-song--detail">BPM: {{ song.dispbpm }}</div>
        </div>
      </div>
      <!-- 譜面データ -->
      <div class="otofuda-song--chart">
        <div class="otofuda-song--chart--difficulty">
          <div v-if="!song.coming">
            <span>{{ song.easy }}</span>
            <div>
              <p>{{ song.easy_notes }} Notes</p>
              <p><span>NOTES DESIGNER:</span> {{ song.easy_nd }}</p>
            </div>
            <a
              v-if="song.easy_video"
              :href="song.easy_video"
              target="_blank"
              rel="noopener noreferrer"
              ><span uk-icon="youtube"></span> 譜面紹介動画</a
            >
          </div>
          <div v-if="!song.coming">
            <span>{{ song.normal }}</span>
            <div>
              <p>{{ song.normal_notes }} Notes</p>
              <p><span>NOTES DESIGNER:</span> {{ song.normal_nd }}</p>
            </div>
            <a
              v-if="song.normal_video"
              :href="song.normal_video"
              target="_blank"
              rel="noopener noreferrer"
              ><span uk-icon="youtube"></span> 譜面紹介動画</a
            >
          </div>
          <div v-if="!song.coming">
            <span>{{ song.hard }}</span>
            <div>
              <p>{{ song.hard_notes }} Notes</p>
              <p><span>NOTES DESIGNER:</span> {{ song.hard_nd }}</p>
            </div>
            <a
              v-if="song.hard_video"
              :href="song.hard_video"
              target="_blank"
              rel="noopener noreferrer"
              ><span uk-icon="youtube"></span> 譜面紹介動画</a
            >
          </div>
          <div v-if="song.coming">
            <span>Coming soon...</span>
          </div>
        </div>
        <div class="otofuda-song--chart--info">
          ILLUSTRATOR: {{ song.illustrator }}
        </div>
        <div class="otofuda-song--chart--comment" v-if="song.comment">
          {{ song.comment }}
          <a
            v-if="song.video"
            :href="song.video"
            class="otofuda-song--video"
            target="_blank"
            rel="noopener noreferrer"
            ><span uk-icon="youtube"></span> 攻略動画</a
          >
        </div>
      </div>
      <p class="otofuda-song--copyright">{{ song.copyright }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Music",
  data() {
    return {
      loaded: false,
      songs: [],
      sortedSongs: [],
      order: "default",
      reverse: false,
      search: "",
      apiKey: "91c69bf8-3df5-445f-81e7-30b54ab4a7d4",
      apiUrl: "https://otofuda.microcms.io/api/v1/songs"
    };
  },
  mounted() {
    axios
      .get(this.apiUrl, {
        headers: { "X-API-KEY": this.apiKey },
        params: { limit: 1000 }
      })
      .then(response => {
        this.songs = response.data.contents;
        this.sortedSongs = response.data.contents;
        this.loaded = true;
      });
  },
  methods: {
    switchReverse() {
      this.reverse = !this.reverse;
      this.sortedSongs.reverse();
    }
  },
  watch: {
    order(val) {
      if (val === "default") {
        this.sortedSongs = this.songs;
      } else
        this.sortedSongs.sort((a, b) => {
          let A = a[val],
            B = b[val];
          if (A < B) return -1;
          else if (B < A) return 1;
          else return 0;
        });
      if (this.reverse) this.sortedSongs.reverse();
    }
  },
  computed: {
    filteredSongs() {
      return this.sortedSongs.filter(song => {
        const searchWord = this.search.toLowerCase();
        let returnValue = false;
        if (song.name)
          returnValue = song.name.toLowerCase().includes(searchWord);
        if (song.artist)
          returnValue =
            song.artist.toLowerCase().includes(searchWord) || returnValue;
        if (song.easy_nd)
          returnValue =
            song.easy_nd.toLowerCase().includes(searchWord) || returnValue;
        if (song.normal_nd)
          returnValue =
            song.normal_nd.toLowerCase().includes(searchWord) || returnValue;
        if (song.hard_nd)
          returnValue =
            song.hard_nd.toLowerCase().includes(searchWord) || returnValue;
        if (song.illustrator)
          returnValue =
            song.illustrator.toLowerCase().includes(searchWord) || returnValue;
        return returnValue;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.otofuda-search-form {
  width: 100%;
  margin-bottom: 20px;
  span {
    position: absolute;
    top: 5px;
  }
  input {
    color: #f0f0f0;
    font-size: 24px;
  }
}
.otofuda-song {
  position: relative;
  background: #f0f0f0;
  color: #303030;
  margin-bottom: 40px;
  &::before {
    transition: 0.6s;
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
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
  &--info {
    display: flex;
    height: 116px;
    & > div {
      flex-grow: 1;
      margin-right: 12px;
    }
    .otofuda-song--jacket {
      height: 120px;
      width: 120px;
      margin: 10px;
      border: 4px solid #f0f0f0;
      border-radius: 4px;
    }
    h3 {
      font-family: inherit;
      font-size: 26px;
      margin: 0;
      padding-top: 12px;
      font-weight: bold;
    }
    .otofuda-song--detail {
      color: #909090;
      margin-top: 2px;
      padding-top: 2px;
    }
  }
  &--chart {
    background: #e0e0e0;
    font-size: 14px;
    padding-bottom: 8px;
    &--info {
      padding: 0px 8px 4px;
      color: #505050;
    }
    &--comment {
      padding: 4px;
      color: #505050;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      margin: 4px 8px;
      display: flex;
      justify-content: space-between;
      .otofuda-song--video {
        font-size: 14px;
        padding: 4px;
        margin: -4px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
        border-radius: 6px 4px;
        color: #ffffff;
        background: #306060;
        > span {
          position: relative;
          top: -2px;
        }
      }
    }
    &--difficulty {
      padding-top: 20px;
      margin-bottom: 8px;
      > div {
        padding: 4px 12px;
        display: flex;
        align-items: center;
        > span {
          display: inline-block;
          padding: 4px;
          width: 32px;
          text-align: center;
          margin-right: 12px;
          border-radius: 4px;
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
          color: #ffffff;
          font-size: 20px;
          font-weight: 700;
          flex-shrink: 0;
        }
        &:first-child > span {
          background: #25ca25;
        }
        &:nth-child(2) > span {
          background: #ffb223;
        }
        &:nth-child(3) > span {
          background: #ff0984;
        }
        &:only-child > span {
          background: #909090;
          width: 132px;
          font-size: 16px;
          line-height: 2;
        }
        > div {
          flex-grow: 1;
          p {
            color: #505050;
            margin: 0;
            > span {
              color: #a0a0a0;
            }
          }
        }
        > a {
          padding: 4px;
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
          border-radius: 6px 4px;
          color: #ffffff;
          background: #dc143c;
          > span {
            position: relative;
            top: -2px;
          }
        }
      }
    }
  }
  &--copyright {
    text-align: right;
    position: absolute;
    color: #f0f0f0;
    width: 100%;
    margin-top: 4px;
  }
}

@keyframes rainbow {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 114% 0;
  }
}
</style>
