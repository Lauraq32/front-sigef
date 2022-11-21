export default {
  name: 'Nomina',
  redirect: '/NominaModule/ClasificadoresNomina',
  component: () =>
    import('@/modules/financiero/NominaModule/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'clasificadoresNomina',
      name: 'clasificadoresNomina',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/ClasificadoresNomina.vue'
        ),
    },
    {
      path: 'grupoNominas',
      name: 'grupoNominas',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/GrupoNominas.vue'
        ),
    },
    {
      path: 'programas',
      name: 'programas',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/Programas.vue'
        ),
    },
    {
      path: 'departamentos',
      name: 'departamentos',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/Departamentos.vue'
        ),
    },
    {
      path: 'areaDeTrabajo',
      name: 'areaDeTrabajo',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/AreaDeTrabajo.vue'
        ),
    },
    {
      path: 'posicionesCargo',
      name: 'posicionesCargo',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/PosicionesCargo.vue'
        ),
    },
    {
      path: 'sectores',
      name: 'sectores',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/Sectores.vue'
        ),
    },
    {
      path: 'nominas',
      name: 'nominas',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/Nominas.vue'
        ),
    },
    {
      path: 'configuracionGeneral',
      name: 'configuracionGeneral',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/ConfiguracionGeneral.vue'
        ),
    },
    {
      path: 'configuracionModulo',
      name: 'configuracionModulo',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/ConfiguracionModulo.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
