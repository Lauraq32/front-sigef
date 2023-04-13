/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'
import { getAyuntamientoId } from '@/utils/logged-info'
class RegistroPersonal {
  //get
  getAllTipoSangre() {
    return http.get('tipos-sangre')
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
    return http.post('profesiones',data)
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
  getFileById(){
    return http.get(
      ` `
    )
  }

  getProgramaDivision() {
    return http.get(`ProgramaDivision?AyuntamientoId=${getAyuntamientoId()}`)
  }

  getEmpleadoByID(id) {
    return http.get(`Empleado/${id}`)
  }

  getDepartamentoByProgramaId(id) {
    return http.get(`Departamento/Programa/${id}`)
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

  postSectores(data) {
    return http.post('sectores', data)
  }

  postAreaTrabajo(data) {
    return http.post('areas-trabajo', data)
  }

  //put
  putEmpleado(id, data) {
    return http.put(`Empleado/${id}`, data)
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
