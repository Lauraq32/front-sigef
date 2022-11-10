/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/NominaServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Departamento', () => {
    const departamento = ref([

    ])


    //const name = ref('Eduardo')
    const getDepartamento = computed(() => departamento)

    function getDepartamentos() {
        Api.getDepartamento().then((response) => {
            departamento.value = response.data.data
        })
    }

    function addDepartamento(data) {
        Api.postDepartamento(data).then((response) => {
            console.log(response)
        })
    }

    function putDepartamento(data) {
        Api.putDepartamento(data).then((response) => {
            console.log(response)
        })
    }

    return { departamento, getDepartamento, getDepartamentos, addDepartamento, putDepartamento }
})