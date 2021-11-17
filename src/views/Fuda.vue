<template>
  <div class="Fuda">
    <h1>札と効果の一覧</h1>
    <p>
      「音札」では、12の「月」の中から5つの「月」を選んで自分の山札とします。それぞれの月には特徴的な効果を持つ札があります。
    </p>
    <p>
      入っている「月」と札の「効果」の種類で絞り込みできます。それぞれの札をクリックすると詳細を見ることができます。
    </p>

    <p class="filter-label">
      <strong>絞り込み（月）</strong>
      <a @click="setAllMonth(true)">すべて選択</a>
      <a @click="setAllMonth(false)">すべて解除</a>
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

    <p class="filter-label">
      <strong>絞り込み（効果）</strong>
      <a @click="setAllEffect(true)">すべて選択</a>
      <a @click="setAllEffect(false)">すべて解除</a>
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
        <img
          :src="selected.image.url"
          :alt="selected.name"
          class="card-modal__image"
          :class="{
            'one-pt': selected.pt === 1
          }"
        />
        <div>
          <span class="card-modal__pt">{{ selected.pt }}点札</span>
        </div>
        <div class="card-modal__name">
          <span class="card-modal__month">{{ selected.month }}月</span>
          {{ selected.name }}
        </div>
        <p class="card-modal__effect">{{ selected.effect.text }}</p>
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
    // 札を選択
    selectCard(cardData) {
      this.isOpenModal = true;
      this.selected = cardData;
    },
    setAllMonth(value) {
      this.checkedMonth = Object.fromEntries(
        Object.entries(this.checkedMonth).map(m => [m[0], value])
      );
    },
    setAllEffect(value) {
      this.checkedEffect = Object.fromEntries(
        Object.entries(this.checkedEffect).map(m => [m[0], value])
      );
    }
  },
  mounted() {
    // 効果データを取得
    axios
      .get(this.effectsApiUrl, {
        headers: { "X-MICROCMS-API-KEY": this.apiKey },
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
        headers: { "X-MICROCMS-API-KEY": this.apiKey },
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
.filter-label {
  padding: 4px 0;
  border-left: 3px solid #ffffff;
  padding-left: 12px;
  a {
    text-decoration: underline;
    margin-left: 12px;
  }
}
.check-button-group {
  .uk-button {
    line-height: inherit;
    padding: 0;
    label {
      cursor: pointer;
      display: inline-block;
      padding: 8px 12px;
    }
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
.card-modal {
  margin-top: 180px;
  text-align: center;
  color: #303030;
  box-shadow: 0 4px 40px 0 rgba(0, 0, 0, 0.5);
  &__image {
    margin-top: -180px;
    height: 300px;
    margin-bottom: 8px;
  }
  &__pt {
    background: #303030;
    color: #ffffff;
    border-radius: 4px;
    padding: 2px 8px;
  }
  &__name {
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
  }
  &__month {
    font-size: 16px;
    border: 1px solid #303030;
    border-radius: 4px;
    padding: 2px 8px;
    position: relative;
    top: -2px;
    font-weight: no class= "filter-label" rmal;
  }
  &__effect {
    background: #eeeeee;
    border-radius: 4px;
    padding: 12px;
  }
}
</style>
