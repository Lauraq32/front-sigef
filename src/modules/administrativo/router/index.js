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
      path: 'serviciosPersonales',
      name: 'serviciosPersonales',
      meta: { label: 'Detalle servicios Personales' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/components/DetalleServiciosPersonales.vue'
        ),
    },
  ],
}
