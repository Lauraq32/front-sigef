/* eslint-disable prettier/prettier */
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/NominaServices'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useRegistroStore = defineStore('AreaDeTrabajo', () => {
  const AreaDeTrabajo = ref([

  ])


  //const name = ref('Eduardo')
  const getAreaTrabajo = computed(() => AreaDeTrabajo)

  function AreaTrabajo() {
    Api.getAreaTrabajo().then((response) => {
        AreaDeTrabajo.value = response.data.data
    })
  }

  function addAreaTrabajo(data) {
    Api.postAreaTrabajo(data).then((response) => {
      console.log(response)
    })
  }

  function putAreaTrabajo(data) {
    Api.putAreaTrabajo(data).then((response) => {
      console.log(response)
    })
  }

  return { AreaDeTrabajo, getAreaTrabajo, AreaTrabajo, addAreaTrabajo, putAreaTrabajo}
})
