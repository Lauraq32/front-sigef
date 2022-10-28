/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'

class NominaApi {
  //-----------------------------CLASIFICADORES---------------------------------------//
  //get
  getNomina() {
    return http.get('Nomina')
  }

  getPocision() {
    return http.get('Posicion')
  }

  getSectores() {
    return http.get('Sector')
  }

  getDepartamento() {
    return http.get('Departamento')
  }

  getGrupoNomina() {
    return http.get('GrupoNomina')
  }

  getAreaTrabajo() {
    return http.get('AreaTrabajo')
  }

  getConfiguracionNomina() {
    return http.get('ConfiguracionNomina')
  }

  getProgramaDivision() {

    return http.get('ProgramaDivision')
  }

  //post

  postNomina(data) {
    return http.post('Nomina', data)
  }

  postPocision(data) {
    return http.post('Posicion', data)
  }

  postSectores(data) {
    return http.post('Sector', data)
  }

  postDepartamento(data) {
    return http.post('Departamento', data)
  }

  postGrupoNomina(data) {
    return http.post('GrupoNomina', data)
  }

  postAreaTrabajo(data) {
    return http.post('AreaTrabajo', data)
  }

  postConfiguracionNomina(data) {
    return http.post('ConfiguracionNomina', data)
  }

  postProgramaDivision(data) {
    return http.post('ProgramaDivision', data)
  }

  //put 


  putNomina(data) {
    return http.put('Nomina', data)
  }

  putPocision(data) {
    return http.put('Posicion', data)
  }

  putSectores(data) {
    return http.put('Sector', data)
  }

  putDepartamento(data) {
    return http.put('Departamento', data)
  }

  putGrupoNomina(data) {
    return http.put('GrupoNomina', data)
  }

  putAreaTrabajo(data) {
    return http.put('AreaTrabajo', data)
  }

  putConfiguracionNomina(data) {
    return http.put('ConfiguracionNomina', data)
  }

  putProgramaDivision(data) {
    return http.put('ProgramaDivision', data)
  }



}

export default new NominaApi()
