/* eslint-disable prettier/prettier */
export default [
  {
    component: 'CNavTitle',
    name: 'Áreas',
  },
  // {
  //   component: 'CNavItem',
  //   name: 'Home',
  //   to: '/home',
  //   icon: 'cilHome',
  // },
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
    name: 'Módulos',
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
        name: 'Formulación',
        to: '/financiero',
        icon: 'cilChartLine',
        items: [

          {
            component: 'CNavItem',
            name: 'Clasificadores',
            to: '/FinancieroModule/clasificadores',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Estructura programática',
            to: '/FinancieroModule/estructuraProgramatica',
            icon: 'cilNotes',
          },
          {
            component: 'CNavItem',
            name: 'Fuente específica',
            to: '/FinancieroModule/fuenteEspecifica',
            icon: 'cilWallet',
          },
          {
            component: 'CNavItem',
            name: 'Fuentes financiamiento',
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
          // {
          //   component: 'CNavItem',
          //   name: 'Proyectos',
          //   to: '/FinancieroModule/proyectos',
          //   icon: 'cilFolderOpen',
          // },
          {
            component: 'CNavItem',
            name: 'Formulación ingreso',
            to: '/FinancieroModule/formulacionIngreso',
            icon: 'cilCalculator',
          },
          {
            component: 'CNavItem',
            name: 'Formulación gasto',
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
            name: 'Configuración',
          },
        ],
      },
      {
        component: 'CNavItem',
        name: 'Ejecución',
        to: '/Ejecucion',
        icon: 'cilChartPie',
        items: [

          {
            component: 'CNavItem',
            name: 'Año fiscal',
            to: '/Ejecucion/AnoFiscal',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Configuración ingreso',
            to: '/Ejecucion/configuracionIngreso',
            icon: 'cilMoney',
          },
          {
            component: 'CNavItem',
            name: 'Tipo retenciones',
            to: '/Ejecucion/tiposRetenciones',
            icon: 'cilWallet',
          },
          {
            component: 'CNavItem',
            name: 'Tipo gastos',
            to: '/Ejecucion/destinoGastos',
            icon: 'cilLibraryBuilding',
          },
          {
            component: 'CNavItem',
            name: 'Grupo de pago',
            to: '/Ejecucion/grupoPago',
            icon: 'cilBuilding',
          },

          {
            component: 'CNavItem',
            name: 'Beneficiarios',
            to: '/Ejecucion/beneficiarios',
            icon: 'cilFolderOpen',
          },
          {
            component: 'CNavItem',
            name: 'Beneficiario por grupo',
            to: '/Ejecucion/beneficiarioGrupo',
            icon: 'cilCalculator',
          },
          {
            component: 'CNavTitle',
            name: 'Procesos',
          },
          {
            component: 'CNavItem',
            name: 'Comprobante de ingreso',
            to: '/Ejecucion/comprobanteIngreso',
            icon: 'cilNotes',
          },
          {
            component: 'CNavItem',
            name: 'Comprobante de gasto',
            to: '/Ejecucion/comprobanteGasto',
            icon: 'cilNotes',
          },
          {
            component: 'CNavItem',
            name: 'Transferencia de datos',
            to: '/Ejecucion/transferenciaDatos',
            icon: 'cidChartLine',
          },
          {
            component: 'CNavTitle',
            name: 'Consultas',
          },
          {
            component: 'CNavItem',
            name: 'Ejecución ingreso',
            to: '/Ejecucion/ejecucionIngreso',
            icon: 'cilChartPie',
          },
          {
            component: 'CNavItem',
            name: 'Ejecución gasto',
            to: '/Ejecucion/ejecucionGastos',
            icon: 'cilChartPie',
          },

          {
            component: 'CNavTitle',
            name: 'Reportes',
          },
          {
            component: 'CNavTitle',
            name: 'Configuración',
          },
        ],
      },
      {
        component: 'CNavItem',
        name: 'Activo fijo',
        to: '/ActivoFijoModule',
        icon: 'cilCouch',
        items: [

          {
            component: 'CNavItem',
            name: 'Categorías',
            to: '/ActivoFijoModule/categorias',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Área ubicación',
            to: '/ActivoFijoModule/areaUbicacion',
            icon: 'cilMap',
          },
          {
            component: 'CNavItem',
            name: 'Marcas',
            to: '/ActivoFijoModule/marcas',
            icon: 'cilBoxAlt',
          },
          {
            component: 'CNavTitle',
            name: 'Procesos',
          },
          {
            component: 'CNavItem',
            name: 'Documentos por pagar',
            to: '/ActivoFijoModule/documentosPorPagar',
            icon: 'cilGraph',
          },
          {
            component: 'CNavItem',
            name: 'Documentos de crédito',
            to: '/ActivoFijoModule/documentosDeCredito',
            icon: 'cilDollarCircle',
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
            component: 'CNavItem',
            name: 'General',
            to: '/ActivoFijoModule/general',
            icon: 'cilList',
          },

          {
            component: 'CNavItem',
            name: 'Conduce',
            to: '/ActivoFijoModule/condensadoAcivoFijos',
            icon: 'cilList',
          },

          {
            component: 'CNavItem',
            name: 'Recepcion',
            to: '/ActivoFijoModule/recepcion',
            icon: 'cilList',
          },

          {
            component: 'CNavTitle',
            name: 'Configuración',
          },
        ],
      },
      {
        component: 'CNavItem',
        name: 'Nómina',
        to: '/NominaModule',
        icon: 'cilMoney',
        items: [

          {
            component: 'CNavItem',
            name: 'Clasificadores nómina',
            to: '/NominaModule/clasificadoresNomina',
            icon: 'cilBook',
          },
          {
            component: 'CNavItem',
            name: 'Grupo nóminas',
            to: '/NominaModule/GrupoNominas',
            icon: 'cilIdCard',
          },
          {
            component: 'CNavItem',
            name: 'Programas',
            to: '/NominaModule/Programas',
            icon: 'cilChalkboardTeacher',
          },
          {
            component: 'CNavItem',
            name: 'Departamentos',
            to: '/NominaModule/Departamentos',
            icon: 'cilBuilding',
          },
          {
            component: 'CNavItem',
            name: 'Área de trabajo',
            to: '/NominaModule/AreaDeTrabajo',
            icon: 'cilIdBadge',
          },
          {
            component: 'CNavItem',
            name: 'Posiciones/Cargo',
            to: '/NominaModule/PosicionesCargo',
            icon: 'cilAddressBook',
          },
          {
            component: 'CNavItem',
            name: 'Sectores',
            to: '/NominaModule/Sectores',
            icon: 'cilMap',
          },
          {
            component: 'CNavTitle',
            name: 'Procesos',
          },
          {
            component: 'CNavTitle',
            name: 'Consultas',
          },
          {
            component: 'CNavItem',
            name: 'Nóminas',
            to: '/NominaModule/Nominas',
            icon: 'cilList',
          },
          {
            component: 'CNavTitle',
            name: 'Configuración',
          },
          {
            component: 'CNavItem',
            name: 'Configuración general',
            to: '/NominaModule/ConfiguracionGeneral',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Configuración del módulo',
            to: '/NominaModule/ConfiguracionModulo',
            icon: 'cilList',
          },
        ],
      },
      {
        component: 'CNavItem',
        name: 'Contabilidad',
        to: '/ContabilidadModule',
        icon: 'cilDollar',
        items: [

          {
            component: 'CNavItem',
            name: 'Cuentas contables',
            to: '/ContabilidadModule/cuentasContables',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Configuración estado de flujo efectivo',
            to: '/ContabilidadModule/configuracionEstadoFlujoEfec',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Configuración estados financieros',
            to: '/ContabilidadModule/configuracionEstadosFinanciero',
            icon: 'cilList',
          },
          {
            component: 'CNavTitle',
            name: 'Reportes',
          },
          {
            component: 'CNavItem',
            name: 'Estado comparativo',
            to: '/ContabilidadModule/estadoComparativo',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Estado de rendimiento financiero',
            to: '/ContabilidadModule/estadoRendimientoFinanciero',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Estado situación financiera',
            to: '/ContabilidadModule/estadoSituacionFinanciera',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Estado de flujo de efectivo',
            to: '/ContabilidadModule/estadoFlujoEfectivo',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Estado cambio patrimonio financiero',
            to: '/ContabilidadModule/estadoCambioPatrimonioFinanciero',
            icon: 'cilList',
          },
        ],
      },
      {
        component: 'CNavItem',
        name: 'Conciliación bancaria',
        to: '/ConciliacionBancaria',
        icon: 'cilBank',
        items: [

          {
            component: 'CNavItem',
            name: 'Cuentas de bancos ',
            to: '/ConciliacionBancaria/CuentasDebanco',
            icon: 'cilBalanceScale',
          },

          {
            component: 'CNavTitle',
            name: 'Procesos',
          },
          {
            component: 'CNavItem',
            name: 'Cheques (cuenta activa)',
            to: '/ConciliacionBancaria/Cheques',
            icon: 'cilCalculator',
          },
          {
            component: 'CNavItem',
            name: 'Depósitos',
            to: '/ConciliacionBancaria/Depositos',
            icon: 'cilBasketPlus',
          },
          {
            component: 'CNavItem',
            name: 'Notas de crédito',
            to: '/ConciliacionBancaria/NotasCredito',
            icon: 'cilBarChart',
          },
          {
            component: 'CNavItem',
            name: 'Notas de débito',
            to: '/ConciliacionBancaria/NotasDebito',
            icon: 'cilBarChart',
          },
          {
            component: 'CNavItem',
            name: 'Importar estados bancarios',
            to: '/ConciliacionBancaria/ImportarEstadosBancarios',
            icon: 'cilBriefcase',
          },
          {
            component: 'CNavItem',
            name: 'Conciliación bancaria',
            to: '/ConciliacionBancaria/ConciliacionBancaria',
            icon: 'cilDonate',
          },
          {
            component: 'CNavItem',
            name: 'Cortar cheques estados financieros',
            to: '/ConciliacionBancaria/CortarChequesBancarios',
            icon: 'cilDollarSlash',
          },
          {
            component: 'CNavTitle',
            name: 'Procesos',
          },
          {
            component: 'CNavItem',
            name: 'Cheques (cuenta activa)',
            to: '/ConciliacionBancaria/Cheques',
            icon: 'cilCalculator',
          },
          {
            component: 'CNavItem',
            name: 'Depósitos',
            to: '/ConciliacionBancaria/Depositos',
            icon: 'cilBasketPlus',
          },
          {
            component: 'CNavItem',
            name: 'Notas de crédito',
            to: '/ConciliacionBancaria/NotasCredito',
            icon: 'cilBarChart',
          },

          {
            component: 'CNavItem',
            name: 'Notas de débito',
            to: '/ConciliacionBancaria/NotasDebito',
            icon: 'cilBarChart',
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
        name: 'Facturación y cobros',
        to: '/FacturacionCobrosModule',
        icon: 'cilCreditCard',
        items: [

          {
            component: 'CNavItem',
            name: 'Arbitrios-Impustos-Tazas',
            to: '/FacturacionCobrosModule/Arbitrios-Impuestos-Tazas',
            icon: 'cilNotes',
          },

          {
            component: 'CNavItem',
            name: 'Uso de suelo',
            to: '/FacturacionCobrosModule/usoSuelo',
            icon: 'cilCompass',
          },

          {
            component: 'CNavItem',
            name: 'Sectores-Barrios-Calles',
            to: '/FacturacionCobrosModule/Sectores',
            icon: 'cilLocationPin',
          },

          {
            component: 'CNavItem',
            name: 'Contribuyentes',
            to: '/FacturacionCobrosModule/Contribuyentes',
            icon: 'cilGlobeAlt',
          },

          {
            component: 'CNavTitle',
            name: 'Procesos',
          },

          {
            component: 'CNavItem',
            name: 'Facturación manual',
            to: '/FacturacionCobrosModule/FacturacionManual',
            icon: 'cilNoteAdd',
          },

          {
            component: 'CNavItem',
            name: 'Facturación por lote',
            to: '/FacturacionCobrosModule/FacturacionPorLotes',
            icon: 'cilCity',
          },

          {
            component: 'CNavItem',
            name: 'Recibos de ingresos',
            to: '/FacturacionCobrosModule/RecibosDeIngresos',
            icon: 'cilDonate',
          },

          {
            component: 'CNavItem',
            name: 'Notas de crédito',
            to: '/FacturacionCobrosModule/NotasDeCredito',
            icon: 'cilList',
          },

          {
            component: 'CNavItem',
            name: 'Notas de débito',
            to: '/FacturacionCobrosModule/NotasDeDebito',
            icon: 'cilList',
          },

          {
            component: 'CNavTitle',
            name: 'Consultas',
          },

          {
            component: 'CNavItem',
            name: 'Facturas por lote',
            to: '/FacturacionCobrosModule/FacturasPorLote',
            icon: 'cilList',
          },

        ]
      },


      {
        component: 'CNavItem',
        name: 'Cuentas por pagar',
        to: '/CuentasPorPagarModule',
        icon: 'cilNotes',
        items: [

          {
            component: 'CNavItem',
            name: 'Suplidores',
            to: '/CuentasPorPagarModule/suplidores',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Áreas/Eventos',
            to: '/CuentasPorPagarModule/areasEventos',
            icon: 'cilList',
          },
          {
            component: 'CNavTitle',
            name: 'Procesos'
          },
          {
            component: 'CNavItem',
            name: 'Documentos por pagar',
            to: '/CuentasPorPagarModule/documentosPorPagar',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Documentos de crédito',
            to: '/CuentasPorPagarModule/documentosDeCredito',
            icon: 'cilList',
          },
          {
            component: 'CNavTitle',
            name: 'Consultas'
          },
          {
            component: 'CNavTitle',
            name: 'Reportes'
          },
          {
            component: 'CNavItem',
            name: 'ActivoFijo General',
            to: '/CuentasPorPagarModule/general',
            icon: 'cilList',
          },
          {
            component: 'CNavItem',
            name: 'Condensado',
            to: '/CuentasPorPagarModule/condensado',
            icon: 'cilList',
          },
        ]
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
        name: 'Procesos de Compras',
        to: '/ProcesoCompras/procesoCompras',
        icon: 'cil-notes',
      },
      {
        component: 'CNavItem',
        name: 'Plan Anual',
        to: '/PlanAnual/planAnual',
        icon: 'cil-notes',
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
        name: 'Registro de personal',
        to: '/financiero',
        icon: 'cilGroup',

        items: [
          {
            component: 'CNavItem',
            name: 'Dirección dependencia',
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
            name: 'Áreas de Trabajo',
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
            to: '/RRHHModule/Sectorees',
            icon: 'cilGlobeAlt',
          },
          {
            component: 'CNavItem',
            name: 'Tipo de sangre',
            to: '/RRHHModule/tipoSangre',
            icon: 'cilHealing',
          },
          {
            component: 'CNavTitle',
            name: 'Procesos',
          },
          {
            component: 'CNavItem',
            name: 'Registro personal',
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
            name: 'Inventario de útiles',
            to: '/RRHHModule/inventario',
            icon: 'cilDollar',
          },
        ],
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
        component: 'CNavItem',
        name: 'Manejo usuarios',
        to: '/AdministrativoModule/manejoUsuarios',
        icon: 'cilPeoplePlus',
      },
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
