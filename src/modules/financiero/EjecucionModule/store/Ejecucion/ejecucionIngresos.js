/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/EjecucionServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useEjecucionIngresoStore = defineStore(
  'useEjecucionIngresoStore',
  () => {
    const ingresosList = ref([]) 

    //const name = ref('Eduardo')
    const getList = computed(() => ingresosList)

    function getAllIngresos() {
      Api.getBeneficiarios().then((response) => {
        ingresosList.value = response.data
      })
    }

    function addIngreso(data) {
      Api.postBeneficiarios(data).then((response) => {
        console.log(response)
      })
    }

    function getIngresoDetalleById(data) {
      Api.getIngresoByIdAndDetalle(data).then((response) => {
        console.log(response)
      })
    }

    function addIngresos(data) {
      Api.postIngresos(data).then((response) => {
        console.log(response)
      })
    }

    function addIngresoDetalle(data) {
      Api.postIngresoDetalle(data).then((response) => {
        console.log(response)
      })
    }

    
    function addGastoDetalle(data) {
      Api.postGastoDetalle(data).then((response) => {
        console.log(response)
      })
    }

    function getIngresos() {
        Api.getIngresoAll().then((response) => {
          console.log(response)
          ingresosList.value = response.data.data
        })
      }

      function getIngresosById(id) {
        Api.getIngresoAll().then((response) => {
          console.log(response)
          ingresosList.value = response.data.data
        })
      }

    function putIngreso(data) {
      Api.putBeneficiarios(data).then((response) => {
        console.log(response)
      })
    }

    function putRegistrosGasto(data, id) {
      Api.putRegistroGasto(id, data).then((response) => {
        console.log(response)
      })
    }

    return {
      ingresosList,
      getAllIngresos,
      getList,
      addIngreso,
      putIngreso,
      ingresosList,
      addIngresos,
      getIngresos,
      addIngresoDetalle,
      addGastoDetalle,
      putRegistrosGasto
    }
  },
)
