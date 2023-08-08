/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'
import { getAyuntamientoId, getFiscalYearId } from '@/utils/logged-info'

import { filter } from '@/utils/validator'
class Ejecucion {

  getMestProg(){
    return http.get('CtgMestProg')
  }

  getMestProgBadgered(){
    return http.get('PresGasto/prog-estructure-badgeted')
  }

  getRegistroGastoById(id){
    return http.get(`registros-gasto/${id}`)
  }

  registroGastoConfirmation(id){
    return http.patch(`registros-gasto/${id}/confirmation`)
  }
  registroGastoPayCheck(id){
    return http.patch(`registros-gasto/${id}/paycheck`)
  }
  registroGastoClosing(id){
    return http.patch(`registros-gasto/${id}/closing`)
  }

  getConceptoGastos(){
    return http.get('conceptos-gasto?status=true')
  }

  getTipoRetenciones(){
    return http.get('tipos-retenciones')
  }

  deleteRegistroGasto(id){
    return http.delete(`registros-gasto/${id}`)
  }
  //Comprobante Gasto
  getRegistroGasto(params){
    console.log(params)
    if(params.estado != ''){
      return http.get(`registros-gasto${filter(params)}`)
    }else{
      return http.get(`registros-gasto`)
    }
  }
  postRegistroGasto(data){
    return http.post('registros-gasto',data)
  }
  putRegistroGastoPagado(id){
    return http.put(`registros-gasto/${id}/pagado`)
  }
  putRegistroGastoDevengado(id){
    return http.put(`registros-gasto/${id}/devengado`)
  }
  getRegistroGastoDetalles(expeseRecordId){
    return http.get(`registros-gasto/${expeseRecordId}/detalles`)
  }
  getRegistroGastoClasificador(){
    return http.get('registros-gasto/Clasifica')
  }
  getRegistroGastoMesProg(mestProg){
    return http.get(`registros-gasto/estructura-programatica/${mestProg}`)
  }

  //get
  getBeneficiarios() {
    return http.get('Beneficiarios')
  }

  getBeneficiariosById(id) {
    return http.get(`Beneficiarios/${id}`)
  }

  deleteBeneficiario(id) {
    return http.delete(`Beneficiarios/${id}`)
  }

  getAnioFiscal() {
    return http.get('anios-fiscales')
  }

  getAnioFiscalbyid(id) {
    return http.get(
      `anios-fiscales/${getFiscalYearId()}?ayuntamientoId=${getAyuntamientoId()}`,
    )
  }

  getSector() {
    return http.get('Sector')
  }

  getContribuyente() {
    return http.get('contribuyentes')
  }

  getContribuyenteById(id) {
    return http.get(`contribuyentes/${id}`)
  }

  getSectorbyid(id) {
    return http.get(`Sector/${id}`)
  }

  getIngresoAll() {
    return http.get(
      `RegistroIngreso?anio=${getFiscalYearId()}&ayuntamientoId=${getAyuntamientoId()}`,
    )
  }

  getIngresoById(id, anioFiscalId, ayuntamientoId) {
    return http.get(
      `/RegistroIngreso/${id}?anio=${anioFiscalId}&ayuntamientoId=${ayuntamientoId}`,
    )
  }

  getIngresoById(id) {
    return http.get(`/registros-ingreso/${id}`)
  }

  getIngresoByIdAndDetalle(id) {
    return http.get(
      `RegistroIngreso/Detalle/${id}?anio=${getFiscalYearId()}&AyuntamientoId=${getAyuntamientoId()}`,
    )
  }

  getComprobanteIngresoTotal(id) {
    return http.get(
      `RegistroIngreso/Totales?id=${id}&anio=${getFiscalYearId()}&AyuntamientoId=${getAyuntamientoId()}`,
    )
  }

  getIngresoClasificadorById(id) {
    return http.get(
      `/RegistroIngreso/Detalle/Clasificadores?anio=${getFiscalYearId()}&AyuntamientoId=${getAyuntamientoId()}&id=${id}`,
    )
  }

  getRegistroIngreso(params) {
    return http.get(`registros-ingreso${filter(params)}`)
  }

  getRegistroIngresoDetalle(id) {
    return http.get(
      `RegistroIngreso/Detalle/RegistroIngreso?Transaccion=${id}&anio=${getFiscalYearId()}&AyuntamientoId=${getAyuntamientoId()}`,
    )
  }


