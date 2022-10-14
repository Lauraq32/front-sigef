export default {
  name: 'ActivoFijo',
  redirect: '/ActivoFijo/Categoria',
  component: () =>
    import('@/modules/financiero/ActivoFijoModule/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'categorias',
      name: 'categorias',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/Categorias.vue'
        ),
    },
    {
      path: 'areaUbicacion',
      name: 'areaUbicacion',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/AreaUbicacion.vue'
        ),
    },
    {
      path: 'marcas',
      name: 'marcas',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/Marcas.vue'
        ),
    },
    {
      path: 'documentosPorPagar',
      name: 'documentosPorPagar',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/DocumentosPorPagar.vue'
        ),
    },
    {
      path: 'documentosDeCredito',
      name: 'documentosDeCredito',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/DocumentosDeCredito.vue'
        ),
    },
    {
      path: 'general',
      name: 'general',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/General.vue'
        ),
    },
    {
      path: 'condensado',
      name: 'condensado',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ActivoFijoModule/components/Condensado.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
