import { getAyuntamientoId, getFiscalYearId } from '@/utils/logged-info'
import Api from '../../services/FormulacionServices'

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
    getFiscalYearId(),
    getAyuntamientoId(),
  ).then((response) => {
    commit('SET_PROYECTOS', response.data)
  })
}
export const getClasificador = async ({ commit }, clasificador) => {
  Api.getClasificador(clasificador).then((response) => {
    commit('SET_CLASIFICADOR', response.data)
  })
}
