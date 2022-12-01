import axios from "axios"
import Api from '../../services/RegistroPersonalServices'

export const getUsuarios = async ({ commit }) => {
    Api.getUsuarioList().then(response => {
        console.log(response.data)
        commit('SET_USUARIOS',response.data)
    })
}
export const setPersonal = async ({ commit },formData) => {
        commit('POST_PERSONAL',formData)
}


