/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'

class RegistroPersonal {
  //get
  getAllTipoSangre() {
    return http.get('TipoSangre')
  }

  getTipoSangreByID(id) {
    return http.get(`TipoSangre/${id}`)
  }


  
  getAllEmpleado() {
    return http.get(`Empleado?ayuntamientoId=${parseInt(localStorage.getItem('id_Ayuntamiento'))}`)
  }
  
  getProgramaDivision(){
    return http.get(`ProgramaDivision`)
  }

  getEmpleadoByID(id) {
    return http.get(`Empleado/${id}`)

  }

  getAreaTrabajo() {
    return http.get('AreaTrabajo')
  }

  //Combobox cargo
  getPosicion(){
    return http.get('Posicion')
  }

  getAreaTrabajobyid(id) {
    return http.get(`AreaTrabajo/${id}`)
  }
  //post

  postEmpleado(data) {
    return http.post('Empleado', data)
  }

  postAreaTrabajo(data) {
    return http.post('AreaTrabajo', data)
  }


  //put
  putEmpleado(id,data) {
    return http.put(`Empleado/${id}`,data)
  }

  putArea(id) {
    return http.put(`Area/${id}`)
  }

  putAreaTrabajo(id) {
    return http.put(`AreaTrabajo/${id}`)
  }

  deleteEmpleado(id){
    return http.delete(`Empleado/${id}`)
  }
}

export default new RegistroPersonal()
