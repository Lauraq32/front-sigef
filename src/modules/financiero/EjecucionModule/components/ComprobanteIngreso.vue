<template>
  <h3 class="text-center">Comprobantes de Ingresos</h3>

  <AppActionHeader>
    <CButton
      v-if="!paramsFiltro"
      style="font-weight: bold"
      @click="
        () => {
          showFiltro = true
        }
      "
    >
      <span> <CIcon icon="cilFilter" size="lg" /> Filtrar </span>
    </CButton>
    <CButton v-else @click="() => ((paramsFiltro = null), getIngresos())">
      <span>
        <CIcon icon="cilFilterX" style="color: red" size="lg" /> Resultados
        filtrados</span
      >
    </CButton>

    <CButton
      style="font-weight: bold"
      color="info"
      @click="
        () => {
          showAddComprobanteIngreso = true
        }
      "
      >Agregar</CButton
    >
    <div class="p-2">
      <CButton
        style="font-weight: bold"
        color="info"
        @click="goToComprobanteGasto"
        >Comprobante Gasto</CButton
      >
    </div>
  </AppActionHeader>

  <CSmartTable
    class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    header
    :items="ingresosList"
    :columns="columns"
    :footer="footerItem"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    columnSorter
    no-items-label="No hay registros"
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #fecha="{ item }">
      <td>
        {{ formatDate(item.fecha) }}
      </td>
    </template>
    <template #etapa="{ item }">
      <td class="text-center text-uppercase">
        <CBadge color="warning">{{ item.etapa }}</CBadge>
      </td>
    </template>

    <template #estatus="{ item }">
      <td class="text-center text-uppercase">
        <CBadge :color="item.estatus ? 'success' : 'danger'">{{
          item.estatus ? 'ACTIVO' : 'CANCELADO'
        }}</CBadge>
      </td>
    </template>

    <template #totalValor="{ item }">
      <td class="text-end">
        {{ formatPrice(item.totalValor) }}
      </td>
    </template>

    <template #contribuyente="{ item }">
      <td>
        {{ item.contribuyente.descripcion }}
      </td>
    </template>

    <template #show_details="{ item }">
      <td>
        <CDropdown v-if="item.estatus">
          <CDropdownToggle color="primary" variant="outline"
            >Acciones</CDropdownToggle
          >
          <CDropdownMenu>
            <CDropdownItem
              v-for="action in buttonActions"
              @click="action.clickHandler && action.clickHandler(item)"
              >{{ action.label }}</CDropdownItem
            >
          </CDropdownMenu>
        </CDropdown>
      </td>
    </template>
  </CSmartTable>

  <ModalAddComprobanteIngreso
    @close-modal="closeModalComprobanteIngreso"
    @addComprobanteIngreso="addComprobanteIngreso"
    :showModal="showAddComprobanteIngreso"
    :contribuyentesName="contribuyentesName"
    :payloadRegistroIngreso="ingresoPost"
    @actualizar-table="getIngresos"
  />

  <ContenedorArchivos
    :showModal="showModalDoc"
    :tagKeyName="'ejecucionIngresosId'"
    :tagValueName="`${selectedIngreso?.id}-${selectedIngreso?.numeroComprobante}`"
    @closeModal="closeContenedorModal"
  />

  <filtroRegistroIngreso :showFiltro="showFiltro" @close="closeFiltro" />
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/EjecucionServices'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import router from '@/router'
import AppActionHeader from '@/components/AppActionHeader.vue'
import ModalAddComprobanteIngreso from '../Dialogos/ModalAddComprobanteIngreso.vue'
import { formatDate, formatPrice } from '@/utils/format'
import ContenedorArchivos from '@/components/ContenedorArchivosModel.vue'
import { filter } from '@/utils/validator'
import filtroRegistroIngreso from './filtroRegistroIngreso.vue'
import { showReport } from '@/utils/util'

