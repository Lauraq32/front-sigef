/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'

class CuentasPorPagar {
  //-----------------------------CLASIFICADORES---------------------------------------//
  //get
  getBeneficiarios() {
    return http.get('Beneficiarios')
  }

  getBeneficiariosById(id) {
    return http.get(`Beneficiarios/${id}`)


  }

    //put

    putBeneficiarios(id) {
      return http.put(`Beneficiarios/${id}`)
    }

    putAnioFiscal(id) {
      return http.put(`AnioFiscal/${id}`)
    }


    //delete

  }

export default new CuentasPorPagar()