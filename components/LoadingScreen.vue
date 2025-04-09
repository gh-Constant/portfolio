<template>
  <div 
    :class="['fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-500', 
            { 'opacity-0 pointer-events-none': !isVisible }]"
  >
    <div class="text-center typewriter">
      <h1 class="text-white text-2xl md:text-4xl font-light mb-4 first-line">Hi, I'm Constant.</h1>
      <h1 class="text-white text-2xl md:text-4xl font-light delayed-typing">Welcome to my portfolio</h1>
    </div>
    <div 
      v-if="showLoadingDots" 
      class="text-white mt-8 text-xl loading-dots"
    >
      Loading<span>.</span><span>.</span><span>.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

defineProps({
  isVisible: {
    type: Boolean,
    default: true
  }
});

const showLoadingDots = ref(false);

onMounted(() => {
  console.log('LoadingScreen mounted, starting typing animations...');
  // Show loading dots after typing animations (4s)
  setTimeout(() => {
    console.log('Typing animations complete, showing loading dots');
    showLoadingDots.value = true;
  }, 4000);
});
</script>

<style scoped>
.typewriter h1 {
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .15em;
  border-right: 0; /* Ensure no cursor is visible by default */
}

.typewriter h1.first-line {
  width: 0;
  animation: 
    typing 2s steps(40, end) forwards,
    firstLineCursor 2s steps(1) forwards;
}

.typewriter h1.first-line.typed {
  border-right-color: transparent;
}

.typewriter h1.delayed-typing {
  width: 0;
  opacity: 0;
  animation: 
    typing 2s steps(40, end) 2s forwards,
    secondLineCursor 2s steps(1) 2s forwards,
    showLine 0s 2s forwards;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes firstLineCursor {
  0%, 99% { border-right: .15em solid rgba(255, 255, 255, 0.9); }
  100% { border-right: 0; }
}

@keyframes secondLineCursor {
  0%, 100% { border-right: .15em solid rgba(255, 255, 255, 0.9); }
}

@keyframes showLine {
  to { opacity: 1; }
}

/* Loading dots animation */
.loading-dots {
  opacity: 0;
  animation: fadeIn 0.5s ease-in forwards;
}

.loading-dots span {
  animation: loadingDots 1.5s infinite;
  opacity: 0;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.5s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 1s;
}

@keyframes loadingDots {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style> 