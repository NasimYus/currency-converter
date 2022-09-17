<template>
  <div class="container">
    <the-navbar />
    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue";

const TheNavbar = defineAsyncComponent(() =>
  import("../components/core/TheNavbar")
);
</script>
<style scoped lang="scss">
.container {
  max-width: 1080px;
  margin: auto 200px;
}
</style>
