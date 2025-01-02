<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BookingAPI from '@/api/BookingAPI';
import { useBookingsStore } from '@/stores/bookings';
import { useLoadingStore } from '@/stores/loading';

const route = useRoute();
const router = useRouter();

const { id } = route.params;

const bookingsStore = useBookingsStore();
const loadingStore = useLoadingStore();

onMounted( async () => {
    try {
        loadingStore.setLoading(true);
        const { data } = await BookingAPI.getById(id);
        bookingsStore.setSelectedBooking(data);
    } catch (error) {
        console.log(error);
        router.push({ name: 'my-bookings' });
    } finally {
        loadingStore.setLoading(false);
    }
});
</script>

<template>
    <div>
        <nav class="my-5 flex gap-3">
            <RouterLink :to="{ name: 'edit-booking' }"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-300 hover:text-white rounded-lg"
                :class="route.name === 'edit-booking' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'">
                Servicios
            </RouterLink>

            <RouterLink :to="{ name: 'edit-booking-details' }"
                class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-300 hover:text-white rounded-lg"
                :class="route.name === 'edit-booking-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'">
                Cita y resumen
            </RouterLink>
        </nav>
        <RouterView />
    </div>
</template>

<style scoped></style>