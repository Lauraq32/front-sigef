/* eslint-disable prettier/prettier */



import router from '@/router'
import Api from '../services/Auth'

export const SET_USER = (state, user) => {
    Api.Login(user).then(response => {
        state.user = response.data
        localStorage.setItem('usuario', response.data.data.usuario.email)
        localStorage.setItem('nombre_ayuntamiento', response.data.data.usuario.nombre)
        localStorage.setItem('ano', response.data.data.anioFiscal.anioFiscalDate)
        localStorage.setItem('id_Ayuntamiento', response.data.data.anioFiscal.ayuntamientoId)


        if (response.data.data.anioFiscal.ayuntamientoId != null) {
            router.push({ name: 'financiero' })
      
          }else{
              alert("Usuario incorrecto")
          }
    })
    // router.push({ name: 'financiero' })

}


//actualizar entradas
export const updateEntries = (state, entry) => {

    const idx = state.entries.map(e => e.id).indexOf(entry.id)
    state.entries[idx] = entry

}

//Borrar entrada
export const deleteEntry = (state, id) => {
    state.entries = state.entries.filter(entry => entry.id !== id)

}

