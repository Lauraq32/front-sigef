/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/NominaServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Configuracion Nomina', () => {
    const confNomina = ref([

    ])


    //const name = ref('Eduardo')
    const getConfiguracionNominas = computed(() => confNomina)

    function getConfiguracionNomina() {
        Api.getConfiguracionNomina().then((response) => {
            confNomina.value = response.data.data
        })
    }

    function addConfiguracionNomina(data) {
        Api.postConfiguracionNomina(data).then((response) => {
            console.log(response)
        })
    }

    function putConfiguracionNomina(data) {
        Api.postConfiguracionNomina(data).then((response) => {
            console.log(response)
        })
    }

    return { confNomina, getConfiguracionNominas, getConfiguracionNomina, addConfiguracionNomina, putConfiguracionNomina }
})