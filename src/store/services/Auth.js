import http from '@/Api/http-common'

class FormulacionApi {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
      })
  }
  Login(data) {
    return http.post(`Authentication/loginfeito`, data)
  }
}

export default new FormulacionApi()
