<template>
  <div class="w-full h-screen">
    <ClientOnly>
      <DistortedGlass />
      <template #fallback>
        <!-- Optional: Add a loading indicator here -->
        <div class="w-full h-full flex items-center justify-center bg-black text-white">
          Loading 3D Scene...
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// Components like DistortedGlass are often auto-imported in Nuxt 3
// If not, uncomment the line below:
// import DistortedGlass from '~/components/DistortedGlass.vue'

// No additional script logic needed for this simple case
</script>

<style scoped>
/* Add any page-specific styles if necessary */
div {
  /* Ensure the container takes full viewport height */
  height: 100vh;
}
</style>
