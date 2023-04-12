import http from '@/Api/http-common'
class configuraciones {
  grupos = {
    jwt:1,
     
    password:2,
    nivelEscolar:3,
    areaTematica:4,
    Discapacidad:5,
    Urls: 8
  }
  

  getGroupConfiguration(grupoId) {
    return http.get(`grupos/${grupoId}/configuraciones`)
  }
}

export default new configuraciones()
