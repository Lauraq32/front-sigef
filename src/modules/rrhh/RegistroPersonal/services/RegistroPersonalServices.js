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

  getProgramaDivision() {
    return http.get(`ProgramaDivision?AyuntamientoId=${getAyuntamientoId()}`)
  }

  getEmpleadoByID(id) {
    return http.get(`Empleado/${id}`)
  }

  getDepartamentoByProgramaId(id) {
    return http.get(`Departamento/Programa/${id}`)
  }

  //sectores
  getAllSector() {
    return http.get('sectores')
  }

  //AREA TRABAJO
  getAreaTrabajos() {
    return http.get('areas-trabajo')
  }

  getAreaTrabajoById(id) {
    return http.get(`areas-trabajo/${id}`)
  }

  addAreaTrabajo(data) {
    return http.post('areas-trabajo', data)
  }

  updateAreaTrabajo(id, data) {
    return http.put(`areas-trabajo/${id}`, data)

  }
  getSectorById(id) {
    return http.get(`sectores/${id}`)
  }

  addSector(data) {
    return http.post('sectores', data)
  }

  updateSector(id, data) {
    return http.put(`sectores/${id}`, data)
  }


  getAreaTrabajo() {
    return http.get('areas-trabajo')
  }

  //Combobox cargo
  getPosicion() {
    return http.get('Posicion')
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

  //direccion o dependecia
  getDireccionDependeciaById(id) {
    return http.get(`programas-division/${id}`)
  }

  getDireccionDependecia() {
    return http.get('programas-division')
  }

  postDireccionDependecia(data) {
    return http.post('programas-division', data)
  }

  putDireccionDependecia(id, data) {
    return http.put(`programas-division/${id}`, data)
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
