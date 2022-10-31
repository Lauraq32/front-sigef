/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/NominaServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Sectores', () => {
    const sectores = ref([

    ])


    //const name = ref('Eduardo')
    const getSectores = computed(() => sectores)

    function getSectore() {
        Api.getSectores().then((response) => {
            sectores.value = response.data
        })
    }

    function addSectores(data) {
        Api.postSectores(data).then((response) => {
            console.log(response)
        })
    }

    function putSectores(data) {
        Api.putSectores(data).then((response) => {
            console.log(response)
        })
    }

    return { sectores, getSectore, getSectores, addSectores, putSectores }
})