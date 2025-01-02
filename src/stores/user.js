import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useLoadingStore } from "./loading";
import AuthAPI from "@/api/AuthAPI";
import BookingAPI from "@/api/BookingAPI";

export const useUserStore = defineStore('user', () => {
    const router = useRouter();
    const loadingStore = useLoadingStore();

    const user = ref({});
    const userBookings = ref([]);
    const loading = ref(true);

    onMounted(async () => {
        try {
            const { data } = await AuthAPI.auth();
            user.value = data;
            await getUserBookings();
        } catch (error) {
            console.log(error.response.data.msg);
        } finally {
            loading.value = false;
        }
    });

    async function getUserBookings() {
        loadingStore.setLoading(true);
        const { data } = await BookingAPI.getUserBookings(user.value._id).finally(() => {
            loadingStore.setLoading(false);
        });
        userBookings.value = data;
    }

    function logout() {
        localStorage.removeItem('AUTH_TOKEN');
        user.value = {};
        router.push({ name: 'login' })
    }

    const getUserName = computed(() => user.value?.name ? user.value.name : '');

    const noBookings = computed(() => userBookings.value.length === 0);

    return {
        user,
        userBookings,
        noBookings,
        getUserName,
        loading,
        logout,
        getUserBookings,
    };
});