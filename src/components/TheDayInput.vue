<script setup lang="ts">
import {useTimeStore} from "@/stores/timeStore.ts";
import {mdiPlus, mdiTrashCanOutline} from "@mdi/js";
import SvgIcon from "vue3-icon";

const store = useTimeStore();
store.changedDate();
</script>

<template>
  <div class="input-group">
    <label class="form-label w-25" for="day">Tag:</label>
    <input class="form-control" type="date" name="day" @change="store.changedDate()" v-model="store.currentDate"/>
  </div>
  <div class="input-group">
    <label class="form-label w-25" for="start">Arbeitszeit</label>
    <input class="form-control w-25" v-model="store.currentRecord.von" type="time" name="von"/>
    <input class="form-control w-25" v-model="store.currentRecord.bis" type="time" name="bis"/>
  </div>
  <div class="input-group">
    <label class="form-label w-25" for="pstart">Pause</label>
    <input class="form-control w-25" type="time" v-model="store.currentRecord.pvon" name="pvon"/>
    <input class="form-control w-25" type="time" v-model="store.currentRecord.pbis" name="pbis"/>
  </div>
  <div class="input-group">
    <label class="form-label w-25" for="bemerkung">Bemerkung</label>
    <input class="form-control w-75" v-model="store.currentRecord.bemerkung"/>
  </div>

  <h5 class="mt-4">Verfügungszeiten
    <button class="squarebtn" @click="store.addVerfuegungszeit()" title="Neu">
      <svg-icon type="mdi" size="36" :path="mdiPlus"></svg-icon>
    </button>
  </h5>
  <div class="input-group mt-3" v-for="verf, idx in store.currentRecord.verf">
    <input class="form-control w-100" v-model="verf.name"/>
    <input class="form-control w-25" type="time" name="von" v-model="verf.von"/>
    <input class="form-control w-25" type="time" name="bis" v-model="verf.bis"/>
    <button class="squaresmbtn btn-danger" @click="store.removeVerfuegungszeit(idx)" title="Eintrag entfernen">
      <svg-icon type="mdi" size="16" :path="mdiTrashCanOutline"></svg-icon>
    </button>
  </div>

  <div class="alert alert-dismissible" role="alert" v-if="store.error">{{ store.error }}</div>
</template>

<style scoped>

</style>
