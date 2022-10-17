/* eslint-disable prettier/prettier */
export default {
  name: 'Cbancario',
  redirect: '/ConciliacionBancaria/CuentasDebanco',
  component: () =>
    import('@/modules/financiero/ConciliacionBancaria/layout/TemplateLayout.vue'),
  children: [
    {
      path: 'cheques',
      name: 'Cheques',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/Cheques.vue'
        ),
    },

    {
      path: 'conciliacionBancaria',
      name: 'ConciliacionBancaria',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/ConciliacionBancaria.vue'
        ),
    },

    {
      path: 'cuentasDebanco',
      name: 'CuentasDebanco',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/CuentasDebanco.vue'
        ),
    },

    {
      path: 'depositos',
      name: 'Depositos',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/Depositos.vue'
        ),
    },

    {
      path: 'importarEstadosBancarios',
      name: 'ImportarEstadosBancarios',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/ImportarEstadosBancarios.vue'
        ),
    },

    {
      path: 'notasCredito',
      name: 'NotasCredito',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/NotasCredito.vue'
        ),
    },

    {
      path: 'notasDebito',
      name: 'NotasDebito',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/NotasDebito.vue'
        ),
    },
    {
      path: 'cortarChequesBancarios',
      name: 'CortarChequesBancarios',
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/CortarChequesBancarios.vue'
        ),
    },

  ],
}
