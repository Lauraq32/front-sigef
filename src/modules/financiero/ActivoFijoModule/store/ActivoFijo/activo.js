/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import Api from '../../services/ActivoFijoServices';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('ActivoFijo', () => {
	const activo = ref([]);

	//const name = ref('Eduardo')
	const getActivos = computed(() => activo);

	function getActivo() {
		Api.getAllActivo().then((response) => {
			activo.value = response.data.data;
		});
	}

	function addActivo(data) {
		return Api.postActivo(data);
	}

	return { activo, getActivo, getActivos, addActivo };
});
