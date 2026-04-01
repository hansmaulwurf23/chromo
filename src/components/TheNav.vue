<script setup lang="ts">
import {
  mdiAccountMultiple,
  mdiCalendarToday, mdiContentSave, mdiContentSavePlus
} from '@mdi/js'
import {useTimeStore} from "@/stores/timeStore.js";
import SvgIcon from "vue3-icon"
import {RouterLink, useRouter} from "vue-router";

const store = useTimeStore()
const router = useRouter()
</script>

<template>
  <div class="controlsContainer mx-2 mt-2">
    <a class="squarebtn" @click="store.storeRecord(store.currentRecord)" title="Tag">
      <svg-icon type="mdi" size="36" :path="mdiContentSave" v-if="store.currentRecord._id"></svg-icon>
      <svg-icon type="mdi" size="36" :path="mdiContentSavePlus" v-if="!store.currentRecord._id"></svg-icon>
    </a>
    <RouterLink class="squarebtn" to="/">
      <svg-icon type="mdi" size="36" :path="mdiCalendarToday"></svg-icon>
    </RouterLink>
    <RouterLink class="squarebtn" to="/accounts">
      <svg-icon type="mdi" size="36" :path="mdiAccountMultiple"></svg-icon>
    </RouterLink>
    <RouterLink id="profilePicButton" class="avatar" to="/auth" v-if="store.profile?.picture">
      <img :src="store.profile?.picture" :title="store.profile.name" />
    </RouterLink>

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

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  transition: box-shadow .15s ease, transform .08s ease;
  width: 36px; height: 36px;
}

.avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
