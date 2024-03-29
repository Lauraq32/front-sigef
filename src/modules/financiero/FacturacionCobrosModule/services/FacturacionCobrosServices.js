/* eslint-disable prettier/prettier */
import http from '@/Api/http-common';
import { getAyuntamientoId } from "../../../../utils/logged-info";
class FacturacionCobros {
    //-----------------------------CLASIFICADORES---------------------------------------//
    //get
    getContribuyente() {
        return http.get(`Contribuyente/?ayuntamientoId=${getAyuntamientoId()}`)
    }

    getContribuyenteById(id) {
        return http.get(`Contribuyente/${id}`)
    }

    getSector() {
        return http.get('Sector')
    }

    getSectorbyid(id) {
        return http.get(`Sector/${id}`)
    }

    //post

    postContribuyente(data) {
        return http.post('Contribuyente', data)
    }

    postSector(data) {
        return http.post('Sector', data)
    }


    //put

    putContribuyente(id, data) {
        return http.put(`Contribuyente/${id}`, data)
    }

    putSector(id) {
        return http.put(`Sector/${id}`)
    }

    //delete


    deleteSector(id) {
        return http.delete(`Sector/${id}`)
    }

}

export default new FacturacionCobros()