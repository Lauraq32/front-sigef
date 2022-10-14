export default [
  {
    component: 'CNavTitle',
    name: 'Areas',
  },
  {
    component: 'CNavItem',
    name: 'Financiero',
    to: '/financiero',
    icon: 'cilBank',
  },
  {
    component: 'CNavItem',
    name: 'Compras',
    to: '/compras',
    icon: 'cilCart',
  },
  {
    component: 'CNavItem',
    name: 'RRHH',
    to: '/rrhh',
    icon: 'cilWc',
  },
  {
    component: 'CNavItem',
    name: 'Administrativo',
    to: '/administrativo',
    icon: 'cilContact',
  },
  {
    component: 'CNavTitle',
    name: 'Modulos',
  },
  {
    component: 'CNavItem',
    name: 'Financiero',
    icon: 'cilBank',

    items: [
      {
        component: 'CNavItem',
        name: 'Home',
        to: '/financiero',
        icon: 'cilHome',
      },
      {
        component: 'CNavItem',
        name: 'Formulacion',
        to: '/financiero',
        icon: 'cilChartLine',
        items: [
          {
            component: 'CNavTitle',
            name: 'Maestras',
          },
          {
            component: 'CNavItem',
            name: 'Clasificadores',
            to: '/FinancieroModule/clasificadores',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Estructura Programatica',
            to: '/FinancieroModule/estructuraProgramatica',
            icon: 'cilNotes',
          },
          {
            component: 'CNavItem',
            name: 'Fuente Especifica',
            to: '/FinancieroModule/fuenteEspecifica',
            icon: 'cilWallet',
          },
          {
            component: 'CNavItem',
            name: 'Fuentes Financiamiento',
            to: '/FinancieroModule/fuenteFinanciamiento',
            icon: 'cilLibraryBuilding',
          },
          {
            component: 'CNavItem',
            name: 'Organismos',
            to: '/FinancieroModule/organismos',
            icon: 'cilBuilding',
          },
          {
            component: 'CNavTitle',
            name: 'Procesos',
          },
          {
            component: 'CNavItem',
            name: 'Proyectos',
            to: '/FinancieroModule/proyectos',
            icon: 'cilFolderOpen',
          },
          {
            component: 'CNavItem',
            name: 'Formulacion ingreso',
            to: '/FinancieroModule/formulacionIngreso',
            icon: 'cilCalculator',
          },
          {
            component: 'CNavItem',
            name: 'Formulacion Gasto',
            to: '/FinancieroModule/formulacionGasto',
            icon: 'cilChartDonut',
          },
          {
            component: 'CNavTitle',
            name: 'Consultas',
          },
          {
            component: 'CNavTitle',
            name: 'Reportes',
          },
          {
            component: 'CNavTitle',
            name: 'Configuracion',
          },
        ],
      },
      {
        component: 'CNavItem',
        name: 'Ejecucion',
        to: '/Ejecucion',
        icon: 'cilChartPie',
        items: [
          {
            component: 'CNavTitle',
            name: 'Maestras',
          },
          {
            component: 'CNavItem',
            name: 'AnoFiscal',
            to: '/Ejecucion/AnoFiscal',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Configuracion Ingreso',
            to: '/Ejecucion/configuracionIngreso',
            icon: 'cilNotes',
          },
          {
            component: 'CNavItem',
            name: 'Tipo Retenciones',
            to: '/Ejecucion/tiposRetenciones',
            icon: 'cilWallet',
          },
          {
            component: 'CNavItem',
            name: 'Destino Gastos',
            to: '/Ejecucion/destinoGastos',
            icon: 'cilLibraryBuilding',
          },
          {
            component: 'CNavItem',
            name: 'Grupo de Pago',
            to: '/Ejecucion/grupoPago',
            icon: 'cilBuilding',
          },
          {
            component: 'CNavTitle',
            name: 'Procesos',
          },
          {
            component: 'CNavItem',
            name: 'beneficiarios',
            to: '/Ejecucion/beneficiarios',
            icon: 'cilFolderOpen',
          },
          {
            component: 'CNavItem',
            name: 'beneficiario por grupo',
            to: '/Ejecucion/beneficiarioGrupo',
            icon: 'cilCalculator',
          },
          {
            component: 'CNavItem',
            name: 'comprobanteIngreso',
            to: '/Ejecucion/comprobanteIngreso',
            icon: 'cilChartDonut',
          },
          {
            component: 'CNavItem',
            name: 'comprobanteGasto',
            to: '/Ejecucion/comprobanteGasto',
            icon: 'cilChartDonut',
          },
          {
            component: 'CNavTitle',
            name: 'Consultas',
          },
          {
            component: 'CNavTitle',
            name: 'Reportes',
          },
          {
            component: 'CNavTitle',
            name: 'Configuracion',
          },
        ],
      },
      {
        component: 'CNavItem',
        name: 'Activo Fijo',
        to: '/',
        icon: 'cilCouch',
      },
      {
        component: 'CNavItem',
        name: 'Nomina',
        to: '/',
        icon: 'cilMoney',
      },
      {
        component: 'CNavItem',
        name: 'Contabilidad',
        to: '/',
        icon: 'cilDollar',
      },
      {
        component: 'CNavItem',
        name: 'Conciliacion Bancaria',
        to: '/',
        icon: 'cilBank',
      },
      {
        component: 'CNavItem',
        name: 'Cuentas por pagar',
        to: '/',
        icon: 'cilNotes',
      },
      {
        component: 'CNavItem',
        name: 'Facturacion y Cobros',
        to: '/',
        icon: 'cilCreditCard',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Compras',
    icon: 'cilCart',

    items: [
      {
        component: 'CNavItem',
        name: 'Home',
        to: '/compras',
        icon: 'cilHome',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'RRHH',
    icon: 'cilWc',
   
    items: [
      {
        component: 'CNavItem',
        name: 'Home',
        to: '/rrhh',
        icon: 'cilHome',
      },
      {
        component: 'CNavItem',
        name: 'Registro de Personal',
        to: '/financiero',
        icon: 'cilGroup',
        
        items:[
         
          
          {
            component: 'CNavItem',
            name: 'Direccion Dependencia',
            to: '/RRHHModule/dependencia',
            icon: 'cil-notes',    
          },
          {
            component: 'CNavItem',
            name: 'Departamentos',
            to: '/RRHHModule/departamentos',
            icon: 'cilStorage',
          },
          {
            component: 'CNavItem',
            name: 'Areas de Trabajo',
            to: '/RRHHModule/areaTrabajo',
            icon: 'cilClipboard',
          },
          {
            component: 'CNavItem',
            name: 'Cargos',
            to: '/RRHHModule/cargos',
            icon: 'cilContact',
          },
          {
            component: 'CNavItem',
            name: 'Profesiones',
            to: '/RRHHModule/profesiones',
            icon: 'cil-pencil',
          },
          {
            component: 'CNavItem',
            name: 'Sectores',
            to: '/RRHHModule/sectores',
            icon: 'cilGlobeAlt',
          },
          {
            component: 'CNavItem',
            name: 'Tipo de Sangre',
            to: '/RRHHModule/tipoSangre',
            icon: 'cilHealing',
          },
          {
            component: 'CNavTitle',
            name: 'Procesos',
          },
          {
            component: 'CNavItem',
            name: 'Registro Personal',
            to: '/RRHHModule/registroEmpleados',
            icon: 'cilDollar',
          },
          {
            component: 'CNavItem',
            name: 'Reclutamiento o solicitudes',
            to: '/RRHHModule/reclutamiento',
            icon: 'cilDollar',
          },
          {
            component: 'CNavItem',
            name: 'Inventario de utiles',
            to: '/RRHHModule/inventario',
            icon: 'cilDollar',
          },
          
        ]
      },


    
    ],
  },
  {
    component: 'CNavItem',
    name: 'Administrativo',
    icon: 'cilContact',

    items: [
      {
        component: 'CNavItem',
        name: 'Home',
        to: '/administrativo',
        icon: 'cilHome',
      },
      {
        component:'CNavItem',
        name:'Manejo Usuarios',
        to:'/AdministrativoModule/manejoUsuarios',
        icon:'cilPeoplePlus',
      }
    ],
  },
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Theme',
  },
  {
    component: 'CNavItem',
    name: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavTitle',
    name: 'Components',
  },
  {
    component: 'CNavGroup',
    name: 'Base',
    to: '/base',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: 'CNavItem',
        name: 'Breadcrumbs',
        to: '/base/breadcrumbs',
      },
      {
        component: 'CNavItem',
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: 'CNavItem',
        name: 'Carousels',
        to: '/base/carousels',
      },
      {
        component: 'CNavItem',
        name: 'Collapses',
        to: '/base/collapses',
      },
      {
        component: 'CNavItem',
        name: 'List Groups',
        to: '/base/list-groups',
      },
      {
        component: 'CNavItem',
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: 'CNavItem',
        name: 'Paginations',
        to: '/base/paginations',
      },
      {
        component: 'CNavItem',
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: 'CNavItem',
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: 'CNavItem',
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: 'CNavItem',
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: 'CNavItem',
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: 'CNavItem',
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Buttons',
    to: '/buttons',
    icon: 'cil-cursor',
    items: [
      {
        component: 'CNavItem',
        name: 'Buttons',
        to: '/buttons/standard-buttons',
      },
      {
        component: 'CNavItem',
        name: 'Button Groups',
        to: '/buttons/button-groups',
      },
      {
        component: 'CNavItem',
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Forms',
    to: '/forms',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: 'CNavItem',
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: 'CNavItem',
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: 'CNavItem',
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: 'CNavItem',
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: 'CNavItem',
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: 'CNavItem',
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: 'CNavItem',
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Charts',
    to: '/charts',
    icon: 'cil-chart-pie',
  },
  {
    component: 'CNavGroup',
    name: 'Icons',
    to: '/icons',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'CoreUI Icons',
        to: '/icons/coreui-icons',
        badge: {
          color: 'info',
          text: 'NEW',
        },
      },
      {
        component: 'CNavItem',
        name: 'Brands',
        to: '/icons/brands',
      },
      {
        component: 'CNavItem',
        name: 'Flags',
        to: '/icons/flags',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Notifications',
    to: '/notifications',
    icon: 'cil-bell',
    items: [
      {
        component: 'CNavItem',
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: 'CNavItem',
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: 'CNavItem',
        name: 'Modals',
        to: '/notifications/modals',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Widgets',
    to: '/widgets',
    icon: 'cil-calculator',
    badge: {
      color: 'primary',
      text: 'NEW',
      shape: 'pill',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Extras',
  },
  {
    component: 'CNavGroup',
    name: 'Pages',
    to: '/pages',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'Login',
        to: '/pages/login',
      },
      {
        component: 'CNavItem',
        name: 'Register',
        to: '/pages/register',
      },
      {
        component: 'CNavItem',
        name: 'Error 404',
        to: '/pages/404',
      },
      {
        component: 'CNavItem',
        name: 'Error 500',
        to: '/pages/500',
      },
    ],
  },

  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank'
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank'
  // }
]
