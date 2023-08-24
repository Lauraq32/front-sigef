/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import Api from '../../services/ActivoFijoServices';

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('AreaUbicacion', () => {
	const areaUbicacion = ref([]);

	//const name = ref('Eduardo')
	const getAreas = computed(() => areaUbicacion);

	function getArea() {
		Api.getAllArea().then((response) => {
			areaUbicacion.value = response.data.data;
		});
	}

	function addArea(data) {
		return Api.postArea(data);
	}

	function putArea(data) {
		return Api.putArea(data);
	}

	return { areaUbicacion, getAreas, getArea, addArea, putArea };
});
