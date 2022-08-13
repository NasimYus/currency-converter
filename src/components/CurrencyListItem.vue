<template>
  <div class="list-item">
    <div class="list-item-main">
      <span>{{ mainCurrency }} {{ mainCharCode }}</span>
    </div>
    <button @click="changeCurrency">&harr;</button>
    <div class="list-item-sub">
      <span>{{ subCurrency }} {{ subCharCode }}</span>
    </div>
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

function changeCurrency() {
  mainCharCode.value === "RUB"
    ? ((mainCurrency.value = props.valute.Nominal),
      (mainCharCode.value = props.valute.CharCode),
      (subCurrency.value = props.valute.Value),
      (subCharCode.value = "RUB"))
    : ((mainCharCode.value = "RUB"),
      (subCharCode.value = props.valute.CharCode),
      (mainCurrency.value = props.valute.Nominal),
      (subCurrency.value = (props.valute.Nominal / props.valute.Value).toFixed(
        4
      )));
}
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  font-size: 25px;
  .list-item-main {
    margin-right: 5px;
  }
  .list-item-sub {
    margin-left: 5px;
  }

  button {
    background-color: #ccc;
    border: 0;
    border-radius: 50%;
    padding: 5px;
    margin: 0 5px;
    cursor: pointer;
    &:hover {
      background-color: #a19d9d;
    }
  }
}
</style>
