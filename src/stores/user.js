import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import AuthAPI from "@/api/AuthAPI";

export const useUserStore = defineStore('user', () => {
    const router = useRouter();
    
    const user = ref({});

    onMounted(async () => {
        try {
            const { data } = await AuthAPI.auth();
            user.value = data;
        } catch (error) {
            console.log(error.response.data.msg);
        }
    });

    const getUserName = computed(() => user.value?.name ? user.value.name : '');

    function logout() {
        localStorage.removeItem('AUTH_TOKEN');
        user.value = {};
        router.push({ name: 'login' })
    }

    return {
        user,
        getUserName,
        logout,
    };
});