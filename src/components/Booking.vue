<script setup>
import { displayDate } from '@/helpers/date';
import { formatCurrency } from '@/helpers';

defineProps({
    booking: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="bg-white p-5 space-y-3 rounded-lg">
        <p class="text-gray-500 font-black">
            Fecha: <span class="font-normal">{{ displayDate(booking.date) }}</span>
            Hora: <span class="font-normal">{{ booking.time }}h</span>
        </p>

        <p class="text-lg font-black">Servicios solicitados:</p>
        <div v-for="service in booking.services" :key="service._id">
            <p>{{ service.name }}</p>
            <p class="text-xl font-bold text-blue-500">{{ formatCurrency(service.price) }}</p>
        </div>
        <p class="text-2xl font-black text-right">
            Total a pagar: {{ formatCurrency(booking.totalAmount) }}
        </p>
        <div class="flex gap-2 items-center">
            <button
                class="bg-blue-500 rounded-lg p-3 text-white text-sm uppercase font-black w-full hover:bg-blue-600"
            >
                Editar cita
            </button>
            <button
                class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black w-full hover:bg-red-700"
            >
                Cancelar cita
            </button>
        </div>
    </div>
</template>

<style scoped></style>