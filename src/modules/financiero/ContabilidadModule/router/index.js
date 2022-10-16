/* eslint-disable prettier/prettier */
export default {
  name: 'Contabilidad',
  redirect: '/ContabilidadModule/CuentasContables',
  component: () =>
    import('@/modules/financiero/NominaModule/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'cuentasContables',
      name: 'cuentasContables',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/CuentasContables.vue'
        ),
    },
    {
      path: 'configuracionEstadoFlujoEfec',
      name: 'configuracionEstadoFlujoEfec',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/ConfiguracionEstadoFlujoEfec.vue'
        ),
    },
    {
      path: 'configuracionEstadosFinanciero',
      name: 'configuracionEstadosFinanciero',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/ConfiguracionEstadosFinanciero.vue'
        ),
    },
    {
      path: 'estadoComparativo',
      name: 'estadoComparativo',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/EstadoComparativo.vue'
        ),
    },
    {
      path: 'estadoRendimientoFinanciero',
      name: 'estadoRendimientoFinanciero',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/EstadoRendimientoFinanciero.vue'
        ),
    },
    {
      path: 'estadoSituacionFinanciera',
      name: 'estadoSituacionFinanciera',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/EstadoSituacionFinanciera.vue'
        ),
    },
    {
      path: 'estadoFlujoEfectivo',
      name: 'estadoFlujoEfectivo',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ContabilidadModule/components/EstadoFlujoEfectivo.vue'
        ),
    },
    {
      path: 'estadoCambioPatrimonioFinanciero',
      name: 'estadoCambioPatrimonioFinanciero',
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
