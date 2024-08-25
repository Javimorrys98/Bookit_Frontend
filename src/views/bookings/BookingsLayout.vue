<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-6xl lg:text-6xl font-black text-white">Bookit</h1>
            <div class="flex flex-col space-y-5">
                <div class="flex gap-2 items-center justify-between">
                    <nav class="flex gap-2 items-center justify-end">
                        <p class="text-white text-right font-semibold">¡Bienvenido/a {{userStore.getUserName}}!</p>
                        <RouterLink :to="{ name: 'my-bookings' }"
                            class="p-2 text-gray-200 uppercase text-xs font-black rounded-lg  bg-blue-500 hover:bg-blue-600">
                            Mis citas
                        </RouterLink>
                        <RouterLink :to="{ name: 'new-booking' }"
                            class="p-2 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-500 hover:bg-blue-600">
                            Nueva cita
                        </RouterLink>
                    </nav>
                    <button type="button" @click="userStore.logout"
                        class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<style scoped></style>