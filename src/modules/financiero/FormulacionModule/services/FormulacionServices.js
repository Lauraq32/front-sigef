/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'


class FormulacionApi {
  //-----------------------------CLASIFICADORES---------------------------------------//
  //Obtener listado de Clasificadores
  getClasificadores() {
    return http.get('CtgClasificador')
  }
  getOrganismos() {
    return http.get('CtgOrganismoFinanciador')
  }
  getFuenteEspecifica() {
    return http.get('CtgFuenteEspecifica')
  }
  getFuenteFinanciamiento() {
    return http.get('CtgFuente')
  }
  getFormulacionGato() {
    return http.get('PresGasto')
  }

  getFormulacionGatoById(id) {
    return http.get(`PresGasto${id}`)
  }

  getPresIngreso() {
    return http.get('PresIngreso')
  }

  getPresIngresoById(id) {
    return http.get(`PresIngreso${id}`)
  }

  //post

  postFormulacionGato(data) {
    return http.post('PresGasto', data)
  }

  postPresIngreso(data) {
    return http.post('PresIngreso', data)
  }

  //put

  putPresIngresoById(id) {
    return http.put(`PresIngreso${id}`)
  }

}
export default new FormulacionApi()
