
import http from '@/Api/http-common'

class ProfesionesServices {

  getProfesiones() {
    return http.get('profesiones')
  }
  
  getProfesionesById(id) {
    return http.get(`profesiones/${id}`)
  }
  
  
  getByIdSolicitudEmpleo(id){
    return http.get(`profesiones/${id}`)
  }

  postSolicitudEmpleo(data){
    return http.post(`profesiones`,data)
  }

  putSolicitudEmpleo(id,data){
    return http.put(`profesiones/${id}`,data)
  }

}

export default new ProfesionesServices()
