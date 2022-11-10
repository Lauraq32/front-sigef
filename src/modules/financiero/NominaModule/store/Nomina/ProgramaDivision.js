/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/NominaServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('ProgramaDivision', () => {
    const programas = ref([

    ])


    //const name = ref('Eduardo')
    const getPrograma = computed(() => programas)

    function getProgramas() {
        Api.getProgramaDivision().then((response) => {
            programas.value = response.data.data
        })
    }

    function addProgramas(data) {
        Api.postProgramaDivision(data).then((response) => {
            console.log(response)
        })
    }

    function putProgramas(data) {
        Api.putProgramaDivision(data).then((response) => {
            console.log(response)
        })
    }

    return { programas, getPrograma, getProgramas, addProgramas, putProgramas }
})