/* eslint-disable prettier/prettier */

import router from '@/router'
import Api from '../services/Auth'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import jwt_decode from 'jwt-decode'

export const SET_USER = (state, user) => {
  Api.Login(user)
    .then((response) => {
      console.log(response.token)
      state.user = response.data
      // localStorage.setItem('usuario', response.data.data.usuario.email)
      // localStorage.setItem('image', response.data.data.usuario.ayuntamiento.imagenUrl)
      // localStorage.setItem('fecha', response.data.data.anioFiscal.anioNumero)
      // localStorage.setItem(
      //   'nombre_ayuntamiento',
      //   response.data.data.usuario.ayuntamiento.descripcion,
      // )
      // localStorage.setItem(
      //   'nombre_usuario',
      //   response.data.data.usuario.nombre,
      // )

      localStorage.setItem('token', response.token)

      let token = response.token
      const decoded = jwt_decode(token)
      console.log(decoded)
      localStorage.setItem(
        'nombre_usuario',
        decoded.User,
      )
      localStorage.setItem(
        'ano',
        decoded.AnioFiscal,
      )
      localStorage.setItem(
        'id_Ayuntamiento',
        decoded.Ayuntamiento,
      )

      Api.getAyuntamientoInfo(decoded.Ayuntamiento).then((response) => {
        localStorage.setItem(
          'image',
          response.data.data.imagenUrl,
        )
        localStorage.setItem(
          'nombre_ayuntamiento',
          response.data.data.descripcion,
        )
      
        console.log(response)
      })

      // localStorage.setItem(
      //   'id_Ayuntamiento',
      //   response.data.data.anioFiscal.ayuntamientoId,
      // )
      var now = new Date().getTime()
      localStorage.setItem('setupTime', now)

      if (response.data.data.anioFiscal.ayuntamientoId != null) {
        router.push({ name: 'financiero' })
      } else {
        alert('Usuario incorrecto')
      }
    })
    .catch((error) => {
      console.log(error.response.data.detail)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: error.response.data.detail,
        title: 'Error',
        showConfirmButton: false,
        timer: 1500,
      })
    })
  router.push({ name: 'financiero' })
}

//actualizar entradas
export const updateEntries = (state, entry) => {
  const idx = state.entries.map((e) => e.id).indexOf(entry.id)
  state.entries[idx] = entry
}

//Borrar entrada
export const deleteEntry = (state, id) => {
  state.entries = state.entries.filter((entry) => entry.id !== id)
}
