import http from '@/Api/http-common'
import { filter } from '@/utils/validator'
class Administrativo {
  getUsuarioList(params) {
    return http.get(`Users${filter(params)}`)
  }
  getAllEmpleado(filter = {}) {
    const params = Object.keys(filter).map((key) => `${key}=${filter[key]}`)
    return http.get(`empleados${params.length ? '?' + params.join('&') : ''}`)
  }

  postUsuario(data) {
    return http.post('Users/register', data)
  }

  putUsuario(id, data) {
    return http.put(`Users/${id}`, data)
  }

  cancelarUsuario(id) {
    return http.patch(`Users/${id}/inactivado`)
  }
  reactivarUsuario(id) {
    return http.patch(`Users/${id}/activado`)
  }
  resetPassWord(id) {
    return http.patch(`Users/${id}/Password`)
  }
}

export default new Administrativo()
