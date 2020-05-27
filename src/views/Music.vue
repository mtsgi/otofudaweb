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
          <option value="updated_at">新着順(↑)</option>
          <option value="easy">難易度順(緑)</option>
          <option value="normal">難易度順(橙)</option>
          <option value="hard">難易度順(赤)</option>
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
        <span uk-icon="arrow-up" v-if="reverse"></span>
        <span uk-icon="arrow-down" v-else></span>
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
          <span>{{ song.easy }}</span>
          <span>{{ song.normal }}</span>
          <span>{{ song.hard }}</span>
        </div>
        <div class="otofuda-song--chart--info">
          ILLUSTRATOR: {{ song.illustrator }}
        </div>
        <div class="otofuda-song--chart--info">
          NOTES DESIGNER: {{ song.author }}
        </div>
        <div class="otofuda-song--chart--comment" v-if="song.comment">
          {{ song.comment }}
        </div>
      </div>
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
          easy: 1,
          normal: 5,
          hard: 8,
          author: "マテ茶",
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
          easy: 4,
          normal: 8,
          hard: 10,
          author: 'OTOFUDA Sound Team "謎の勢力M"',
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
          easy: 5,
          normal: 8,
          hard: 10,
          author: 'マテ茶 vs. OTOFUDA Sound Team "謎の勢力M"',
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
          easy: "-",
          normal: "-",
          hard: "-",
          author: "",
          comment: "t+pazolite「without Permission」より",
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
          easy: "-",
          normal: "-",
          hard: "-",
          author: "",
          comment: "t+pazolite「without Permission」より",
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
          easy: "-",
          normal: "-",
          hard: "-",
          author: "",
          comment: "t+pazolite「without Permission」より",
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
          const A = a[val],
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
      return this.sortedSongs.filter(
        song =>
          song.name.toLowerCase().includes(this.search.toLowerCase()) ||
          song.artist.toLowerCase().includes(this.search.toLowerCase()) ||
          song.author.toLowerCase().includes(this.search.toLowerCase()) ||
          song.illustrator.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.otofuda-search-form {
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
  margin-bottom: 20px;
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
  .otofuda-song--info {
    display: flex;
    height: 116px;
    & > div {
      flex-grow: 1;
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
      margin: 0;
      padding-top: 12px;
    }
    .otofuda-song--detail {
      color: #909090;
      margin-top: 2px;
      padding-top: 2px;
      border-top: 1px solid #c0c0c0;
    }
  }
  .otofuda-song--chart {
    background: #e0e0e0;
    font-size: 14px;
    padding-bottom: 8px;
    .otofuda-song--chart--info {
      padding: 0px 8px 4px;
      color: #505050;
    }
    .otofuda-song--chart--comment {
      padding: 4px;
      color: #505050;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      margin: 4px 8px;
    }
    .otofuda-song--chart--difficulty {
      display: flex;
      justify-content: flex-end;
      margin-bottom: -6px;
      span {
        padding: 4px;
        width: 32px;
        text-align: center;
        margin-right: 12px;
        border-radius: 4px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
        color: #ffffff;
        font-size: 20px;
        font-weight: 700;
        position: relative;
        top: -10px;
        &:first-child {
          background: #25ca25;
        }
        &:nth-child(2) {
          background: #ffb223;
        }
        &:nth-child(3) {
          background: #ff0984;
        }
      }
    }
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
