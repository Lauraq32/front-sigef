import httpClient from '@/Api/http-common'
import { getAyuntamientoId } from '@/utils/logged-info'

class DeparmentServices {

  getDepartments(){
    return httpClient.get("/departamentos")
  }

  createDepartment(data){
   return httpClient.post("/departamentos", data)
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
