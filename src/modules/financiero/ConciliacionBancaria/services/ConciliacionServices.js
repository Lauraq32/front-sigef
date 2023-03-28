/* eslint-disable prettier/prettier */

import http from '@/Api/http-common';
import { getAyuntamientoId } from "../../../../utils/logged-info";
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
    return http.get(`ConciliacionDebito/${getAyuntamientoId()}/${BancoId}`)
  }

  getAllNotaCreditoById(BancoId) {
    return http.get(`ConciliacionCredito/${getAyuntamientoId()}/${BancoId}`)
  }

  getAllChequeById(BancoId) {
    return http.get(`ConciliacionCheque/${getAyuntamientoId()}/${BancoId}`)
  }

  getCuentaById(BancoId) {
    return http.get(`ConciliacionCuentaBanco/GetCuentaById/${getAyuntamientoId()}/${BancoId}`)
  }

  getAllHistorico(BancoId, Fecha) {
    return http.get(`ConciliacionHistorico/${getAyuntamientoId()}/${BancoId}/${Fecha}`)
  }

  getAllHistoricos(BancoId, Fecha) {
    return http.get(`ConciliacionHistorico/GetHistorico/${getAyuntamientoId()}/${BancoId}/${Fecha}`)
  }
  
  getAllCuentaBanco() {
    return http.get(
      `ConciliacionCuentaBanco/${getAyuntamientoId()}`,
    )
  }

  getDepositoById(BancoId) {
    return http.get(
      `ConciliacionDeposito/${getAyuntamientoId()}/${BancoId}`,
    )
  }

  postDeposito(data) {
    return http.post(
      'ConciliacionDeposito', data)
  }

  generarCuentas() {
    return http.post(
      `ConciliacionCuentaBanco/${getAyuntamientoId()}`,
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
    return http.put(`ConciliacionCuentaBanco/${getAyuntamientoId()}/${BancoId}`,data)
  }

  //delete
}

export default new Conciliacion()
