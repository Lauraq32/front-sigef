/* eslint-disable prettier/prettier */
import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

//prueba router
import testModuleRouter from '../modules/financiero/FormulacionModule/router'
import AdministrativoModule from '../modules/administrativo/Usuario/router'
import RRHHModule from '../modules/rrhh/RegistroPersonal/router'
import EjecucionModule from '../modules/financiero/EjecucionModule/router'
import ActivoFijoModule from '../modules/financiero/ActivoFijoModule/router'
import NominaModule from '../modules/financiero/NominaModule/router'
import ContabilidadModule from '../modules/financiero/ContabilidadModule/router'
import ConciliacionBancaria from '../modules/financiero/ConciliacionBancaria/router'
import FacturacionCobrosModule from '../modules/financiero/FacturacionCobrosModule/router'
import CuentasPorPagarModule from '../modules/financiero/CuentasPorPagarModule/router'
import ProcesoCompras from '../modules/Compras/ProcesoCompras/router'
import PlanAnual from '../modules/Compras/PlanAnual/router'
import { isAuthenticated } from '@/utils/logged-info'

const routes = [
  {
    path: '/Home',
    name: 'home',
    meta: { label: 'SIGEF' },
    component: DefaultLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { label: 'Home' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/home.vue'),
      },
      {
        path: '/financiero',
        name: 'financiero',
        meta: { label: 'Financiero' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Financiero.vue'),
      },
      {
        path: '/compras',
        name: 'compras',
        meta: { label: 'Compras' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Compras.vue'),
      },
      {
        path: '/rrhh',
        name: 'RRHH',
        meta: { label: 'RRHH' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/RRHH.vue'),
      },
      {
        path: '/administrativo',
        name: 'Administrativo',
        meta: { label: 'Administrativo' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/Administrativo.vue'
          ),
      },

      {
        path: '/FinancieroModule',
        ...testModuleRouter,
      },
      {
        path: '/Ejecucion',
        ...EjecucionModule,
      },

      {
        path: '/AdministrativoModule',
        ...AdministrativoModule,
      },
      {
        path: '/RRHHModule',
        ...RRHHModule,
      },
      {
        path: '/ActivoFijoModule',
        ...ActivoFijoModule,
      },
      {
        path: '/NominaModule',
        ...NominaModule,
      },
      {
        path: '/ContabilidadModule',
        ...ContabilidadModule,
      },

      {
        path: '/ConciliacionBancaria',
        ...ConciliacionBancaria,
      },

      {
        path: '/FacturacionCobrosModule',
        ...FacturacionCobrosModule,
      },
      {
        path: '/CuentasPorPagarModule',
        ...CuentasPorPagarModule,
      },
      {
        path: '/ProcesoCompras',
        ...ProcesoCompras,
      },
      {
        path: '/PlanAnual',
        ...PlanAnual,
      },
    ],
  },
  {
    path: '/pages',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '/',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, _, next) => {
  if (to.name !== 'Login' && !isAuthenticated()) {
    return next({ name: 'Login' })
  }

  next()
})

export default router
