/* eslint-disable prettier/prettier */

import http from '@/Api/http-common'
const user = JSON.parse(localStorage.getItem('usuario'))
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
    return http.get(`ConciliacionDebito/${user?.user.ayuntamiento.id}/${BancoId}`)
  }

  getAllNotaCreditoById(BancoId) {
    return http.get(`ConciliacionCredito/${user?.user.ayuntamiento.id}/${BancoId}`)
  }

  getAllChequeById(BancoId) {
    return http.get(`ConciliacionCheque/${user?.user.ayuntamiento.id}/${BancoId}`)
  }

  getCuentaById(BancoId) {
    return http.get(`ConciliacionCuentaBanco/GetCuentaById/${user?.user.ayuntamiento.id}/${BancoId}`)
  }

  getAllHistorico(BancoId, Fecha) {
    return http.get(`ConciliacionHistorico/${user?.user.ayuntamiento.id}/${BancoId}/${Fecha}`)
  }

  getAllHistoricos(BancoId, Fecha) {
    return http.get(`ConciliacionHistorico/GetHistorico/${user?.user.ayuntamiento.id}/${BancoId}/${Fecha}`)
  }
  
  getAllCuentaBanco() {
    return http.get(
      `ConciliacionCuentaBanco/${user?.user.ayuntamiento.id}`,
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

  generarCuentas() {
    return http.post(
      `ConciliacionCuentaBanco/${user?.user.ayuntamiento.id}`,
    )
  }

  postHistoricoBanco(data) {
    return http.post(
      'ConciliacionHistorico', data)
  }

  postCuentaBancoConciliacion(data) {
    return http.post(
      'ConciliacionCuentaBanco', data)
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

  putConciliacioncuentaBanco(BancoId,data) {
    return http.put(`ConciliacionCuentaBanco/${user?.user.ayuntamiento.id}/${BancoId}`,data)
  }

  //delete
}

export default new Conciliacion()
