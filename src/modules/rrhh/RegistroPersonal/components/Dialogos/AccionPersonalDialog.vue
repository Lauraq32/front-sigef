<template>
  <CModal backdrop="static" @close="closeModal" size="lg" :visible="showModal">
    <CModalHeader>
      <CModalTitle>Acción de Personal</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <div class="row">
          <div class="col-7">
            <div class="row mt-4 mx-3">
              <div class="col-4 col-label">Nombres:</div>
              <div class="col-8">
                <h6>{{ empleado.nombres }}</h6>
              </div>
            </div>
            <div class="row mt-4 mx-3">
              <div class="col-4 col-label">Apellido:</div>
              <div class="col-8">
                <h6>{{ empleado.apellidos }}</h6>
              </div>
            </div>
            <div class="row mt-4 mx-3">
              <div class="col-4 col-label">Programa:</div>
              <div class="col-8">
                <h6>{{ empleado.programaDivision.nombre }}</h6>
              </div>
            </div>
            <div class="row mt-4 mx-3">
              <div class="col-4 col-label">Departamento:</div>
              <div class="col-8">
                <h6>{{ empleado.departamento.nombre }}</h6>
              </div>
            </div>
            <div class="row mt-4 mx-3">
              <div class="col-4 col-label">Cargo:</div>
              <div class="col-8">
                <h6>{{ empleado.posicion.nombre }}</h6>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div style="margin-top: 9px; width: 264px; height: 300px">
              <div class="border" style="height: 200px">
                <img
                  style="max-width: 100%"
                  :src="imageUrl"
                  alt="imagen Empleado"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="d-flex flex-row-reverse">
            <button
              class="btn btn-info btn-block mt-1"
              @click="
                () => {
                  showAgregarAccionPersonalDialog = true
                  //   getTipoAcciones()
                  //   clearAccionPersonal()
                }
              "
            >
              Nuevo
            </button>
          </div>
        </div>
      </CCardBody>

      <CSmartTable
        style="margin-top: 10px"
        clickableRows
        :tableProps="{
          striped: true,
          hover: true,
        }"
        :tableHeadProps="{}"
        :activePage="1"
        header
        :items="accionPersonal"
        :columns="columns"
        columnFilter
        itemsPerPageSelect
        :itemsPerPage="5"
        columnSorter
        pagination
      >
        <template #fechaDesde="{ item }">
          <td>
            {{ formatDate(item.fechaDesde) }}
          </td>
        </template>

        <template #show_details="{ item }">
          <td class="py-2">
            <CButton
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="getAccionesPersonalById(item)"
            >
              Editar
            </CButton>
          </td>
        </template>
      </CSmartTable>
    </CModalBody>

    <CModalFooter>
      <CButton
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="closeModal"
        >Cerrar</CButton
      >
    </CModalFooter>
  </CModal>

  <AgregarAccionPersonalDialog
    :showModal="showAgregarAccionPersonalDialog"
    @closeModal="closeModalAgregarAccionPersonal"
  />
</template>

<script>
import { CModal } from '@coreui/vue'
import { CForm, CSmartTable } from '@coreui/vue-pro'
import { formatDate } from '@/utils/format'
import AgregarAccionPersonalDialog from '@/modules/rrhh/RegistroPersonal/components/Dialogos/AgregarAccionPersonalDialog.vue'
export default {
  name: 'AccionPersonalDialog',
  components: {
    CModal,
    CForm,
    CSmartTable,
    AgregarAccionPersonalDialog,
  },

  data: () => {
    return {
      formatDate,
      showAgregarAccionPersonalDialog: false,
      columns: [
        { key: 'fechaDesde', label: 'Fecha', _style: { width: '20%' } },
        {
          key: 'tipoAccionId',
          label: 'Tipo de acción',
          _style: { width: '20%' },
        },
        {
          key: 'detalle',
          label: 'Detalles',
          _style: { width: '40%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },

    closeModalAgregarAccionPersonal() {
      this.showAgregarAccionPersonalDialog = false
    },
  },

  props: {
    showModal: Boolean,
    empleado: Array,
    accionPersonal: Array,
  },
}
</script>
