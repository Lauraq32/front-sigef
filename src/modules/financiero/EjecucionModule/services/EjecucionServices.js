/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'
import { getAyuntamientoId, getFiscalYearId } from '@/utils/logged-info'
class Ejecucion {
  //Comprobante Gasto
  getRegistroGasto(){
    return http.get('registros-gasto')
  }
  postRegistroGasto(data){
    return http.post('registros-gasto',data)
  }
  putRegistroGastoPagado(data,id){
    return http.put(`registros-gasto/${id}/pagado`,data)
  }
  putRegistroGastoDevengado(data,id){
    return http.put(`registros-gasto/${id}/devengado`,data)
  }
  getRegistroGastoById(id){
    return http.get(`registros-gasto/${id}
    `)
  }
  getRegistroGastoDetalles(expeseRecordId){
    return http.get(`registros-gasto/${expeseRecordId}/detalles`)
  }
  getRegistroGastoClasificador(){
    return http.get('registros-gasto/Clasifica')
  }
  getRegistroGastoMesProg(){
    return http.get('registros-gasto/MesProg')
  }

  //get
  getBeneficiarios() {
    return http.get('Beneficiarios')
  }

  getBeneficiariosById(id) {
    return http.get(`Beneficiarios/${id}`)
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
    return http.get(`Contribuyente/?ayuntamientoId=${getAyuntamientoId()}`)
  }

  getContribuyenteById(id) {
    return http.get(`Contribuyente/${id}`)
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

  getRegistroIngreso() {
    return http.get('RegistroIngreso/Detalle/Clasificador/')
  }

  getRegistroIngresoDetalle(id) {
    return http.get(
      `RegistroIngreso/Detalle/RegistroIngreso?Transaccion=${id}&anio=${getFiscalYearId()}&AyuntamientoId=${getAyuntamientoId()}`,
    )
  }


  downloadGastoModificacion(value) {
    return http.get(
      `export-file/ingresos-modificacion?mes=${value}`,
    )
  }
  downloadGastoEjecucion(value) {
    return http.get(
      `export-file/ingresos-ejecucion?mes=${value}`,
    )
  }
  //Get tipo retenciones
  getTipoRetencion(id) {
    return http.get(
      `TipoRetencion?Ayuntamiento=${getAyuntamientoId()}&id=${id}`,
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
    return http.post('RegistroIngreso', data)
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

  postRegistroGasto(post) {
    return http.post(`RegistroGasto`, post)
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
}

export default new Ejecucion()
