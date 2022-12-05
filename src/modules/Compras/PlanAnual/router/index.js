export default {
  name: 'Plan Anual',
  redirect: '/PlanAnual/planAnual',
  component: () =>
    import('@/modules/Compras/PlanAnual/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'planAnual',
      name: 'Plan Anual',
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