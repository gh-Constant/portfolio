import { defineNuxtPlugin } from '#app'
import { ref } from 'vue'

export default defineNuxtPlugin(() => {
  const isLoading = ref(true)
  const componentsLoaded = ref(false)
  const componentStates = new Map()

  const checkAllComponentsLoaded = () => {  
    const allLoaded = Array.from(componentStates.values()).every(state => state === true)
    if (allLoaded && componentStates.size > 0) {
      componentsLoaded.value = true
      console.log('All components loaded:', Array.from(componentStates.entries()))
    }
  }

  return {
    provide: {
      loading: {
        isLoading,
        registerComponent: (componentName: string) => {
          console.log(`Registering component: ${componentName}`)
          componentStates.set(componentName, false)
        },
        componentLoaded: (componentName: string) => {
          console.log(`Component loaded: ${componentName}`)
          componentStates.set(componentName, true)
          checkAllComponentsLoaded()
        },
        start: () => {
          isLoading.value = true
          componentsLoaded.value = false
          componentStates.clear()
        },
        finish: () => {
          if (componentsLoaded.value) {
            isLoading.value = false
          }
        },
        forceComplete: () => {
          isLoading.value = false
          console.log('Force completed loading')
        }
      }
    }
  }
}) 