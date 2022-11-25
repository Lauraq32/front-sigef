/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/ActivoFijoServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStores = defineStore('Depreciacion', () => {
    const Depreciacion = ref([

    ])


    //const name = ref('Eduardo')
    const getDepreciacions = computed(() => Depreciacion)

    function getDepreciacion() {
        Api.getDepreciacion().then((response) => {
            Depreciacion.value = response.data.data
        })
    }

    function addDepreciacion(data) {
        Api.postDepreciacion(data).then((response) => {
            console.log(response)
        })
    }


    return { Depreciacion, getDepreciacion, getDepreciacions, addDepreciacion, }
})