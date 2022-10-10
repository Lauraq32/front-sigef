import http from '@/Api/http-common'

class FormulacionApi {
  //-----------------------------CLASIFICADORES---------------------------------------//
  //Obtener listado de Clasificadores
  Login(user,pass){
    return http.get(`/login/login/?usuario=${user}&contra=${pass}`);
    
  }

}

export default new FormulacionApi()
