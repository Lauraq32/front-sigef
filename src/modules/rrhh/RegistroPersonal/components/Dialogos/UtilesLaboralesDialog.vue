<template>
  <CModal
    backdrop="static"
    :visible="showModal"
    size="lg"
    @close="() => { closeModal() }"
  >
    <CModalHeader>
      <CModalTitle>Útiles Laborales</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="table-headers">
        <div class="d-inline p-2">
          <CButton
            color="info"
            @click="() => { showEventoInventarioDialog = true } "
          >
            Nueva Asignaci&oacute;n
          </CButton>
        </div>
      </div>

      <CSmartTable
        class="sticky-tops"
        clickableRows
        :tableProps="{
          striped: true,
          hover: true,
        }"
        :tableHeadProps="{}"
        :activePage="1"
        header
        :items="utilesLaboralesDelEmpleado"
        :columns="columns"
        columnFilter
        :itemsPerPage="5"
        columnSorter
        :sorterValue="{ column: 'fecha', state: 'asc' }"
        pagination
        no-items-label="No hay útiles laborales registrados"
      >
        <template #fecha="{ item }">
          <td>
            {{ formatDate(item.fecha) }}
          </td>
        </template>

        <template #autorizadoPor="{ item }">
          <td class="text-center">
            {{ item.autorizadoPor }}
          </td>
        </template>

        <template #estatus="{ item }">
          <td>
            <CBadge class="text-uppercase" :color="determineColor(item.estatus)">{{ item.estatus }}</CBadge>
          </td>
        </template>

        <template #controllers="{ item }">
          <td>
            <CDropdown>
              <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem @click="() => handlerAccion(item, 'print')" v-if="item.estatus !== 'Cancelado'">Imprimir</CDropdownItem>
                <CDropdownItem @click="() => handlerAccion(item, 'editar')" v-if="item.estatus == 'Registrado'">Editar</CDropdownItem>
                <CDropdownItem @click="() => handlerAccion(item, 'detail')">Ver Detalle</CDropdownItem>
                <CDropdownItem @click="() => handlerAccion(item, 'cancel')" v-if="!['Cancelado', 'Entregado'].includes(item.estatus)">Cancelar</CDropdownItem>
                <CDropdownItem @click="() => handlerAccion(item, 'approved')" v-if="!['Cancelado', 'Entregado'].includes(item.estatus)">Marcar como entregado</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </td>
        </template>
      </CSmartTable>
    </CModalBody>
    
    <EventoInventarioDialog
      :inventarioList="utilLaboralList"
      :utilLaboral="inventarioDeUtilLaboral"
      :util="util"
      :showModal="showEventoInventarioDialog"
      :empleado="employeeInfo"
      @closeModal="closeEventoInventarioDialog"
      @save="saveUtil"
      @editar="editarUtil"
    />

    <MovimientoInventarioDetailView
      :utilList="utilDetailsView"
      :showMovimientoDetailModal="utilDetailsView.length > 0"
      @close-modal="() => utilDetailsView.length = 0"
    />
  </CModal>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { formatDate, formatNumber } from '@/utils/format'
import { onlyLetter } from '@/utils/validator'
import Api from '../../services/RegistroPersonalServices'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import EventoInventarioDialog from './EventosInventarioDialog.vue'
import MovimientoInventarioDetailView from './MovimientoInventarioDetailView.vue'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import { showReport } from '@/utils/util'

