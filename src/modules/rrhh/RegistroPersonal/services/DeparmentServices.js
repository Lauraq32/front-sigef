import httpClient from '@/Api/http-common'
import { getAyuntamientoId } from '@/utils/logged-info'

class DeparmentServices {

  deleteDepartment(id){
    return httpClient.delete(`/departamentos/${id}`)
  }

  getDepartments(value = true){
    return httpClient.get(`/departamentos?Status=${value}`)
  }

  createDepartment(data){
   return httpClient.post("/departamentos", data)
  }

  updateDepartment(data){
    return httpClient.put(`/departamentos/${data.id}`, data)
   }

  getProgramasDivision(){
    return httpClient.get("/programas-division");
  }

  getGruposNomina(){
    return httpClient.get("/grupoNomina")
  }

  getCuentasDeBancos(){
    return httpClient.get(`/ConciliacionCuentaBanco/${getAyuntamientoId()}`);
  }

  getEstructurasProgramaticas(){
    return httpClient.get("/CtgMestProg");
  }

  getClasificadores(){
    return  httpClient.get("/CtgClasificador")
  }
}

export default new DeparmentServices()
