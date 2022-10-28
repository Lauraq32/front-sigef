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

  //post

  postFormulacionGato(data) {
    return http.post('PresGasto', data)
  }

}
export default new FormulacionApi()
