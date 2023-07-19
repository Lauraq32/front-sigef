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
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/pages/GrupoNominas.vue'
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
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/pages/DireccionDependencia.vue'
        ),
    },
    {
      path: 'Departamentos',
      name: 'departamentos',
      meta: { label: 'Departamentos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/pages/Departamento.vue'
        ),
    },
    {
      path: 'AreaTrabajo',
      name: 'AreaDeTrabajo',
      meta: { label: 'Área de Trabajo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/pages/AreaDeTrabajo.vue'
        ),
    },
    {
      path: 'PosicionesCargo',
      name: 'posicionesCargo',
      meta: { label: 'Posiciones o Cargos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/pages/Cargos.vue'
        ),
    },
    {
      path: 'Sectores',
      name: 'sectores',
      meta: { label: 'Sectores' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/pages/Sectores.vue'
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
      path: 'TipoSangre',
      name: 'TipoSangre',
      meta: { label: 'Tipos de Sangres' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/pages/tipoSangre.vue'
        ),
    },
    {
      path: 'nominaEmpleado',
      name: 'nominaEmpleado',
      meta: { label: 'Empleados' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/NominaModule/pages/nominaEmpleado.vue'
        ),
    },
  ],
}
