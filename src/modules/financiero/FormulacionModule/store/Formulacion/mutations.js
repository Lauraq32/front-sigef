import Swal from 'sweetalert2/dist/sweetalert2.js'

export const SET_CLASIFICADORES = (state, clasificadores) => {
  state.clasificadores = clasificadores
}
export const SET_ESTRUCTURAS_PROGRAMATICAS = (state, estructuras) => {
  state.estructuras = estructuras
}
export const SET_FUENTES_ESPECIFICAS = (state, fuenteEspecificas) => {
  state.fuenteEspecificas = fuenteEspecificas
}
export const SET_FUENTES_FINANCIAMIENTO = (state, fuentesFianciamiento) => {
  state.fuentesFianciamiento = fuentesFianciamiento
}
export const SET_PROYECTOS = (state, proyectos) => {
  state.proyectos = proyectos
}
export const SET_ORGANISMO = (state, organismos) => {
  state.organismos = organismos
}
export const SET_CLASIFICADOR = (state, clasificador) => {
  state.clasificador = clasificador
}
// export const SET_INGRESO = (state, ingreso) => {
//   state.ingreso = ingreso
//   Swal.fire({
//     position: 'top-end',
//     icon: 'success',
//     text: 'Datos agregados con exito',
//     title: 'Agregado',
//     showConfirmButton: false,
//     timer: 1500,
//   })
// }
// export const SET_INGRESOS = (state, ingresos) => {
//   state.ingresos = ingresos
// }
