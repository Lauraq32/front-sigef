export default {
  name: 'Ejecucion',
  redirect: '/Ejecucion/AnoFiscal',
  component: () =>
    import('@/modules/financiero/EjecucionModule/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'AnoFiscal',
      name: 'AnoFiscal',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/AnoFiscal.vue'
        ),
    },
    {
      path: 'configuracionIngreso',
      name: 'configuracionIngreso',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/ConfigEntradaIngreso.vue'
        ),
    },
    {
      path: 'tiposRetenciones',
      name: 'tiposRetenciones',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/TiposRetenciones.vue'
        ),
    },
    {
      path: 'destinoGastos',
      name: 'destinoGastos',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/DestinoGastos.vue'
        ),
    },
    {
      path: 'grupoPago',
      name: 'grupoPago',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/GrupoPago.vue'
        ),
    },
    {
      path: 'beneficiarios',
      name: 'beneficiarios',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/Beneficiarios.vue'
        ),
    },
    {
      path: 'beneficiarioGrupo',
      name: 'beneficiarioGrupo',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/BeneficiarioGrupo.vue'
        ),
    },
    {
      path: 'comprobanteIngreso',
      name: 'comprobanteIngreso',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/ComprobanteIngreso.vue'
        ),
    },
    {
      path: 'comprobanteGasto',
      name: 'comprobanteGasto',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/ComprobanteGasto.vue'
        ),
    },
    {
      path: 'transferenciaDatos',
      name: 'transferenciaDatos',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/TransferenciaDatos.vue'
        ),
    },
    {
      path: 'ejecucionIngreso',
      name: 'ejecucionIngreso',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/EjecucionIngreso.vue'
        ),
    },
    {
      path: 'ejecucionGastos',
      name: 'ejecucionGastos',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/EjecucionGastos.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
