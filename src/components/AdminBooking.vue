<script setup>
import { displayDate } from '../helpers/date'
import { formatCurrency } from '../helpers';

const props = defineProps({
    booking: {
        type: Object
    }
})
</script>

<template>
    <div class="bg-white p-5 space-y-3 rounded-lg">
        <p class="text-gray-500 font-black">
            Fecha: <span class="font-normal">{{ displayDate(booking.date) }}</span>
            Hora: <span class="font-normal">{{ booking.time }}h</span>
        </p>

        <p class="text-gray-500 font-black">
            Nombre cliente: <span class="font-normal"> {{ booking.user.name }} </span>
        </p>

        <p class="text-gray-500 font-black">
            Email: <span class="font-normal"> {{ booking.user.email }} </span>
        </p>

        <p class="text-lg font-black">Servicios solicitados:</p>
        <div v-for="service in booking.services" :key="service._id">
            <p>{{ service.name }}</p>
            <p class="text-xl font-bold text-blue-500">{{ formatCurrency(service.price) }}</p>
        </div>

        <p class="text-2xl font-black text-right">
            Total a pagar: {{ formatCurrency(booking.totalAmount) }}
        </p>
    </div>
</template>