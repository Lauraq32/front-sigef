/* eslint-disable prettier/prettier */
import http from '@/Api/http-common';
import { getAyuntamientoId } from '@/utils/logged-info';
import FileApi from './Files';
class RegistroPersonal {
  //delete Cargo
  deleteCargo(id){
    return http.delete(`cargos/${id}`)
  }
  //put utils
  putUtils(data,id) {
    return http.put(`utiles-laborales/${id}`,data)
  }
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
    return http.get(`ayuntamientos/${id}`)
  }

  getAllEmpleado(filter = {}) {
    const params = Object.keys(filter).map(key => `${key}=${filter[key]}`);
    return http.get(`empleados${params.length ? '?' + params.join('&'): ''}`)
  }
  
  getCargobyid(id) {
    return http.get(`cargos/${id}`)
  }
  
  getAllCargos() {
    return http.get(`cargos`)
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

  postInventario(data) {
    return http.post('inventarios', data)
  }

  putInventario(id, data) {
    return http.put(`inventarios/${id}`, data)
  }
  
  getUtilesLaborales(empleadoId) {
    return http.get(`utiles-laborales/empleado/${empleadoId}`);
  }
  
  postUtilLaboral(data) {
    return http.post(`utiles-laborales`, data)
  }
  
  putUtilLaboral(id, data) {
    return http.post(`utiles-laborales/${id}`, data)
  }
  
  cancelUtilLaboral(id) {
    return http.patch(`utiles-laborales/${id}/canceled`)
  }
  
  deliverUtilLaboral(id) {
    return http.patch(`utiles-laborales/${id}/delivered`)
  }
  
  getUtilLaboralEventos(id) {
    return http.get(`utiles-laborales/${id}/eventos`);
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
    return http.get('cargos')
  }
  
  getAreaTrabajobyid(id) {
    return http.get(`areas-trabajo/${id}`)
  }
  getImagenesById(fileId) {
    return http.get(`files/${fileId}`)
  }
  
  postFiles(formData) {
    return FileApi.saveFile(formData);
  }
  //get Archivos por el id del empleado
  getFilesByEmployeeId(id) {
    return FileApi.getFiles({
      tag: { empleadoId: id }
    });
  }
  //post

  postEmpleados(data) {
    return http.post('empleados', data)
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
  listDepartamento(programaId){
    return http.get(`departamentos?compat=true&ProgramaDivisionId=${programaId}`)
  }
  reactivarEmpleado(id){
    return http.patch(`empleados/${id}/re-activado`)
  }
}

export default new RegistroPersonal()
