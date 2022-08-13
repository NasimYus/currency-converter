<template>
  <div class="navbar">
    <ul class="">
      <li>
        <router-link :to="{ name: 'currency-list' }">Список валют</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'converter' }">Конвертер</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
};
</script>

<style scoped lang="scss">
.navbar {
  padding: 15px;
  background-color: #eeecec;
  border-bottom: 1px solid #ccc;
  ul {
    display: flex;
    list-style-type: none;

    li {
      a {
        margin: 5px;
        color: black;
        text-decoration: none;
        cursor: pointer;
        &:hover {
          color: #a45757;
        }
      }
    }
  }
}
</style>
