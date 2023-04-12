/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'
import { getAyuntamientoId } from '@/utils/logged-info';
class RegistroPersonal {
  //get
  getAllTipoSangre() {
    return http.get('tipos-sangre')
  }

  getTipoSangreByID(id) {
    return http.get(`TipoSangre/${id}`)
  }

  getSectorbyid(id) {
    return http.get(`Sector / ${id}`)
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
    return http.get(
      `Empleado?ayuntamientoId=${
       getAyuntamientoId()
      }`,
    )
  }

  getProgramaDivision() {
    return http.get(
      `ProgramaDivision?AyuntamientoId=${getAyuntamientoId()}`,
    )
  }

  getEmpleadoByID(id) {
    return http.get(`Empleado/${id}`)
  }

  getDepartamentoByProgramaId(id) {
    return http.get(`Departamento/Programa/${id}`)
  }

  getSectores() {
    return http.get(
      `Sector?ayuntamiento=${
       getAyuntamientoId()
      }`,
    )
  }

  getAreaTrabajo() {
    return http.get('AreaTrabajo')
  }

  //Combobox cargo
  getPosicion() {
    return http.get('Posicion')
  }

  getAreaTrabajobyid(id) {
    return http.get(`AreaTrabajo/${id}`)
  }
  //post

  postEmpleado(data) {
    return http.post('Empleado', data)
  }

  postSectores(data) {
    return http.post('Sector', data)
  }

  postAreaTrabajo(data) {
    return http.post('AreaTrabajo', data)
  }

  //put
  putEmpleado(id, data) {
    return http.put(`Empleado/${id}`, data)
  }

  putArea(id) {
    return http.put(`Area/${id}`)
  }

  putSector(id, post) {
    return http.put(`Sector / ${id}`, post)
  }

  putAreaTrabajo(id) {
    return http.put(`AreaTrabajo/${id}`)
  }

  deleteEmpleado(id) {
    return http.delete(`Empleado/${id}`)
  }

  deleteSector(id) {
    return http.delete(
      `Sector/${id}?ayuntamiento=${
       getAyuntamientoId()
      }`,
    )
  }
}

export default new RegistroPersonal()
