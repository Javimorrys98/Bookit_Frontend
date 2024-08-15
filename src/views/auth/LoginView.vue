<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast');
const router = useRouter();

const handleSubmit = async (formData) => {
    try {
        const { data: { token } } = await AuthAPI.login(formData);
        localStorage.setItem('AUTH_TOKEN', token);
        router.push({ name: 'my-bookings' });
    } catch (error) {
        console.log(error);
        toast.open({
            type: 'error',
            message: error.response.data.msg
        })
    }
}
</script>

<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar sesión</h1>
        <p class="text-2xl text-white text-center my-5">Si ya tienes una cuenta, inicia sesión.</p>

        <FormKit id="loginform" type="form" :actions="false" incomplete-message="No se pudo realizar la acción. Revisa los posibles errores." @submit="handleSubmit">
            <FormKit 
                type="email" 
                label="Email" 
                name="email" 
                placeholder="Email de usuario" 
                validation="required|email"
                :validation-messages="{
                    required: 'El email es obligatorio.',
                    email: 'El email no es válido.'
                }"     
            />
            <FormKit 
                type="password" 
                label="Contraseña" 
                name="password" 
                placeholder="Contraseña de usuario" 
                validation="required"
                :validation-messages="{
                    required: 'La contraseña es obligatoria.',
                }"     
            />
            <FormKit type="submit">
                Iniciar sesión
            </FormKit>
        </FormKit>
    </div>
</template>

<style scoped>

</style>