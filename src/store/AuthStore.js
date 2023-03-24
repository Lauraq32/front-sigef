import { defineStore } from 'pinia'
import Api from '../store/services/Auth'
import { ref } from 'vue'

export const useAuthStore = defineStore('Auth', () => {
  const user = ref([])
  const authInfo = ref(null)

  ;(() => {
    if (authInfo.value == null && localStorage.getItem('usuario') != null) {
      authInfo.value = JSON.parse(localStorage.getItem('usuario'))
    }
  })()

  async function signIn(user) {
    return Api.Login(user).then((response) => {
      authInfo.value = response.data.data
      localStorage.setItem('usuario', JSON.stringify(authInfo.value))
      return Promise.resolve(true)
    })
  }

  function changeFiscalYear(fiscalYear) {
    authInfo.value.currentFiscalYearId = fiscalYear
    localStorage.setItem('usuario', JSON.stringify(authInfo.value))
  }

  return { user, signIn, authInfo, changeFiscalYear }
})
