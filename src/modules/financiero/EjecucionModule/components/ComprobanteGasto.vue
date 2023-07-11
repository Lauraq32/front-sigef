<template>
  <AppActionHeader :actions="pageActions">
    <CButton color="primary" @click="showComprobanteDialog">Agregar</CButton>
    <CButton color="secondary" @click="goToComprobanteIngreso">Ir a Comprobante ingreso</CButton>
  </AppActionHeader>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" header :items="tableData" :columns="tableColumns" columnFilter
    :footer="footer" itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'nombres', state: 'asc' }"
    pagination>
    <template #show_details="{ item, index }">
      <td>
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem v-for="action in actions" @click="action.clickHandler && action.clickHandler(item)">{{
              action.label }}</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </td>
    </template>

    <template #fecha="{ item }">
      <td>
        {{ formatDate(item.fecha) }}
      </td>
    </template>
    <template #conceptoGasto="{ item, index }">
      <td>
        {{ item.conceptoGasto.descripcion }}
      </td>
    </template>
    <template #beneficiario="{ item, index }">
      <td>
        {{ item.beneficiario.descripcion }}
      </td>
    </template>
    <template #estatus="{ item }">
      <td>

        <CBadge :color="item.estatus ? 'success' : 'danger'">{{

          item.estatus ? 'ACTIVO' : 'CANCELADO'

        }}</CBadge>

      </td>

    </template>

  </CSmartTable>


  <CompranteGastoCapturaDialog :showModal="ComprobanteoDialog" @post-gasto="submitForm"
    @close-modal="closeComprobanteDialog" />
  <FormularioCodificacionGastoDialog :showModal="FormularioCodificacionGastoDialog" />
</template>
<script>

import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import CompranteGastoCapturaDialog from '../components/dialogs/CompranteGastoCapturaDialog.vue'
import FormularioCodificacionGastoDialog from '../components/dialogs/FormularioCodificacionGastoDialog.vue'
import AppActionHeader from '@/components/AppActionHeader.vue'
import ComprobanteGastoTable from '../components/tables/ComprobanteGastoTable.vue'
import { CSmartTable } from '@coreui/vue-pro'
import Api from '../services/EjecucionServices'
import { formatDate } from '@/utils/format'
import router from '@/router'
import Swal from 'sweetalert2';
import BancoIdServices from '@/modules/financiero/ConciliacionBancaria/services/ConciliacionServices'
export default {
  components: {
    CompranteGastoCapturaDialog,
    FormularioCodificacionGastoDialog,
    AppActionHeader,
    ComprobanteGastoTable,
    CSmartTable
  },
  data: function () {
    return {
      comprobante: {
      },
      formatDate,
      gasto: {},
      tableData: [],

      tableColumns: [
        { key: 'numeroComprobante', label: 'Numero Comprobante' },
        { key: 'formaPago', label: 'Forma de pago' },
        { key: 'fecha', label: 'Fecha' },
        { key: 'etapa', label: 'Etapa' },
        { key: 'conceptoGasto', label: 'Concepto Gasto' },
        { key: 'beneficiario', label: 'Beneficiario' },
        { key: 'totalBruto', label: 'Total' },
        { key: 'montoNeto', label: 'Monto Neto' },
        { key: 'estatus', label: 'Estatus' },
        { key: 'bancoId', label: 'Banco' },
        {
          key: 'show_details',
          label: '',
          filter: false,
          sorter: false,
        },],
      actions: [
        {
          label: 'Cancelar',
          clickHandler: (item) => {
            Swal.fire({
              denyButtonText: 'No',
              allowEscapeKey: false,
              allowOutsideClick: false,
              title: 'Estás seguro que deseas cancelar este registro?',
              text: 'No podrás revertirlo',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, Eliminar!',
            }).then((result) => {
              if (result.isConfirmed) {
                Api.deleteRegistroGasto(item.id).then((response) => {
                  this.show({
                    content: 'Registro Cancelado con exito',
                    closable: true,
                  })
                  this.getRegistroGasto()
                }).catch((error) => {
                  this.show({
                    content: error.message,
                    closable: true,
                    color:'danger'
                  })
                })
              }
            });
          }
        },
        {
          label: 'Duplicar Pagado',
          clickHandler: (item) => {
            Api.putRegistroGastoPagado(item.id).then(() => {
              this.show({
                content: 'Registro Duplicado con exito',
                closable: true,
              })
              this.getRegistroGasto()
            }).catch(error => {
              this.show({
                    content: error.message,
                    closable: true,
                    color:'danger'
                  })
            })
          }
        },
        {
          label: 'Duplicar Devengado',
          clickHandler: (item) => {
            Api.putRegistroGastoDevengado(item.id).then(() => {
              this.show({
                content: 'Registro Duplicado con exito',
                closable: true,
              })
              this.getRegistroGasto()
            }).catch(error => {

            })
          }
        },
        {
          label: 'Imprimir',
          clickHandler: (item) => {

          }
        },

      ]

      ,
      ComprobanteoDialog: false,
      FormularioCodificacionGastoDialog: false,
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),

    closeComprobanteDialog() {
      this.ComprobanteoDialog = false
    },
    // editarGasto(item) {
    //   this.ComprobanteoDialog = true;
    //   this.postRegistroGasto = item
    // },
    submitForm(payload) {
      if (payload.id != null) {
        Api.putRegistroGasto(payload.id, payload)
          .then(() => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
            })
            this.closeComprobanteDialog()
            setTimeout(this.getRegistroGasto, 500)
          })
          .catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      } else {
        Api.postRegistroGasto(payload)
          .then((response) => {
            console.log(response)
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
            setTimeout(this.getRegistroGasto, 500)
            this.closeComprobanteDialog()
          })
          .catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      }
    },

    showComprobanteDialog() {
      this.ComprobanteoDialog = true
    },
    showFormularioCodificacionGastoDialog() {
      this.FormularioCodificacionGastoDialog = true
    },

    getRegistroGasto() {
      Api.getRegistroGasto().then((response) => {
        this.tableData = response.data.data
      })
    },
    goToComprobanteIngreso() {
      router.push({ name: 'comprobanteIngreso' })
    }
  },
  computed: {
    pageActions() {
      const actions = [
        {
          label: 'Imprimir Reporte',
          // accionHandler: this.funcionVacia(),
          icon: 'cilPrint'
        },
      ];

      if (!this.isFiscalYearApprovedOrClose) {
        actions.push({
          label: 'Importar Ingresos',
          // accionHandler: this.funcionVacia(),
          type: 'upload'
        });
      }

      return actions;
    }
  },
  mounted() {
    this.getRegistroGasto()
  }
}
</script>
  
<style>
.top {
  margin-top: 27px;
}

.left {
  margin-left: 910px;
  margin-top: 15px;
}
</style>
  

<!-- data: -->