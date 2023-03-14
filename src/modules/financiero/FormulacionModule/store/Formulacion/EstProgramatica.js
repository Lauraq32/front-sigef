import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import Api from '../../services/FormulacionServices'

export const useRegistroStore = defineStore('EstProgramatica', () => {
  const estructuraProgramatica = ref([])

  const getAllEstProgramatica = computed(() => estructuraProgramatica)

  function getEstructura() {
    Api.getEstProgramatica().then((response) => {
      estructuraProgramatica.value = response.data.data
    })
  }

  return {
    getEstructura,
    estructuraProgramatica,
    getAllEstProgramatica,
  }
})