export default {
  name: 'UtilesLaborales',
  components: {
    CSmartTable,
    CModal,
    EventoInventarioDialog,
    MovimientoInventarioDetailView
  },
  data: () => {
    return {
      utilesLaboralesDelEmpleado: [],
      formatDate,
      formatNumber,
      onlyLetter,
      util:{},
      utilLaboralList: [],
      showEventoInventarioDialog: false,
      inventarioDeUtilLaboral: {
        fecha: new Date(),
        observacion: null,
        autorizadoPor: null,
        empleadoId: 0,
        utiles: [],
      },
      utilDetailsView: [],
      columns: [
        { key: 'id', label: 'Código', _style: { width: '15%' } },
        { key: 'observacion', label: 'Observación', _style: { width: '35%' } },
        { key: 'autorizadoPor', label: 'Autorizado Por', _style: { width: '30%' } },
        { key: 'estatus', label: 'Estado', _style: { width: '10%' } },
        {
          key: 'controllers',
          label: '',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        },
      ],
    }
  },
  emits: ['closeModal'],
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal() {
      this.$emit('closeModal', false)
    },
    closeEventoInventarioDialog() {
      this.showEventoInventarioDialog = false;
    },
    saveUtil(util) {
      Api.postUtilLaboral(util)
          .then((response) => {
            this.show({
              content: response.data.message,
              closable: true,
              color: 'success',
              class: 'text-white',
              time: 7_000
            })
            setTimeout(this.loadUtilsByEmployeeId, 200);
            this.clearUtilesLaborales();
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
    editarUtil(util,id){
      Api.putUtils(util,id).then(
        (response) => {
          this.show({
              content: response.data.message,
              closable: true,
              color: 'success',
              class: 'text-white',
              time: 7_000
            })
            setTimeout(this.loadUtilsByEmployeeId, 200);
            this.clearUtilesLaborales();
        }
      ).catch((error) => {
        this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
      })
      this.closeEventoInventarioDialog();
    },
    getAllInventario() {
      Api.getAllInventario().then((response) => {
        this.utilLaboralList = response.data.data.map((elem) => ({
          code: elem.id,
          label: `(${elem.id})  ${elem.descripcion}  `,
          cantidad: elem.cantidad,
          item: elem
        }))
      })
    },

    async handlerAccion(item, accion) {
      switch (accion) {
        case "cancel":
          this.cancelUtilDelivery(item);
          break;
        case "editar":
          this.loadModal(item);
          break;
        case "approved":
          this.approveUtilDelivery(item);
          break;
        case "detail":
          this.loadUtilDetailByUtil(item);
          break;
      
        default:
          this.loadReport(item);
          break;
      }
    },

    async loadReport(item) {
      try {
        await showReport({
          folderName: 'rrhh',
          reportName: 'utiles_empleado',
          params: [{
            name: "UtilLaboral",
            value: item.id
          }]
        });
      } catch (error) {
        this.show({
          content: error,
          closable: true,
          color: 'danger',
          class: 'text-white',
        })
      }
    },
    
    cancelUtilDelivery(item) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Estás usted seguro que deseas cancelar la entrega de este útil laboral?`,
        showConfirmButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'btns',
      }).then((answer) => {
        if (answer.isConfirmed) {
          Api.cancelUtilLaboral(item.id)
          .then(() => {
            this.show({
              content: "Registro cancelado",
              closable: true,
              color: 'success',
              class: 'text-white',
            })
            setTimeout(this.loadUtilsByEmployeeId, 200);
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
      })
    },

    approveUtilDelivery(item) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Estás usted seguro que deseas marcar como entregado este útil laboral?`,
        showConfirmButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'btns',
      }).then((answer) => {
        if (answer.isConfirmed) {
          Api.deliverUtilLaboral(item.id)
          .then(() => {
            this.show({
              content: "Registro marcado como entregado",
              closable: true,
              color: 'success',
              class: 'text-white',
            })
            setTimeout(this.loadUtilsByEmployeeId, 200);
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
      })
    },

    determineColor(badgeText) {
        if (/Cancelado/i.test(badgeText)) {
            return 'danger';
        }
        if (/Entregado/i.test(badgeText)) {
            return 'success';
        }

        return 'secondary';
    },

    clearUtilesLaborales() {
      this.inventarioDeUtilLaboral = {
        fecha: new Date(),
        observacion: null,
        autorizadoPor: null,
        cantidad: 1,
        utiles: [],
      }
    },
    loadUtilsByEmployeeId() {
      Api.getUtilesLaborales(this.employeeInfo.id)
        .then(({ data: { data } }) => {
          this.utilesLaboralesDelEmpleado = data;
        });

      this.getAllInventario()
    },
    loadUtilDetailByUtil(util) {
      Api.getUtilLaboralEventos(util.id)
        .then(({ data: { data } }) => {
          this.utilDetailsView = data;
        });
    },
    loadModal(util) {
          this.util = util
          this.showEventoInventarioDialog = true
    }
  },


  watch: {
    showModal(value) {
      if (!value) {
        this.clearUtilesLaborales();
      } else if (this.employeeInfo?.id) {
       this.loadUtilsByEmployeeId();
      }
    },
  },

  props: {
    showModal: Boolean,
    employeeInfo: {
      type: Object,
      default: {},
      required: true,
    },
  },
}
</script>

<style>
.sticky-tops thead {
  position: sticky;
  top: 0px;
  background-color: white;
}
</style>