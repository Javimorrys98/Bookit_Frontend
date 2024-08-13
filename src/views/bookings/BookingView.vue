<script setup>
import { ref } from 'vue';
import VueTalwindDatepicker from 'vue-tailwind-datepicker';
import SelectedService from '@/components/SelectedService.vue';
import { useBookingsStore } from '@/stores/bookings';
import { formatCurrency } from '@/helpers';

const bookingsStore = useBookingsStore();

const formatter = ref({
    date: 'DD/MM/YYYY',
    month: 'MMM',
})

const disabledDate = (date) => {
    const today = new Date();
    return date < today || date.getMonth() > today.getMonth() + 1 || [0, 6].includes(date.getDay());
}
</script>

<template>
    <div class="space-y-5">
        <h2 class="text-4xl font-extrabold text-white">Detalles de la cita y resumen.</h2>
        <p class="text-white text-lg">Verifica la información y confirma tu cita.</p>

        <h3 class="text-3xl font-extrabold text-white">Servicios:</h3>

        <p v-if="bookingsStore.noServicesSelected" class="text-white text-2xl text-center">Aún no se ha seleccionado
            ningún servicio.</p>

        <div v-else class="grid gap-5">
            <SelectedService v-for="service in bookingsStore.services" :key="service._id" :service="service" />
            <p class="text-right text-white text-2xl">Total a pagar:
                <span class="font-black">{{ formatCurrency(bookingsStore.totalAmount) }}</span>
            </p>
        </div>

        <div class="space-y-8" v-if="!bookingsStore.noServicesSelected">
            <h3 class="text-3xl font-extrabold text-white">Fecha y hora</h3>
            <div class="lg:flex gap-5 items-start">
                <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
                    <VueTalwindDatepicker 
                        v-model="bookingsStore.date" 
                        i18n="es-mx" 
                        as-single 
                        no-input
                        disable-in-range
                        :formatter="formatter"
                        :disable-date="disabledDate" />
                </div>
                <div class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
                    <button v-for="hour in bookingsStore.hours" :key="hour"
                        class="block text-blue-500 rounded-lg text-xl font-black p-3  hover:bg-blue-300 hover:text-white"
                        :class="bookingsStore.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
                        @click="bookingsStore.time = hour">
                        {{ hour }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="bookingsStore.isValidBooking" class="flex justify-end">
            <button 
                class="w-full bg-blue-500 p-3 rounded-lg uppercase font-black text-white mt-10"
                @click="bookingsStore.createBooking"    
            >
                Confirmar reserva
            </button>
        </div>
    </div>
</template>

<style scoped></style>