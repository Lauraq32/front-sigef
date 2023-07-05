import http from '@/Api/http-common'

class Administrativo {
  getAyuntamiento(id) {
    return http.get(`ayuntamientos/${id}`)
  }

  putAyuntamiento(id,data) {
    return http.put(`ayuntamientos/${id}`,data)
  }
}

export default new Administrativo()
