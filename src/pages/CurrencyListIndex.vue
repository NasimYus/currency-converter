<template>
  <section class="container">
    <div class="search-text">
      <label for="">Поиск</label>
      <input type="text" v-model="searchText" />
    </div>
    <h2>Список валют</h2>
    <ul v-for="valute in currencyList.Valute" :key="valute.id">
      <li>
        <currency-list-item :valute="valute" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import { defineAsyncComponent, ref, watch } from "vue";

const currencyList = ref([]);
const currencyListCopy = ref([]);
const loading = ref(false);
const searchText = ref("");
getCurrencyList();

watch(
  () => searchText.value,
  () => {
    if (!searchText.value.length) {
      currencyList.value = JSON.parse(JSON.stringify(currencyListCopy.value));
    } else {
      currencyList.value.Valute = currencyList.value.Valute.filter((valute) => {
        if (
          valute.CharCode.toLowerCase().includes(
            searchText.value.trim().toLowerCase()
          )
        ) {
          return valute;
        }
      });
    }
  }
);

async function getCurrencyList() {
  loading.value = true;
  const url = "https://www.cbr-xml-daily.ru/daily_json.js";
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    currencyList.value = json;
    currencyList.value.Valute = Object.values(currencyList.value.Valute);
    currencyListCopy.value = JSON.parse(JSON.stringify(currencyList.value));
    loading.value = false;
  } else {
    console.log("Ошибка HTTP: " + response.status);
  }
}

const CurrencyListItem = defineAsyncComponent(() =>
  import("../components/CurrencyListItem")
);
</script>

<style scoped lang="scss">
.container {
  margin: 10px 55px;

  .search-text {
    font-size: 20px;
    label {
      margin-right: 10px;
    }
  }
  h2 {
    margin-top: 15px;
    margin-bottom: 5px;
  }
  ul {
    list-style-type: none;
    li {
      padding: 8px 0;
    }
  }
}
</style>
