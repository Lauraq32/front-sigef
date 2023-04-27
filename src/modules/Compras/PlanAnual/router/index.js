export default {
  name: 'Plan Anual',
  redirect: '/PlanAnual/planAnual',
  meta: { label: 'Compras' },
  component: () =>
    import('@/modules/Compras/PlanAnual/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'planAnual',
      name: 'Plan Anual',
      meta: { label: 'Plan Anual' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/Compras/PlanAnual/components/PlanAnual.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
