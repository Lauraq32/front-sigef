export default {
  name: 'AdministrativoModule',
  redirect: '/AdministrativoModule/manejoUsuarios',
  meta: { label: 'Administrativo' },
  component: () =>
    import('@/modules/administrativo/layout/TemplateLayout.vue'),
  children: [
  
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
