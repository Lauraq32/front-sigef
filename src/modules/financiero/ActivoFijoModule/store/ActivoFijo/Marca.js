/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/ActivoFijoServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Marcas', () => {
    const Marcas = ref([

    ])


    //const name = ref('Eduardo')
    const getMarca = computed(() => Marcas)

    function getMarcas() {
        Api.getAllMarca().then((response) => {
            Marcas.value = response.data.data
        })
    }

    function addMarcas(data) {
        Api.postMarca(data).then((response) => {
            console.log(response)
        })
    }

    function putMarcas(data) {
        Api.putMarca(data).then((response) => {
            console.log(response)
        })
    }

    return { Marcas, getMarca, getMarcas, addMarcas, putMarcas }
})