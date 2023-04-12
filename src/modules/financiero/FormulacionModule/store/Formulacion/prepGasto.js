import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/FormulacionServices'

export const usePrepGastoStore = defineStore('prepGasto', () => {
  const prepGastoList = ref([])
  const GastosListDos = ref([])
  let gastoListCount = ref(0)
  let getGasto = ref(null)
  const is_loading = true;

  const totalBugetAmount = computed(() => prepGastoList.value.reduce((acc, item) => acc + Number(item.totalPresupuesto), 0));

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
    return Api.postGastos(post);
  }

  function updatePresGasto(id, data) {
    return Api.updateFormulacion(id, data);
  }

  function updatePresGastoDetalle(id, data) {
    return Api.updateFormulacionDetalle(id, data);
  }

  function addDetalleGasto(post) {
    return Api.postDetalleGasto(post);
  }

  function getDetalleGasto(id) {
    return Api.getDetalle(id);
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
    gastoListCount,
    totalBugetAmount
  }
})
