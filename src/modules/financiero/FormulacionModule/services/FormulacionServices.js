import http from '@/Api/http-common'
import VueSweetalert2 from 'vue-sweetalert2'
import Swal from 'sweetalert2/dist/sweetalert2.js'

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
  //PostIngreso
  // createIngreso(data) {
  //   return http.post('PresIngreso', data).catch((error) => {
  //     console.log(error.response.data.detail)
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'error',
  //       text: error.response.data.detail,
  //       title: 'Error',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     })

  //     //alert(error.response.data.detail)
  //   })
  // }

  getAllFormulacionIngreso(anioFiscal,ayuntamientoId) {
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
      `PresGasto/GetDetallePresGastobyIdAsync/${id}?anio=${localStorage.getItem(
        'ano',
      )}&AyuntamientoId=${localStorage.getItem('id_Ayuntamiento')}`,
    )
  }

  getTotalIngresos(ano_fiscal,id_ayuntamiento) {
    return http.get(
      `/PresIngreso/GetTotal?anio=${ano_fiscal}&ayuntamientoId=${id_ayuntamiento}`,
    )
  }

  //Obtener clasificador especifico
  // getClasificador(Clasificador) {
  //   return http.get(`/ingresoslista/filtrarClasificadores/?obj=${Clasificador}`)
  // }
  //-----------------------------CLASIFICADORES---------------------------------------//

  //-----------------------------ESTRUCTURA PROGRAMATICA---------------------------------------//

  getListarEstructuraProgramatica() {
    return http.get('/Financiero/ListarProgramatico')
  }

  //-----------------------------ESTRUCTURA PROGRAMATICA---------------------------------------//

  //-----------------------------FUENTE ESPECIFICA---------------------------------------//
  getFuenteEspecifica() {
    return http.get('/CtgFuente')
  }
  //-----------------------------FUENTE ESPECIFICA---------------------------------------//

  getFuente() {
    return http.get('/CtgFuenteEspecifica')
  }
  //-----------------------------FUENTE FINANCIAMIENTO---------------------------------------//
  getListarFuentesFinanciamiento() {
    return http.get('/Financiero/ListarFuentes')
  }
  //-----------------------------FUENTE FINANCIAMIENTO---------------------------------------//

  //-----------------------------ORGANISMOS---------------------------------------//
  getListarFinancieroCatalogoOrganismos() {
    return http.get('/Financiero/ListarFinancieroCatalogoOrganismos')
  }
  //----------------------------ORGANISMOS---------------------------------------//

  //-----------------------------PROYECTOS---------------------------------------//
  getListarProyecto(id_ayuntamiento, ano_fiscal) {
    return http.get(
      `/Financiero/ListarProyecto/?ano=${ano_fiscal}&id=${id_ayuntamiento}`,
    )
  }
  //-----------------------------PROYECTOS---------------------------------------//

  //-----------------------------INGRESOS---------------------------------------//
  getListarIngresos(id_ayuntamiento, ano_fiscal) {
    return http.get(
      `PresIngreso?anio=${ano_fiscal}&ayuntamientoId=${id_ayuntamiento}`,
    )
  }
  // getTotalIngresos(id_ayuntamiento, ano_fiscal) {
  //   return http.get(
  //     `/ingresoslista/ListarIngresosTotalizado/?ano=${ano_fiscal}&id=${id_ayuntamiento}`,
  //   )
  // }
  //-----------------------------INGRESOS---------------------------------------//

  //-----------------------------GASTOS---------------------------------------//
  // getListarGastos() {
  //   return http.get('/Financiero/ListarGastos')
  // }
  //-----------------------------GASTOS---------------------------------------//

  //-----------------------------CATALOGO---------------------------------------//
  getListarCatalogo() {
    return http.get('/Financiero/ListarCatalogoFunciones')
  }
  //-----------------------------CATALOGO---------------------------------------//

  //-----------------------------PrepGastos---------------------------------------//

  getListarGastos(id) {
    return http.get(
      `PresGasto?anio=${JSON.parse(localStorage.getItem(
        'usuario',
      )).user.ayuntamiento.id}&ayuntamientoId=${JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId}`,
    )
  }

  getListarGastosById(id) {
    return http.get(
      `PresGasto?anio=${JSON.parse(localStorage.getItem(
        'usuario',
      )).user.ayuntamiento.id}&ayuntamientoId=${JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId}`,
    )
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
        `PresGasto?anio=${JSON.parse(localStorage.getItem(
          'usuario',
        )).user.ayuntamiento.id}&ayuntamientoId=${JSON.parse(localStorage.getItem('usuario')).currentFiscalYearId}`,
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

  // cargarEstructuras(){
  //   return http.post(`PresGasto/InsertPresGasto?anio=${localStorage.getItem('ano')}&AyuntamientoId=${localStorage.getItem('id_Ayuntamiento')}`).catch((error) => {
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'error',
  //       text: error.response.data.detail,
  //       title: 'Error',
  //       showConfirmButton: false,
  //       timer: 1500
  //     })
  //   })
  // }

  //   createProyecto(data) {
  //     return http.post('/api/ingresos/guardarPresProyecto', data)
  //   }
}

export default new FormulacionApi()