export default {
  components: {
    CSmartTable,
    CModal,
    SimpleTypeahead,
    AppActionHeader,
    ModalAddComprobanteIngreso,
    ContenedorArchivos,
    filtroRegistroIngreso,
  },

  data: function () {
    return {
      selectedIngreso: {},
      filter,
      formatDate,
      formatPrice,
      showFiltro: false,
      paramsFiltro: null,
      showAddComprobanteIngreso: false,
      showModalDoc: false,
      ingresosList: [],
      contribuyentesList: [],
      contribuyentesName: [],

      columns: [
        {
          key: 'numeroComprobante',
          label: '#Comp',
          _style: { width: '10%' },
        },

        { key: 'fecha', label: 'Fecha', _style: { width: '10%' } },
        { key: 'etapa', label: 'Etapa', _style: { width: '10%' } },
        {
          key: 'codigoIngresoTalonario',
          label: 'Recibo',
          _style: { width: '10%' },
        },
        {
          key: 'contribuyente',
          label: 'Contribuyente',
          _style: { width: '25%' },
        },
        { key: 'detalle', label: 'Detalle', _style: { width: '25%' } },
        { key: 'totalValor', label: 'Valor', _style: { width: '10%' } },
        { key: 'estatus', label: 'Estatus', _style: { width: '10%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total items',
          _props: {
            colspan: 6,
            style: 'font-weight:bold;',
          },
        },

        {
          label: '',
          _props: {
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
      ],

      buttonActions: [
        {
          label: 'Cancelar',
          clickHandler: (value) => {
            this.cancelarRegistroIngreso(value)
          },
        },

        {
          label: 'Asociar documentos',
          clickHandler: (item) => {
            this.showModalDoc = true
            this.selectedIngreso = { ...item }
          },
        },

        {
          label: 'Imprimir 8 1/2 x 11',
          clickHandler: (value) => {
            this.printReportReciboIngreso(value)
          },
        },

        {
          label: 'Imprimir 8 1/2 x 5.5',
          clickHandler: (value) => {
            this.printReportComprobanteIngreso(value)
          },
        },
      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    closeModalComprobanteIngreso() {
      this.showAddComprobanteIngreso = false
    },

    closeFiltro(params) {
      if (params) {
        this.getIngresos(params)
        this.paramsFiltro = params
      }
      this.showFiltro = false
    },

    goToComprobanteGasto() {
      router.push({ name: 'comprobanteGasto' })
    },

    exportarReporte() {
      this.downloadFile()
    },
    exportarReporteEjecucion() {
      this.downloadFileEjecucion()
    },
    downloadFile() {
      Api.downloadGastoModificacion(this.mesReporte.split('-')[0]).then(
        (response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]))
          var fURL = document.createElement('a')

          fURL.href = fileURL
          fURL.setAttribute(
            'download',
            `ME-${localStorage
              .getItem('usuario')
              .substring(4, 8)}${localStorage.getItem('fecha')}.csv`,
          )
          document.body.appendChild(fURL)

          fURL.click()
        },
      )
      this.mesReporte = 1
    },
    downloadFileEjecucion() {
      Api.downloadGastoEjecucion(this.mesReporte.split('-')[0]).then(
        (response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]))
          var fURL = document.createElement('a')

          fURL.href = fileURL
          fURL.setAttribute(
            'download',
            `EI-${localStorage
              .getItem('usuario')
              .substring(4, 8)}${localStorage.getItem('fecha')}.csv`,
          )
          document.body.appendChild(fURL)

          fURL.click()
        },
      )
      this.mesReporte = 1
    },

    async printReportReciboIngreso(item) {
      try {
        await showReport({
          folderName: 'fep',
          reportName: 'Rep_Recibo_Ingresos_A1',
          params: [
            {
              name: 'ID_TRANSACCION',
              value: item.id,
            },
            {
              name: 'CAPITULO_AYTO',
              value: 'majorityId',
            },
          ],
        })
      } catch (error) {
        this.show({
          content: error,
          closable: true,
          color: 'danger',
          class: 'text-white',
        })
      }
    },

    async printReportComprobanteIngreso(item) {
      try {
        await showReport({
          folderName: 'fep',
          reportName: 'Rep_Comprobante_Ingresos_A1',
          params: [
            {
              name: 'ID_TRANSACCION',
              value: item.id,
            },
            {
              name: 'CAPITULO_AYTO',
              value: 'majorityId',
            },
          ],
        })
      } catch (error) {
        this.show({
          content: error,
          closable: true,
          color: 'danger',
          class: 'text-white',
        })
      }
    },

    getIngresos(params = { estatus: true }) {
      Api.getRegistroIngreso(params).then((response) => {
        this.ingresosList = response.data.data
        this.footerItem[0].label = `Total items: ${this.ingresosList.length}`
        this.footerItem[1].label = formatPrice(
          this.ingresosList.reduce(
            (acc, item) => acc + Number(item.totalValor),
            0,
          ),
        )
      })
    },

    cancelarRegistroIngreso(item) {
      this.$swal({
        title: 'Estás seguro de realizar esta acción? ',
        text: 'No podrás revertirlo',
        icon: 'Confirmación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          Api.deleteRegistroIngreso(item.id).then((response) => {
            setTimeout(this.getIngresos, 500)
            this.show({
              content: 'Registro cancelado correctamente',
              closable: true,
              time: 7_000,
            })
          })
        }
      })
    },

    closeContenedorModal(payload) {
      this.showModalDoc = payload
    },
  },

  mounted() {
    this.getIngresos()
  },
}
</script>
