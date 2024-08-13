<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <div>
        <nav class="my-5 flex gap-3">
            <RouterLink :to="{ name: 'new-booking' }"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-300 hover:text-white rounded-lg"
                :class="route.name === 'new-booking' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'">
                Servicios
            </RouterLink>

            <RouterLink :to="{ name: 'booking-details' }"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-300 hover:text-white rounded-lg"
                :class="route.name === 'booking-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'">
                Cita y resumen
            </RouterLink>
        </nav>
        <RouterView />
    </div>
</template>

<style scoped></style>