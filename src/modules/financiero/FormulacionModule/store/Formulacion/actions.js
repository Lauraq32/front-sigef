import axios from 'axios'
import Api from '../../services/FormulacionServices'
const user = JSON.parse(localStorage.getItem('usuario'))

export const getClasificadores = async ({ commit }) => {
  Api.getListarClasificadores().then((response) => {
    commit('SET_CLASIFICADORES', [])
  })
}
export const getFuenteEspecifica = async ({ commit }) => {
  Api.getFuenteEspecifica().then((response) => {
    commit('SET_FUENTES_ESPECIFICAS', response.data)
  })
}
export const getListarFuentesFinanciamiento = async ({ commit }) => {
  Api.getListarFuentesFinanciamiento().then((response) => {
    commit('SET_FUENTES_FINANCIAMIENTO', response.data)
  })
}
export const getOrganismos = async ({ commit }) => {
  Api.getListarFinancieroCatalogoOrganismos().then((response) => {
    commit('SET_ORGANISMO', response.data)
  })
}
export const getEstructurasProgramaticas = async ({ commit }) => {
  Api.getListarEstructuraProgramatica().then((response) => {
    commit('SET_ESTRUCTURAS_PROGRAMATICAS', response.data)
    commit('SET_ESTRUCTURAPROGCOUNT', response.data.length)
  })
}

export const getProyectos = async ({ commit }) => {
  Api.getListarProyecto(
    user?.currentFiscalYearId,
    user?.user.ayuntamiento.id,
  ).then((response) => {
    commit('SET_PROYECTOS', response.data)
  })
}
export const getClasificador = async ({ commit }, clasificador) => {
  Api.getClasificador(clasificador).then((response) => {
    commit('SET_CLASIFICADOR', response.data)
  })
}
