export default {
  name: 'CuentasPorPagar',
  redirect: '/CuentasPorPagarModule/Suplidores',
  meta: { label: 'Cuentas Por Pagar' },
  component: () =>
    import(
      '@/modules/financiero/CuentasPorPagarModule/layout/TemplateLayout.vue'
    ),
  children: [
    {
      path: 'suplidores',
      name: 'suplidores',
      meta: { label: 'Suplidores' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/Suplidores.vue'
        ),
    },
    {
      path: 'areasEventos',
      name: 'areasEventos',
      meta: { label: 'Areas Eventos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/AreasEventos.vue'
        ),
    },
    {
      path: 'documentosPorPagar',
      name: 'documentosPorPagar',
      meta: { label: 'Documentos Por Pagar' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/DocumentosPorPagar.vue'
        ),
    },
    {
      path: 'documentosDeCredito',
      name: 'documentosDeCredito',
      meta: { label: 'Documentos De Credito' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/DocumentosDeCredito.vue'
        ),
    },
    {
      path: 'general',
      name: 'general',
      meta: { label: 'General' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/CuentasPorPagarModule/components/General.vue'
        ),
    },
    {
      path: 'condensado',
      name: 'condensado',
      meta: { label: 'Condensado' },
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
