<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
store.dispatch("getCurrencyList");
</script>
