import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimeStore = defineStore('timeStore', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  const darkTheme = ref(true)
  function increment() {
    count.value++
  }

  function toggleDarkTheme() {
    console.log('toggle dark theme');
    darkTheme.value = !darkTheme.value;
    document.documentElement.setAttribute('data-bs-theme', darkTheme.value ? 'dark': 'light');
  }

  return { darkTheme, count, doubleCount, increment, toggleDarkTheme }
})
