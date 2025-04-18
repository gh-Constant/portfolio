<template>
  <section class="portfolio-section relative min-h-screen">
    <!-- Three.js Canvas -->
    <canvas ref="canvas" class="absolute inset-0 w-full h-full"></canvas>

    <!-- Config Panel -->
    <div v-if="showConfig" class="absolute top-4 right-4 bg-black bg-opacity-80 p-4 rounded-lg z-10">
      <h3 class="text-white font-bold mb-4">Scene Configuration</h3>
      <div class="space-y-4">
        <div>
          <label class="text-white block mb-2">Title Y Position</label>
          <input
            type="range"
            v-model="config.mainTitleY"
            min="-5"
            max="5"
            step="0.1"
            class="w-full"
          />
        </div>
        <div>
          <label class="text-white block mb-2">Title Z Position</label>
          <input
            type="range"
            v-model="config.mainTitleZ"
            min="-10"
            max="0"
            step="0.1"
            class="w-full"
          />
        </div>
        <div>
          <label class="text-white block mb-2">Title Scale</label>
          <input
            type="range"
            v-model="config.clipboardScale"
            min="0.5"
            max="2"
            step="0.1"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <!-- Config Toggle Button -->
    <button
      class="absolute top-4 right-4 bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-3 py-2 rounded-md text-sm font-medium z-10"
      @click="showConfig = !showConfig"
    >
      {{ showConfig ? 'Hide Config' : 'Show Config' }}
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { useNuxtApp } from '#app'
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

const { $loading } = useNuxtApp()
const canvas = ref(null)
const showConfig = ref(false)

// Scene variables
let scene, camera, renderer, animationFrameId
let titleMesh, titleGroup
const projects = []
let scrollY = 0

// Configuration state
const config = reactive({
  mainTitleY: 2,
  mainTitleZ: -5,
  mainTitleScrollSpeed: 2,
  mainTitleFadeSpeed: 2,
  clipboardScale: 1,
  titleY: 1,
  descriptionY: 0,
  titleSize: 0.3,
  descriptionSize: 0.15,
  textVisibilityThreshold: 0.3,
})

// Project data
const projectsData = [
  {
    id: 1,
    title: "Digital Transformation",
    description: "Strategic digital solutions for enterprise clients",
    image: "https://source.unsplash.com/800x600/?technology",
  },
  {
    id: 2,
    title: "Brand Evolution",
    description: "Redefining brand identity in the digital age",
    image: "https://source.unsplash.com/800x600/?business",
  },
  {
    id: 3,
    title: "Innovation Lab",
    description: "Cutting-edge solutions for tomorrow's challenges",
    image: "https://source.unsplash.com/800x600/?innovation",
  },
]

// Initialize Three.js scene
const initScene = () => {
  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(10, 10, 10)
  spotLight.angle = 0.15
  spotLight.penumbra = 1
  scene.add(spotLight)

  // Load font and create title
  const fontLoader = new FontLoader()
  fontLoader.load('/fonts/Geist_Bold.json', (font) => {
    const titleGeometry = new TextGeometry('My Work', {
      font: font,
      size: 1.5,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    })

    titleGeometry.center()
    const titleMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
    })

    titleMesh = new THREE.Mesh(titleGeometry, titleMaterial)
    titleGroup = new THREE.Group()
    titleGroup.add(titleMesh)
    titleGroup.position.set(0, config.mainTitleY, config.mainTitleZ)
    scene.add(titleGroup)

    // Create project displays
    createProjects()

    // Signal that the component is loaded
    $loading.componentLoaded('PortfolioSection')
  })

  // Set initial camera position
  camera.position.set(0, 0, 10)
}

// Create project displays
const createProjects = () => {
  projectsData.forEach((project) => {
    // Create clipboard group
    const clipboardGroup = new THREE.Group()
    
    // Create frame
    const frameGeometry = new THREE.BoxGeometry(6.2, 7.2, 0.1)
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 })
    const frame = new THREE.Mesh(frameGeometry, frameMaterial)
    frame.position.z = -0.1
    clipboardGroup.add(frame)

    // Create inner frame
    const innerFrameGeometry = new THREE.BoxGeometry(6, 7, 0.1)
    const innerFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 })
    const innerFrame = new THREE.Mesh(innerFrameGeometry, innerFrameMaterial)
    innerFrame.position.z = -0.05
    clipboardGroup.add(innerFrame)

    // Load and add project image
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(project.image, (texture) => {
      const imageGeometry = new THREE.PlaneGeometry(5.8, 6.8)
      const imageMaterial = new THREE.MeshStandardMaterial({ map: texture })
      const imageMesh = new THREE.Mesh(imageGeometry, imageMaterial)
      clipboardGroup.add(imageMesh)
    })

    // Position the clipboard
    clipboardGroup.position.set(15, 0, -5)
    clipboardGroup.rotation.y = Math.PI * 0.1

    // Add to scene and store reference
    scene.add(clipboardGroup)
    projects.push({
      group: clipboardGroup,
      data: project,
    })
  })
}

// Animation loop
const animate = () => {
  if (!scene || !camera || !renderer) return

  // Update scroll-based animations
  const scrollOffset = scrollY / (document.documentElement.scrollHeight - window.innerHeight)

  // Animate title
  if (titleGroup) {
    titleGroup.position.y = config.mainTitleY - scrollOffset * config.mainTitleScrollSpeed
    if (titleMesh.material) {
      titleMesh.material.opacity = 1 - scrollOffset * config.mainTitleFadeSpeed
    }
  }

  // Animate projects
  projects.forEach((project, index) => {
    const scrollThreshold = 0.25 + index * 0.25
    const nextThreshold = scrollThreshold + 0.25
    
    const visibility = Math.max(0, Math.min(1, (scrollOffset - scrollThreshold) * 4))
    const exitVisibility = Math.max(0, Math.min(1, (scrollOffset - nextThreshold) * 4))

    const group = project.group
    if (group) {
      // Position and rotation
      group.position.x = 15 - visibility * 15
      group.position.z = -5 + visibility * 5
      group.rotation.y = Math.PI * 0.1 - visibility * Math.PI * 0.1

      // Exit animation
      group.position.x -= exitVisibility * 15

      // Scale
      const scale = config.clipboardScale
      group.scale.set(scale, scale, scale)

      // Opacity
      group.children.forEach((child) => {
        if (child.material) {
          child.material.opacity = visibility - exitVisibility
          child.material.transparent = true
        }
      })
    }
  })

  renderer.render(scene, camera)
  animationFrameId = requestAnimationFrame(animate)
}

// Handle window resize
const onResize = () => {
  if (!camera || !renderer || !canvas.value) return

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Handle scroll
const onScroll = () => {
  scrollY = window.scrollY
}

// Lifecycle hooks
onMounted(() => {
  initScene()
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', onScroll)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', onScroll)
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  if (renderer) {
    renderer.dispose()
  }

  if (scene) {
    scene.clear()
  }
})
</script>

<style scoped>
.portfolio-section {
  z-index: 10;
  transform: translateZ(0);
  backface-visibility: hidden;
}

input[type="range"] {
  width: 100%;
  height: 0.5rem;
  background-color: white;
  opacity: 0.2;
  border-radius: 0.5rem;
  -webkit-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1rem;
  height: 1rem;
  background-color: white;
  border-radius: 9999px;
  cursor: pointer;
}
</style> 