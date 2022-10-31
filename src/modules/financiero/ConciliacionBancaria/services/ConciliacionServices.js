/* eslint-disable prettier/prettier */

import http from '@/Api/http-common'

class Conciliacion {
  //-----------------------------CLASIFICADORES---------------------------------------//
  //get
  getBeneficiarios() {
    return http.get('Beneficiarios')
  }

  getBeneficiariosById(id) {
    return http.get(`Beneficiarios/${id}`)
  }

  //post

  postAnioFiscal(data) {
    return http.post('AnioFiscal', data)
  }


  //put

  putBeneficiarios(id) {
    return http.put(`Beneficiarios/${id}`)
  }


  //delete

}

export default new Conciliacion()