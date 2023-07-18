export default {
  name: 'AdministrativoModule',
  redirect: '/AdministrativoModule/manejoUsuarios',
  meta: { label: 'Administrativo' },
  component: () =>
    import('@/modules/administrativo/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'fp-meta-04',
      name: 'FpMeta04',
      meta: { label: 'Metas' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/FpMeta.vue'
        ),
    },
    {
      path: 'manejoUsuarios',
      name: 'ManejoUsuarios',
      meta: { label: 'Usuarios' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/ManejoDeUsuario.vue'
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

