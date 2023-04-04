export default {
  name: 'Compras',
  redirect: '/ProcesoCompras/procesoCompras',
  meta: { label: 'Compras' },
  component: () =>
    import('@/modules/Compras/ProcesoCompras/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'procesoCompras',
      name: 'ProcesoCompras',
      meta: { label: 'Compras' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/Compras/ProcesoCompras/components/ProcesoAnual.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
