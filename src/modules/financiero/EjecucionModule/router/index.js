export default {
  name: 'Ejecucion',
  redirect: '/Ejecucion/AnoFiscal',
  meta: { label: 'Ejecución' },
  component: () =>
    import('@/modules/financiero/EjecucionModule/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'AnoFiscal',
      name: 'AnoFiscal',
      meta: { label: 'Año Fiscal' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/AnoFiscal.vue'
        ),
    },
    {
      path: 'configuracionIngreso',
      name: 'configuracionIngreso',
      meta: { label: 'Configuración Ingreso' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/ConfigEntradaIngreso.vue'
        ),
    },
    {
      path: 'tiposRetenciones',
      name: 'tiposRetenciones',
      meta: { label: 'Tipos Retenciones' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/TiposRetenciones.vue'
        ),
    },
    {
      path: 'destinoGastos',
      name: 'destinoGastos',
      meta: { label: 'Destino Gastos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/DestinoGastos.vue'
        ),
    },
    {
      path: 'grupoPago',
      name: 'grupoPago',
      meta: { label: 'Grupo Pago' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/GrupoPago.vue'
        ),
    },
    {
      path: 'beneficiarios',
      name: 'beneficiarios',
      meta: { label: 'Beneficiarios' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/Beneficiarios.vue'
        ),
    },
    {
      path: 'beneficiarioGrupo',
      name: 'beneficiarioGrupo',
      meta: { label: 'Beneficiario Grupo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/BeneficiarioGrupo.vue'
        ),
    },
    {
      path: 'comprobanteIngreso',
      name: 'comprobanteIngreso',
      meta: { label: 'Comprobante Ingreso' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/ComprobanteIngreso.vue'
        ),
    },
    {
      path: 'comprobanteGasto',
      name: 'comprobanteGasto',
      meta: { label: 'Comprobante Gasto' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/ComprobanteGasto.vue'
        ),
    },
    {
      path: 'transferenciaDatos',
      name: 'transferenciaDatos',
      meta: { label: 'Transferencia Datos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/TransferenciaDatos.vue'
        ),
    },
    {
      path: 'ejecucionIngreso',
      name: 'ejecucionIngreso',
      meta: { label: 'Ejecución Ingreso' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/EjecucionIngreso.vue'
        ),
    },
    {
      path: 'ejecucionGastos',
      name: 'ejecucionGastos',
      meta: { label: 'Ejecución Gastos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/EjecucionGastos.vue'
        ),
    },
    {
      path: 'retenciones',
      name: 'retenciones',
      meta: { label: 'Retenciones' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/Retenciones.vue'
        ),
    },
    {
      path: 'conceptoGasto',
      name: 'conceptoGasto',
      meta: { label: 'Conceptos de gastos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/ConceptoGasto.vue'
        ),
    },



    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
