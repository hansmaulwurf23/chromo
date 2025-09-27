<script setup lang="ts">
import {useTimeStore} from "@/stores/timeStore.ts";
import TheControls from "@/components/TheControls.vue";
import TheDayInput from "@/components/TheDayInput.vue";

const store = useTimeStore()
document.documentElement.setAttribute('data-bs-theme', store.darkTheme ? 'dark': 'light');
</script>

<template>
  <main>
    <div id="appContainer">
      <TheControls/>
      <TheDayInput/>
    </div>
  </main>
</template>

<style scoped>
#appContainer {
  display: flex;
  flex-direction: column;
}
</style>
