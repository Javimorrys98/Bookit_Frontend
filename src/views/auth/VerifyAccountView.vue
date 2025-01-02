<script setup>
import { onMounted, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';
import { useLoadingStore } from '@/stores/loading';

const toast = inject('toast');
const route = useRoute();
const router = useRouter();
const { token } = route.params;

const loadingStore = useLoadingStore();

onMounted(async () => {
    loadingStore.setLoading(true);
    try {
        const { data } = await AuthAPI.verifyAccount(token);
        toast.open({
            message: data.msg,
            type: 'success',
        });
        setTimeout(() => {
            router.push({ name: 'login' });
        }, 2000);
    } catch (error) {
        console.log(error);
        toast.open({
            message: error.response.data.msg,
            type: 'error',
        });
    } finally {
        loadingStore.setLoading(false);
    }
});
</script>

<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Verificar cuenta</h1>
    </div>
</template>

<style scoped></style>