/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'
import { getAyuntamientoId } from '@/utils/logged-info'
import { CreateQueryParam } from '@/utils/params-query'
class NominaApi {
  //-----------------------------CLASIFICADORES---------------------------------------//
  //get
  getNomina() {
    return http.get('Nomina')
  }

  getAyuntamiento() {
    return http.get('Ayuntamiento')
  }

  getPocision() {
    return http.get('Posicion')
  }

  getEmpleado() {
    return http.get(`Empleado?ayuntamientoId=${getAyuntamientoId()}`)
  }

  getProgramaDivision() {
    return http.get('programas-division')
  }

  getEmpleadoById(value) {
    return http.get(`Empleado/${value}`)
  }

  getSectores() {
    return http.get(`sectores?ayuntamiento=${getAyuntamientoId()}`)
  }

  getEmpleadosPorDepartamentos(id) {
    return http.get(`Empleado/Departamento/${id}`)
  }

  getDepartamento(params = {}) {
    params = CreateQueryParam(params)
    return http.get(`departamentos?${params}`)
  }

  getGrupoNomina() {
    return http.get('GrupoNomina')
  }

  getAreaTrabajo() {
    return http.get('AreaTrabajo')
  }

  getConfiguracionNomina() {
    return http.get('configuracion-nomina')
  }

  getAllCuentaBanco() {
    return http.get(`ConciliacionCuentaBanco/${getAyuntamientoId()}`)
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
  getDepartamentoByProgramaId(id) {
    return http.get(`Departamento/Programa/${id}`)
  }

  getPocisionbyid(id) {
    return http.get(`Posicion/${id}`)
  }

  getConfiguracionNominabyid(id) {
    return http.get(`configuracion-nomina/${id}`)
  }

  getNominabyid(id) {
    return http.get(`Nomina/${id}`)
  }

  getProgramaDivisionbyid(id) {
    return http.get(`ProgramaDivision/${id}`)
  }

  getNominaGeneralById(id) {
    return http.get(`Nomina/NominaGeneral/${id}`)
  }

  getNominaByDepartamento(id) {
    return http.get(`Nomina/NominagEmpDep/${id}`)
  }

  getAreaTrabajobyid(id) {
    return http.get(`AreaTrabajo/${id}`)
  }

  getTotalIngresos(id_ayuntamiento, ano_fiscal) {
    return http.get(
      `/ingresoslista/ListarIngresosTotalizado/?ano=${ano_fiscal}&id=${id_ayuntamiento}`,
    )
  }
  //post

  postnominaGeneral(
    ayuntamiento,
    fecha,
    departamento,
    programa,
    tipoPago,
    TipoContrato,
  ) {
    return http.post(
      `Nomina/GenerarNomina?AyuntamientoId=${ayuntamiento}&Fecha=${fecha}&TipoContrato=${TipoContrato}&ProgramaDivision=${programa}&DepartamentoId=${departamento}&FormaPago=${tipoPago}`,
    )
  }

  getNominaGeneral(params) {
    params = CreateQueryParam(params)
    return http.get(`Nomina/NominaGeneral?${params}`)
  }

  getNominaPorEmpleado(id) {
    return http.get(`/Nomina/NominaporEmpleado/${id}`)
  }

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
    return http.post('configuracion-nomina', data)
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

  putConfiguracionNomina(id, data) {
    return http.put(`configuracion-nomina/${id}`, data)
  }

  putEmpleado(id, data) {
    return http.put(`Empleado/${id}`, data)
  }

  putProgramaDivision(id, data) {
    return http.put(`ProgramaDivision/${id}`, data)
  }

  //delete

  deleteSector(id) {
    return http.delete(`Sector/${id}?ayuntamiento=${getAyuntamientoId()}`)
  }

  deleteConfiguracionNomina() {
    return http.delete('configuracion-nomina')
  }
}

export default new NominaApi()
