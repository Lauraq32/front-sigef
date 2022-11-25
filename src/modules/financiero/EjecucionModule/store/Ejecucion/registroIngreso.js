/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/EjecucionServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Sectores', () => {
    const RegistroIngresos = ref([

    ])


    //const name = ref('Eduardo')
    const getRegistroIngresos = computed(() => RegistroIngresos)

    function getRegistroIngreso() {
        Api.getRegistroIngreso().then((response) => {
            RegistroIngresos.value = response.data.data
        })
    }

    function addRegistroIngreso(data) {
        Api.postRegistroIngreso(data).then((response) => {
            console.log(response)
        })
    }

    // function putSectores(data) {
    //     Api.putSectores(data).then((response) => {
    //         console.log(response)
    //     })
    // }

    return { addRegistroIngreso, RegistroIngresos, getRegistroIngreso, getRegistroIngresos}
})