import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'

export default defineNuxtPlugin(() => {
  const isLoading = ref(true)
  const componentsLoaded = ref(false)

  return {
    provide: {
      loading: {
        isLoading,
        start: () => {
          isLoading.value = true
          componentsLoaded.value = false
        },
        finish: () => {
          componentsLoaded.value = true
          console.log('Components loaded')
        },
        forceComplete: () => {
          isLoading.value = false
          console.log('Force completed loading')
        }
      }
    }
  }
}) 