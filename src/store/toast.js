import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useToastStore = defineStore('ToastStore', () => {
    const state = ref([]);
    const messages = computed(() => state.value);
    const show = (message) => {
        message.id = state.value.length;
        state.value.push(message);
    };
    const removeMessage = (id) => {
        console.log("borrame", id, state.value);
        state.value = state.value.filter(message => message.id !== id);
        console.log("borrame", id, state.value);
    }

    return ({
        show,
        removeMessage,
        messages
    });
});