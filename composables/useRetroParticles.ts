import { onMounted, onUnmounted, type Ref } from 'vue'
import * as THREE from 'three'

export function useRetroParticles(canvasRef: Ref<HTMLCanvasElement | null>) {
  let renderer: THREE.WebGLRenderer | null = null
  let animationFrameId: number | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.PerspectiveCamera | null = null
  let particleMesh: THREE.Points | null = null
  let particlesGeometry: THREE.BufferGeometry | null = null
  let particlesMaterial: THREE.PointsMaterial | null = null

  const clock = new THREE.Clock()

  const init = () => {
    // Ensure canvas exists before proceeding
    if (!canvasRef.value) {
      console.error("Canvas element not found for Three.js initialization.");
      return;
    }

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000080, 1) // Dark blue background

    // Retro Particle System
    particlesGeometry = new THREE.BufferGeometry()
    const particlesCnt = 5000
    const posArray = new Float32Array(particlesCnt * 3) // x, y, z
    const colors = new Float32Array(particlesCnt * 3) // r, g, b

    const retroColors = [
      new THREE.Color(0xFFFF00), // Yellow
      new THREE.Color(0x00FF00), // Green
      new THREE.Color(0xFF00FF), // Magenta
      new THREE.Color(0x00FFFF), // Cyan
      new THREE.Color(0xFF0000), // Red
    ]

    // Initialize positions
    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10 // Spread particles
    }

    // Initialize colors
    for (let i = 0; i < particlesCnt; i++) {
      const color = retroColors[Math.floor(Math.random() * retroColors.length)]
      colors[i * 3 + 0] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true, // Use vertex colors
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending // Brighter where particles overlap
    })

    particleMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particleMesh)

    camera.position.z = 2

    // Add event listeners and start animation
    window.addEventListener('resize', handleResize)
    animate()
  }

  const animate = () => {
     // Guard clauses to ensure objects exist
    if (!renderer || !scene || !camera || !particleMesh || !particlesGeometry) {
        animationFrameId = requestAnimationFrame(animate); // Keep trying if not ready
        return;
    }

    const elapsedTime = clock.getElapsedTime()

    // Update particles rotation
    particleMesh.rotation.y = elapsedTime * 0.05
    particleMesh.rotation.x = elapsedTime * 0.03

    // Make particles "jiggle"
    const positions = particlesGeometry.attributes.position.array as Float32Array;
    const count = particlesGeometry.attributes.position.count;
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3 + 0];
        // Apply wave effect on y-axis based on x position and time
        positions[i3 + 1] += Math.sin(elapsedTime + x * 0.5) * 0.0005;
    }
    particlesGeometry.attributes.position.needsUpdate = true; // Important!

    renderer.render(scene, camera)
    animationFrameId = requestAnimationFrame(animate)
  }

  const handleResize = () => {
    if (!camera || !renderer) return;

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio);
  }

  const cleanup = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null;
    }
    window.removeEventListener('resize', handleResize)
    // Dispose Three.js objects
    renderer?.dispose()
    particlesGeometry?.dispose()
    particlesMaterial?.dispose()
    // Help garbage collector
    scene = null
    camera = null
    renderer = null
    particleMesh = null
    particlesGeometry = null
    particlesMaterial = null
  }

  // Use Vue lifecycle hooks within the composable
  onMounted(() => {
    // We init here to ensure the canvasRef is populated after component mount
    init()
  })

  onUnmounted(() => {
    cleanup()
  })

  // This composable doesn't need to return anything for this use case
} 