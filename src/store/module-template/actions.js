import Api from '../services/Auth'

export const Login = async ({ commit }) => {
    Api.Login(user.email,user.password).then(response => {
        console.log(response.data)
        commit('SET_USER',response.data)
    })
}