export default {
  name: 'ActivoFijo',
  redirect: '/ActivoFijo/Categoria',
  meta: { label: 'Activo Fijo' },
  component: () =>
    import('@/modules/financiero/ActivoFijoModule/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'categorias',
      name: 'categorias',
      meta: { label: 'Categorías' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/Categorias.vue'
        ),
    },
    {
      path: 'areaUbicacion',
      name: 'areaUbicacion',
      meta: { label: 'Área Ubicación' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/AreaUbicacion.vue'
        ),
    },
    {
      path: 'marcas',
      name: 'marcas',
      meta: { label: 'Marcas' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/Marcas.vue'
        ),
    },
    {
      path: 'documentosPorPagar',
      name: 'documentosPorPagar',
      meta: { label: 'Documentos por Pagar' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/DocumentosPorPagar.vue'
        ),
    },
    {
      path: 'documentosDeCredito',
      name: 'documentosDeCredito',
      meta: { label: 'Documentos de Crédito' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/DocumentosDeCredito.vue'
        ),
    },
    {
      path: 'general',
      name: 'General',
      meta: { label: 'Activo Fijo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/General.vue'
        ),
    },

    {
      path: 'condensadoAcivoFijos',
      name: 'condensadoAcivoFijos',
      meta: { label: 'Condensado Activo Fijos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/Condensado.vue'
        ),
    },

    {
      path: 'recepcion',
      name: 'recepcion',
      meta: { label: 'Recepción' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/recepcion.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
