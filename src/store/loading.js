import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLoadingStore = defineStore('LoadingStore', () => {
	const state = ref(0);
	const visible = computed(() => Boolean(state.value));
	const show = () => {
		state.value += 1;
	};
	const hide = () => {
		state.value -= 1;
		if (state.value < 0) {
			state.value = 0;
		}
	};

	return {
		show,
		hide,
		visible,
	};
});
