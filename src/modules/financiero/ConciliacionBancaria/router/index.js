/* eslint-disable prettier/prettier */
export default {
  name: 'Cbancario',
  redirect: '/ConciliacionBancaria/CuentasDebanco',
  meta: { label: 'Conciliación Bancaria' },
  component: () =>
    import(
      '@/modules/financiero/ConciliacionBancaria/layout/TemplateLayout.vue'
    ),
  children: [
    {
      path: 'cheques',
      name: 'Cheques',
      meta: { label: 'Cheques' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/Cheques.vue'
        ),
    },

    {
      path: 'conciliacionBancaria',
      name: 'ConciliacionBancaria',
      meta: { label: 'Conciliación Bancaria' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/ConciliacionBancaria.vue'
        ),
    },

    {
      path: 'cuentasbanco',
      name: 'Cuentasbanco',
      meta: { label: 'Cuentas de banco' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/pages/cuentaDeBancos.vue'
        ),
    },

    {
      path: 'cuentasDebanco',
      name: 'CuentasDebanco',
      meta: { label: 'Cuentas de banco' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/CuentasDebanco.vue'
        ),
    },

    {
      path: 'depositos',
      name: 'Depositos',
      meta: { label: 'Depósitos' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/Depositos.vue'
        ),
    },

    {
      path: 'importarEstadosBancarios',
      name: 'ImportarEstadosBancarios',
      meta: { label: 'Importar Estados Bancarios' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/ImportarEstadosBancarios.vue'
        ),
    },

    {
      path: 'notasCredito',
      name: 'NotasCredito',
      meta: { label: 'Notas de crédito' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/NotasCredito.vue'
        ),
    },

    {
      path: 'notasDebito',
      name: 'NotasDebito',
      meta: { label: 'Notas de Débito' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/NotasDebito.vue'
        ),
    },
    {
      path: 'cortarChequesBancarios',
      name: 'CortarChequesBancarios',
      meta: { label: 'Cortar Cheques Bancarios' },
      component: () =>
        import(
          /* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/ConciliacionBancaria/components/CortarChequesBancarios.vue'
        ),
    },
  ],
}
