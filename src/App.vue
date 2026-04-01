<script setup lang="ts">
import {RouterLink, RouterView, useRouter} from 'vue-router'
import {useTimeStore} from "@/stores/timeStore.ts";
import {onMounted} from "vue";
import decodeJwtResponse from "@/auth.ts";
import TheNav from "@/components/TheNav.vue";

const store = useTimeStore()
const router = useRouter()
document.documentElement.setAttribute('data-bs-theme', store.darkTheme ? 'dark' : 'light');

onMounted(() => {
  if (!store.profile?.email) {
    if (localStorage.getItem('creds')) {
      const responsePayload = decodeJwtResponse(localStorage.getItem('creds'));
      const email = responsePayload.email;
      store.initProfile(email, () => {
        console.log('loaded pofile from localStorage');
      });
    } else {
      console.log('No profile found. Redirecting to auth');
      router.push({name: 'auth'});
    }
  }
})
</script>

<template>
  <header>
    <nav>
      <TheNav/>

    </nav>
  </header>

  <RouterView />

  <footer>
      <RouterLink to="/about">About</RouterLink>
  </footer>
</template>

<style scoped>
#appContainer {
  display: flex;
  flex-direction: column;
}
</style>
