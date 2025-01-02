import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
    const isLoading = ref(false)

    function setLoading(value) {
        isLoading.value = value
    }

    return {
        isLoading,
        setLoading
    }
})