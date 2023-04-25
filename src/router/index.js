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
        path: '/dashboard',
        name: 'Dashboard',
        meta: { label: 'Dashboard' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
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
      {
        path: '/theme',
        name: 'Theme',
        redirect: '/theme/typography',
      },
      {
        path: '/theme/colors',
        name: 'Colors',
        component: () => import('@/views/theme/Colors.vue'),
      },
      {
        path: '/theme/typography',
        name: 'Typography',
        component: () => import('@/views/theme/Typography.vue'),
      },
      {
        path: '/base',
        name: 'Base',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/accordion',
            name: 'Accordion',
            component: () => import('@/views/base/Accordion.vue'),
          },
          {
            path: '/base/breadcrumbs',
            name: 'Breadcrumbs',
            component: () => import('@/views/base/Breadcrumbs.vue'),
          },

           
          {
            path: '/base/navs',
            name: 'Navs',
            component: () => import('@/views/base/Navs.vue'),
          },
      
          {
            path: '/base/placeholders',
            name: 'Placeholders',
            component: () => import('@/views/base/Placeholders.vue'),
          },
          {
            path: '/base/tooltips',
            name: 'Tooltips',
            component: () => import('@/views/base/Tooltips.vue'),
          },
        ],
      },
      {
        path: '/charts',
        name: 'Charts',
        component: () => import('@/views/charts/Charts.vue'),
      },
      {
        path: '/icons',
        name: 'Icons',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/icons/coreui-icons',
        children: [
          {
            path: '/icons/coreui-icons',
            name: 'CoreUI Icons',
            component: () => import('@/views/icons/CoreUIIcons.vue'),
          },
          {
            path: '/icons/brands',
            name: 'Brands',
            component: () => import('@/views/icons/Brands.vue'),
          },
          {
            path: '/icons/flags',
            name: 'Flags',
            component: () => import('@/views/icons/Flags.vue'),
          },
        ],
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/notifications/alerts',
        children: [
          {
            path: '/notifications/alerts',
            name: 'Alerts',
            component: () => import('@/views/notifications/Alerts.vue'),
          },
          {
            path: '/notifications/badges',
            name: 'Badges',
            component: () => import('@/views/notifications/Badges.vue'),
          },
          {
            path: '/notifications/modals',
            name: 'Modals',
            component: () => import('@/views/notifications/Modals.vue'),
          },
        ],
      },
      {
        path: '/widgets',
        name: 'Widgets',
        component: () => import('@/views/widgets/Widgets.vue'),
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
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
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
