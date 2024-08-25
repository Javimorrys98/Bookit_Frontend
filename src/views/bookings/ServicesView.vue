<script setup>
import ServiceItem from '@/components/ServiceItem.vue';
import { useRoute } from 'vue-router';
import { MAXIMUM_SERVICES } from '@/helpers/global';
import { useServicesStore } from '@/stores/services';
import { useBookingsStore } from '@/stores/bookings';

const servicesStore = useServicesStore();
const bookingsStore = useBookingsStore();

</script>

<template>
    <div>
        <h2 class="text-4xl font-extrabold text-white mt-10">Servicios</h2>
        <p class="text-white text-lg mt-5">Elige al menos un servicio para tu cita:</p>

        <div v-if="bookingsStore.servicesFull"
            class="rounded-lg bg-red-800 text-white mt-5 text-center p-2 font-bold text-xl">
            <p>{{ `No puedes elegir más de ${MAXIMUM_SERVICES} servicios en una cita.` }}</p>
        </div>

        <div class="grid grid-cols-2 gap-5 mt-5">
            <ServiceItem v-for="service in servicesStore.services" :key="service._id" :service="service" />
        </div>
    </div>
</template>

<style scoped></style>