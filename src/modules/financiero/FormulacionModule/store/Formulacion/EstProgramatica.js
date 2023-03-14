import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/FormulacionServices'
export const useRegistroStore = defineStore('EstProgramatica', () => {
  const EstPros = ref([])

  const getAllEstPro = computed(() => EstPros)

  function getEstructura() {
    Api.getEstProgramatica().then((response) => {
      EstPros.value = response.data.data
    })
  }

  return {
    getEstructura,
    EstPros,
    getAllEstPro,
  }
})