  downloadGastoModificacion(value) {
    return http.get(`export-file/ingresos-modificacion?mes=${value}`)
  }
  downloadGastoEjecucion(value) {
    return http.get(`export-file/ingresos-ejecucion?mes=${value}`)
  }
  //Get tipo retenciones
  getTipoRetencion() {
    return http.get(
      `tipos-retenciones`,
    )
  }
  getTipoRetencionById(id) {
    return http.get(`TipoRetencion/${id}?Ayuntamiento=${getAyuntamientoId()}`)
  }

  //post

  postAnioFiscal(data) {
    return http.post('anios-fiscales', data)
  }

  postBeneficiarios(data) {
    return http.post('Beneficiarios', data)
  }

  postIngresos(data) {
    return http.post('registros-ingreso', data)
  }

  postIngresoDetalle(data) {
    return http.post('RegistroIngreso/Detalle', data)
  }

  postGastoDetalle(data) {
    return http.post('RegistroGasto/Detalle', data)
  }

  //Post TipoRetencion
  postTipoRetencion(data) {
    return http.post('TipoRetencion', data)
  }

  postTipoRetencionDetalle(data) {
    return http.post('DetalleRetencion', data)
  }

  //put

  putBeneficiarios(id, data) {
    return http.put(`Beneficiarios/${id}`, data)
  }

  putAnioFiscal(id, data) {
    return http.put(`anios-fiscales/${id}`, data)
  }

  putRegistroGasto(data, id) {
    return http.put(`RegistroGasto/${id}`, data)
  }

  getClasificador(Clasificador) {
    return http.get(`PresIngreso/GetClasificadorById/${Clasificador}`)
  }

  putIngresoCabecera(id, data) {
    return http.put(`RegistroIngreso?id=${id}`, data)
  }

  //put TipoRetenciones
  putTipoRetenciones(id, data) {
    return http.put(`TipoRetencion/${id}`, data)
  }

  //peticiones tipo gasto
  getTipoGastoList() {
    return http.get(`TipoGasto?Ayuntamiento=${getAyuntamientoId()}`)
  }

  PostTipoGasto(data) {
    return http.post('TipoGasto', data)
  }

  PutTipoGasto(id, data) {
    return http.put(`TipoGasto/${id}`, data)
  }

  getTipoGastoById(id) {
    return http.get(`TipoGasto/${id}?Ayuntamiento=${getAyuntamientoId()}`)
  }

  //Servicios beneficiario grupo pago

  getBeneficiariosGrupoList(){
    return http.get(`beneficiarios-compensacion?Ayuntamiento=${getAyuntamientoId()}`)
  }

  postBeneficiarioGrupo(data){
    return http.post('beneficiarios-compensacion',data)
  }

  putBeneficiarioGrupo(id,data){
    return http.put(`beneficiarios-compensacion/${id}`,data)
  }

  //servicios grupo compensacion

  getGrupoCompensacionList(){
    return http.get('grupos-compensacion')
  }
  getGrupoCompensacionBeneficiario(id){
    return http.get(`grupos-compensacion/${id}/beneficiarios`)
  }
  //Delete 

  deleteBeneficiarios(id){
    return http.delete(`Beneficiarios/${id}`)
  }
  //Concepto de gastos
  getConceptoGastoById(id) {
    return http.get(`conceptos-gasto/${id}`)
  }
  putConceptoGasto(id, data) {
    return http.put(`conceptos-gasto/${id}`, data)
  }
  postConceptoGasto(data) {
    return http.post('conceptos-gasto', data)
  }
  deleteConceptoGasto(id) {
    return http.delete(`conceptos-gasto/${id}`)
  }
  deleteRegistroIngreso(id) {
    return http.delete(`registros-ingreso/${id}`)
  }
  //Servicios de Grupo Pago
  getGrupoPagoList() {
    return http.get('grupos-compensacion')
  }

  putGrupoPago(id, data) {
    return http.put(`grupos-compensacion/${id}`, data)
  }

  postGrupoPago(data) {
    return http.post('grupos-compensacion', data)
  }

  getCatalogoFunciones() {
    return http.get('catalogos-funcion')
  }
}

export default new Ejecucion()
