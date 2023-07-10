import http from '@/Api/http-common'

class Administrativo {
  getUsuarioList() {
    return http.get('/login/listarUsuarios')
  }

  //Mision y vision services
  getMisionVision() {
    return http.get('objetivos-declaracion')
  }

  putMisionVision(id,data) {
    return http.put(`objetivos-declaracion/${id}`,data)
  }

  postMisionVision(data){
    return http.post(`objetivos-declaracion`,data)
  }
}

export default new Administrativo()