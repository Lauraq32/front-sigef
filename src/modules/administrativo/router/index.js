import {
  cilUser,
  cilCommute,
  cilPeoplePlus,
  cilCash,
  cilPrint,
  cilWallet,
  cilPetrolStation,
} from '@coreui/icons-pro';

const color = "#002e5d";

export default {
  path: '/modulos/administrativo',
  name: 'AdministrativoModule',
  meta: { label: 'Administrativo' },
  component: () =>
    import('@/modules/administrativo/layout/TemplateLayout.vue'),
  children: [
    {
      path: '',
      meta: { label: 'Home' },
      component: () =>
        import(
          '@/modules/administrativo/Administrativo.vue'
        ),
    },
    {
      path: 'usuarios',
      name: 'administrativo:usuarios',
      meta: { label: 'Usuarios', icon: cilUser, color, size: "9xl" },
      component: () =>
        import(
          '@/modules/administrativo/Usuario/components/manejoUsuarios.vue'
        ),
    },
    {
      path: '-',
      name: 'transportacion',
      meta: { label: 'Transportación', icon: cilCommute, color, size: "9xl" },
    },
    {
      path: '-',
      name: 'visitas',
      meta: { label: 'Visitas', icon: cilPeoplePlus, color, size: "9xl" },
    },
    {
      path: '-',
      name: 'viaticos',
      meta: { label: 'Viáticos', icon: cilCash, color, size: "9xl" },
    },
    {
      path: '-',
      name: 'cajaChica',
      meta: { label: 'Caja Chica', icon: cilWallet, color, size: "9xl" },
    },
    {
      path: '-',
      name: 'combustibles',
      meta: { label: 'Combustibles', icon: cilPetrolStation, color, size: "9xl" },
    },
    {
      path: '-',
      name: 'digitalizacion',
      meta: { label: 'Digitalización', icon: cilPrint, color, size: "9xl" },
    },
  ],
}
