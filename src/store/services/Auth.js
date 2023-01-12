import http from '@/Api/http-common'
import axios from 'axios';

class FormulacionApi {
  //-----------------------------CLASIFICADORES---------------------------------------//
  //Obtener listado de Clasificadores
    
    Login(user) {
      return axios
        .post(process.env.VUE_APP_API_URL+ '/api/' + 'Authentication/login', {
          usuario: user.usuario,
          password: user.password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }

    getAyuntamientoInfo(id) {
      return http.get(`Ayuntamiento/${id}`)
    }


  login(data){
    return http.post(`Authentication/loginfeito`,data);
    
  }

}

export default new FormulacionApi()
