<template>
  <div
    class="chart-image uk-animation-slide-bottom-small"
    v-if="song && difficulty"
  >
    <div class="chart-image--header">
      <div class="chart-image--header--title">
        <span :class="`-${difficulty}`" class="chart-image--header--difficulty">
          LEVEL {{ song[difficulty] }}
        </span>
        <strong>{{ song.name }}</strong>
      </div>
      <button type="button" uk-close @click="onClose"></button>
    </div>
    <div ref="container" class="chart-image--container">
      <img
        :src="imageUrl"
        :alt="song.name"
        :style="{
          width: `${imageWidth}px`
        }"
      />
    </div>
    <div class="chart-image--footer">
      <!-- 下へスクロール -->
      <a
        @click="scrollToBottom"
        class="uk-icon-button"
        uk-icon="arrow-down"
      ></a>
      <p class="chart-image--footer--detail">
        {{ this.song.bpm }} BPM ｜
        {{ this.song[`${this.difficulty}_notes`] }} Notes
        <span class="chart-image--footer--copyright">
          © 音札プロジェクト
        </span>
      </p>
      <!-- 拡大・縮小ボタン -->
      <a
        @click="isSmall = !isSmall"
        class="uk-icon-button"
        :uk-icon="isSmall ? 'plus' : 'minus'"
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartImage",
  props: {
    song: {
      type: Object,
      required: false,
      default: null
    },
    difficulty: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return { isSmall: false };
  },
  computed: {
    imageUrl() {
      return this.song[`${this.difficulty}_chart`].url;
    },
    imageWidth() {
      const originalWidth = this.song[`${this.difficulty}_chart`].width;
      return this.isSmall ? originalWidth / 2 : originalWidth;
    }
  },
  methods: {
    onClose() {
      this.$emit("close-image");
    },
    scrollToBottom() {
      if (!this.imageUrl) return;
      this.$refs.container.scrollTo({
        top: this.song[`${this.difficulty}_chart`].height,
        behavior: "smooth"
      });
    }
  },
  watch: {
    difficulty(val) {
      if (val)
        setTimeout(() => {
          this.scrollToBottom();
        }, 250);
    },
    isSmall(val) {
      const container = this.$refs.container;
      if (val) {
        container.scrollTo({
          top: container.scrollTop / 2,
          behavior: "instant"
        });
      } else {
        setTimeout(() => {
          container.scrollTo({
            top: container.scrollTop * 2,
            behavior: "instant"
          });
        }, 25);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.chart-image {
  font-family: "Poppins", "Noto Sans JP", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  background: #202020;
  overflow: hidden;

  &--header {
    display: flex;
    font-size: 14px;
    box-sizing: border-box;
    padding: 8px;
    height: 52px;

    &--title {
      flex-grow: 1;
      display: flex;
      align-items: center;

      > strong {
        font-size: 24px;
      }
    }
    &--difficulty {
      padding: 2px 8px;
      border-radius: 6px;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.75);
      margin-right: 8px;
      &.-easy {
        background: #25ca25;
      }
      &.-normal {
        background: #ffb223;
      }
      &.-hard {
        background: #ff0984;
      }
    }
  }

  &--container {
    height: calc(100vh - 52px - 52px);
    overflow-y: scroll;
    overscroll-behavior: contain;
  }

  &--footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
    padding: 0 6px;
    font-size: 14px;

    &--detail {
      display: flex;
      flex-direction: column;
    }
    &--copyright {
      font-size: 10px;
      color: #a0a0a0;
    }
  }
}
</style>
