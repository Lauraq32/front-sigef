export default {
  name: 'RRHHModule',
  redirect: '/rrhh',
  meta: { label: 'RRHH' },
  component: () =>
    import('@/modules/rrhh/RegistroPersonal/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'registroEmpleados',
      name: 'RegistroEmpleados',
      meta: { label: 'Registro de Empleados' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/RegistroPersonal.vue'
        ),
    },
    {
      path: 'dependencia',
      name: 'Dependencia',
      meta: { label: 'Dependencia' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/DireccionDependencia.vue'
        ),
    },
    {
      path: 'departamentos',
      name: 'Departamentos',
      meta: { label: 'Departamentos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Departamentos.vue'
        ),
    },
    {
      path: 'areaTrabajo',
      name: 'AreaTrabajo',
      meta: { label: 'Área de Trabajo' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/AreaTrabajo.vue'
        ),
    },
    {
      path: 'cargos',
      name: 'Cargos',
      meta: { label: 'Cargos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Cargos.vue'
        ),
    },
    {
      path: 'profesiones',
      name: 'Profesiones',
      meta: { label: 'Profesiones' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Profesiones.vue'
        ),
    },

    {
      path: 'sectorees',
      name: 'Sectorees',
      meta: { label: 'Sectores' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Sectores.vue'
        ),
    },
    {
      path: 'tipoSangre',
      name: 'TipoSangre',
      meta: { label: 'Tipo de Sangre' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/TipoSangre.vue'
        ),
    },
    {
      path: 'reclutamiento',
      name: 'Reclutamiento',
      meta: { label: 'Reclutamiento' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Reclutamiento.vue'
        ),
    },
    {
      path: 'utiles-laborales',
      name: 'utilesLaborales',
      meta: { label: 'Inventario de útiles' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Inventario.vue'
        ),
    },
  ],
}
