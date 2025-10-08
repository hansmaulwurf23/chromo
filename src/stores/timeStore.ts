import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import ymdFormat from '../utils.js'


export const useTimeStore = defineStore('timeStore', () => {
  const currentDate = ref(ymdFormat(new Date()))
  const currentRecord = ref({})
  const darkTheme = ref(true)
  const loading = ref(false)
  const error = ref("")

  function toggleDarkTheme() {
    console.log('toggle dark theme');
    darkTheme.value = !darkTheme.value;
    document.documentElement.setAttribute('data-bs-theme', darkTheme.value ? 'dark': 'light');
  }

  function changedDate() {
    loading.value = true;
    error.value = "";
    axios.get(`http://localhost:8000/records/${currentDate.value}`)
      .then((response) => {
        currentRecord.value = response.data;
      }).catch((err) => {
      if (err.response.status === 404) {
        error.value = "Neuer Eintrag!"
        currentRecord.value = {}
      } else {
        error.value = err.message || "Failed to fetch items";
      }
    }).finally(() => {
      loading.value = false;
    });
  }

  function storeRecord() {
    axios.post("http://localhost:8000/records", currentRecord.value)
      .then((response) => {
        return response.data;
      }).catch((err) => {
        error.value = err.message || "Failed to add item";
      });
  }

  function deleteRecord(id: str) {
    axios.delete(`http://localhost:8000/records/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        error.value = err.message || "Failed to delete item";
      });
  }

  function addVerfuegungszeit() {
    currentRecord.value.verf.push({von: '14:00', bis: '16:00', name: 'Eintrag'})
  }

  function removeVerfuegungszeit(idx: number) {
    currentRecord.value.verf.splice(idx, 1);
  }

  return {
    darkTheme,
    currentDate,
    currentRecord,
    error,
    loading,
    // methods =============================
    changedDate,
    toggleDarkTheme,
    addVerfuegungszeit,
    removeVerfuegungszeit,
    storeRecord,
    deleteRecord,
  }
})
