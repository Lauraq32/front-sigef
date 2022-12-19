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

  getEmpleado() {
    return http.get(`Empleado?ayuntamientoId=${parseInt(localStorage.getItem('id_Ayuntamiento'))}`)
  }

  getEmpleadoById(value) {
    return http.get(`Empleado/${value}`)
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

  getSalarioById(id) {
    return http.get(`Empleado/salario/${id}`)
  }

  getDepartamentoById(id) {
    return http.get(`Departamento/${id}`)
  }

  getPocisionbyid(id) {
    return http.get(`Posicion/${id}`)
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

  postEmpleado(data) {
    return http.post('Empleado', data)
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

  putPocision(id, data) {
    return http.put(`Posicion/${id}`, data)
  }

  putSector(id, post) {
    return http.put(`Sector/${id}`, post)
  }

  putGrupoNomina(id, data) {
    return http.put(`GrupoNomina/${id}`, data)
  }

  putDepartamento(id, data) {
    return http.put(`Departamento/${id}`, data)
  }

  putAreaTrabajo(id, data) {
    return http.put(`AreaTrabajo/${id}`, data)
  }

  putConfiguracionNomina(id) {
    return http.put(`ConfiguracionNomina/${id}`)
  }

  putEmpleado(id, data) {
    return http.put(`Empleado/${id}`, data)
  }

  putProgramaDivision(id, data) {
    return http.put(`ProgramaDivision/${id}`, data)
  }

  //delete

  deleteSector(id) {
    return http.delete(`Sector/${id}`)
  }


}

export default new NominaApi()
