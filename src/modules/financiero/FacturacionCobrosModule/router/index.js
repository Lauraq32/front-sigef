export default {
  name: 'FacturacionCobros',
  redirect: '/FacturacionCobrosModule/Sectores',
  meta: { label: 'Facturación Cobros' },
  component: () =>
    import(
      '@/modules/financiero/FacturacionCobrosModule/layout/TemplateLayout.vue'
    ),
  children: [
    {
      path: 'sectores',
      name: 'Sectores',
      meta: { label: 'Sectores' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/Sectores.vue'
        ),
    },

    {
      path: 'usoSuelo',
      name: 'UsoSuelo',
      meta: { label: 'Uso Suelo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/usoSuelo.vue'
        ),
    },

    {
      path: 'arbitrios-Impuestos-Tazas',
      name: 'Arbitrios-Impuestos-Tazas',
      meta: { label: 'Arbitrios-Impuestos-Tazas' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/Arbitrios-Impuestos-Tazas.vue'
        ),
    },

    {
      path: 'contribuyentes',
      name: 'Contribuyentes',
      meta: { label: 'Contribuyentes' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/Contribuyentes.vue'
        ),
    },

    {
      path: 'facturacionManual',
      name: 'FacturacionManual',
      meta: { label: 'Facturación Manual' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/FacturacionManual.vue'
        ),
    },

    {
      path: 'facturacionPorLotes',
      name: 'FacturacionPorLotes',
      meta: { label: 'Facturación Por Lotes' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/FacturacionPorLotes.vue'
        ),
    },

    {
      path: 'notasDeDebito',
      name: 'NotasDeDebito',
      meta: { label: 'Notas De Débito' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/NotasDeDebito.vue'
        ),
    },

    {
      path: 'facturasPorLote',
      name: 'FacturasPorLote',
      meta: { label: 'Facturas Por Lote' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/FacturasPorLote.vue'
        ),
    },

    {
      path: 'notasDeCredito',
      name: 'NotasDeCreditos',
      meta: { label: 'Notas De Crédito' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/NotasDeCredito.vue'
        ),
    },

    {
      path: 'recibosDeIngresos',
      name: 'RecibosDeIngresos',
      meta: { label: 'Recibos De Ingresos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FacturacionCobrosModule/components/RecibosDeIngresos.vue'
        ),
    },
  ],
}
