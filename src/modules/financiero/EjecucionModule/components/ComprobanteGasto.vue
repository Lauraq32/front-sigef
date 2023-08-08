<template>
  <h3 class="text-center mb-3">Comprobante de Gasto</h3>
  <AppActionHeader :actions="pageActions">
    <template #left-options>
      <div class="d-inline-flex gap-3 align-items-center">
        <label class="form-label col-auto col-form-label">Estado</label>
        <CFormSelect class="d-block" style="width: 9rem;" id="userStatusSelect" @change="handleFilterGastoByStatus"
          aria-label="Selecionar estatus del usuario" :options="filtroOption" />
      </div>
    </template>
    <CButton v-if="!paramsFiltro" @click="() => {
        showFiltro = true
      }
      ">
      <span>
        <CIcon icon="cilFilter" size="lg" /> Filtrar
      </span>
    </CButton>
    <CButton v-else @click="() => ((paramsFiltro = null), getRegistroGasto())">
      <span>
        <CIcon icon="cilFilterX" style="color: red" size="lg" /> Resultados
        filtrados
      </span>
    </CButton>
    <CButton color="primary" @click="showComprobanteDialog">Agregar</CButton>
    <CButton color="secondary" @click="goToComprobanteIngreso">Ir a Comprobante ingreso</CButton>

  </AppActionHeader>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" header :items="tableData" :columns="tableColumns" columnFilter
    :footer="footer" itemsPerPageSelect :itemsPerPage="5" columnSorter
    :sorterValue="{ column: 'numeroComprobante', state: 'desc' }" pagination>
    <template #show_details="{ item, index }">
      <td>
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline" @click="itemActions(item)">Acciones</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem v-for="action in actions" @click="action.clickHandler && action.clickHandler(item)">
              {{ action.label }}</CDropdownItem>
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
    <template #banco="{ item, index }">
      <td>
        {{ item.banco.descripcion }}
      </td>
    </template>
    <template #beneficiario="{ item, index }">
      <td>
        {{ item.beneficiario.descripcion }}
      </td>
    </template>

    <template #estado="{ item }">
      <td>

        <CBadge :color="item.estado === 'Abierto' || item.estado === 'Confirmado' ? 'success' : 'info'">{{

          item.estado

        }}</CBadge>

      </td>

    </template>

    <template class="text-end" #montoBruto="{ item }">
      <td>
        {{ formatPrice(item.montoBruto) }}
      </td>
    </template>

    <template class="text-end" #montoNeto="{ item }">
      <td>
        {{ formatPrice(item.montoNeto) }}
      </td>
    </template>


  </CSmartTable>

  <FiltroRegistroGasto :showFiltro="showFiltro" @close="closeFiltro" />
  <CompranteGastoCapturaDialog :showModal="ComprobanteoDialog" @post-gasto="submitForm"
    @close-modal="closeComprobanteDialog" :postGasto="postGasto" />
  <FormularioCodificacionGastoDialog :showModal="FormularioCodificacionGastoDialog" />
  <ContenedorArchivosModel @closeModal="closeContenedorModal" :showModal="showFileModal" :tagKeyName="tagKeyName" :tagValueName="tagValueName" />
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
import { showReport } from '@/utils/util'
import ContenedorArchivosModel from '@/components/ContenedorArchivosModel.vue'
import FiltroRegistroGasto from '../components/dialogs/filtroRegistroGasto.vue'
import { formatPrice } from '@/utils/format'
export default {
  components: {
    FiltroRegistroGasto,
    CompranteGastoCapturaDialog,
    FormularioCodificacionGastoDialog,
    AppActionHeader,
    ComprobanteGastoTable,
    CSmartTable,
    ContenedorArchivosModel
  },
  data: function () {
    return {
      formatPrice,
      comprobante: {
      },
      paramsFiltro:null,
      showFiltro:false,
      tagKeyName: 'ComprobanteGastoId',
      tagValueName: null,
      showFileModal: false,
      formatDate,
      gasto: {},
      tableData: [],
      filterValue: 'true',
      postGasto: {},
      filtroOption: [
        { label: 'Todos', value: '' },
        { label: 'Abierto', value: 'Abierto' },
        { label: 'Confirmado', value: 'Confirmado' },
        { label: 'Cerrado', value: 'Cerrado' },
        { label: 'Cancelado', value: 'Cancelado' },
      ],

      tableColumns: [
        { key: 'estado', label: '', filter: false, sorter: false, },
        { key: 'numeroComprobante', label: 'Número Comprobante' },
        { key: 'fecha', label: 'Fecha' },
        { key: 'etapa', label: 'Etapa' },
        { key: 'formaPago', label: 'Forma de Pago' },
        { key: 'beneficiario', label: 'Beneficiario' },
        { key: 'conceptoGasto', label: 'Concepto Gasto' },
        { key: 'montoBruto', label: 'Monto Bruto' },
        { key: 'montoNeto', label: 'Monto Neto' },
        { key: 'banco', label: 'Banco' },
        {
          key: 'show_details',
          label: '',
          filter: false,
          sorter: false,
        },],
      actions: [

      ]

      ,
      ComprobanteoDialog: false,
      FormularioCodificacionGastoDialog: false,
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),

    closeContenedorModal() {
      this.showFileModal = false;
    },
    closeFiltro(params) {
      if (params) {
        this.getRegistroGasto(params)
        this.paramsFiltro = params
      }
      this.showFiltro = false
    },

    handleFilterGastoByStatus({ target }) {
      this.getRegistroGasto({
        estado: target.value,
      })
      this.filterValue = target.value
    },

    async printReportComprobanteGasto(item) {

      try {

        await showReport({
          folderName: 'fep',
          reportName: 'Rep_Comprobante_Gasto_F815',
          params: [
            {
              name: 'id',
              value: item.id,
            },
            {
              name: 'id_ayuntamiento',
              value: 'majorityId',
            },
            {
              name: 'anio',
              value: 'fiscalYear',
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
    async printReportComprobanteGastoPorGrupoBeneficiario(item) {

      try {

        await showReport({
          folderName: 'fep',
          reportName: 'Rep_Gasto_Por_Beneficiario',
          params: [
            {
              name: 'id',
              value: item.id,
            },
            {
              name: 'id_ayuntamiento',
              value: 'majorityId',
            },
            {
              name: 'anio',
              value: 'fiscalYear',
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

    getGastoById(id) {
      Api.getRegistroGastoById(id).then((response) => {
        this.postGasto = { ...response.data.data }
        this.ComprobanteoDialog = true;
      })
    },

    itemActions(estadoItem) {
      const actions = [
        {
          label: 'Duplicar',
          clickHandler: async (item) => await this.getGastoById(item.id)
        },
        {
          label: 'Imprimir',
          clickHandler: (item) => {
            this.printReportComprobanteGasto(item)
          }
        },
        {
          label: 'Adjuntar Archivo',
          clickHandler: (item) => {
            this.adjuntarArchivo(item)
          }
        },
      ]

      if (estadoItem.cantidadPagoXGrupo > 1 && estadoItem.totalPagoXGrupo > 1) {
        actions.push(
          {
            label: 'Reporte Pago Beneficiarios x grupo',
            clickHandler: (item) => {
              this.printReportComprobanteGastoPorGrupoBeneficiario(item)
            }
          },
        )
      }

      if (estadoItem.estado == 'Confirmado') {
        actions.push(
          {
            label: 'Generar Cheque',
            clickHandler: (item) => {
              this.registroGastoGenerarCheque(item.id)
            }
          },
          {
            label: 'Cerrar',
            clickHandler: (item) => {
              this.registroGastoGenerarCerrar(item.id)
            }
          },

        );

      }

      if (estadoItem.estado == 'Abierto') {
        actions.push({
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
                    content: error.response.data.message,
                    closable: true,
                    color: 'danger'
                  })
                })
              }
            });
          }
        },

          {
            label: 'Confirmar',

            clickHandler: (item) => {
              Swal.fire({
                denyButtonText: 'No',
                allowEscapeKey: false,
                allowOutsideClick: false,
                title: 'Estás seguro que deseas confirmar este registro?',
                text: 'No podrás revertirlo',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Confirmar!',
              }).then((result) => {
                if (result.isConfirmed) {
                  Api.registroGastoConfirmation(item.id).then((response) => {
                    this.show({
                      content: 'Registro confirmado con exito',
                      closable: true,
                    })
                    this.getRegistroGasto()
                  }).catch((error) => {
                    this.show({
                      content: error.response.data.message,
                      closable: true,
                    })
                  })
                }
              });
            }

          },

        );
      }

      if (estadoItem.estado == 'Confirmado') {
        actions.push(
          {
            label: 'Generar Cheque',
            clickHandler: (item) => {
              this.registroGastoGenerarCheque(item.id)
            }
          },
          {
            label: 'Cerrar',
            clickHandler: (item) => {
              this.registroGastoGenerarCerrar(item.id)
            }
          },

        );

      }

      if (estadoItem.estado == 'Cancelado') {
        actions.push(


        );
      }

      if (estadoItem.estado == 'Cerrado') {
        actions.push(


        );
      }

      this.actions = actions;
    },

    adjuntarArchivo(item) {
      this.showFileModal = true
      this.tagValueName = item.id
    },

    registroGastoGenerarCheque(id) {
      Swal.fire({
        denyButtonText: 'No',
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: 'Estás seguro que deseas generar el chque este registro?',
        text: 'No podrás revertirlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Confirmar!',
      }).then((result) => {
        if (result.isConfirmed) {
          Api.registroGastoPayCheck(id).then((response) => {
            this.show({
              content: 'Cheque generado con exito',
              closable: true,
            })
            this.getRegistroGasto()
          }).catch((error) => {
            this.show({
              content: error.response.data.message,
              closable: true,
            })
          })
        }
      });
    },
    registroGastoGenerarCerrar(id) {
      Swal.fire({
        denyButtonText: 'No',
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: 'Estás seguro que deseas cerrar este registro?',
        text: 'No podrás revertirlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Confirmar!',
      }).then((result) => {
        if (result.isConfirmed) {
          Api.registroGastoClosing(id).then((response) => {
            this.show({
              content: 'Registro cerrado con exito',
              closable: true,
            })
            this.getRegistroGasto()
          }).catch((error) => {
            this.show({
              content: error.response.data.message,
              closable: true,
              color: 'danger'
            })
          })
        }
      });
    },


    closeComprobanteDialog() {
      this.ComprobanteoDialog = false
    },

    submitForm(payload) {
      Api.postRegistroGasto(payload)
        .then((response) => {
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
    },

    showComprobanteDialog() {
      this.ComprobanteoDialog = true
    },
    showFormularioCodificacionGastoDialog() {
      this.FormularioCodificacionGastoDialog = true
    },

    getRegistroGasto(params = { estado: '' }) {
      Api.getRegistroGasto(params).then((response) => {
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