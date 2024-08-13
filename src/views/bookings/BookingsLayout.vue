<script setup>

</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl lg:text-6xl font-black text-white">Booking layout</h1>
        <div class="flex flex-col space-y-5">
            <div class="flex gap-2 items-center justify-between">
                <p class="text-white text-right">Usuario</p>
                <button type="button"
                    class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg">
                    Cerrar sesión
                </button>
            </div>
            <nav class="flex gap-2 items-center justify-end">
                <button type="button" class="p-2 text-gray-200 uppercase text-xs font-black rounded-lg">
                    Mis citas
                </button>
                <RouterLink :to="{ name: 'new-booking' }"
                    class="p-2 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-700 hover:bg-blue-800">
                    Nueva cita
                </RouterLink>
            </nav>
        </div>
    </div>
    <main>
        <RouterView />
    </main>
</template>

<style scoped></style>