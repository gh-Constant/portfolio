<template>
  <main>
    <LoadingScreen :is-visible="isLoading" />
    <div :class="{ 'opacity-0': isLoading }">
      <HeroSection />
      <PortfolioSection />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';
import HeroSection from '~/components/HeroSection.vue';
import PortfolioSection from '~/components/PortfolioSection.vue';
import LoadingScreen from '~/components/LoadingScreen.vue';

const { $loading } = useNuxtApp();
const isLoading = ref(true);

// Minimum animation duration is 4s (2s per line)
const ANIMATION_DURATION = 4000;

onMounted(() => {
  console.log('Page mounted, starting animations...');
  
  // Set a timeout for the minimum animation duration
  setTimeout(() => {
    console.log('Animation duration complete');
    $loading.forceComplete();
    isLoading.value = false;
  }, ANIMATION_DURATION);
});
</script>

<style scoped>
main > div {
  transition: opacity 0.5s ease-out;
}
</style>