import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import ymdFormat from '../utils.js'
import router from "@/router";


export const useTimeStore = defineStore('timeStore', () => {
  const currentDate = ref(ymdFormat(new Date()))
  const currentRecord = ref({})
  const darkTheme = ref(true)
  const loading = ref(false)
  const error = ref("")
  const profile = ref({})
  const BACKEND = import.meta.env.VITE_BACKEND_URL

  axios.defaults.baseURL = BACKEND;
  axios.defaults.headers.common['X-Auth-Token'] = localStorage.getItem('creds')
  axios.defaults.validateStatus = (status) => (status < 500)
  axios.interceptors.response.use((response) => response,
    (err) => {
    console.log(err);
    if (!err.response) {
      console.error(err);
    } else if (err.response.status === 401) {
      profile.value = {}
      router.push('/auth')
    }
  });

  function toggleDarkTheme() {
    console.log('toggle dark theme');
    darkTheme.value = !darkTheme.value;
    document.documentElement.setAttribute('data-bs-theme', darkTheme.value ? 'dark': 'light');
  }

  function changedDate() {
    loading.value = true;
    error.value = "";
    axios.get(`records/${currentDate.value}`)
      .then((response) => {
        currentRecord.value = response.data;
      }).catch((err) => {
      if (err?.response?.status === 404) {
        error.value = "Neuer Eintrag!"
        currentRecord.value = {"wann": currentDate.value}
      } else {
        error.value = err.message || "Failed to fetch items";
      }
    }).finally(() => {
      loading.value = false;
    });
  }

  function storeRecord() {
    axios.post('/records', currentRecord.value)
      .then((response) => {
        return response.data;
      }).catch((err) => {
        error.value = err.message || "Failed to add item";
      });
  }

  function deleteRecord(id: str) {
    axios.delete(`records/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        error.value = err.message || "Failed to delete item";
      });
  }

  function addVerfuegungszeit() {
    // currentRecord.value.verf.push({von: '14:00', bis: '16:00', name: 'Eintrag'})
    currentRecord.value.verf.push({})
  }

  function removeVerfuegungszeit(idx: number) {
    currentRecord.value.verf.splice(idx, 1);
  }

  function initProfile(email: string, callback: () => void) {
    axios.get(`accounts/${email}`)
    .then((response) => {
      console.log(response.data);
      profile.value = response.data;
      callback();
    })
  }

  function fetchAccounts() {
    return axios.get('accounts').then(response => response.data);
  }

  function approveAccount(account: any) {
    axios.post(`accounts/approve/${account['email']}`)
      .then((response) => {
        account['approved'] = true;
      })
  }

  function deleteAccount(account: any, callback: () => void) {
    axios.delete(`accounts/${account['email']}`)
      .then((response) => {
        callback();
      })
  }

  return {
    darkTheme,
    currentDate,
    currentRecord,
    error,
    loading,
    profile,
    // methods =============================
    changedDate,
    toggleDarkTheme,
    addVerfuegungszeit,
    removeVerfuegungszeit,
    storeRecord,
    deleteRecord,
    initProfile,
    fetchAccounts,
    deleteAccount,
    approveAccount
  }
})
