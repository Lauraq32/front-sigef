export default {
  name: 'Financiero',
  redirect: '/FinancieroModule/clasificadores',
  meta: { label: 'Financiero' },
  component: () =>
    import('@/modules/financiero/FormulacionModule/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'clasificadores',
      name: 'clasificadores',
      meta: { label: 'Clasificadores' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Clasificadores.vue'
        ),
    },
    {
      path: 'estructuraProgramatica',
      name: 'Estructuras Programaticas',
      meta: { label: 'Estructuras Programática' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/EstructuraProgramatica.vue'
        ),
    },
    {
      path: 'fuenteEspecifica',
      name: 'Fuente Especifica',
      meta: { label: 'Fuente Especifica' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/FuenteEspecifica.vue'
        ),
    },
    {
      path: 'fuenteFinanciamiento',
      name: 'Fuente Financiamiento',
      meta: { label: 'Fuente Financiamiento' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/FuenteFinanciamiento.vue'
        ),
    },
    {
      path: 'organismos',
      name: 'Organismos',
      meta: { label: 'Organismos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Organismos.vue'
        ),
    },
    {
      path: 'proyectos',
      name: 'Proyectos',
      meta: { label: 'Proyectos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Proyectos.vue'
        ),
    },
    {
      path: 'formulacionIngreso',
      name: 'Formulación Ingreso',
      meta: { label: 'Formulación Ingreso' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/FormulacionIngreso.vue'
        ),
    },
    {
      path: 'formulacionGasto',
      name: 'Formulacion Gasto',
      meta: { label: 'Formulación Gasto' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/FormulacionGasto.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
