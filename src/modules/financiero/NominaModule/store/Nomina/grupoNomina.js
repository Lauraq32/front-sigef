/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/NominaServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('grupoNomina', () => {
    const grupoNomina = ref([])

    //const name = ref('Eduardo')
    const getGrupoNomina = computed(() => grupoNomina)

    function getGNomina() {
        Api.getGrupoNomina().then((response) => {
            grupoNomina.value = response.data
        })
    }

    function addGrupoNomina(data) {
        Api.postGrupoNomina(data).then((response) => {
            console.log(response)
        })
    }

    function putGrupoNomina(data) {
        Api.putGrupoNomina(data).then((response) => {
            console.log(response)
        })
    }

    return {
        getGrupoNomina,
        grupoNomina,
        getGNomina,
        addGrupoNomina,
        putGrupoNomina,
    }
})
