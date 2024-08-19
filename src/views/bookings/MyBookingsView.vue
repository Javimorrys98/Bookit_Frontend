<script setup>
import Booking from '@/components/Booking.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();   
</script>

<template>
    <div>
        <h2 class="text-4xl font-extrabold text-white mt-10">Tus citas</h2>
        <p class="text-white text-lg mt-5">Aquí puedes administrar tus citas.</p>

        <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">Cargando tus citas...</p>
        <div v-else>
            <p v-if="userStore.noBookings" class="text-white text-2xl text-center mt-5">No tienes citas pendientes.</p>
            <div v-else class="grid grid-cols-1 gap-5 mt-10">
                <Booking v-for="booking in userStore.userBookings" :key="booking._id" :booking="booking" />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>