export default {
  name: 'AdministrativoModule',
  redirect: '/AdministrativoModule/manejoUsuarios',
  meta: { label: 'Administrativo' },
  component: () =>
    import('@/modules/administrativo/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'manejoUsuarios',
      name: 'ManejoUsuarios',
      meta: { label: 'Manejo de Usuarios' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/components/manejoUsuarios.vue'
        ),
    },

    {
      path: 'serviciosPersonales',
      name: 'serviciosPersonales',
      meta: { label: 'Detalle servicios Personales' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/components/DetalleServiciosPersonales.vue'
        ),
    },

    {
      path: 'ayuntamiento',
      name: 'ayuntamiento',
      meta: { label: 'Ayuntamiento' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/ayuntamiento.vue'
        ),
    },

    {
      path: 'misionVision',
      name: 'MisionVision',
      meta: { label: 'Misión y Visión' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/misionVision.vue'
        ),
    },
    {
      path: 'serviciosPersonales',
      name: 'serviciosPersonales',
      meta: { label: 'Detalle servicios Personales' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/ServiciosPersonales.vue'
        ),
    },



    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}

