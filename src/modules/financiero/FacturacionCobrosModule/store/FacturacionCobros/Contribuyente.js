/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/FacturacionCobrosServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Contribuyentes', () => {
    const Contribuyente = ref([

    ])


    //const name = ref('Eduardo')
    const getContribuyentes = computed(() => Contribuyente)

    function getContribuyente() {
        Api.getContribuyente().then((response) => {
            Contribuyente.value = response.data.data
        })
    }

    function addContribuyente(data) {
        Api.postContribuyente(data).then((response) => {
            console.log(response)
        })
    }

    function putContribuyente(data) {
        Api.putContribuyente(data).then((response) => {
            console.log(response)
        })
    }

    return { Contribuyente, getContribuyente, getContribuyentes, addContribuyente, putContribuyente }
})