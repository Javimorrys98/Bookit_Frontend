<script setup>
import AdminBooking from '@/components/AdminBooking.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>

<template>
    <div>
        <p class="text-white text-lg mt-5">A continuación podrás administrar las próximas reservas:</p>
        
        <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">Cargando...</p>
        <div v-else>
            <p v-if="userStore.noBookings">
                No tienes reservas próximas.
            </p>
            <div v-else class="grid grid-cols-1 gap-5 mt-10">
                <AdminBooking v-for="booking in userStore.userBookings" :key="booking._id" :booking="booking" />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>