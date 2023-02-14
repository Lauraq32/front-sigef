/* eslint-disable prettier/prettier */

import http from '@/Api/http-common'

class Conciliacion {
  //-----------------------------CLASIFICADORES---------------------------------------//
  //get
  getBeneficiarios() {
    return http.get('Beneficiarios')
  }

  getAllDepositos() {
    return http.get('ConciliacionDeposito')
  }

  getAllNotaDebitoById(BancoId) {
    return http.get(`ConciliacionDebito/${localStorage.getItem('id_Ayuntamiento')}/${BancoId}`)
  }

  getAllNotaCreditoById(BancoId) {
    return http.get(`ConciliacionCredito/${localStorage.getItem('id_Ayuntamiento')}/${BancoId}`)
  }

  getAllChequeById(BancoId) {
    return http.get(`ConciliacionCheque/${localStorage.getItem('id_Ayuntamiento')}/${BancoId}`)
  }

  getAllHistorico(BancoId, Fecha) {
    return http.get(`ConciliacionHistorico/${localStorage.getItem('id_Ayuntamiento')}/${BancoId}/${Fecha}`)
  }

  
  getAllCuentaBanco() {
    return http.get(
      `ConciliacionCuentaBanco/${localStorage.getItem('id_Ayuntamiento')}`,
    )
  }

  getDepositoById(BancoId) {
    return http.get(
      `ConciliacionDeposito/${localStorage.getItem(
        'id_Ayuntamiento',
      )}/${BancoId}`,
    )
  }

  postDeposito(data) {
    return http.post(
      'ConciliacionDeposito', data)
  }

  postNotaDebito(data) {
    return http.post(
      'ConciliacionDebito', data)
  }
  postNotaCredito(data) {
    return http.post(
      'ConciliacionCredito', data)
  }

  postCheque(data) {
    return http.post(
      'ConciliacionCheque', data)
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
