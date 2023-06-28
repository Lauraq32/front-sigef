import http from '@/Api/http-common'

class UsuariosApi {
  getUsuarioList() {
    return http.get('/login/listarUsuarios')
  }

  getFpServicioPersonal(){
    return http.get('fp-servicio-personal')
  }
  postFpServicioPersonal(data){
    return http.post('fp-servicio-personal',data)
  }
  putFpServicioPersonalById(id,data){
    return http.put(`fp-servicio-personal/${id}`,data)
  }
  deleteFpServicioPersonal(id){
    return http.delete(`fp-servicio-personal/${id}`)
  }
  getMestProg(){
    return http.get(`CtgMestProg`)
  }
}

export default new UsuariosApi()
