/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/EjecucionServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('anioFiscal', () => {
    const anioFiscal = ref([

    ])


    //const name = ref('Eduardo')
    const getAnioFiscalS = computed(() => anioFiscal)

    function getAnioFiscal() {
        Api.getAnioFiscal().then((response) => {
            anioFiscal.value = response.data
        })
    }

    function addAnioFiscal(data) {
        Api.postAnioFiscal(data).then((response) => {
            console.log(response)
        })
    }

    function putAnioFiscal(data) {
        Api.putAnioFiscal(data).then((response) => {
            console.log(response)
        })
    }

    return { anioFiscal, getAnioFiscalS, getAnioFiscal, addAnioFiscal, putAnioFiscal }
})