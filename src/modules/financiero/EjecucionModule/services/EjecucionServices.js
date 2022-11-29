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

    getContribuyente() {
        return http.get('Contribuyente')
    }

    getSectorbyid(id) {
        return http.get(`Sector/${id}`)
    }
    
    getIngresoAll() {
        return http.get(`RegistroIngreso?anio=${localStorage.getItem('ano')}&ID_AYUNTAMIENTO=${localStorage.getItem('id_Ayuntamiento')}`)
    }

    getIngresoById(id,anioFiscalId,ayuntamientoId) {
        return http.get(`/RegistroIngreso/${id}?anio=${anioFiscalId}&ayuntamientoId=${ayuntamientoId}`)
    }

    getIngresoByIdAndDetalle(id) {
        return http.get(`RegistroIngreso/Detalle/${id}?anio=${localStorage.getItem('ano')}&AyuntamientoId=${localStorage.getItem('id_Ayuntamiento')}`)
    }

    getComprobanteIngresoTotal(id) {
        return http.get(`RegistroIngreso/Totales?id=${id}&anio=${localStorage.getItem('ano')}&AyuntamientoId=${localStorage.getItem('id_Ayuntamiento')}`)
    }

    getIngresoClasificadorById(id) {
        return http.get(`/RegistroIngreso/Detalle/Clasificadores?anio=${localStorage.getItem('ano')}&AyuntamientoId=${localStorage.getItem('id_Ayuntamiento')}&id=${id}`)
    }

    getRegistroIngreso() {
        return http.get('RegistroIngreso')
    }

    

    //post

    postAnioFiscal(data) {
        return http.post('AnioFiscal', data)
    }

    postBeneficiarios(data) {
        return http.post('Beneficiarios', data)
    }

    postIngresos(data) {
        return http.post('RegistroIngreso', data)
    }

    postIngresoDetalle(data) {
        return http.post('RegistroIngreso/Detalle', data)
    }

    postGastoDetalle(data) {
        return http.post('RegistroGasto/Detalle', data)
    }



    //put

    putBeneficiarios(id, data) {
        return http.put(`Beneficiarios/${id}`, data)
    }

    putAnioFiscal(id) {
        return http.put(`AnioFiscal/${id}`)
    }


    getRegistroGasto(){
        return http.get(`RegistroGasto?anio=${localStorage.getItem('ano')}&AyuntamientoId=${localStorage.getItem('id_Ayuntamiento')}`)
    }
    postRegistroGasto(post){
        return http.post(`RegistroGasto`,post)
    }

}

export default new Ejecucion()