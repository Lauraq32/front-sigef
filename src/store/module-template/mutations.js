import router from '@/router'
import Api from '../services/Auth'

export const SET_USER = (state,user) => {
    Api.Login(user.email,user.password).then(response => {
        state.user = response.data})
        router.push({ name: 'financiero' })
}