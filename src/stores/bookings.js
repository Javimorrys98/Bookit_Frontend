import { ref, computed, onMounted, inject, watch } from "vue";
import { defineStore } from "pinia";
import { MAXIMUM_SERVICES } from "@/helpers/global";
import { convertToISO } from "@/helpers/date";
import BookingAPI from "@/api/BookingAPI";
import { useRouter } from "vue-router";

export const useBookingsStore = defineStore("bookings", () => {
    const toast = inject('toast')
    const router = useRouter();

    const services = ref([])
    const servicesFull = ref(false)
    const date = ref('')
    const hours = ref([])
    const time = ref('')
    const bookingByDate = ref([])

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
        //Obtenemos las citas cada vez que cambia la fecha
        const { data } = await BookingAPI.getByDate(date.value);
        bookingByDate.value = data;
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

    async function createBooking() {
        const booking = {
            services: services.value.map(service => service._id),
            date: convertToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value,
        }

        try {
            const { data } = await BookingAPI.create(booking);
            toast.open({
                message: data.msg,
                type: 'success',
            });
            router.push({ name: 'my-bookings' });
            clearBookingData();
        } catch (error) {
            console.log(error);
        }
    }

    function clearBookingData() {
        services.value = [];
        servicesFull.value = false;
        date.value = '';
        time.value = '';
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
            return bookingByDate.value.find(booking => booking.time === hour);
        }
    })

    return {
        onServiceSelected,
        createBooking,
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