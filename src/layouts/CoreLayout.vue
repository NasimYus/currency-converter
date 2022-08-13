<template>
  <the-navbar />
  <router-view v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const TheNavbar = defineAsyncComponent(() =>
  import("../components/core/TheNavbar")
);
</script>
