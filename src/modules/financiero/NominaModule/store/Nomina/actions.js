// import axios from 'axios'
import { getAyuntamientoId, getFiscalYearId } from '@/utils/logged-info'
import Api from '../../services/NominaServices'

export const getClasificadores = async ({ commit }) => {
  Api.getListarClasificadores().then((response) => {
    console.log(response.data)
    commit('SET_CLASIFICADORES', [])
  })
}
export const getFuenteEspecifica = async ({ commit }) => {
  Api.getFuenteEspecifica().then((response) => {
    console.log(response.data)
    commit('SET_FUENTES_ESPECIFICAS', response.data)
  })
}
export const getListarFuentesFinanciamiento = async ({ commit }) => {
  Api.getListarFuentesFinanciamiento().then((response) => {
    console.log(response.data)
    commit('SET_FUENTES_FINANCIAMIENTO', response.data)
  })
}
export const getOrganismos = async ({ commit }) => {
  Api.getListarFinancieroCatalogoOrganismos().then((response) => {
    console.log(response.data)
    commit('SET_ORGANISMO', response.data)
  })
}
export const getEstructurasProgramaticas = async ({ commit }) => {
  Api.getListarEstructuraProgramatica().then((response) => {
    console.log(response.data)
    commit('SET_ESTRUCTURAS_PROGRAMATICAS', response.data)
  })
}

export const getProyectos = async ({ commit }) => {
  Api.getListarProyecto().then((response) => {
    console.log(response.data)
    commit('SET_PROYECTOS', response.data)
  })
}
export const getClasificador = async ({ commit }, clasificador) => {
  Api.getClasificador(clasificador).then((response) => {
    console.log(response.data)
    commit('SET_CLASIFICADOR', response.data)
  })
}
export const PostIngreso = async ({ commit }, data) => {
  Api.createIngreso(data).then((response) => {
    console.log(response.data)
    commit('SET_INGRESO', data)
  })
}
export const getListarIngresos = async ({ commit }) => {
  Api.getListarIngresos(
    getAyuntamientoId(),
    getFiscalYearId(),
  ).then((response) => {
    console.log(response.data)
    commit('SET_INGRESOS', response.data)
  })
}
