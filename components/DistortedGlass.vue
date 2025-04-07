<template>
  <TresCanvas window-size clear-color="#000000">
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <TresDirectionalLight :intensity="2" :position="[0, 2, 3]" />
    <Suspense>
      <TresGroup :scale="1"> <!-- Adjust scale as needed -->
        <Text3D font="/fonts/PPNeueMontreal-Bold.otf" :position="[0, 0, -1]" :size="0.5" color="white" anchor-x="center" anchor-y="middle">
          hello world!
        </Text3D>
        <!-- Primitive is used to render existing Object3D instances -->
        <primitive v-if="model" :object="model" ref="torusMeshRef">
          <MeshTransmissionMaterial v-bind="materialProps" />
        </primitive>
      </TresGroup>
    </Suspense>
    <Suspense>
      <Environment preset="city" />
    </Suspense>
  </TresCanvas>
</template>

<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { useGLTF, Environment, MeshTransmissionMaterial, Text3D } from '@tresjs/cientos'
import { shallowRef } from 'vue'

// Ref for the mesh
const torusMeshRef = shallowRef<THREE.Mesh | null>(null)

// Load the GLTF model
// Use shallowRef for nodes as well, as we only need the object reference
const { nodes } = await useGLTF('/models/torrus.glb', { draco: true })

// Find the torus mesh within the loaded nodes
// Check for 'Torus002' or fallback to the first available mesh
const model = shallowRef(nodes['Torus002'] || Object.values(nodes).find(node => node.isMesh))

// Define material properties
const materialProps = {
  thickness: 0.2,
  roughness: 0,
  transmission: 1,
  ior: 1.2,
  chromaticAberration: 0.02,
  backside: true,
}

// Animation loop
const { onLoop } = useRenderLoop()
onLoop(() => {
  if (torusMeshRef.value) {
    torusMeshRef.value.rotation.x += 0.01 // Slightly adjusted rotation speed
  }
})
</script> 