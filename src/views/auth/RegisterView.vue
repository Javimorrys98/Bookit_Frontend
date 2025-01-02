<script setup>
import { inject } from 'vue';
import { reset } from '@formkit/vue';
import AuthAPI from '@/api/AuthAPI';
import { useRouter } from 'vue-router';
import { useLoadingStore } from '@/stores/loading';

const toast = inject('toast');
const router = useRouter();

const loadingStore = useLoadingStore();

const handleSubmit = async ({password_confirm, ...formData}) => {
    loadingStore.setLoading(true);
    try {
        const { data } = await AuthAPI.register(formData);
        toast.open({
            type: 'success',
            message: data.msg
        })
        reset('registerForm');
        await router.push({ name: 'login' });
    } catch (error) {
        console.log(error);
        toast.open({
            type: 'error',
            message: error.response.data.msg
        })
    } finally {
        loadingStore.setLoading(false);
    }
}
</script>

<template>
    <div>
        <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crear una cuenta</h1>
        <p class="text-2xl text-white text-center my-5">Crea una cuenta en Bookit</p>

        <FormKit id="registerForm" type="form" :actions="false" incomplete-message="No se pudo realizar la acción. Revisa los posibles errores." @submit="handleSubmit">
            <FormKit 
                type="text" 
                label="Nombre" 
                name="name" 
                placeholder="Tu nombre" 
                validation="required|length:2"
                :validation-messages="{
                    required: 'El nombre es obligatorio.',
                    length: 'El nombre debe tener al menos 2 caracteres.'
                }"     
            />
            <FormKit 
                type="email" 
                label="Email" 
                name="email" 
                placeholder="Email de registro" 
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
                placeholder="Contraseña de usuario - Mínimo 8 caracteres." 
                validation="required|length:8"
                :validation-messages="{
                    required: 'La contraseña es obligatoria.',
                    length: 'La contraseña debe contener al menos 8 caracteres.'
                }"     
            />
            <FormKit 
                type="password" 
                label="Repetir contraseña" 
                name="password_confirm" 
                placeholder="Repite la contraseña." 
                validation="required|confirm"
                :validation-messages="{
                    required: 'La contraseña es obligatoria.',
                    confirm: 'Las contraseñas no son iguales.'
                }"     
            />
            <FormKit type="submit">
                Crear cuenta
            </FormKit>
        </FormKit>
    </div>
</template>

<style scoped></style>