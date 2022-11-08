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

  getSectorbyid(id) {
    return http.get(`Sector/${id}`)
  }

  getGrupoNominaById(value) {
    return http.get(`GrupoNomina/${value}`)
  }

  getDepartamentoById(id) {
    return http.get(`Departamento/${id}`)
  }

  getPocisionbyid(id) {
    return http.get(`Pocision/${id}`)
  }

  getConfiguracionNominabyid(id) {
    return http.get(`ConfiguracionNomina/${id}`)
  }

  getNominabyid(id) {
    return http.get(`Nomina/${id}`)
  }

  getProgramaDivisionbyid(id) {
    return http.get(`ProgramaDivision/${id}`)
  }

  getAreaTrabajobyid(id) {
    return http.get(`AreaTrabajo/${id}`)
  }

  getTotalIngresos(id_ayuntamiento, ano_fiscal) {
    return http.get(`/ingresoslista/ListarIngresosTotalizado/?ano=${ano_fiscal}&id=${id_ayuntamiento}`)
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


  putNomina(id, data) {
    return http.put(`Nomina/${id}`, data)
  }

  putPocision(id) {
    return http.put(`Pocision/${id}`)
  }

  putSector(id) {
    return http.put(`Sector/${id}`)
  }

  putGrupoNomina(id) {
    return http.put(`GrupoNomina/${id}`)
  }

  putDepartamento(id) {
    return http.put(`Departamento/${id}`)
  }

  putAreaTrabajo(id) {
    return http.put(`AreaTrabajo/${id}`)
  }

  putConfiguracionNomina(id) {
    return http.put(`ConfiguracionNomina/${id}`)
  }

  putProgramaDivision(id) {
    return http.put(`ProgramaDivision/${id}`)
  }

  //delete

  deleteSector(id) {
    return http.delete(`Sector/${id}`)
  }


}

export default new NominaApi()
