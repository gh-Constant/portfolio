<template>
  <section class="hero-section relative w-full min-h-screen overflow-hidden">
    <!-- Interactive Background with Three.js -->
    <div class="hero-section__background absolute inset-0 z-0">
      <canvas 
        ref="canvas" 
        class="interactive-background__canvas absolute inset-0 w-full h-full" 
        data-engine="three.js r155"
      ></canvas>
    </div>

    <!-- Tailwind Grid Overlay -->
    <div class="absolute inset-0 z-10 bg-[url('/grid.svg')] bg-repeat opacity-10 invert"></div>
    
    <!-- Content Container -->
    <div class="relative z-20 container mx-auto px-4 h-screen flex items-center justify-center">
      <div class="text-center max-w-6xl mx-auto">
        <!-- Logo -->
        <div class="mb-8">
          <h3 class="text-3xl md:text-4xl font-light text-white/90">vectors</h3>
        </div>
        
        <!-- Main Heading -->
        <div class="mb-12">
          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white/95 leading-tight">
            <span class="block">Human.</span>
            <span class="block">Strategic.</span>
            <span class="block">Technological.</span>
          </h1>
        </div>
        
        <!-- Subheading -->
        <div class="mb-12">
          <p class="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            Strategic Communications with a Technological and International DNA.
          </p>
        </div>
        
        <!-- CTA Button -->
        <div>
          <button class="px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-full border-2 border-white/90 text-white/90 hover:bg-white/10 transition-colors duration-300">
            Contact us
          </button>
        </div>
      </div>
    </div>
    
    <!-- Menu Button -->
    <div class="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 z-30 flex items-center">
      <button class="hidden sm:block px-6 md:px-8 py-2 md:py-3 rounded-full border-2 border-white/90 text-white/90 hover:bg-white/10 transition-colors duration-300 mr-4">
        Contact us
      </button>
      <button class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/90 flex items-center justify-center text-white/90 hover:bg-white/10 transition-colors duration-300">
        <span class="sr-only">Menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useNuxtApp } from '#app';

// Canvas reference
const canvas = ref(null);
const { $loading } = useNuxtApp();

// Three.js variables
let scene, camera, renderer, uniforms, animationFrameId;

// Initialize Three.js scene
const initThree = () => {
  if (!canvas.value) return;
  
  // Import Three.js dynamically (for Nuxt compatibility)
  import('three').then((THREE) => {
    // Set up renderer
    renderer = new THREE.WebGLRenderer({ 
      canvas: canvas.value,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Set up scene
    scene = new THREE.Scene();
    
    // Set up camera
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Create shader material with purple gradient
    uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_mouseIntensity: { value: 0.0 },
      u_color1: { value: new THREE.Color('#B721FF') },  // Bright purple
      u_color2: { value: new THREE.Color('#9333EA') },  // Vibrant purple
      u_color3: { value: new THREE.Color('#7E22CE') },  // Rich purple
      u_color4: { value: new THREE.Color('#6B21A8') }   // Deep purple
    };
    
    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_mouseIntensity;
      uniform vec3 u_color1;
      uniform vec3 u_color2;
      uniform vec3 u_color3;
      uniform vec3 u_color4;
      
      varying vec2 vUv;
      
      void main() {
        // Create animated gradient with faster movement and mouse interaction
        float distanceFromMouse = length(vUv - u_mouse);
        float mouseEffect = (1.0 - distanceFromMouse) * u_mouseIntensity;
        
        float noise = sin(vUv.x * 8.0 + u_time + mouseEffect * 5.0) * 0.1 + 
                     cos(vUv.y * 6.0 + u_time * 1.2 + mouseEffect * 5.0) * 0.1;
        
        // Base gradient from top-left to bottom-right with mouse influence
        vec2 gradPos = vUv + vec2(
          sin(u_time * 0.3 + mouseEffect) * 0.1, 
          cos(u_time * 0.4 + mouseEffect) * 0.1
        );
        float gradVal = (gradPos.x + gradPos.y) * 0.5 + noise;
        
        // Mix colors based on gradient value
        vec3 color;
        if (gradVal < 0.33) {
          color = mix(u_color1, u_color2, smoothstep(0.0, 0.33, gradVal));
        } else if (gradVal < 0.66) {
          color = mix(u_color2, u_color3, smoothstep(0.33, 0.66, gradVal));
        } else {
          color = mix(u_color3, u_color4, smoothstep(0.66, 1.0, gradVal));
        }
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;
    
    const vertexShader = `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;
    
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    window.addEventListener('resize', onResize);
    animate();
    
    // Signal that Three.js is ready
    $loading.componentLoaded('HeroSection');
  }).catch(error => {
    console.error('Failed to load Three.js:', error);
    // Still mark component as loaded on error
    $loading.componentLoaded('HeroSection');
  });
};

// Animation loop
const animate = () => {
  uniforms.u_time.value += 0.015;
  
  renderer.render(scene, camera);
  animationFrameId = requestAnimationFrame(animate);
};

// Handle window resize
const onResize = () => {
  if (!renderer || !canvas.value) return;
  
  const width = canvas.value.clientWidth;
  const height = canvas.value.clientHeight;
  
  renderer.setSize(width, height);
  uniforms.u_resolution.value.set(width, height);
};

// Handle mouse movement for interactive effect
const onMouseMove = (event) => {
  if (!uniforms) return;
  
  const x = event.clientX / window.innerWidth;
  const y = 1.0 - (event.clientY / window.innerHeight);
  
  uniforms.u_mouse.value.set(x, y);
  uniforms.u_mouseIntensity.value = 0.5;
};

// Handle mouse leave
const onMouseLeave = () => {
  if (!uniforms) return;
  uniforms.u_mouseIntensity.value = 0.0;
};

// Lifecycle hooks
onMounted(() => {
  // Registration is now handled in pages/index.vue
  // $loading.registerComponent('HeroSection'); 
  initThree();
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave', onMouseLeave);
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  
  window.removeEventListener('resize', onResize);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseleave', onMouseLeave);
  
  if (renderer) {
    renderer.dispose();
  }
  
  if (scene) {
    scene.clear();
  }
});
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  color: white;
  display: flex;
  align-items: center;
  background-color: black; /* Fallback color */
}

.hero-section__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.interactive-background__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}

/* Animation for text elements */
h1 span {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
  animation-fill-mode: both;
}

h1 span:nth-child(1) {
  animation-delay: 0.05s;
}

h1 span:nth-child(2) {
  animation-delay: 0.15s;
}

h1 span:nth-child(3) {
  animation-delay: 0.25s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive text adjustments */
@media (max-width: 640px) {
  h1 {
    line-height: 1.2;
  }
  
  h1 span {
    margin-bottom: 0.5rem;
  }
}
</style> 