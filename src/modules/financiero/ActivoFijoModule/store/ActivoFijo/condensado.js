/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/ActivoFijoServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('Condensado', () => {
  const Conduce = ref([

  ])


  //const name = ref('Eduardo')
  const getAllConduce = computed(() => Conduce)

  function getConduce() {
    Api.getAllConduce().then((response) => {
        Conduce.value = response.data.data
    })
  }

  function addConduce(data) {
    Api.postConduce(data).then((response) => {
      console.log(response)
    })
  }

  return { Conduce, addConduce, getAllConduce, getConduce }
})
