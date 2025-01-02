import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useLoadingStore } from './loading'
import ServicesAPI from '@/api/ServicesAPI'

export const useServicesStore = defineStore('services', () => {
    const services = ref([])
    const loadingStore = useLoadingStore()

    onMounted(async () => {
        loadingStore.setLoading(true)
        try {
            const { data } = await ServicesAPI.all()
            services.value = data
        } catch (error) {
            console.error(error)
        } finally {
            loadingStore.setLoading(false)
        }
    })

    return {
        services
    }
})