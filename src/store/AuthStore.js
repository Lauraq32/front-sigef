import { defineStore } from 'pinia'
import Api from '../store/services/Auth'
import { ref } from 'vue';
import { setLoggedInfo, getLoggedInfo, clearLoggedInfo } from "../utils/logged-info";

export const useAuthStore = defineStore('Auth', () => {
  const user = ref([])
  const authInfo = ref(null)

  ;(() => {
    if (authInfo.value == null) {
      authInfo.value = getLoggedInfo();
    }
  })()

  async function signIn(user) {
    return Api.Login(user).then((response) => {
      authInfo.value = response.data.data
      setLoggedInfo(authInfo.value);
      return Promise.resolve(true)
    })
  }

  function changeFiscalYear(fiscalYear) {
    authInfo.value.currentFiscalYearId = fiscalYear
    setLoggedInfo(authInfo);
  }

  async function signOut() {
    clearLoggedInfo();

    return Promise.resolve(true);
  }

  return { user, signIn, authInfo, changeFiscalYear, signOut }
})
