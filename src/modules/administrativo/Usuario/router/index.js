export default {
  name: 'AdministrativoModule',
  redirect: '/AdministrativoModule/manejoUsuarios',
  meta: { label: 'AdministrativoModule' },
  component: () =>
    import('@/modules/administrativo/Usuario/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'manejoUsuarios',
      name: 'ManejoUsuarios',
      meta: { label: 'Manejo De Usuarios' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/Usuario/components/manejoUsuarios.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
