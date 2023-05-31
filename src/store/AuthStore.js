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
    return Api.Login(user)
    .then(response => response.data.data);
  }

  function setLoginInfo(loginInfo) {
    authInfo.value = { sessionTimeLimit: 9999, ...loginInfo };
    setLoggedInfo(authInfo.value);
  }

  function changeFiscalYear(fiscalYear) {
    authInfo.value.currentFiscalYearId = fiscalYear
    setLoggedInfo(authInfo.value);
  }

  async function signOut() {
    clearLoggedInfo();

    return Promise.resolve(true);
  }

  return { user, signIn, authInfo, changeFiscalYear, signOut, setLoginInfo }
})
