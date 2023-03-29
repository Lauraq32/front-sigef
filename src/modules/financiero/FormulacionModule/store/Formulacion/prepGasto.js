import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/FormulacionServices'

export const usePrepGastoStore = defineStore('prepGasto', () => {
  const prepGastoList = ref([])
  const GastosListDos = ref([])
  let gastoListCount = ref(0)
  let getGasto = ref(null)
  const is_loading = true

  function getListarGastos() {
    Api.getListarGastos().then((response) => {
      prepGastoList.value = response.data.data
      gastoListCount.value = response.data.data.length
    })
  }

  function getListarGastosById(id) {
    Api.getListarGastosById(id).then((response) => {
      getGasto.value = response.data.data
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

  const getAllGasto = computed(() => registroPersonal)

  function addPersonal(data) {
    registroPersonal.value.push(data)
  }

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
    gastoListCount
  }
})
