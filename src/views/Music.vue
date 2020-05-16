<template>
  <div class="Music">
    <div class="uk-inline uk-float-right">
      <button class="uk-button uk-button-secondary" type="button">
        並び替え
      </button>
      <div uk-dropdown="pos: top-right">
        <ul class="uk-nav uk-dropdown-nav">
          <li><a @click="sort('updated_at')">新着順</a></li>
          <li><a @click="sort('bpm')">BPM順</a></li>
          <li><a @click="sort('easy')">難易度順①</a></li>
          <li><a @click="sort('normal')">難易度順②</a></li>
          <li><a @click="sort('hard')">難易度順③</a></li>
        </ul>
      </div>
    </div>
    <h1>収録楽曲リスト</h1>
    <form class="uk-search uk-search-large otofuda-search-form">
      <legend>楽曲名／アーティスト名／譜面制作者名で検索できます</legend>
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
          jacket_url:
            "https://www.ne.senshu-u.ac.jp/~proj2019-13/jacket/otofuda.png",
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
          comment: "音札 初代ボス曲",
          jacket_url:
            "https://www.ne.senshu-u.ac.jp/~proj2019-13/jacket/puzzle.png",
          updated_at: new Date("2019-11-05")
        },
        {
          id: "bpmrt",
          name: "BPM=RT",
          artist: "t+pazolite",
          bpm: 1962.0,
          dispbpm: "1962",
          color: [140, 140, 235],
          easy: 0,
          normal: 0,
          hard: 0,
          author: "？？？",
          comment: "t+pazolite「without Permission」より",
          jacket_url: "http://c-h-s.me/chs0038/images/chs-0038_jacket.jpg",
          updated_at: new Date("2020-05-05")
        },
        {
          id: "dogbite",
          name: "Dogbite",
          artist: "t+pazolite",
          bpm: 195.0,
          dispbpm: "195",
          color: [190, 80, 105],
          easy: 0,
          normal: 0,
          hard: 0,
          author: "？？？",
          comment: "t+pazolite「without Permission」より",
          jacket_url: "http://c-h-s.me/chs0038/images/chs-0038_jacket.jpg",
          updated_at: new Date("2020-05-05")
        },
        {
          id: "chartreuse",
          name: "Chartreuse Green",
          artist: "t+pazolite",
          bpm: 180.0,
          dispbpm: "180",
          color: [180, 240, 5],
          easy: 0,
          normal: 0,
          hard: 0,
          author: "？？？",
          comment: "t+pazolite「without Permission」より",
          jacket_url: "http://c-h-s.me/chs0038/images/chs-0038_jacket.jpg",
          updated_at: new Date("2020-05-05")
        }
      ],
      order: "",
      search: ""
    };
  },
  computed: {
    filteredSongs() {
      return this.songs.filter(
        song =>
          song.name.toLowerCase().includes(this.search.toLowerCase()) ||
          song.artist.toLowerCase().includes(this.search.toLowerCase()) ||
          song.author.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.otofuda-search-form {
  span {
    position: absolute;
    top: 20px;
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
    animation: rainbow 120s linear infinite;
    filter: blur(8px);
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
    background: #d0d0d0;
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
      span {
        padding: 4px;
        width: 32px;
        text-align: center;
        margin-right: 12px;
        border-radius: 4px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;
        position: relative;
        top: -8px;
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
