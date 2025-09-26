<script setup lang="ts">
import {
  mdiRestart, mdiPodium
} from '@mdi/js'
import {useTimeStore} from "@/stores/timeStore.js";
import SvgIcon from "vue3-icon"

const store = useTimeStore()
</script>

<template>
  <div class="controlsContainer mx-2 mt-2">
    <button class="squarebtn" @click="store.increment()">
      <svg-icon type="mdi" size="36" :path="mdiRestart"></svg-icon>
    </button>
    <button class="squarebtn" @click="$emit('showHighscore')">
      <svg-icon type="mdi" size="36" :path="mdiPodium"></svg-icon>
    </button>
  </div>
</template>

<style scoped>
.controlsContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
