import axios from "axios"
import Api from '../../services/FormulacionServices'

export const getUsuarios = async ({ commit }) => {
    Api.getUsuarioList().then(response => {
        console.log(response.data)
        commit('SET_USUARIOS',response.data)
    })
}


