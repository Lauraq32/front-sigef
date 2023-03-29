import http from '@/Api/http-common'

class FormulacionApi {
  Login(user) {
    return  http.post('Authentication', user)
  }

}

export default new FormulacionApi()
