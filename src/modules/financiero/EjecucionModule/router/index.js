export default {
	name: 'Ejecucion',
	redirect: '/Ejecucion/AnoFiscal',
	meta: { label: 'Ejecución' },
	component: () =>
		import(
			'@/modules/financiero/EjecucionModule/layout/TemplateLayout.vue'
		),
	children: [
		{
			path: 'AnoFiscal',
			name: 'AnoFiscal',
			meta: { label: 'Año Fiscal' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/AnoFiscal.vue'
				),
		},

		{
			path: 'tiposRetenciones',
			name: 'tiposRetenciones',
			meta: { label: 'Tipos de Retenciones' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/TiposRetenciones.vue'
				),
		},
		{
			path: 'destinoGastos',
			name: 'destinoGastos',
			meta: { label: 'Destino Gastos' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/DestinoGastos.vue'
				),
		},
		{
			path: 'grupoPago',
			name: 'grupoPago',
			meta: { label: 'Grupos de Pago' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/GrupoPago.vue'
				),
		},
		{
			path: 'beneficiarios',
			name: 'beneficiarios',
			meta: { label: 'Beneficiarios' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/Beneficiarios.vue'
				),
		},
		{
			path: 'beneficiarioGrupo',
			name: 'beneficiarioGrupo',
			meta: { label: 'Beneficiarios x Grupos' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/BeneficiarioGrupo.vue'
				),
		},
		{
			path: 'comprobanteIngreso',
			name: 'comprobanteIngreso',
			meta: { label: 'Comprobante de Ingresos' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/ComprobanteIngreso.vue'
				),
		},
		{
			path: 'comprobanteGasto',
			name: 'comprobanteGasto',
			meta: { label: 'Comprobante de Gastos' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/ComprobanteGasto.vue'
				),
		},
		{
			path: 'transferenciaDatos',
			name: 'transferenciaDatos',
			meta: { label: 'Transferencia Datos' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/TransferenciaDatos.vue'
				),
		},
		{
			path: 'ejecucionIngreso',
			name: 'ejecucionIngreso',
			meta: { label: 'Ejecución Ingreso' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/EjecucionIngreso.vue'
				),
		},
		{
			path: 'ejecucionGastos',
			name: 'ejecucionGastos',
			meta: { label: 'Ejecución Gastos' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/EjecucionGastos.vue'
				),
		},
		{
			path: 'retenciones',
			name: 'retenciones',
			meta: { label: 'Retenciones' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/Retenciones.vue'
				),
		},
		{
			path: 'conceptoGasto',
			name: 'conceptoGasto',
			meta: { label: 'Concepto del Gasto' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/financiero/EjecucionModule/components/ConceptoGasto.vue'
				),
		},

		{
			path: 'catalogoDeFunciones',
			name: 'catalogoDeFunciones',
			meta: { label: 'Catálogo de Funciones' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '../components/CatalogoDeFunciones.vue'
				),
		},
		{
			path: 'cuentaDeBanco',
			name: 'cuentaDeBanco',
			meta: { label: 'Cuenta de Banco' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '../components/cuentaDeBanco.vue'
				),
		},
	],
};
