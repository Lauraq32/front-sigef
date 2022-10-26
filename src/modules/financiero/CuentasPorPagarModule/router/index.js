export default {
  name: 'CuentasPorPagar',
  redirect: '/CuentasPorPagarModule/Suplidores',
  component: () =>
    import(
      '@/modules/financiero/CuentasPorPagarModule/layout/TemplateLayout.vue'
    ),
  children: [
    {
      path: 'suplidores',
      name: 'suplidores',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/Suplidores.vue'
        ),
    },
    {
      path: 'areasEventos',
      name: 'areasEventos',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/AreasEventos.vue'
        ),
    },
    {
      path: 'documentosPorPagar',
      name: 'documentosPorPagar',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/DocumentosPorPagar.vue'
        ),
    },
    {
      path: 'documentosDeCredito',
      name: 'documentosDeCredito',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/DocumentosDeCredito.vue'
        ),
    },
    {
      path: 'general',
      name: 'general',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/General.vue'
        ),
    },
    {
      path: 'condensado',
      name: 'condensado',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/Condensado.vue'
        ),
    },
    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
