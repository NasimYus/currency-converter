<template>
  <div class="navbar">
    <ul>
      <li>
        <router-link
          class="list-item-button"
          :class="isActive === 'currency-list' ? 'active' : ''"
          :to="{ name: 'currency-list' }"
          @click="changeActiveButton('currency-list')"
          role="a"
        >
          Список валют
        </router-link>
      </li>
      <li>
        <router-link
          :class="isActive === 'converter' ? 'active' : ''"
          class="list-item-button"
          :to="{ name: 'converter' }"
          @click="changeActiveButton('converter')"
          role="a"
        >
          Конвертер
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isActive = ref("currency-list");

function changeActiveButton(buttonType) {
  isActive.value = buttonType;
}
</script>

<style scoped lang="scss">
.navbar {
  padding: 15px;
  background-color: #fff;
  margin: 0 auto 50px;
  max-width: 500px;

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;

    li {
      .list-item-button {
        font-size: 16px;
        line-height: 28px;
        color: #73787d;
        padding: 11px 16px;
        text-decoration: none;
        cursor: pointer;
      }
      .active,
      .list-item-button:hover {
        background-color: #f7f8f9;
        border-radius: 50px !important;
        color: #222 !important;
        text-decoration: none;
      }
    }
  }
}
</style>
