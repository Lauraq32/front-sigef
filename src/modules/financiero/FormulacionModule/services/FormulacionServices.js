import http from '@/Api/http-common'
import Swal from 'sweetalert2/dist/sweetalert2.js'
const user = JSON.parse(localStorage.getItem('usuario'))
class FormulacionApi {
  downloadIngreso() {
    return http.get(
      `ExportFile/IngresoFormulacion?ayuntamientoId=${localStorage.getItem(
        'id_Ayuntamiento',
      )}&anioFiscalId=${localStorage.getItem('ano')}`,
    )
  }

  //-----------------------------CLASIFICADORES---------------------------------------//
  //Obtener listado de Clasificadores
  getListarClasificadores() {
    return http.get('/CtgClasificador')
  }
  getListarOrganismo() {
    return http.get('/CtgOrganismoFinanciador')
  }

  getEstProgramatica() {
    return http.get('CtgMestProg')
  }

  deleteIngreso(id) {
    return http.delete(`PresIngreso/${id}`)
  }

  getClasificador(Clasificador) {
    return http.get(`PresIngreso/GetClasificadorById/${Clasificador}`)
  }
  getPresIngresoById(item) {
    return http.get(
      `/PresIngreso/${item.id}?anio=${item.anioFiscalId}&ayuntamientoId=${item.ayuntamientoId}`,
    )
  }

  editPresIngreso(id, data) {
    return http.put(`/PresIngreso/${id}`, data)
  }

  postFormulacionIngreso(data) {
    return http.post('PresIngreso', data)
  }

  getAllFormulacionIngreso(anioFiscal, ayuntamientoId) {
    return http.get(
      `PresIngreso?anio=${anioFiscal}&AyuntamientoId=${ayuntamientoId}`,
    )
  }

  updateFormulacion(id, data) {
    return http.put(`PresGasto/${id}`, data)
  }

  updateFormulacionDetalle(id, data) {
    return http.put(`PresGasto/Detalle/${id}`, data)
  }

  getDetalle(id) {
    return http.get(
      `PresGasto/GetDetallePresGastobyIdAsync/${id}?anio=${
        user?.currentFiscalYearId
      }&AyuntamientoId=${
        user?.user.ayuntamiento.id
      }`,
    )
  }

  getTotalIngresos(ano_fiscal, id_ayuntamiento) {
    return http.get(
      `/PresIngreso/GetTotal?anio=${ano_fiscal}&ayuntamientoId=${id_ayuntamiento}`,
    )
  }

  getListarEstructuraProgramatica() {
    return http.get('/Financiero/ListarProgramatico')
  }

  getFuenteEspecifica() {
    return http.get('/CtgFuente')
  }

  getFuente() {
    return http.get('/CtgFuenteEspecifica')
  }

  getListarFuentesFinanciamiento() {
    return http.get('/Financiero/ListarFuentes')
  }

  getListarFinancieroCatalogoOrganismos() {
    return http.get('/Financiero/ListarFinancieroCatalogoOrganismos')
  }

  getListarProyecto(id_ayuntamiento, ano_fiscal) {
    return http.get(
      `/Financiero/ListarProyecto/?ano=${ano_fiscal}&id=${id_ayuntamiento}`,
    )
  }

  getListarIngresos(id_ayuntamiento, ano_fiscal) {
    return http.get(
      `PresIngreso?anio=${ano_fiscal}&ayuntamientoId=${id_ayuntamiento}`,
    )
  }

  getListarCatalogo() {
    return http.get('/Financiero/ListarCatalogoFunciones')
  }


  getListarGastos(id) {
    return http.get(
      `PresGasto?anio=${
        user?.user.ayuntamiento.id
      }&ayuntamientoId=${
        user?.currentFiscalYearId
      }`,
    )
  }

  getListarGastosById(id) {
    return http.get(
      `PresGasto?anio=${
        user?.user.ayuntamiento.id
      }&ayuntamientoId=${
        user?.currentFiscalYearId
      }`,
    )
  }
  getFileById(id){
     return http.get(`file/${id}`)
  }

  postGastos(post) {
    return http.post(`PresGasto`, post).catch((error) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: error.response.data.detail,
        title: 'Error',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  postCargaMasiva(post) {
    return http.post(`UploadFile/PresIngreso`, post).catch((error) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: error.response.data.detail,
        title: 'Error',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  postCargaMasivaCabecera(post) {
    return http.post(`UploadFile/PresGasto`, post).catch((error) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: error.response.data.detail,
        title: 'Error',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  postCargaMasivaDetalle(post) {
    return http.post(`UploadFile/PresGasto/Detalle`, post).catch((error) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: error.response.data.detail,
        title: 'Error',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  cargarEstructuras() {
    return http
      .post(
        `PresGasto?anio=${
          user?.user.ayuntamiento.id
        }&ayuntamientoId=${
          user?.currentFiscalYearId
        }`,
      )
      .catch((error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          text: error.response.data.detail,
          title: 'Error',
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  postDetalleGasto(post) {
    return http.post(`PresGasto/Detalle`, post).catch((error) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: error.response.data.detail,
        title: 'Error',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  }

  getEstruturaProgramaticaById(value) {
    return http.get(`CtgMestProg/${value}`).catch((error) => {})
  }
}

export default new FormulacionApi()
