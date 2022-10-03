export default {
  name: 'Financiero',
 redirect:'/FinancieroModule/clasificadores',
  component: () =>
    import('@/modules/financiero/FormulacionModule/layout/TemplateLayout.vue'),
    children: [
      {
          path: 'clasificadores',
          name: 'clasificadores',
          component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Clasificadores.vue'),
      },
      {
        path: 'estructuraProgramatica',
        name: 'Estructuras Programaticas',
        component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/EstructuraProgramatica.vue'),
    },
      //  {
      //     path: '',
      //     name: 'no-entry',
      //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
      // },
     
  ]
}
