import http from '@/Api/http-common'

class Administrativo {
  getUsuarioList() {
    return http.get('/login/listarUsuarios')
  }
}

export default new Administrativo()
