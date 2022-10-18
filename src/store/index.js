import { createStore } from 'vuex'
import Formulacion from '@/modules/financiero/FormulacionModule/store/Formulacion'
import AdministrativoModule from '@/modules/administrativo/Usuario/store/Administrativo'
import myCustomModule from '@/store/module-template'
import RRHHModule from '@/modules/rrhh/RegistroPersonal/store/RegistroPersonal'
import EjecucionModule from '@/modules/financiero/EjecucionModule/store/module-template'
import CCBancaria from '@/modules/financiero/ConciliacionBancaria/store/CCBancaria'
import FacturacionCobros from '@/modules/financiero/FacturacionCobrosModule/store/FacturacionCobros'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    Formulacion,
    AdministrativoModule,
    myCustomModule,
    RRHHModule,
    EjecucionModule,
    CCBancaria,
    FacturacionCobros,
  },
})
