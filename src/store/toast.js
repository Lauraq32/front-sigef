import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useToastStore = defineStore('ToastStore', () => {
    const state = ref([]);
    const messages = computed(() => state.value);
    const show = (message) => {
        message.id = state.value.length + 1;
        state.value = [message, ...state.value];
    };
    const removeMessage = (id) => {
        state.value = state.value.filter(message => message.id !== id);
    }

    return ({
        show,
        removeMessage,
        messages
    });
});