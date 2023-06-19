import http from '@/Api/http-common'
class configuraciones {
  grupos = {
    nivelEscolar:3,
    areaTematica:4,
    Discapacidad:5,
    gruponomina:9,
  }
  

  getGroupConfiguration(grupoId) {
    return http.get(`grupos/${grupoId}/configuraciones`)
  }
}

export default new configuraciones()
