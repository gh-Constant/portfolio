<template>
  <main class="relative overflow-x-hidden">
    <LoadingScreen :is-visible="isLoading" :show-animation-content="showAnimationContent" />
    <div :class="{ 'opacity-0 pointer-events-none': isLoading }">
      <!-- Hero section with parallax movement -->
      <div class="fixed inset-0 z-0 will-change-transform" :style="{ transform: `translateY(${-scrollProgress}px)` }">
        <HeroSection />
      </div>
      
      <!-- Content wrapper that slides over the hero -->
      <div class="relative z-10 mt-[95vh]">
        <div class="bg-gradient-to-b from-black/85 to-black backdrop-blur-md shadow-2xl transform-gpu min-h-screen">
          <PortfolioSection />
          <!-- Add other sections here -->
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watchEffect, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';
import HeroSection from '~/components/HeroSection.vue';
import PortfolioSection from '~/components/PortfolioSection.vue';
import LoadingScreen from '~/components/LoadingScreen.vue';

const { $loading } = useNuxtApp();
const isLoading = ref(true); // Controls overall visibility and content opacity
const showAnimationContent = ref(false); // Controls if LoadingScreen shows text/dots
const needsMinDuration = ref(false); // Controls if the 4s timer is required
const minTimeElapsed = ref(false); // Tracks if the 4s timer finished (if needed)
const scrollProgress = ref(0);

// Minimum animation duration (only used for first visit ever)
// Should match the time until loading dots appear in LoadingScreen.vue (0.5s + 2s + 2s)
const ANIMATION_DURATION = 4500;

// Handle scroll for parallax effect
const handleScroll = () => {
  // Calculate scroll progress (slower movement for hero section)
  const scrolled = window.scrollY;
  scrollProgress.value = scrolled * 0.3; // Hero moves at 30% of scroll speed, smoother movement
};

onMounted(() => {
  console.log('Page mounted, determining loading state...');

  // Add scroll event listener for parallax
  window.addEventListener('scroll', handleScroll, { passive: true });

  const visitedEver = localStorage.getItem('hasVisited');
  const visitedThisSession = sessionStorage.getItem('sessionHasVisited');

  if (!visitedEver) {
    // State 1: First visit EVER
    console.log('State 1: First visit EVER. Showing full animation with min duration.');
    showAnimationContent.value = true;
    needsMinDuration.value = true;
    localStorage.setItem('hasVisited', 'true');
    sessionStorage.setItem('sessionHasVisited', 'true');
    // Start the timer only for this state
    setTimeout(() => {
      console.log('Minimum animation time elapsed (State 1).');
      minTimeElapsed.value = true;
    }, ANIMATION_DURATION);
  } else if (!visitedThisSession) {
    // State 2: First visit THIS SESSION (but visited before)
    console.log('State 2: First visit THIS SESSION. Showing full animation, no min duration.');
    showAnimationContent.value = true;
    needsMinDuration.value = false; // No minimum time needed
    minTimeElapsed.value = true; // Min time requirement is met immediately
    sessionStorage.setItem('sessionHasVisited', 'true');
  } else {
    // State 3: Returning visit THIS SESSION
    console.log('State 3: Returning visit THIS SESSION. Showing black screen, no min duration.');
    showAnimationContent.value = false; // Just black screen
    needsMinDuration.value = false; // No minimum time needed
    minTimeElapsed.value = true; // Min time requirement is met immediately
  }

  // Register components that need to load before the page is shown
  // IMPORTANT: HeroSection and PortfolioSection MUST inject $loading
  // and call $loading.componentLoaded('ComponentName') when ready.
  $loading.registerComponent('HeroSection');
  $loading.registerComponent('PortfolioSection');
  // Add other critical components if needed

  // Signal that the initial setup/registration is done.
  // $loading.isLoading will become false only when all registered components
  // have called componentLoaded AND this finish() method is called.
  $loading.finish();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Watch loading state and minimum time requirement
watchEffect(() => {
  // The minimum time requirement is met if it wasn't needed OR if the timer finished.
  const minTimeRequirementMet = !needsMinDuration.value || minTimeElapsed.value;
  // We are loading if the plugin says so OR if we need the min duration and it hasn't passed.
  const shouldBeLoading = $loading.isLoading.value || !minTimeRequirementMet;
  
  if (isLoading.value !== shouldBeLoading) {
    console.log(`Updating isLoading state: ${shouldBeLoading} ($loading.isLoading: ${$loading.isLoading.value}, needsMinDuration: ${needsMinDuration.value}, minTimeElapsed: ${minTimeElapsed.value})`);
    isLoading.value = shouldBeLoading;
  }
});
</script>

<style scoped>
main > div {
  transition: opacity 0.5s ease-out;
}

.pointer-events-none {
  pointer-events: none;
}

/* Enhanced smooth scrolling for the parallax effect */
:root {
  scroll-behavior: smooth;
}

/* For Safari and other webkit browsers */
main {
  -webkit-overflow-scrolling: touch;
}

/* For Firefox */
* {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

/* For Chrome and other webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  border: 2px solid transparent;
}

/* Smooth transitions for parallax elements */
.will-change-transform {
  transition: transform 0.2s cubic-bezier(0.33, 1, 0.68, 1);
}
</style>