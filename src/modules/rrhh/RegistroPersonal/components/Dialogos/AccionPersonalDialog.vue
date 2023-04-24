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
                  getTipoAcciones()
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
        :items="accionPersonalList"
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
    :empleadoId="empleadoId"
    :TipoAcciones="tipoAcciones"
    :showModal="showAgregarAccionPersonalDialog"
    @closeModal="submitAccionPersonal"
    :AccionPersonal="postAccionPersonal"
  />
</template>

<script>
import { CModal } from '@coreui/vue'
import { CForm, CSmartTable } from '@coreui/vue-pro'
import { formatDate } from '@/utils/format'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import AgregarAccionPersonalDialog from '@/modules/rrhh/RegistroPersonal/components/Dialogos/AgregarAccionPersonalDialog.vue'
import ApiFiles from '@/modules/rrhh/RegistroPersonal/services/Files'
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
      accionPersonalList: [],
      tipoAcciones: [],
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
    // closeAccionPersonalModal(data) {
    //   if (data) {
    //   }
    //   this.showAgregarAccionPersonalDialog = false
    // },

    getTipoAcciones() {
      this.showAgregarAccionPersonalDialog = true
      Api.getAllTipoAcciones().then((response) => {
        this.tipoAcciones = response.data.data
      })
    },

    getAccionesPersonalById(item) {
      this.getTipoAcciones()
      Api.getAccionesPersonalById(item.id).then((response) => {
        this.postAccionPersonal = response.data.data
        this.id = item.id
      })
      this.showAgregarAccionPersonalDialog = true
    },

    submitAccionPersonal(payload) {
      if (this.id) {
        Api.putAccionesPersonales(this.id, payload)
          .then(() => {
            this.clearAccionPersonal()
            setTimeout(this.getAccionPersonalById(this.empleado.id), 500)
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
            })
          })
          .catch(({ response }) => {
            this.show({
              content: response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      } else {
        this.postAccionesPersonal(payload)
      }
    },

    postAccionesPersonal(payload) {
      Api.postAccionesPersonal(payload)
        .then(() => {
          this.clearAccionPersonal()
          setTimeout(this.getAccionPersonalById(this.empleado.id), 500)
          this.show({
            content: 'Registro guardado correctamente',
            closable: true,
          })
        })
        .catch(({ response }) => {
          this.show({
            content: response.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },

    clearAccionPersonal() {
      this.validatedCustom01 = null
      this.id = null
      this.postAccionPersonal = {
        fechaDesde: null,
        tipoAccionId: null,
        empleadoId: null,
        cantidad: null,
        fechaHasta: null,
        detalle: null,
      }
    },

    getAccionPersonalById(empleadoId) {
      Api.getAccionPersonalByID(empleadoId).then((response) => {
        this.accionPersonalList = response.data.data
      })
    },
  },

  watch: {
    empleado() {
      this.empleadoId = this.empleado.id
      setTimeout(this.getAccionPersonalById(this.empleado.id), 10000)
      ApiFiles.getEmployeeIdentityImage({
        empleadoId: this.empleado.id,
        FileType: '.png',
        FileType2: 'png',
      }).then((url) => {
        this.imageUrl = url
      })
    },
  },

  props: {
    showModal: Boolean,
    empleado: Array,
    accionPersonal: Array,
  },
}
</script>
