<template>
  <section class="currency-list">
    <div class="search-text">
      <input
        placeholder="Поиск названия валюты..."
        type="text"
        inputmode="text"
        v-model="searchText"
        :disabled="loading"
      />
    </div>
    <h1>Список валют</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-else>
      <div v-if="currencyList && currencyList.Valute.length">
        <ul v-for="valute in currencyList.Valute" :key="valute.ID">
          <li>
            <currency-list-item :valute="valute" />
          </li>
        </ul>
      </div>
      <div class="empty-data" v-else>
        <span>Нет данных</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, defineAsyncComponent, ref, watch } from "vue";
import { debounce } from "@/utils/debounce";
import { useStore } from "vuex";
const store = useStore();

const searchText = ref("");
const currencyList = ref([]);

const loading = computed(() => {
  return store.state.loading;
});

const storeCurrencyList = computed(() => {
  return store.state.currencyList;
});

watch(
  storeCurrencyList,
  (value) => {
    currencyList.value = JSON.parse(JSON.stringify(value));
  },
  { immediate: true }
);

watch(
  () => searchText.value,
  debounce(() => {
    if (!searchText.value.length) {
      currencyList.value = JSON.parse(JSON.stringify(storeCurrencyList.value));
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
.currency-list {
  .search-text {
    font-size: 20px;

    input {
      border: 1px solid #e5eaef;
      outline: 0;
      display: inline-block;
      width: 300px;
      padding: 10px 20px;
      background: transparent;
      border-radius: 4px;
      font-size: 18px;
      line-height: 150%;
      color: #222222;
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

  .empty-data {
    text-align: start;
    color: #73787d;
  }
}
</style>
