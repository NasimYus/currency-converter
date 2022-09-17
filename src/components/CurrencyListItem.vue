<template>
  <div class="list-item">
    <span class="main">{{ mainCurrency }} {{ mainCharCode }}</span>
    <button @click="changeCurrency">&harr;</button>
    <span class="sub">{{ subCurrency }} {{ subCharCode }}</span>
    <span>
      <span
        :class="isPreviousGreatest ? 'value-status-down' : 'value-status-up'"
      >
        {{ isPreviousGreatest ? " ▼" : " ▲" }}
        {{ getValuteChanges(valute.Value, valute.Previous) }}
      </span>
    </span>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
const props = defineProps({
  valute: Object,
});
const mainCurrency = ref(props.valute.Nominal);
const mainCharCode = ref(props.valute.CharCode);
const subCurrency = ref(props.valute.Value);
const subCharCode = ref("RUB");
const isPreviousGreatest = ref(!!(props.valute.Previous > props.valute.Value));

function getValuteChanges(current, previous) {
  const valueChanges = current - previous;
  return parseFloat(valueChanges).toFixed(2);
}

function changeCurrency() {
  if (mainCharCode.value === "RUB") {
    mainCurrency.value = props.valute.Nominal;
    mainCharCode.value = props.valute.CharCode;
    subCurrency.value = props.valute.Value;
    subCharCode.value = "RUB";
  } else {
    mainCharCode.value = "RUB";
    subCharCode.value = props.valute.CharCode;
    mainCurrency.value = props.valute.Nominal;
    subCurrency.value = (props.valute.Nominal / props.valute.Value).toFixed(4);
  }
}
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  align-items: center;
  font-size: 20px;
  .main {
    margin-right: 5px;
  }
  .sub {
    margin-left: 5px;
  }

  .value-status-up {
    color: green;
  }
  .value-status-down {
    color: red;
  }

  button {
    background: #222222;
    border-radius: 4px;
    color: #fff;
    border: 0;
    padding: 6px 10px;
    font-size: 18px;
    line-height: 22px;
    margin: 0 5px;
    cursor: pointer;
    &:hover {
      background-color: #605f5f;
    }
  }
}
</style>
