/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'
import { getAyuntamientoId } from '@/utils/logged-info'
class RegistroPersonal {
  //get
  tipoSangreList() {
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

  getAyuntamientoById(id){
    return http.get(`Ayuntamiento/${id}`)
  }

  getAllEmpleado() {
    return http.get(`empleados`)
  }

  //CARGOS
  getAllCargos() {
    return http.get('cargos')
  }

  getCargobyid(id) {
    return http.get(`cargos/${id}`)
  }

  updateCargo(id, data) {
    return http.put(`cargos/${id}`, data)
  }

  addCargos(data) {
    return http.post('cargos', data)
  }


  getProgramaDivision() {
    return http.get(`programas-division`)
  }

  getEmpleadoByID(id) {
    return http.get(`empleados/${id}`)
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
    return http.post('empleados', data)
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
    return http.put(`empleados/${id}`, data)
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
    return http.delete(`empleados/${id}`)
  }

  deleteSector(id) {
    return http.delete(`sectores/${id}?ayuntamiento=${getAyuntamientoId()}`)
  }
  listDepartamento(){
    return http.get('departamentos/lista')
  }
}

export default new RegistroPersonal()
