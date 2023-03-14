import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/FormulacionServices'
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('EstProgramatica', () => {
  const estProgramatica = ref([])

  const getAllEstProgramatica = computed(() => estProgramatica)

  function getEstructura() {
    Api.getEstProgramatica().then((response) => {
      estProgramatica.value = response.data.data
    })
  }

  return {
    getEstructura,
    estProgramatica,
    getAllEstProgramatica,
  }
})
