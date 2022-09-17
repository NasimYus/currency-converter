<template>
  <section>
    <div class="converter-card">
      <h1>Конвертер валют</h1>
      <div class="card-body" v-if="loading">Загрузка...</div>
      <div v-else class="card-body">
        <div class="currency-list-wrapper">
          <select v-model="baseValute" name="baseValutes" id="baseValutes">
            <option :value="baseValute">
              {{ baseValute.CharCode }}
            </option>
            <option
              v-for="valute in storeCurrencyList.Valute"
              :key="valute.ID"
              :value="valute"
            >
              {{ valute.CharCode }}
            </option>
          </select>
          <select
            name="secondaryValutes"
            id="secondaryValutes"
            v-model="secondaryValute"
          >
            <option :value="secondaryValute">
              {{ secondaryValute.CharCode }}
            </option>
            <option
              v-for="valute in storeCurrencyList.Valute"
              :key="valute.ID"
              :value="valute"
            >
              {{ valute.CharCode }}
            </option>
          </select>
        </div>
        <div class="converter-wrapper">
          <div class="base-block">
            <div class="input-wrapper">
              <input
                v-model="baseValuteInput"
                placeholder="100"
                type="number"
                inputmode="number"
              />
            </div>
          </div>
          <button @click="changeInputsValue">&harr;</button>
          <div class="secondary-block">
            <input
              v-model="secondaryValuteInput"
              type="text"
              placeholder="100.0000"
              inputmode="text"
              readonly
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();
const baseValute = ref({
  ID: "R01235",
  NumCode: "840",
  CharCode: "USD",
  Nominal: 1,
  Name: "Доллар США",
  Value: 60.0316,
  Previous: 59.6663,
});
const secondaryValute = ref({
  ID: "R01670",
  NumCode: "972",
  CharCode: "TJS",
  Nominal: 10,
  Name: "Таджикских сомони",
  Value: 58.6303,
  Previous: 58.2679,
});
const baseValuteInput = ref(100);
const secondaryValuteInput = ref(null);

const loading = computed(() => {
  return store.state.loading;
});

const storeCurrencyList = computed(() => {
  return store.state.currencyList;
});

watch([baseValute, secondaryValute], () => {
  if (!baseValuteInput.value) return;
  convertValute();
});

watch(
  baseValuteInput,
  () => {
    if (baseValuteInput.value) secondaryValuteInput.value = 0;
    convertValute();
  },
  { immediate: true }
);

function convertValute() {
  let baseValueByOneNominal = baseValute.value.Value / baseValute.value.Nominal;
  let secondaryValueByOneNominal =
    secondaryValute.value.Value / secondaryValute.value.Nominal;
  secondaryValuteInput.value = Number(
    (baseValueByOneNominal * baseValuteInput.value) / secondaryValueByOneNominal
  ).toFixed(4);
}

function changeInputsValue() {
  baseValuteInput.value = secondaryValuteInput.value;
}
</script>

<style scoped lang="scss">
.converter-card {
  text-align: center;
  padding: 20px;
  border: 1px solid #d7d3d3;
  border-radius: 8px;
  background-color: #f7f8f9;

  .card-body {
    padding: 20px;

    .currency-list-wrapper {
      display: flex;
      justify-content: space-around;
      margin-bottom: 20px;
    }

    .converter-wrapper {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }

    input,
    select {
      border: 1px solid #e5eaef;
      outline: 0;
      padding: 10px 20px;
      background: #ffffff;
      border-radius: 4px;
      font-size: 18px;
      line-height: 150%;
      color: #222222;
    }

    button {
      background: #222222;
      border-radius: 4px;
      color: #fff;
      border: 0;
      padding: 6px 10px;
      font-size: 18px;
      line-height: 22px;
      margin: 0 10px;
      cursor: pointer;
      &:hover {
        background-color: #605f5f;
      }
    }
  }
}
</style>
