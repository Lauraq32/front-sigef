import { defineStore } from 'pinia'
import Api from '../store/services/Auth'
import { computed, ref } from 'vue'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAuthStore = defineStore('Auth', () => {
  const user = ref([])
  const authInfo = ref(null)

  const isLogged = computed(() => authInfo.value !== null)
  const fiscalYear = computed(() => authInfo.fiscalYear !== null)

  ;(() => {
    if (authInfo == null && localStorage.getItem('usuario') != null) {
      authInfo.value = localStorage.getItem('usuario')
    }
  })()

  async function signIn(user) {
    return Api.Login(user).then((response) => {
      authInfo.value = response.data.data
      localStorage.setItem('usuario', JSON.stringify(authInfo.value))
      console.log(authInfo.value)
      return Promise.resolve(true)
    })
  }
  return { user, signIn, authInfo, isLogged, fiscalYear }
})
