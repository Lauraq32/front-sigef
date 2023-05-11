import httpClient from '@/Api/http-common'
import { getAyuntamientoId } from '@/utils/logged-info'
import FormulacionApi from '@/modules/financiero/FormulacionModule/services/FormulacionServices'

class DeparmentServices {
  deleteDepartment(id) {
    return httpClient.delete(`/departamentos/${id}`)
  }

  getDepartments(value = true) {
    return httpClient.get(`/departamentos?Status=${value}`)
  }

  createDepartment(data) {
    return httpClient.post('/departamentos', data)
  }

  updateDepartment(data) {
    return httpClient.put(`/departamentos/${data.id}`, data)
  }

  getProgramasDivision() {
    return httpClient.get('/programas-division')
  }

  getGruposNomina() {
    return httpClient.get('/grupoNomina')
  }

  getCuentasDeBancos() {
    return httpClient.get(`/ConciliacionCuentaBanco/${getAyuntamientoId()}`)
  }

  getEstructurasProgramaticas() {
    return FormulacionApi.getEstProgramatica()
  }

  getClasificadores() {
    return FormulacionApi.getListarClasificadores()
  }

  validarEstructuraPresupuestada(
    estructuraProgramatica,
    clasificador,
    fuenteFinanciador,
    fuenteEspecifica,
    organismoFinanciador,
  ) {
    return FormulacionApi.validarEstructuraPresupuestada(
      estructuraProgramatica,
      clasificador,
      fuenteFinanciador,
      fuenteEspecifica,
      organismoFinanciador,
    )
  }
}

export default new DeparmentServices()
