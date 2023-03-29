/* eslint-disable prettier/prettier */
import http from '@/Api/http-common'
import { getAyuntamientoId, getFiscalYearId } from '@/utils/logged-info'
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

  getRegistroGastobyid(id) {
    return http.get(`RegistroGasto/${id}`)
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

  getRegistroGastoDetalle(id) {
    return http.get(
      `RegistroGasto/Detalle?anio=${user?.currentFiscalYearId}&AyuntamientoId=${user?.user.ayuntamiento.id}&id=${id}`,
    )
  }

  downloadGastoModificacion(value) {
    console.log(value)
    return http.get(
      `ExportFile/IngresoModificacion?ayuntamientoId=${getAyuntamientoId()}&anioFiscalId=${getFiscalYearId()}&mes=${value}`,
    )
  }
  downloadGastoEjecucion(value) {
    console.log(value)
    return http.get(
      `ExportFile/IngresoEjecucion?ayuntamientoId=${getAyuntamientoId()}&anioFiscalId=${getFiscalYearId()}&mes=${value}`,
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
  getRegistroGastoDetalleMesprog(id) {
    return http.get(
      `RegistroGasto/Mesprog?anio=${getFiscalYearId()}&AyuntamientoId=${getAyuntamientoId()}&Mesprog=${id}`,
    )
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

  getRegistroGasto() {
    return http.get(
      `RegistroGasto?anio=${getFiscalYearId()}&AyuntamientoId=${getAyuntamientoId()}`,
    )
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
