/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'
import { getAyuntamientoId } from '@/utils/logged-info'
class RegistroPersonal {
  //get
  tipoSangreList() {
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

  getAccionesPersonalById(id) {
    return http.get(`acciones-personal/${id}`)
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

  getInventarioById(id) {
    return http.get(`inventarios/${id}/utiles-laborales`)
  }

  postInventarioById(id, data) {
    return http.post(`inventarios/${id}/utiles-laborales`, data)
  }

  postEventos(id, data) {
    return http.post(`inventarios/${id}/eventos`, data)
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

  getAccionPersonalByID(id) {
    return http.get(`acciones-personal/empleado/${id}`)
  }

  getTipoAccionByID(id) {
    return http.get(`tipo-acciones/${id}`)
  }

  getDepartamentoByProgramaId(id) {
    return http.get(`Departamento/Programa/${id}`)
  }

  //sectores
  getAllSector() {
    return http.get('sectores')
  }

  getAllInventario() {
    return http.get('inventarios')
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

  postInventario(data) {
    return http.post('inventarios', data)
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

  putInventario(id, data) {
    return http.put(`inventarios/${id}`, data)
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
    return http.delete(`empleados/${id}`)
  }

  deleteSector(id) {
    return http.delete(`sectores/${id}?ayuntamiento=${getAyuntamientoId()}`)
  }
  listDepartamento() {
    return http.get('departamentos/lista')
  }
}

export default new RegistroPersonal()
