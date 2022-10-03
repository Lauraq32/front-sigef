export default {
  name: 'Financiero',
 redirect:'/FinancieroModule/clasificadores',
  component: () =>
<<<<<<< HEAD
    import('@/modules/financiero/FormulacionModule/components/Clasificadores.vue'),
=======
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
>>>>>>> 9a8cf65c478b2f97c0ccbca3ff16a69990e8392a
}
