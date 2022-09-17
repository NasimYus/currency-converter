<template>
  <section class="container">
    <div class="search-text">
      <label for="">Поиск</label>
      <input
        placeholder="название валюты"
        type="text"
        inputmode="text"
        v-model="searchText"
        :disabled="loading"
      />
    </div>
    <h1>Список валют</h1>
    <section v-if="loading">Загрузка...</section>
    <section v-else>
      <ul v-for="valute in currencyList.Valute" :key="valute.ID">
        <li>
          <currency-list-item :valute="valute" />
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import { computed, defineAsyncComponent, ref, watch } from "vue";
import { debounce } from "@/utils/debounce";
import { useStore } from "vuex";
const store = useStore();

const searchText = ref("");
const currencyListCopy = ref([]);
const currencyList = ref([]);

const loading = computed(() => {
  return store.state.loading;
});

const storeCurrencyList = computed(() => {
  return JSON.parse(JSON.stringify(store.state.currencyList));
});

watch(
  storeCurrencyList,
  function (value) {
    currencyList.value = value;
    currencyListCopy.value = JSON.parse(JSON.stringify(currencyList.value));
  },
  { immediate: true }
);

watch(
  () => searchText.value,
  debounce(() => {
    if (!searchText.value.length) {
      currencyList.value = JSON.parse(JSON.stringify(currencyListCopy.value));
    } else {
      currencyList.value.Valute = currencyList.value.Valute.filter((valute) => {
        return valute.CharCode.toLowerCase().includes(
          searchText.value.trim().toLowerCase()
        );
      });
    }
  }, 500)
);

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
  h1 {
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
