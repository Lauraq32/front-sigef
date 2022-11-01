import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useFormulacionPrepStore = defineStore('FormulacionPrep', () => {
  const ingresos = ref([
   
  ])

  //const name = ref('Eduardo')
  const getAllPersonal = computed(() => registroPersonal)

  function addPersonal(data) {
    registroPersonal.value.push(data)
  }

  return { registroPersonal, addPersonal, getAllPersonal, is_loading }
})
