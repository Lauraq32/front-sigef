/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/EjecucionServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('TipoRetenciones', () => {
    const TipoRetenciones = ref([

    ])


    //const name = ref('Eduardo')
    const getTipoRetencion = computed(() => TipoRetenciones)

    function getTipoRetenciones() {
        Api.getTipoRetencion().then((response) => {
            TipoRetenciones.value = response.data.data
        })
    }

    function addTipoRetencion(data) {
        Api.postTipoRetencion(data).then((response) => {
            console.log(response)
        })
    }

    function putTipoRetenciones(data) {
        Api.putTipoRetenciones(data).then((response) => {
            console.log(response)
        })
    }

    return { TipoRetenciones, getTipoRetencion, getTipoRetenciones, addTipoRetencion, putTipoRetenciones }
})