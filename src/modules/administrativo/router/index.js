export default {
	name: 'administrativo',
	redirect: '/administrativo/usuarios',
	meta: { label: 'Administrativo' },
	component: () =>
		import('@/modules/administrativo/layout/TemplateLayout.vue'),
	children: [
		{
			path: 'fp-meta-04',
			name: 'FpMeta04',
			meta: { label: 'Metas' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/FpMeta.vue'
				),
		},
		{
			path: 'usuarios',
			name: 'ManejoUsuarios',
			meta: { label: 'Usuarios' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/ManejoDeUsuario.vue'
				),
		},
		{
			path: 'ayuntamiento',
			name: 'ayuntamiento',
			meta: { label: 'Ayuntamiento' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/ayuntamiento.vue'
				),
		},

		{
			path: 'mision-vision',
			name: 'MisionVision',
			meta: { label: 'Misión y Visión' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/misionVision.vue'
				),
		},
		{
			path: 'servicios-personales',
			name: 'serviciosPersonales',
			meta: { label: 'Detalle servicios Personales' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/ServiciosPersonales.vue'
				),
		},

		{
			path: 'perfil-usuario',
			name: 'Perfil',
			meta: { label: 'Perfil de Usuario' },
			component: () =>
				import(
					/* webpackChunkName: "daybook-no-entry" */ '@/modules/administrativo/pages/perfil.vue'
				),
		},
	],
};
