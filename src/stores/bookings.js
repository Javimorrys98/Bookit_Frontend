import { ref, computed, onMounted, inject, watch } from "vue";
import { defineStore } from "pinia";
import { MAXIMUM_SERVICES } from "@/helpers/global";
import { convertToISO, convertToDDMMYYYY } from "@/helpers/date";
import BookingAPI from "@/api/BookingAPI";
import { useRouter } from "vue-router";
import { useUserStore } from "./user";
import { useLoadingStore } from "./loading";

export const useBookingsStore = defineStore("bookings", () => {
    const toast = inject('toast')
    const router = useRouter();
    const userStore = useUserStore();
    const loadingStore = useLoadingStore();

    const bookingId = ref('')
    const services = ref([])
    const date = ref('')
    const time = ref('')
    const servicesFull = ref(false)
    const bookingsByDate = ref([])
    const hours = ref([])

    onMounted(() => {
        const startHour = 10;
        const endHour = 19;

        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00');
        }
    });

    watch(date, async () => {
        time.value = '';
        if (date.value === '') return;
        loadingStore.setLoading(true);

        //Obtenemos las citas cada vez que cambia la fecha
        const { data } = await BookingAPI.getByDate(date.value).finally(() => {
            loadingStore.setLoading(false);
        });

        // El booking id solo existe cuando se edita una cita
        if (bookingId.value) {
            console.log(data);
            bookingsByDate.value = data.filter(booking => booking._id !== bookingId.value);
            time.value = data.filter(booking => booking._id === bookingId.value)[0]?.time;
        } else {
            bookingsByDate.value = data;
        }
    });

    function onServiceSelected(service) {
        if (services.value.some(selectedService => selectedService._id === service._id)) {
            services.value = services.value.filter(selectedService => selectedService._id !== service._id);
        } else {
            if (services.value.length === MAXIMUM_SERVICES) {
                servicesFull.value = true;
                setTimeout(() => {
                    servicesFull.value = false;
                }, 3000);
                return;
            }
            services.value.push(service);
        }
    }

    async function saveBooking() {
        loadingStore.setLoading(true);

        const booking = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value,
        }

        if (bookingId.value) {
            try {
                const { data } = await BookingAPI.update(bookingId.value, booking);
                toast.open({
                    message: data.msg,
                    type: 'success',
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await BookingAPI.create(booking);
                toast.open({
                    message: data.msg,
                    type: 'success',
                });
            } catch (error) {
                console.log(error);
            }
        }
        
        clearBookingData();
        userStore.getUserBookings()
        await router.push({ name: 'my-bookings' });
        loadingStore.setLoading(false);
    }

    async function cancelBooking(id) {
        if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
            try {
                loadingStore.setLoading(true);
                const { data } = await BookingAPI.delete(id);

                toast.open({
                    message: data.msg,
                    type: 'success',
                });
            } catch (error) {
                toast.open({
                    message: error.response.data.msg,
                    type: 'error',
                });
            } finally {
                loadingStore.setLoading(false);
            }
        }

        userStore.getUserBookings()
    }

    function clearBookingData() {
        services.value = [];
        servicesFull.value = false;
        date.value = '';
        time.value = '';
        bookingId.value = '';
    }

    function setSelectedBooking(booking) {
        services.value = booking.services;
        date.value = convertToDDMMYYYY(booking.date);
        time.value = booking.time;
        bookingId.value = booking._id;
    }

    const isServiceSelected = computed(() => {
        return (id) => services.value.some(service => service._id === id);
    });

    const totalAmount = computed(() => {
        return services.value.reduce((total, service) => total + service.price, 0);
    })

    const noServicesSelected = computed(() => services.value.length === 0);

    const isValidBooking = computed(() => {
        return services.value.length > 0 && date.value !== '' && time.value !== '';
    })

    const isDateSelected = computed(() => date.value ? true : false);

    const disableTime = computed(() => {
        return (hour) => {
            return bookingsByDate.value.find(booking => booking.time === hour);
        }
    })

    return {
        onServiceSelected,
        saveBooking,
        cancelBooking,
        setSelectedBooking,
        clearBookingData,
        isServiceSelected,
        servicesFull,
        services,
        totalAmount,
        noServicesSelected,
        date,
        hours,
        time,
        isValidBooking,
        isDateSelected,
        disableTime,
    }
});