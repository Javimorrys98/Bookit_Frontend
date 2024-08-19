<script setup>
import { formatCurrency } from '@/helpers';
import { useBookingsStore } from '@/stores/bookings';

defineProps({
    service: {
        type: Object,
    }
})

const bookingsStore = useBookingsStore();
</script>

<template>
    <div class="p-5 space-y-5 rounded-lg cursor-pointer hover:bg-blue-300"
        :class="bookingsStore.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'"
        @click="bookingsStore.onServiceSelected(service)">
        <p class="text-2xl font-semibold">{{ service.name }}</p>
        <p class="text-4xl font-black"
            :class="bookingsStore.isServiceSelected(service._id) ? 'text-white' : 'text-blue-600'">
            {{ formatCurrency(service.price) }}
        </p>
    </div>
</template>

<style scoped></style>