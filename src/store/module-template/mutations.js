/* eslint-disable prettier/prettier */



import router from '@/router'
import Api from '../services/Auth'

export const SET_USER = (state, user) => {
    Api.Login(user.email, user.password).then(response => {
        state.user = response.data
        localStorage.setItem('usuario', response.data.nombre)
        localStorage.setItem('nombre_ayuntamiento', response.data.ayuntamiento)
        localStorage.setItem('ano', response.data.anofiscal)
        localStorage.setItem('id_Ayuntamiento', response.data.id_Ayuntamiento)

    })
    router.push({ name: 'financiero' })

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

