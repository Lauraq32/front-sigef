import http from '@/Api/http-common'

class UsuariosApi {
  getUsuarioList() {
    return http.get("/login/listarUsuarios");
  }
}

export default new UsuariosApi()
