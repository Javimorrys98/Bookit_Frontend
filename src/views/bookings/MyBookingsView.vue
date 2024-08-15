<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();   
</script>

<template>
    <div>
        <h2 class="text-4xl font-extrabold text-white mt-10">Tus citas</h2>
        <p class="text-white text-lg mt-5">Aquí puedes administrar tus citas.</p>

    </div>
</template>

<style scoped>

</style>