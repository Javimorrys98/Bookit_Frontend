<script setup>
import { inject } from 'vue';
import { reset } from '@formkit/vue';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast'); 

const handleSubmit = async ({email}) => {
    try {
        const { data } = await AuthAPI.forgotPassword({email});
        toast.open({
            message: data.msg,
            type: 'success'
        })
        reset('forgotPasswordForm');
    } catch (error) {
        toast.open({
            message: error.response.data.msg,
            type: 'error'
        })
    }
}
</script>

<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">¿Olvidaste tu contraseña?</h1>
        <p class="text-2xl text-white text-center my-5">Recupera el acceso a tu cuenta.</p>

        <FormKit id="forgotPasswordForm" type="form" :actions="false"
            incomplete-message="No se pudo realizar la acción. Revisa los posibles errores." @submit="handleSubmit">
            <FormKit type="email" label="Email" name="email" placeholder="Email de usuario" validation="required|email"
                :validation-messages="{
                    required: 'El email es obligatorio.',
                    email: 'El email no es válido.'
                }" />

            <FormKit type="submit"><span class="uppercase">Enviar email de recuperación</span></FormKit>
        </FormKit>
    </div>
</template>

<style scoped></style>