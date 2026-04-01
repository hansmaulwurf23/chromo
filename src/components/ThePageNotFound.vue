<script setup lang="ts">
import {RouterLink, useRouter} from "vue-router";
import {onMounted} from "vue";

const router = useRouter();

onMounted(() => {
  console.log("will now redirect....");
  router.push("/")
})
</script>

<template>
  <pre>Nope. Not here. Not today.</pre>
</template>

<style scoped>
</style>
