export default {
  name: 'FacturacionCobros',
  redirect: '/FacturacionCobrosModule/Sectores',
  component: () =>
    import(
      '@/modules/financiero/FacturacionCobrosModule/layout/TemplateLayout.vue'
    ),
  children: [
    {
      path: 'sectores',
      name: 'Sectores',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/Sectores.vue'
        ),
    },

    {
      path: 'usoSuelo',
      name: 'UsoSuelo',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/usoSuelo.vue'
        ),
    },

    {
      path: 'arbitrios-Impuestos-Tazas',
      name: 'Arbitrios-Impuestos-Tazas',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/Arbitrios-Impuestos-Tazas.vue'
        ),
    },

    {
      path: 'contribuyentes',
      name: 'Contribuyentes',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/Contribuyentes.vue'
        ),
    },

    {
      path: 'facturacionManual',
      name: 'FacturacionManual',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/FacturacionManual.vue'
        ),
    },

    {
      path: 'facturacionPorLotes',
      name: 'FacturacionPorLotes',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/FacturacionPorLotes.vue'
        ),
    },

    {
      path: 'notasDeDebito',
      name: 'NotasDeDebito',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/NotasDeDebito.vue'
        ),
    },

    {
      path: 'facturasPorLote',
      name: 'FacturasPorLote',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/FacturasPorLote.vue'
        ),
    },

    {
      path: 'notasDeCredito',
      name: 'NotasDeCreditos',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/NotasDeCredito.vue'
        ),
    },

    {
      path: 'recibosDeIngresos',
      name: 'RecibosDeIngresos',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/RecibosDeIngresos.vue'
        ),
    },
  ],
}
