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
