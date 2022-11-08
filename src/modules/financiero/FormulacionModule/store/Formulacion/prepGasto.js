import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/FormulacionServices'
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const usePrepGastoStore = defineStore('prepGasto', () => {
  const registroPersonal = ref([])
  const GastosListDos = ref([])
  let getGasto = ref(null)
  const is_loading = true
  //const name = ref('Eduardo')

  function getListarGastos() {
    Api.getListarGastos().then((response) => {
      console.log(response.data.data)
      registroPersonal.value = response.data.data
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

  const getAllGasto = computed(() => registroPersonal)

  function addPersonal(data) {
    registroPersonal.value.push(data)
  }

  function addGasto(post) {
    Api.postGastos(post).then((response) => {
      console.log(response);
    })
  }

  return { registroPersonal, getListarGastos, getListarGastosById, GastosListDos, addGasto, getGasto }
})
