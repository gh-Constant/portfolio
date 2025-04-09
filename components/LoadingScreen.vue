<template>
  <div 
    v-if="show" 
    class="fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500"
    :class="{ 'opacity-0': canFadeOut }"
    @transitionend="onTransitionEnd"
  >
    <div class="text-white text-2xl md:text-3xl font-mono flex flex-col items-center gap-2">
      <div class="relative h-[40px]">
        <div 
          class="typing-animation-1 absolute left-1/2 -translate-x-1/2"
          :class="{ 'cursor-hidden': firstLineDone }"
          @animationend="onFirstLineComplete"
        >
          Hi, I'm Constant.
        </div>
      </div>
      <div class="relative h-[40px]">
        <div 
          class="typing-animation-2 absolute left-1/2 -translate-x-1/2"
          :class="{ 'start-typing': firstLineDone }"
          @animationend="onSecondLineComplete"
        >
          Here is my portfolio
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isLoaded: Boolean
});

const show = ref(true);
const firstLineDone = ref(false);
const typingDone = ref(false);
const canFadeOut = ref(false);
const emit = defineEmits(['complete']);

const onFirstLineComplete = () => {
  setTimeout(() => {
    firstLineDone.value = true;
  }, 400); // Shorter pause between lines
};

const onSecondLineComplete = () => {
  typingDone.value = true;
  setTimeout(() => {
    if (props.isLoaded) {
      canFadeOut.value = true;
    }
  }, 600);
};

watch(() => props.isLoaded, (newValue) => {
  if (newValue && typingDone.value) {
    canFadeOut.value = true;
  }
});

const onTransitionEnd = () => {
  if (canFadeOut.value) {
    show.value = false;
    emit('complete');
  }
};
</script>

<style scoped>
.typing-animation-1,
.typing-animation-2 {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border: none;
  text-decoration: none;
}

.typing-animation-1::after,
.typing-animation-2::after {
  content: '|';
  position: absolute;
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-weight: 300;
}

.typing-animation-1 {
  width: 0;
  animation: typing-first 2.2s steps(16, end) forwards;
}

.typing-animation-1::after {
  animation: blink-caret 0.65s step-end infinite;
}

.cursor-hidden::after {
  display: none;
}

.typing-animation-2 {
  width: 0;
  visibility: hidden;
}

.typing-animation-2.start-typing {
  visibility: visible;
  animation: typing-second 2.4s steps(19, end) forwards;
}

.typing-animation-2.start-typing::after {
  animation: blink-caret 0.65s step-end infinite;
}

@keyframes typing-first {
  0% { width: 0 }
  10% { width: 8% }   /* "H" */
  12% { width: 12% }  /* "i" */
  14% { width: 12% }  /* pause */
  16% { width: 16% }  /* "," */
  20% { width: 20% }  /* " " */
  22% { width: 20% }  /* pause */
  25% { width: 25% }  /* "I" */
  27% { width: 30% }  /* "'m" */
  30% { width: 30% }  /* pause */
  33% { width: 35% }  /* " " */
  36% { width: 42% }  /* "Co" */
  40% { width: 48% }  /* "n" */
  42% { width: 48% }  /* pause */
  45% { width: 55% }  /* "s" */
  48% { width: 65% }  /* "ta" */
  52% { width: 65% }  /* pause */
  56% { width: 75% }  /* "n" */
  60% { width: 85% }  /* "t" */
  64% { width: 85% }  /* pause */
  68% { width: 100% } /* "." */
  100% { width: 100% }
}

@keyframes typing-second {
  0% { width: 0 }
  8% { width: 10% }   /* "He" */
  12% { width: 15% }  /* "re" */
  16% { width: 15% }  /* pause */
  20% { width: 20% }  /* " " */
  24% { width: 25% }  /* "i" */
  28% { width: 30% }  /* "s" */
  32% { width: 30% }  /* pause */
  36% { width: 35% }  /* " " */
  40% { width: 40% }  /* "m" */
  44% { width: 45% }  /* "y" */
  48% { width: 45% }  /* pause */
  52% { width: 50% }  /* " " */
  56% { width: 60% }  /* "po" */
  60% { width: 70% }  /* "rt" */
  64% { width: 70% }  /* pause */
  68% { width: 80% }  /* "fo" */
  72% { width: 90% }  /* "li" */
  76% { width: 100% } /* "o" */
  100% { width: 100% }
}

@keyframes blink-caret {
  from, to { opacity: 0 }
  50% { opacity: 1 }
}
</style> 