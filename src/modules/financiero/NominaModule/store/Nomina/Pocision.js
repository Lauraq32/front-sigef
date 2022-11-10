/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/NominaServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Pocision', () => {
    const pocision = ref([

    ])


    //const name = ref('Eduardo')
    const getPocision = computed(() => pocision)

    function  getPocisions() {
        Api.getPocision().then((response) => {
            pocision.value = response.data.data
        })
    }

    function addPocision(data) {
        Api.postPocision(data).then((response) => {
            console.log(response)
        })
    }

    function putPocision(data) {
        Api.putPocision(data).then((response) => {
            console.log(response)
        })
    }

    return { pocision, getPocisions, getPocision, addPocision,putPocision }
})