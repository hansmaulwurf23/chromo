<script setup lang="ts">
import {
  mdiCalendarToday, mdiCalendarWeek, mdiContentSave, mdiDelete
} from '@mdi/js'
import {useTimeStore} from "@/stores/timeStore.js";
import SvgIcon from "vue3-icon"

const store = useTimeStore()
</script>

<template>
  <div class="controlsContainer mx-2 mt-2">
    <button class="squarebtn" @click="store.deleteRecord(store.currentRecord.id)" title="Tag">
      <svg-icon type="mdi" size="36" :path="mdiDelete"></svg-icon>
    </button>
    <button class="squarebtn" @click="store.storeRecord(store.currentRecord)" title="Tag">
      <svg-icon type="mdi" size="36" :path="mdiContentSave"></svg-icon>
    </button>
    <button class="squarebtn" @click="store.currentDate = new Date()" title="Tag">
      <svg-icon type="mdi" size="36" :path="mdiCalendarToday"></svg-icon>
    </button>
    <button class="squarebtn" @click="$emit('showHighscore')">
      <svg-icon type="mdi" size="36" :path="mdiCalendarWeek"></svg-icon>
    </button>
  </div>
  <hr/>
</template>

<style scoped>
.controlsContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
