/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/ActivoFijoServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Condensado', () => {
  const Recepcion = ref([

  ])


  //const name = ref('Eduardo')
  const getAllRecepcion = computed(() => Recepcion)

  function getRecepcion() {
    Api.getAllRecepcion().then((response) => {
        Recepcion.value = response.data.data
    })
  }

  function addRecepcion(data) {
    Api.postRecepcion(data).then((response) => {
      console.log(response)
    })
  }

  return { Recepcion, addRecepcion, getAllRecepcion, getRecepcion }
})
