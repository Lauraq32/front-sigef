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
    return http.get('Empleado')
  }

  getEmpleadoByID(id) {
    return http.get(`Empleado/${id}`)

  }

  getAreaTrabajo() {
    return http.get('AreaTrabajo')
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
  putEmpleado(id) {
    return http.put(`Empleado/${id}`)
  }

  putArea(id) {
    return http.put(`Area/${id}`)
  }

  putAreaTrabajo(id) {
    return http.put(`AreaTrabajo/${id}`)
  }
}

export default new RegistroPersonal()
