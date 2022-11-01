import http from '@/Api/http-common'

class FormulacionApi {
  //-----------------------------CLASIFICADORES---------------------------------------//
  //Obtener listado de Clasificadores
  Login(data){
    return http.post(`Authentication`,data);
    
  }

}

export default new FormulacionApi()
