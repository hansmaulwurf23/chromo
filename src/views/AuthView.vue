<script setup lang="ts">
import decodeJwtResponse from "@/auth.ts";
import {useTimeStore} from "@/stores/timeStore.ts";
import {useRouter} from "vue-router";

const store = useTimeStore();
const router = useRouter();

function onSignIn(credResponse) {
  const responsePayload = decodeJwtResponse(credResponse.credential);
  const email = responsePayload.email;
  localStorage.setItem('creds', credResponse.credential);

  store.initProfile(email, () => {
    router.push({name: 'home'});
  });
}

function signOut() {
  store.profile = {};
}

function initAuth() {
  google.accounts.id.initialize({
    client_id: '759432105765-o02lrnfrs1i600e5cklge7b34hqgpmb8.apps.googleusercontent.com',
    callback: onSignIn
  });
  google.accounts.id.prompt();
}
</script>

<template>
  <main>
    <template v-if="store.profile?.name">
      <h2>Angemeldet:</h2>
      <p>{{ store.profile.name }}<br/>
      {{ store.profile.email}}</p>

      <button @click="signOut">Abmelden</button>
    </template>
    <template v-else>
      <h1>Unangemeldet...</h1>
      <button @click="initAuth">Nimm Google!</button>
    </template>
  </main>
</template>
