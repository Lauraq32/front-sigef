import { defineStore } from 'pinia'
import { ref } from 'vue'
import Api from '../../services/FormulacionServices'
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const usePrepGastoStore = defineStore('prepGasto', () => {
  const prepGastoList = ref([])
  const GastosListDos = ref([])
  let getGasto = ref(null)
  //const name = ref('Eduardo')

  function getListarGastos() {
    Api.getListarGastos().then((response) => {
      console.log(response.data.data)
      prepGastoList.value = response.data.data
    })
  }

  function getListarGastosById(id) {
    Api.getListarGastosById(id).then((response) => {
      console.log(response.data.data)
      getGasto.value = response.data.data
      //console.log(getGasto.value.data)
      //GastosListDos.value = response.data.data
    })
  }

  const dataDummy = [
    {
      ClasificadorId: '111101',
      Denominacion: '1111',
      Original: '01',
      GastosPersonal: '30',
      Servicios: '9996',
      Inversion: '102',
      EducGeneroSalud: '1000',
    },
  ]

  function addGasto(post) {
    Api.postGastos(post).then((response) => {
      console.log(response)
    })
  }

  function updatePresGasto(id, data) {
    Api.updateFormulacion(id, data).then((response) => {
      console.log(response)
    })
  }

  function updatePresGastoDetalle(id, data) {
    Api.updateFormulacionDetalle(id, data).then((response) => {
      console.log(response)
    })
  }

  function addDetalleGasto(post) {
    Api.postDetalleGasto(post).then((response) => {
      console.log(response)
    })
  }

  function getDetalleGasto(id) {
    Api.getDetalle(id).then((response) => {
      console.log(response)
    })
  }

  return {
    prepGastoList,
    getListarGastos,
    getListarGastosById,
    GastosListDos,
    addGasto,
    getGasto,
    dataDummy,
    addDetalleGasto,
    updatePresGasto,
    updatePresGastoDetalle,
    getDetalleGasto,
  }
})
