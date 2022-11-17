export default {
  name: 'RRHHModule',
  redirect: '/RRHHModule/registroEmpleados',
  component: () =>
    import('@/modules/rrhh/RegistroPersonal/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'registroEmpleados',
      name: 'RegistroEmpleados',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/RegistroPersonal.vue'
        ),
    },
    {
      path: 'dependencia',
      name: 'Dependencia',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/DireccionDependencia.vue'
        ),
    },
    {
      path: 'departamentos',
      name: 'Departamentos',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Departamentos.vue'
        ),
    },
    {
      path: 'areaTrabajo',
      name: 'AreaTrabajo',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/AreaTrabajo.vue'
        ),
    },
    {
      path: 'cargos',
      name: 'Cargos',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Cargos.vue'
        ),
    },
    {
      path: 'profesiones',
      name: 'Profesiones',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Profesiones.vue'
        ),
    },
    {
      path: 'sectores',
      name: 'Sectores',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Sectores.vue'
        ),
    },
    {
      path: 'tipoSangre',
      name: 'TipoSangre',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/TipoSangre.vue'
        ),
    },
    {
      path: 'reclutamiento',
      name: 'Reclutamiento',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Reclutamiento.vue'
        ),
    },
    {
      path: 'inventario',
      name: 'Inventario',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/Inventario.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
