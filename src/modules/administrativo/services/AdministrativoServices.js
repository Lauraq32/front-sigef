import http from '@/Api/http-common'


class Administrativo {
  getAyuntamiento(id) {
    return http.get(`ayuntamientos/${id}`)
  }
}

export default new Administrativo()
