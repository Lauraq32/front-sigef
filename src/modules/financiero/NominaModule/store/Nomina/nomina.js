/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/NominaServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Nomina', () => {
    const Nomina = ref([
    ])

    const Empleado = ref([
    ])

    const nominag = ref([
    ])


    //const name = ref('Eduardo')
    const getNominas = computed(() => Nomina)

    function getNomina() {
        Api.getNomina().then((response) => {
            Nomina.value = response.data.data
        })
    }

    function getEmpleado() {
        Api.getEmpleado().then((response) => {
            Empleado.value = response.data.data
        })
    }

    function getnominag() {
        Api.getnominaGeneral().then((response) => {
            nominag.value = response.data.data
        })
    }


    function addEmpleado(data) {
        Api.postEmpleado(data).then((response) => {
            console.log(response)
        })
    }

    function addNomina(data) {
        Api.postNomina(data).then((response) => {
            console.log(response)
        })
    }

    function putNomina(data) {
        Api.putNomina(data).then((response) => {
            console.log(response)
        })
    }

    return { addEmpleado, Empleado, getEmpleado, Nomina, getNomina, getNominas, addNomina, putNomina, getnominag, nominag }
})
