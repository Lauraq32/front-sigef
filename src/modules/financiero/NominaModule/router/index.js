export default {
  name: 'Nomina',
  redirect: '/NominaModule/ClasificadoresNomina',
  meta: { label: 'Nómina' },
  component: () =>
    import('@/modules/financiero/NominaModule/layout/TemplateLayout.vue'),
  children: [
   
    {
      path: 'grupoNominas',
      name: 'grupoNominas',
      meta: { label: 'Grupo Nóminas' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/GrupoNominas.vue'
        ),
    },

    {
      path: 'nomina-general',
      name: 'nominaGeneral',
      meta: { label: 'Nómina General' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/pages/NominaGeneral.vue'
        ),
    },
    {
      path: 'Programas',
      name: 'programas',
      meta: { label: 'Dirección o Dependencias' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/Programas.vue'
        ),
    },
    {
      path: 'Departamentos',
      name: 'departamentos',
      meta: { label: 'Departamentos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/Departamentos.vue'
        ),
    },
    {
      path: 'AreaTrabajo',
      name: 'AreaDeTrabajo',
      meta: { label: 'Área de Trabajo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/AreaDeTrabajo.vue'
        ),
    },
    {
      path: 'PosicionesCargo',
      name: 'posicionesCargo',
      meta: { label: 'Posiciones o Cargos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/PosicionesCargo.vue'
        ),
    },
    {
      path: 'Sectores',
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
    {
      path: 'TipoSangre',
      name: 'tipoSangre',
      meta: { label: 'TipoSangre' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/components/tipoSangre.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
