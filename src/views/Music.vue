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
          <option value="updated_at">新着順(▼)</option>
          <option value="easy.level">楽曲レベル順(緑)</option>
          <option value="normal.level">楽曲レベル順(橙)</option>
          <option value="hard.level">楽曲レベル順(赤)</option>
          <option value="easy.notes">ノーツ数順(緑)</option>
          <option value="normal.notes">ノーツ数順(橙)</option>
          <option value="hard.notes">ノーツ数順(赤)</option>
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
    <div class="otofuda-song" v-for="song in filteredSongs" :key="song.id">
      <!-- 楽曲データ -->
      <div class="otofuda-song--info">
        <img
          :src="song.jacket_url"
          :alt="song.name"
          class="otofuda-song--jacket"
          :style="{
            borderColor: `rgb(${song.color[0]}, ${song.color[1]}, ${song.color[2]})`
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
            <span>{{ song.easy.level }}</span>
            <div>
              <p>{{ song.easy.notes }} Notes</p>
              <p><span>NOTES DESIGNER:</span> {{ song.easy.author }}</p>
            </div>
            <a
              v-if="song.easy.video"
              :href="song.easy.video"
              target="_blank"
              rel="noopener noreferrer"
              ><span uk-icon="youtube"></span> 譜面紹介動画</a
            >
          </div>
          <div v-if="!song.coming">
            <span>{{ song.normal.level }}</span>
            <div>
              <p>{{ song.normal.notes }} Notes</p>
              <p><span>NOTES DESIGNER:</span> {{ song.normal.author }}</p>
            </div>
            <a
              v-if="song.normal.video"
              :href="song.normal.video"
              target="_blank"
              rel="noopener noreferrer"
              ><span uk-icon="youtube"></span> 譜面紹介動画</a
            >
          </div>
          <div v-if="!song.coming">
            <span>{{ song.hard.level }}</span>
            <div>
              <p>{{ song.hard.notes }} Notes</p>
              <p><span>NOTES DESIGNER:</span> {{ song.hard.author }}</p>
            </div>
            <a
              v-if="song.hard.video"
              :href="song.hard.video"
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
export default {
  name: "Music",
  data() {
    return {
      songs: [
        {
          id: "otofuda",
          name: "オトフダビヨリ",
          artist: "idady",
          bpm: 180.0,
          dispbpm: "180",
          color: [255, 255, 205],
          easy: {
            level: 1,
            notes: 87,
            author: "マテ茶"
          },
          normal: {
            level: 4,
            notes: 238,
            author: "マテ茶"
          },
          hard: {
            level: 8,
            notes: 380,
            author: "マテ茶"
          },
          comment: "音札のテーマ曲です",
          jacket_url: "./jacket/otofuda.png",
          illustrator: "高槻",
          updated_at: new Date("2019-11-05")
        },
        {
          id: "puzzle",
          name: "Puzzle",
          artist: "idady",
          bpm: 120.0,
          dispbpm: "120",
          color: [155, 255, 205],
          easy: {
            level: 3,
            notes: 139,
            author: 'OTOFUDA Sound Team "謎の勢力M"'
          },
          normal: {
            level: 7,
            notes: 312,
            author: 'OTOFUDA Sound Team "謎の勢力M"'
          },
          hard: {
            level: 10,
            notes: 500,
            author: 'OTOFUDA Sound Team "謎の勢力M"'
          },
          comment: "「音札」 初代ボス",
          jacket_url: "./jacket/puzzle.png",
          illustrator: "OTOFUDA Designers",
          updated_at: new Date("2019-11-05")
        },
        {
          id: "sublimation",
          name: "Sublimation",
          artist: "idady",
          bpm: 165.0,
          dispbpm: "165",
          color: [255, 255, 205],
          easy: {
            level: 5,
            notes: 450,
            author: "マテ茶"
          },
          normal: {
            level: 8,
            notes: 625,
            author: 'OTOFUDA Sound Team "謎の勢力M"'
          },
          hard: {
            level: 10,
            notes: 1070,
            author: 'マテ茶 vs.OTOFUDA Sound Team "謎の勢力M"'
          },
          comment: "突如登場した最難関楽曲",
          jacket_url: "./jacket/sublimation.png",
          illustrator: "高槻",
          updated_at: new Date("2019-12-01")
        },
        {
          id: "bpmrt",
          name: "BPM=RT",
          artist: "t+pazolite",
          bpm: 1962.0,
          dispbpm: "1962",
          color: [140, 140, 235],
          easy: {
            level: 4,
            notes: 313,
            author: "マテ茶",
            video: "https://youtu.be/_TA15dPKyHo"
          },
          normal: {
            level: 8,
            notes: 703,
            author: "マテ茶",
            video: "https://youtu.be/Be3_agbhCVU"
          },
          hard: {
            level: 10,
            notes: 1011,
            author: "マテ茶",
            video: "https://youtu.be/fuxjvedDWRo"
          },
          comment: "t+pazolite「without Permission」より",
          copyright: "© 2020 C.H.S",
          jacket_url: "./jacket/bpmrt.png",
          illustrator: "Shinichiro Miyazaki",
          updated_at: new Date("2020-05-05")
        },
        {
          id: "dogbite",
          name: "Dogbite",
          artist: "t+pazolite",
          bpm: 195.0,
          dispbpm: "195",
          color: [190, 80, 105],
          easy: {
            level: 2,
            notes: 156,
            author: 'OTOFUDA Sound Team "謎の勢力M"',
            video: "https://youtu.be/RTPOM2Ltj2c"
          },
          normal: {
            level: 8,
            notes: 534,
            author: 'OTOFUDA Sound Team "謎の勢力M"',
            video: "https://youtu.be/sAx3Ve-8xwc"
          },
          hard: {
            level: 9,
            notes: 769,
            author: 'OTOFUDA Sound Team "謎の勢力M"',
            video: "https://youtu.be/At1He5GOHHc"
          },
          comment: "t+pazolite「without Permission」より",
          copyright: "© 2020 C.H.S",
          jacket_url: "./jacket/dogbite.png",
          illustrator: "Shinichiro Miyazaki",
          updated_at: new Date("2020-05-05")
        },
        {
          id: "chartreuse",
          name: "Chartreuse Green",
          artist: "t+pazolite",
          bpm: 180.0,
          dispbpm: "180",
          color: [180, 240, 5],
          easy: {
            level: 0,
            notes: 0,
            author: ""
          },
          normal: {
            level: 0,
            notes: 0,
            author: ""
          },
          hard: {
            level: 0,
            notes: 0,
            author: ""
          },
          coming: true,
          comment: "t+pazolite「without Permission」より",
          copyright: "© 2020 C.H.S",
          jacket_url: "./jacket/chartreuse.png",
          illustrator: "Shinichiro Miyazaki",
          updated_at: new Date("2020-05-05")
        }
      ],
      sortedSongs: [],
      order: "default",
      reverse: false,
      search: ""
    };
  },
  mounted() {
    this.sortedSongs = this.songs;
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
          switch (val) {
            case "easy.level":
              A = a.easy.level || 0;
              B = b.easy.level || 0;
              break;
            case "normal.level":
              A = a.normal.level || 0;
              B = b.normal.level || 0;
              break;
            case "hard.level":
              A = a.hard.level || 0;
              B = b.hard.level || 0;
              break;
            case "easy.notes":
              A = a.easy.notes || 0;
              B = b.easy.notes || 0;
              break;
            case "normal.notes":
              A = a.normal.notes || 0;
              B = b.normal.notes || 0;
              break;
            case "hard.notes":
              A = a.hard.notes || 0;
              B = b.hard.notes || 0;
              break;
            default:
              break;
          }
          if (A < B) return -1;
          else if (B < A) return 1;
          else return 0;
        });
      if (this.reverse) this.sortedSongs.reverse();
    }
  },
  computed: {
    filteredSongs() {
      return this.sortedSongs.filter(
        song =>
          song.name.toLowerCase().includes(this.search.toLowerCase()) ||
          song.artist.toLowerCase().includes(this.search.toLowerCase()) ||
          song.easy.author.toLowerCase().includes(this.search.toLowerCase()) ||
          song.normal.author
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          song.hard.author.toLowerCase().includes(this.search.toLowerCase()) ||
          song.illustrator.toLowerCase().includes(this.search.toLowerCase())
      );
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
