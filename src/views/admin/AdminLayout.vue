<script setup>
import { useUserStore } from '../../stores/user'
const userStore = useUserStore()
</script>


<template>
    <div>
        <div class="flex justify-between">
            <div>
                <h1 class="text-6xl font-black text-white">Bookit</h1>
                <h2 class="text-2xl font-black text-white mt-5">Panel de administración</h2>
            </div>
    
            <div class="flex flex-col space-y-5">
                <div class="flex gap-2 items-center">
                    <p class="text-white text-right font-semibold">¡Bienvenido/a {{userStore.getUserName}}!</p>
                    <button type="button" @click="userStore.logout"
                        class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
        <main class="space-y-6">
            <RouterView />
        </main>
    </div>
</template>