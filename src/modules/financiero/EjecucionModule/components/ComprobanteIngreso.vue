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
  </CSmartTable>

  <ModalAddComprobanteIngreso
    @close-modal="closeModalComprobanteIngreso"
    @addComprobanteIngreso="addComprobanteIngreso"
    :showModal="showAddComprobanteIngreso"
    :contribuyentesName="contribuyentesName"
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

export default {
  components: {
    CSmartTable,
    CModal,
    SimpleTypeahead,
    AppActionHeader,
    ModalAddComprobanteIngreso,
  },

  data: function () {
    return {
      formatDate,
      formatPrice,
      showAddComprobanteIngreso: false,
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
      lgDemo: false,
      lgDemo1: false,
      detalle: '',
      detalleRegistroIngresos: [],

      detalleRegistroPost: {
        ayuntamientoId: this.$ayuntamientoId,
        anioFiscalId: this.$fiscalYearId,
        transaccionId: 0,
        ctgClasificadorId: '',
        ctgFuenteId: '',
        ctgFuenteEspecificaId: '',
        ctgOrganismoFinanciadorId: '',
        fecha: new Date(Date.now()),
        etapa: '',
        institucionOrtongate: '',
        valor: 0,
        estatus: 'A',
      },

      columns: [
        {
          key: 'numeroComprobante',
          label: '#Comp',
          _style: { width: '7%' },
        },

        { key: 'fecha', label: 'Fecha', _style: { width: '10%' } },
        { key: 'etapa', label: 'Etapa', _style: { width: '10%' } },
        { key: 'compIngresosId', label: 'Recibo', _style: { width: '10%' } },
        {
          key: 'contribuyenteId',
          label: 'Contribuyente',
          _style: { width: '18%' },
        },
        { key: 'detalle', label: 'Detalle', _style: { width: '35%' } },
        { key: 'totalValor', label: 'Valor', _style: { width: '10%' } },
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

    addComprobanteIngreso(payload) {
      if (payload.id) {
        Api.putIngresoCabecera(payload.id, payload)
          .then(() => {
            this.clearModaComprobanteIngreso()
            setTimeout(this.getIngresos, 500)
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          })
          .catch(() => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      } else {
        Api.postIngresos(payload)
          .then(({ response: { ...response } }) => {
            this.clearModaComprobanteIngreso()
            setTimeout(this.getIngresos, 500)
            this.show({
              content: response.data,
              closable: true,
            })
          })
          .catch(({ response: { ...response } }) => {
            this.show({
              content: response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      }
    },

    getIngresos() {
      Api.getRegistroIngreso().then((response) => {
        this.ingresosList = response.data.data
        this.itemsCount = this.ingresosList.length
        this.footerItem[0].label = `Total items: ${this.itemsCount}`
      })
    },

    clearModaComprobanteIngreso() {
      this.sendDetalle = false
      this.isFormEventTypeValidated = false
      this.isFormEventTypeValidatedDetalle = false
      this.ingresoPost = {
        codigoIngresoTalonario: null,
        etapa: null,
        contribuyenteId: 0,
        contribuyente: {
          nombre: null,
          tipoDocumento: null,
          documento: null,
          telefono: null,
          direccion: null,
        },
        detalle: null,
        fecha: null,
        detalleRegistroIngresos: [],
      }
    },
  },

  mounted() {
    this.getIngresos()
  },
}
</script>
