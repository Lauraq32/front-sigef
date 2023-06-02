<template>
  <h3 class="text-center">Comprobantes de ingresos</h3>
  <AppActionHeader>
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
    <template #totalValor="{ item }">
      <td class="text-end">
        {{ formatPrice(item.totalValor) }}
      </td>
    </template>

    <template #contribuyente="{ item }">
      <td>
        {{ ite }}
      </td>
    </template>

    <template #show_details="{ item }">
      <td v-if="item.estatus">
        <CDropdown>
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
  />

  <ContenedorArchivosRRHH
    :showModal="showModalDoc"
    :empleado="selectedEmployee"
    @closeModal="closeContenedorModal"
  />
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
import ContenedorArchivosRRHH from '@/modules/rrhh/RegistroPersonal/components/ContenedorArchivosRRHH.vue'

export default {
  components: {
    CSmartTable,
    CModal,
    SimpleTypeahead,
    AppActionHeader,
    ModalAddComprobanteIngreso,
    ContenedorArchivosRRHH,
  },

  data: function () {
    return {
      formatDate,
      formatPrice,
      showAddComprobanteIngreso: false,
      showModalDoc: false,
      itemsCount: null,
      mesReporte: 1,
      parametroReporte: '',
      reportes: false,
      reportesExportarModal: false,
      reportesExportarModalEjecucion: false,
      ingresosList: [],
      contribuyentesList: [],
      contribuyentesName: [],
      totales: null,
      id: null,
      validatedCustom01: null,

      columns: [
        {
          key: 'numeroComprobante',
          label: '#Comp',
          _style: { width: '7%' },
        },

        { key: 'fecha', label: 'Fecha', _style: { width: '10%' } },
        { key: 'etapa', label: 'Etapa', _style: { width: '10%' } },
        {
          key: 'codigoIngresoTalonario',
          label: 'Recibo',
          _style: { width: '10%' },
        },
        {
          key: 'contribuyenteId',
          label: 'Contribuyente',
          _style: { width: '18%' },
        },
        { key: 'detalle', label: 'Detalle', _style: { width: '35%' } },
        { key: 'totalValor', label: 'Valor', _style: { width: '10%' } },
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
            colspan: 7,
            style: 'font-weight:bold;',
          },
        },
      ],

      buttonActions: [
        {
          label: 'Eliminar',
          clickHandler: (value) => {
            this.cancelarRegistroIngreso(value)
          },
        },

        {
          label: 'Asociar documentos',
          clickHandler: (value) => {
            this.showModalDoc = value
          },
        },

        {
          label: 'Imprimir 8 1/2 x 11',
          clickHandler: (value) => {},
        },

        {
          label: 'Imprimir 8 1/2 x 5.5',
          clickHandler: (value) => {},
        },
      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    closeModalComprobanteIngreso() {
      this.showAddComprobanteIngreso = false
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

    getIngresos() {
      Api.getRegistroIngreso().then((response) => {
        this.ingresosList = response.data.data
        this.itemsCount = this.ingresosList.length
        this.footerItem[0].label = `Total items: ${this.itemsCount}`
      })
    },

    cancelarRegistroIngreso(item) {
      this.$swal({
        title: 'Estás seguro que quieres eliminar este registro?',
        text: 'No podrás revertirlo',
        icon: 'Confirmación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          Api.deleteRegistroIngreso(item.id).then((response) => {
            setTimeout(this.getIngresos, 500)
            this.show({
              content: response.data,
              closable: true,
              color: 'danger',
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
