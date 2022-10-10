import router from '@/router'
import Api from '../services/Auth'

export const SET_USER = (state,user) => {
    Api.Login(user.email,user.password).then(response => {
        state.user = response.data
        localStorage.setItem('usuario',response.data.nombre)
        localStorage.setItem('nombre_ayuntamiento',response.data.ayuntamiento)
        localStorage.setItem('ano',response.data.anofiscal)
        localStorage.setItem('id_Ayuntamiento',response.data.id_Ayuntamiento)
    
    })
        router.push({ name: 'financiero' })
      
}