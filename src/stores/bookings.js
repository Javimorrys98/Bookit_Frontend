import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { MAXIMUM_SERVICES } from "@/helpers/global";

export const useBookingsStore = defineStore("bookings", () => {

    const services = ref([])
    const servicesFull = ref(false)
    const date = ref('')
    const hours = ref([])
    const time = ref('')

    onMounted(() => {
        const startHour = 10;
        const endHour = 19;

        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00');
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

    function createBooking() {
        const booking = {
            services: services.value.map(service => service._id),
            date: date.value,
            time: time.value,
            totalAmount: totalAmount.value,
        }

        console.log(booking);
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

    return {
        onServiceSelected,
        isServiceSelected,
        servicesFull,
        services,
        totalAmount,
        noServicesSelected,
        date,
        hours,
        time,
        isValidBooking,
        createBooking,
    }
});