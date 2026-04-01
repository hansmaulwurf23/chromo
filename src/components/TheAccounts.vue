<script setup lang="ts">
import {useTimeStore} from "@/stores/timeStore.ts";
import {
  mdiCheckboxOutline,
  mdiCloseBoxOutline, mdiShieldCrown, mdiTrashCanOutline
} from "@mdi/js";
import SvgIcon from "vue3-icon";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const store = useTimeStore();
const accounts = ref([])

onMounted(() => {
  store.fetchAccounts().then(res => accounts.value = res);
});

function deleteAccount(idx: number) {
  store.deleteAccount(accounts.value[idx], () => {
    accounts.value.splice(idx, 1);
  });
}
</script>

<template>
  <table class="table table-striped" id="accountsTable">
    <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th><svg-icon type="mdi" :path="mdiCheckboxOutline"></svg-icon></th>
      <th><svg-icon type="mdi" :path="mdiShieldCrown"></svg-icon></th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="a, i in accounts">
      <td>{{ a['name'] }}</td>
      <td>{{ a['email'] }}</td>
      <td><svg-icon type="mdi" @click="store.approveAccount(a)" :path="a['approved'] ? mdiCheckboxOutline : mdiCloseBoxOutline"></svg-icon></td>
      <td><svg-icon type="mdi" :path="mdiShieldCrown" :class="a['isAdmin'] ? 'text-success' : 'text-danger'"></svg-icon></td>
      <td><svg-icon type="mdi" @click="deleteAccount(i)" :path="mdiTrashCanOutline"></svg-icon> </td>
    </tr>
    </tbody>
  </table>

  <div class="alert alert-dismissible" role="alert" v-if="store.error">{{ store.error }}</div>
</template>

<style scoped>
#accountsTable tbody tr td svg {
  padding: 0;
}
</style>
