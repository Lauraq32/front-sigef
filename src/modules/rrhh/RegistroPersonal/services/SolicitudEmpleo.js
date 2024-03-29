
import http from '@/Api/http-common'
import { getAyuntamientoId } from '@/utils/logged-info'
class SolicitudEmpleo {

  getSolicitudEmpleo() {
    return http.get('solicitud-empleos')
  }

  getPosiciones(){
    return http.get('cargos')
  }

  getByIdSolicitudEmpleo(id){
    return http.get(`solicitud-empleos/${id}`)
  }

  postSolicitudEmpleo(data){
    return http.post(`solicitud-empleos`,data)
  }

  putSolicitudEmpleo(id,data){
    return http.put(`solicitud-empleos/${id}`,data)
  }




}

export default new SolicitudEmpleo()
