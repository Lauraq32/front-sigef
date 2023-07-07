import http from '@/Api/http-common'

class Administrativo {
  getAyuntamiento(id) {
    return http.get(`ayuntamientos/${id}`)
  }

  putAyuntamiento(id,data) {
    return http.put(`ayuntamientos/${id}`,data)
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
