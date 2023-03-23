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
    return http.get(
      `Contribuyente/?ayuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }`,
    )
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
      `RegistroIngreso?anio=${
        JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId
      }&ayuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }`,
    )
  }

  getIngresoById(id, anioFiscalId, ayuntamientoId) {
    return http.get(
      `/RegistroIngreso/${id}?anio=${anioFiscalId}&ayuntamientoId=${ayuntamientoId}`,
    )
  }

  getIngresoByIdAndDetalle(id) {
    return http.get(
      `RegistroIngreso/Detalle/${id}?anio=${
        JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId
      }&AyuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }`,
    )
  }

  getComprobanteIngresoTotal(id) {
    return http.get(
      `RegistroIngreso/Totales?id=${id}&anio=${
        JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId
      }&AyuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }`,
    )
  }

  getIngresoClasificadorById(id) {
    return http.get(
      `/RegistroIngreso/Detalle/Clasificadores?anio=${
        JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId
      }&AyuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }&id=${id}`,
    )
  }

  getRegistroIngreso() {
    return http.get('RegistroIngreso/Detalle/Clasificador/')
  }

  getRegistroIngresoDetalle(id) {
    return http.get(
      `RegistroIngreso/Detalle/RegistroIngreso?Transaccion=${id}&anio=${
        JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId
      }&AyuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }`,
    )
  }

  getRegistroGastoDetalle(id) {
    return http.get(
      `RegistroGasto/Detalle?anio=${
        JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId
      }&AyuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }&id=${id}`,
    )
  }

  downloadGastoModificacion(value) {
    console.log(value)
    return http.get(
      `ExportFile/IngresoModificacion?ayuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }&anioFiscalId=${
        JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId
      }&mes=${value}`,
    )
  }
  downloadGastoEjecucion(value) {
    console.log(value)
    return http.get(
      `ExportFile/IngresoEjecucion?ayuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }&anioFiscalId=${
        JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId
      }&mes=${value}`,
    )
  }
  //Get tipo retenciones
  getTipoRetencion(id) {
    return http.get(
      `TipoRetencion?Ayuntamiento=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }&id=${id}`,
    )
  }
  getTipoRetencionById(id) {
    return http.get(
      `TipoRetencion/${id}?Ayuntamiento=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }`,
    )
  }
  getRegistroGastoDetalleMesprog(id) {
    return http.get(
      `RegistroGasto/Mesprog?anio=${
        JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId
      }&AyuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }&Mesprog=${id}`,
    )
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

  putAnioFiscal(id) {
    return http.put(`AnioFiscal/${id}`)
  }

  putRegistroGasto(data, id) {
    return http.put(`RegistroGasto/${id}`, data)
  }

  getRegistroGasto() {
    return http.get(
      `RegistroGasto?anio=${
        JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId
      }&AyuntamientoId=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }`,
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
    return http.get(
      `TipoGasto?Ayuntamiento=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }`,
    )
  }

  PostTipoGasto(data) {
    return http.post('TipoGasto', data)
  }

  PutTipoGasto(id, data) {
    return http.put(`TipoGasto/${id}`, data)
  }

  getTipoGastoById(id) {
    return http.get(
      `TipoGasto/${id}?Ayuntamiento=${
        JSON.parse(localStorage.getItem('usuario')).user.ayuntamiento.id
      }`,
    )
  }
}

export default new Ejecucion()
