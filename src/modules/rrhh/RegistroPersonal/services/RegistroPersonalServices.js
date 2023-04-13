/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'
import { getAyuntamientoId } from '@/utils/logged-info'
class RegistroPersonal {
  //get
  getAllTipoSangre() {
    return http.get('tipos-sangre')
  }

  getAllTipoAcciones() {
    return http.get('tipo-acciones')
  }

  getAllAccionPersonal() {
    return http.get('acciones-personal')
  }

  getTipoSangreByID(id) {
    return http.get(`tipos-sangre/${id}`)
  }

  getSectorbyid(id) {
    return http.get(`sectores/${id}`)
  }

  getProfesion() {
    return http.get('profesiones')
  }

  addProfesion(data) {
    return http.post('profesiones', data)
  }
  updateProfesion(id, data) {
    return http.put(`profesiones/${id}`, data)
  }

  getProfesionById(id) {
    return http.get(`profesiones/${id}`)
  }

  getAllEmpleado() {
    return http.get(`empleados`)
  }

  getProgramaDivision() {
    return http.get(`ProgramaDivision?AyuntamientoId=${getAyuntamientoId()}`)
  }

  getEmpleadoByID(id) {
    return http.get(`Empleados/${id}`)
  }

  getAccionPersonalByID(id) {
    return http.get(`acciones-personal/empleado/${id}`)
  }

  getTipoAccionByID(id) {
    return http.get(`tipo-acciones/${id}`)
  }

  getDepartamentoByProgramaId(id) {
    return http.get(`Departamento/Programa/${id}`)
  }

  getAccionesPersonalById(id) {
    return http.get(`acciones-personal/${id}`)
  }

  getSectores() {
    return http.get(`sectores?ayuntamiento=${getAyuntamientoId()}`)
  }

  getAreaTrabajo() {
    return http.get('areas-trabajo')
  }

  //Combobox cargo
  getPosicion() {
    return http.get('Posicion')
  }

  getAreaTrabajobyid(id) {
    return http.get(`areas-trabajo/${id}`)
  }
  //post

  postEmpleado(data) {
    return http.post('Empleado', data)
  }

  postTipoAcciones(data) {
    return http.post('tipo-acciones', data)
  }

  postSectores(data) {
    return http.post('sectores', data)
  }

  postAccionesPersonal(data) {
    return http.post('acciones-personal', data)
  }

  postAreaTrabajo(data) {
    return http.post('areas-trabajo', data)
  }

  //put
  putEmpleado(id, data) {
    return http.put(`Empleado/${id}`, data)
  }

  putTipoAcciones(id, data) {
    return http.put(`tipo-acciones/${id}`, data)
  }

  putAccionesPersonales(id, data) {
    return http.put(`acciones-personal/${id}`, data)
  }

  putArea(id) {
    return http.put(`Area/${id}`)
  }

  putSector(id, post) {
    return http.put(`sectores/${id}`, post)
  }

  putAreaTrabajo(id) {
    return http.put(`areas-trabajo/${id}`)
  }

  deleteEmpleado(id) {
    return http.delete(`Empleado/${id}`)
  }

  deleteSector(id) {
    return http.delete(`sectores/${id}?ayuntamiento=${getAyuntamientoId()}`)
  }
}

export default new RegistroPersonal()
