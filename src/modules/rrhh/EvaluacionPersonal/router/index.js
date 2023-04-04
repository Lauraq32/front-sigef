export default {
  name: 'RRHHModule',
  redirect: '/RRHHModule/EvaluacionPersonal',
  meta: { label: 'RRHHModule' },
  component: () =>
    import('@/modules/administrativo/Usuario/layout/TemplateLayout.vue'),
  children: [
    {
      path: '/registroEmpleado',
      name: 'RegistroEmpleado',
      meta: { label: 'Registro De Empleado' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/rrhh/RegistroPersonal/components/RegistroEmpleado.vue'
        ),
    },

    //  {
    //     path: '',
    //     name: 'no-entry',
    //     component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/FormulacionModule/components/Prueba.vue'),
    // },
  ],
}
