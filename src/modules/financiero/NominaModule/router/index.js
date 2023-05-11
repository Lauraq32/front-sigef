export default {
  name: 'Nomina',
  redirect: '/NominaModule/ClasificadoresNomina',
  meta: { label: 'Nómina' },
  component: () =>
    import('@/modules/financiero/NominaModule/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'clasificadoresNomina',
      name: 'clasificadoresNomina',
      meta: { label: 'Clasificadores Nómina' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/ClasificadoresNomina.vue'
        ),
    },
    {
      path: 'grupoNominass',
      name: 'grupoNominass',
      meta: { label: 'Grupo Nóminas' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/GrupoNominas.vue'
        ),
    },

    {
      path: 'nominaGeneral',
      name: 'grupoNominas',
      meta: { label: 'Nómina General' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/pages/NominaGeneral.vue'
        ),
    },
    {
      path: 'programas',
      name: 'programas',
      meta: { label: 'Programas' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/Programas.vue'
        ),
    },
    {
      path: 'departamentos',
      name: 'departamentos',
      meta: { label: 'Departamentos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/Departamentos.vue'
        ),
    },
    {
      path: 'areaDeTrabajo',
      name: 'areaDeTrabajo',
      meta: { label: 'Área de Trabajo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/AreaDeTrabajo.vue'
        ),
    },
    {
      path: 'posicionesCargo',
      name: 'posicionesCargo',
      meta: { label: 'Posiciones de Cargo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/PosicionesCargo.vue'
        ),
    },
    {
      path: 'sectores',
      name: 'sectores',
      meta: { label: 'Sectores' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/Sectores.vue'
        ),
    },
    {
      path: 'nominas',
      name: 'nominas',
      meta: { label: 'Nóminas' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/Nominas.vue'
        ),
    },
    {
      path: 'configuracionGeneral',
      name: 'configuracionGeneral',
      meta: { label: 'Configuración General' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/ConfiguracionGeneral.vue'
        ),
    },
    {
      path: 'configuracionModulo',
      name: 'configuracionModulo',
      meta: { label: 'Configuración Modulo' },
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
