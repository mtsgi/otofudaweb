<template>
  <div class="Fuda">
    <h1>札と効果の一覧</h1>
    <p>
      「音札」では、12の「月」の中から5つの「月」を選んで自分の山札とします。それぞれの月には特徴的な効果を持つ札があります。
    </p>
    <p>
      入っている「月」と札の「効果」の種類で絞り込みできます。それぞれの札をクリックすると詳細を見ることができます。
    </p>
    <section class="fuda-list uk-grid uk-child-width-1-4" uk-grid>
      <div
        v-for="fuda in fudaData"
        :key="fuda.file"
        class="fuda"
        @click="selected = fuda"
        uk-toggle="target: #detail-modal"
      >
        <div class="fuda__header">
          <span class="fuda__month">{{ fuda.month }}月</span>
          <span class="fuda__eftype" :class="`p${fuda.point}`">{{
            effectName[fuda.effect]
          }}</span>
        </div>
        <img
          :src="`./images/fuda/${fuda.file}`"
          :alt="fuda.name"
          class="fuda__image"
        />
        <div class="fuda__footer">
          {{ fuda.name }}
        </div>
      </div>
    </section>

    <div id="detail-modal" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-outside" type="button" uk-close></button>
        <h2 class="uk-modal-title" v-text="selected.name"></h2>
        <p>{{ selected.month }}月</p>
        <p>{{ selected.point }}点札</p>
        <p>Effect：{{ selected.effect }}</p>
        <p>効果：{{ selected.effect }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import fudaData from "../assets/fuda/index.json";

export default {
  name: "Fuda",
  data() {
    return {
      fudaData,
      selected: {},
      effectName: {
        disturb: "妨害効果",
        damage: "打撃",
        draw: "追引",
        loot: "略奪",
        nullify_and_draw: "無効＋探索",
        search: "探索",
        difficulty_up: "譜面難化",
        heal: "回復",
        nullify: "無効化",
        damage_and_heal: "吸収",
        light: "特殊",
        hand_destruction: "破札"
      },
      effectDesc: {}
    };
  }
};
</script>

<style lang="scss" scoped>
.fuda-list {
  min-width: 720px;
  margin: 0;
}
.fuda {
  padding: 12px 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.025);
  }
  &__header {
    display: flex;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  }
  &__month {
    color: #303030;
    background: #c9c9c9;
    padding: 4px 8px;
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
    border-radius: 6px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
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
