import http from '@/Api/http-common'

class AdministrativoApi {
  getUsuarioList() {
    return http.get('/login/listarUsuarios')
  }

  createFpMetaAndDetalle(data) {
    return http.post('/fp-meta', data);
  }
  
  getFpMetaAndDetalle() {
    return http.get('/fp-meta');
  }

  editFpMetaAndDetalle(id ,data) {
    return http.put(`/fp-meta/${id}`, data);
  }

  deleteFpMetaDetalle(id) {
    return http.delete(`/fp-meta/detalle/${id}`);
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

export default new AdministrativoApi()
