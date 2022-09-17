<template>
  <section class="container">
    <div class="converter-card">
      <h1>Конвертер валют</h1>
      <div class="card-body" v-if="loading">Загрузка...</div>
      <div v-else class="card-body">
        <div class="base-block">
          <div class="input-wrapper">
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
  return JSON.parse(JSON.stringify(store.state.currencyList));
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
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  .converter-card {
    width: 600px;
    height: 300px;
    margin-top: 50px;
    border: 1px solid black;

    .card-body {
      padding: 20px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
