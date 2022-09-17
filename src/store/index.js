import { createStore } from "vuex";

export default createStore({
  state: {
    currencyList: null,
    loading: false,
  },
  mutations: {
    SET_CURRENCY_LIST(state, currencyList) {
      state.currencyList = currencyList;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    /**
     * Method to get currency data
     * @returns {Promise<void>}
     */

    async getCurrencyList({ commit }) {
      commit("SET_LOADING", true);
      const url = "https://www.cbr-xml-daily.ru/daily_json.js";
      let response = await fetch(url);

      if (!response.ok) {
        console.log("Ошибка HTTP: " + response.status);
        return;
      }

      let json = await response.json();
      json.Valute = Object.values(json.Valute);
      commit("SET_CURRENCY_LIST", json);
      commit("SET_LOADING", false);
    },
  },
});
