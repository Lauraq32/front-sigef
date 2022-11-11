/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'

class Ejecucion {
    //-----------------------------CLASIFICADORES---------------------------------------//
    //get
    getBeneficiarios() {
        return http.get('Beneficiarios')
    }

    getBeneficiariosById(id) {
        return http.get(`Beneficiarios/${id}`)
    }

    getAnioFiscal() {
        return http.get('AnioFiscal')
    }

    getAnioFiscalbyid(id) {
        return http.get(`AnioFiscal/${id}`)
    }

    getSector() {
        return http.get('Sector')
    }

    getSectorbyid(id) {
        return http.get(`Sector/${id}`)
    }

    //post

    postAnioFiscal(data) {
        return http.post('AnioFiscal', data)
    }

    postBeneficiarios(data) {
        return http.post('Beneficiarios', data)
    }



    //put

    putBeneficiarios(id, data) {
        return http.put(`Beneficiarios/${id}`, data)
    }

    putAnioFiscal(id) {
        return http.put(`AnioFiscal/${id}`)
    }


    //delete

}

export default new Ejecucion()