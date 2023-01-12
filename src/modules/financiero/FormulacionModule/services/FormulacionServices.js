import http from '@/Api/http-common'
import VueSweetalert2 from 'vue-sweetalert2'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import router from '@/router'

const token = localStorage.getItem('token')
class FormulacionApi {
  downloadIngreso() {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get(
        `ExportFile/IngresoFormulacion?ayuntamientoId=${localStorage.getItem(
          'id_Ayuntamiento',
        )}&anioFiscalId=${localStorage.getItem('ano')}`,
      )
    }
  }

  //-----------------------------CLASIFICADORES---------------------------------------//
  //Obtener listado de Clasificadores
  getListarClasificadores() {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get('/Financiero/ListarClasificadores')
    }
  }

  deleteIngreso(id) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.delete(`PresIngreso/${id}`)
    }
  }

  getClasificador(Clasificador) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get(`PresIngreso/GetClasificadorById/${Clasificador}`)
    }
  }
  getPresIngresoById(item) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get(
        `/PresIngreso/${item.id}?anio=${item.anioFiscalId}&ayuntamientoId=${item.ayuntamientoId}`,
      )
    }
  }

  editPresIngreso(id, data) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.put(`/PresIngreso/${id}`, data)
    }
  }

  //PostIngreso
  createIngreso(data) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.post('PresIngreso', data).catch((error) => {
        console.log(error.response.data.detail)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          text: error.response.data.detail,
          title: 'Error',
          showConfirmButton: false,
          timer: 1500,
        })

        //alert(error.response.data.detail)
      })
    }
  }

  updateFormulacion(id, data) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.put(`PresGasto/${id}`, data)
    }
  }

  updateFormulacionDetalle(id, data) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.put(`PresGasto/Detalle/${id}`, data)
    }
  }

  getDetalle(id) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get(
        `PresGasto/GetDetallePresGastobyIdAsync/${id}?anio=${localStorage.getItem(
          'ano',
        )}&AyuntamientoId=${localStorage.getItem('id_Ayuntamiento')}`,
      )
    }
  }

  getTotalIngresos(id_ayuntamiento, ano_fiscal) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get(
        `/PresIngreso/GetTotal?anio=${ano_fiscal}&ayuntamientoId=${id_ayuntamiento}`,
      )
    }
  }

  //Obtener clasificador especifico
  // getClasificador(Clasificador) {
  //   return http.get(`/ingresoslista/filtrarClasificadores/?obj=${Clasificador}`)
  // }
  //-----------------------------CLASIFICADORES---------------------------------------//

  //-----------------------------ESTRUCTURA PROGRAMATICA---------------------------------------//

  getListarEstructuraProgramatica() {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get('/Financiero/ListarProgramatico')
    }
  }

  //-----------------------------ESTRUCTURA PROGRAMATICA---------------------------------------//

  //-----------------------------FUENTE ESPECIFICA---------------------------------------//
  getFuenteEspecifica() {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get('/Financiero/ListarFuentesEsp')
    }
  }
  //-----------------------------FUENTE ESPECIFICA---------------------------------------//

  //-----------------------------FUENTE FINANCIAMIENTO---------------------------------------//
  getListarFuentesFinanciamiento() {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get('/Financiero/ListarFuentes')
    }
  }
  //-----------------------------FUENTE FINANCIAMIENTO---------------------------------------//

  //-----------------------------ORGANISMOS---------------------------------------//
  getListarFinancieroCatalogoOrganismos() {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get('/Financiero/ListarFinancieroCatalogoOrganismos')
    }
  }
  //----------------------------ORGANISMOS---------------------------------------//

  //-----------------------------PROYECTOS---------------------------------------//
  getListarProyecto(id_ayuntamiento, ano_fiscal) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get(
        `/Financiero/ListarProyecto/?ano=${ano_fiscal}&id=${id_ayuntamiento}`,
      )
    }
  }
  //-----------------------------PROYECTOS---------------------------------------//

  //-----------------------------INGRESOS---------------------------------------//
  getListarIngresos(id_ayuntamiento, ano_fiscal) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get(
        `PresIngreso?anio=${ano_fiscal}&ayuntamientoId=${id_ayuntamiento}`,
      )
    }
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
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get('/Financiero/ListarCatalogoFunciones')
    }
  }
  //-----------------------------CATALOGO---------------------------------------//

  //-----------------------------PrepGastos---------------------------------------//

  getListarGastos(id) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get(
        `PresGasto?anio=${localStorage.getItem(
          'ano',
        )}&ayuntamientoId=${localStorage.getItem('id_Ayuntamiento')}`,
      )
    }
  }

  getListarGastosById(id) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get(
        `PresGasto/${id}?anio=${localStorage.getItem(
          'ano',
        )}&ayuntamientoId=${localStorage.getItem('id_Ayuntamiento')}`,
      )
    }
  }

  postGastos(post) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
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
  }

  postCargaMasiva(post) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
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
  }

  postCargaMasivaCabecera(post) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
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
  }

  postCargaMasivaDetalle(post) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
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
  }

  cargarEstructuras() {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http
        .post(
          `PresGasto/InsertPresGasto?anio=${localStorage.getItem(
            'ano',
          )}&AyuntamientoId=${localStorage.getItem('id_Ayuntamiento')}`,
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
  }

  postDetalleGasto(post) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
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
  }

  getEstruturaProgramaticaById(value) {
    if (!token) {
      router.push({ name: 'Login' })
    } else {
      return http.get(`CtgMestProg/${value}`).catch((error) => {})
    }
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
