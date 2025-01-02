<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()
</script>

<template>
  <div>
    <loading :active="loadingStore.isLoading"/>
    <div class="md:flex h-screen">
      <div class="h-64 md:h-auto bg-cover bg-center md:w-1/3 bg-app">
  
      </div>
      <div class="md:w-2/3 px-10 py-5 min-h-full overflow-y-scroll">
        <RouterView />
      </div>
    </div>
  </div>
</template>
