<template>
  <vue-typewriter-next
    class="text"
    :words="[`${$t('hello')} ${userName} !`, `${$t('letsnote')}`, '    ']"
  ></vue-typewriter-next>
</template>

<script setup>
import { VueTypewriterNext } from "vue-typewriter-next";
import "vue-typewriter-next/dist/style.css";
import { onBeforeMount, ref } from "vue";

const userName = ref("");

onBeforeMount(() => {
  const user = localStorage.getItem("user");
  userName.value = JSON.parse(user).user.name;
});
</script>

<style scoped>
.text {
  text-align: center;
  width: 100vh;
  font-size: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
