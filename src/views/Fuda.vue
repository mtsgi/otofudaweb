<template>
  <div class="Fuda">
    <h1>札と効果の一覧</h1>
    <p>
      「音札」では、12の「月」の中から5つの「月」を選んで自分の山札とします。それぞれの月には特徴的な効果を持つ札があります。
    </p>
    <p>
      入っている「月」と札の「効果」の種類で絞り込みできます。それぞれの札をクリックすると詳細を見ることができます。
    </p>

    <p>
      <strong>絞り込み（月）</strong>
      <a>すべて選択</a>
      <a>すべて解除</a>
    </p>
    <div class="check-button-group">
      <button
        class="uk-button"
        :class="{
          [`uk-button-secondary`]: !checkedMonth[month],
          [`uk-button-primary`]: checkedMonth[month]
        }"
        v-for="month in 12"
        :key="month"
      >
        <label>
          <input
            class="uk-checkbox"
            type="checkbox"
            v-model="checkedMonth[month]"
          />
          {{ month }}月
        </label>
      </button>
    </div>

    <p>
      <strong>絞り込み（効果）</strong>
      <a>すべて選択</a>
      <a>すべて解除</a>
    </p>
    <div class="check-button-group">
      <button
        class="uk-button"
        :class="{
          [`uk-button-secondary`]: !checkedEffect[effect],
          [`uk-button-primary`]: checkedEffect[effect]
        }"
        v-for="effect in Object.keys(effectsName)"
        :key="effect"
      >
        <label>
          <input
            class="uk-checkbox"
            type="checkbox"
            v-model="checkedEffect[effect]"
          />
          {{ effectsName[effect] }}
        </label>
      </button>
    </div>

    <div class="uk-text-center" v-if="!isLoaded">
      <div uk-spinner="ratio: 3"></div>
    </div>

    <!-- 札の一覧 -->
    <section class="fuda-list" v-else>
      <div
        v-for="fuda in displayCards"
        :key="fuda.id"
        class="fuda"
        @click="selectCard(fuda)"
      >
        <img
          :src="fuda.image.url"
          :alt="fuda.name"
          class="fuda__image"
          :class="{
            'one-pt': fuda.pt === 1
          }"
        />
      </div>
    </section>

    <p>※「破棄」… 手札から札を効果を発動せずに除外する効果。</p>

    <div
      id="detail-modal"
      v-if="selected"
      :class="{ 'uk-open': isOpenModal, 'uk-modal': true }"
      :style="{
        display: isOpenModal ? 'block' : 'none'
      }"
      @click="isOpenModal = false"
    >
      <div class="uk-modal-dialog uk-modal-body card-modal" @click.stop>
        <button
          class="uk-modal-close-outside"
          type="button"
          uk-close
          @click="isOpenModal = false"
        ></button>
        <h2 class="uk-modal-title" v-text="selected.name"></h2>
        <p>{{ selected.month }}月</p>
        <p>{{ selected.pt }}点</p>
        <p>効果：{{ selected.effect.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Fuda",
  data() {
    return {
      isLoaded: false,
      isOpenModal: false,
      cardsData: [],
      effectsData: [],
      selected: null,
      checkedMonth: {
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true,
        12: true
      },
      apiKey: "91c69bf8-3df5-445f-81e7-30b54ab4a7d4",
      cardsApiUrl: "https://otofuda.microcms.io/api/v1/cards",
      effectsApiUrl: "https://otofuda.microcms.io/api/v1/effects",
      checkedEffect: {}
    };
  },
  methods: {
    selectCard(cardData) {
      this.isOpenModal = true;
      this.selected = cardData;
    }
  },
  mounted() {
    // 効果データを取得
    axios
      .get(this.effectsApiUrl, {
        headers: { "X-API-KEY": this.apiKey },
        params: { limit: 50 }
      })
      .then(response => {
        this.effectsData = [...response.data.contents];
        this.checkedEffect = Object.fromEntries(
          this.effectsData.map(ef => [ef.name, true])
        );
      });
    // 札データを取得
    axios
      .get(this.cardsApiUrl, {
        headers: { "X-API-KEY": this.apiKey },
        params: { limit: 50 }
      })
      .then(response => {
        this.cardsData = [...response.data.contents];
        this.isLoaded = true;
      });
  },
  computed: {
    displayCards() {
      return this.cardsData.filter(
        fuda =>
          this.checkedMonth[fuda.month] && this.checkedEffect[fuda.effect.name]
      );
    },
    // 識別子:ラベル のKVを持つObject
    effectsName() {
      return Object.fromEntries(
        this.effectsData.map(ef => [ef.name, ef.label])
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.check-button-group {
  .uk-button {
    padding: 0 12px;
  }
}
.fuda-list {
  margin: 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}
.fuda {
  cursor: pointer;
  width: 140px;
  max-width: 50%;
  margin-right: 12px;
  transition: transform 0.1s ease;
  &:hover {
    transform: scale(1.05);
  }
  &__eftype {
    flex-grow: 1;
    text-align: center;
    color: #2e2e2e;
    padding: 4px 8px;
    &.p20 {
      color: #ffffff;
      background-image: linear-gradient(
        68.7deg,
        rgba(29, 173, 235, 1) 13.2%,
        rgba(137, 149, 250, 1) 29.8%,
        rgba(229, 109, 212, 1) 48.9%,
        rgba(255, 68, 128, 1) 68.2%,
        rgba(255, 94, 0, 1) 86.4%
      );
    }
    &.p10 {
      background-image: linear-gradient(135deg, #ffa8a8 10%, #fcff00 100%);
    }
    &.p5 {
      background-image: linear-gradient(
        89.2deg,
        rgba(191, 241, 236, 1) 22.3%,
        rgba(109, 192, 236, 1) 84.1%
      );
    }
    &.p1 {
      background-image: radial-gradient(
        circle 343px at 46.3% 47.5%,
        rgba(242, 242, 242, 1) 0%,
        rgba(241, 241, 241, 1) 72.9%
      );
    }
  }
  &__image {
    margin-top: 12px;
    &.one-pt {
      max-width: 110%;
      margin: 10% -5% 0 -5%;
    }
  }
  &__footer {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #303030;
    background: #eaead9;
    border-top: 4px solid #67bc67;
    border-bottom: 4px solid #67bc67;
    margin-top: 12px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  }
}
</style>
