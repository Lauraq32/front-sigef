import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/FormulacionServices'
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const usePrepGastoStore = defineStore('prepGasto', () => {
  const registroPersonal = ref([,])

  const is_loading = true
  //const name = ref('Eduardo')

  const getListarGastos = () => {
    Api.getListarGastos().then( () => {
        console.log(response.data.data)
    })
  }

  const getAllGasto = computed(() => registroPersonal)

  function addPersonal(data) {
    registroPersonal.value.push(data)
  }

  return { registroPersonal, addPersonal, getAllPersonal,getListarGastos, is_loading }
})
