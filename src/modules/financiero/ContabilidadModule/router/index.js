/* eslint-disable prettier/prettier */
export default {
  name: 'Contabilidad',
  redirect: '/ContabilidadModule/CuentasContables',
  meta: { label: 'Contabilidad' },
  component: () =>
    import('@/modules/financiero/NominaModule/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'cuentasContables',
      name: 'cuentasContables',
      meta: { label: 'Cuentas Contables' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/CuentasContables.vue'
        ),
    },
    {
      path: 'configuracionEstadoFlujoEfec',
      name: 'configuracionEstadoFlujoEfec',
      meta: { label: 'Configuración Estado Flujo Efectivo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/ConfiguracionEstadoFlujoEfec.vue'
        ),
    },
    {
      path: 'configuracionEstadosFinanciero',
      name: 'configuracionEstadosFinanciero',
      meta: { label: 'Configuración Estados Financiero' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/ConfiguracionEstadosFinanciero.vue'
        ),
    },
    {
      path: 'estadoComparativo',
      name: 'estadoComparativo',
      meta: { label: 'Estado Comparativo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/EstadoComparativo.vue'
        ),
    },
    {
      path: 'estadoRendimientoFinanciero',
      name: 'estadoRendimientoFinanciero',
      meta: { label: 'Estado Rendimiento Financiero' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/EstadoRendimientoFinanciero.vue'
        ),
    },
    {
      path: 'estadoSituacionFinanciera',
      name: 'estadoSituacionFinanciera',
      meta: { label: 'Estado Situacion Financiera' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/EstadoSituacionFinanciera.vue'
        ),
    },
    {
      path: 'estadoFlujoEfectivo',
      name: 'estadoFlujoEfectivo',
      meta: { label: 'Estado Flujo Efectivo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/EstadoFlujoEfectivo.vue'
        ),
    },
    {
      path: 'estadoCambioPatrimonioFinanciero',
      name: 'estadoCambioPatrimonioFinanciero',
      meta: { label: 'Estado Cambio Patrimonio Financiero' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/EstadoCambioPatrimonioFinanciero.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
