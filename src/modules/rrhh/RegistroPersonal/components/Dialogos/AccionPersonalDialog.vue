<template>
  <CModal
    backdrop="static"
    @close="
      () => {
        closeModalAccionPersonalDialog()
      }
    "
    size="lg"
    :visible="showModal"
  >
    <CModalHeader>
      <CModalTitle>Acción de Personal</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <div class="row">
          <div class="col-7">
            <div class="row mt-4 mx-3">
              <div class="col-4 col-label">Nombre:</div>
              <div class="col-8">
                <h6>{{ empleado.nombre }}</h6>
              </div>
            </div>
            <div class="row mt-4 mx-3">
              <div class="col-4 col-label">Apellido:</div>
              <div class="col-8">
                <h6>{{ empleado.apellido }}</h6>
              </div>
            </div>
            <div class="row mt-4 mx-3">
              <div class="col-4 col-label">Programa:</div>
              <div class="col-8">
                <h6>{{ empleado.programaDivision?.nombre }}</h6>
              </div>
            </div>
            <div class="row mt-4 mx-3">
              <div class="col-4 col-label">Departamento:</div>
              <div class="col-8">
                <h6>{{ empleado.departamento?.nombre }}</h6>
              </div>
            </div>
            <div class="row mt-4 mx-3">
              <div class="col-4 col-label">Cargo:</div>
              <div class="col-8">
                <h6>{{ empleado.posicion?.nombre }}</h6>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="position-relative flex justify-content-center border border-dark w-75 mt-4" style="height: 150px">
              <img class="h-100" :src="imageUrl" alt="imagen de perfil del empleado" />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="d-flex flex-row-reverse">
            <button
              class="btn btn-info btn-block mt-1"
              @click="showModalAgregarAccionPersonal()"
            >
              Nuevo
            </button>
          </div>
        </div>
      </CCardBody>

      <CSmartTable
        class="sticky-tops"
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
        @click="closeModalAccionPersonalDialog"
      >
        Cerrar
      </CButton>
    </CModalFooter>
  </CModal>

  <AgregarAccionPersonalDialog
    :tipoAcciones="tipoAcciones"
    :showModalAgregarAccionPersonal="showAgregarAccionPersonalDialog"
    @sendData="sendModalAgregarAccionPersonal"
    @close="closeAgregarAccionPersonal"
    @clearModal="clearAccionPersonal"
    :accionPersonal="postAccionPersonal"
  />
</template>

<script>
import { CModal } from '@coreui/vue'
import { CForm, CSmartTable } from '@coreui/vue-pro'
import { formatDate } from '@/utils/format'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import AgregarAccionPersonalDialog from '@/modules/rrhh/RegistroPersonal/components/Dialogos/AgregarAccionPersonalDialog.vue'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

export default {
  name: 'AccionPersonalDialog',
  components: {
    CModal,
    CForm,
    CSmartTable,
    AgregarAccionPersonalDialog,
  },
  emits: ['closeModal'],
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
      imageUrl: '',
      postAccionPersonal: {
        fechaDesde: null,
        tipoAccionId: null,
        empleadoId: 0,
        cantidad: 0,
        fechaHasta: null,
        detalle: null,
      }
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModalAccionPersonalDialog() {
      this.$emit('closeModal', false)
    },

    closeAgregarAccionPersonal() {
      this.showAgregarAccionPersonalDialog = false
    },

    sendModalAgregarAccionPersonal(data) {
      if (data) {
        this.submitAccionPersonal({ ...data, empleadoId: this.empleado.id })
          .then(() => {
            this.loadData()
            this.showAgregarAccionPersonalDialog = false
          })
          .catch(({ response }) => {
            this.show({
              content: response.data,
              closable: true,
              color: 'danger',
            })
          })

        this.showAgregarAccionPersonalDialog = false
      }
    },

    getAccionesPersonalById(item) {
      this.postAccionPersonal = item
      this.showAgregarAccionPersonalDialog = true
    },

    submitAccionPersonal(payload) {
      if (payload.id) {
        return Api.putAccionesPersonales(payload.id, payload).then(
          (response) => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
            })
            return response
          },
        )
      }

      return Api.postAccionesPersonal(payload).then((response) => {
        this.show({
          content: 'Registro guardado correctamente',
          closable: true,
        })
        return response
      })
    },

    showModalAgregarAccionPersonal() {
      this.showAgregarAccionPersonalDialog = true
      this.clearAccionPersonal()
    },

    clearAccionPersonal() {
      this.id = null
      this.postAccionPersonal = {
        fechaDesde: null,
        tipoAccionId: null,
        empleadoId: this.empleado.id,
        cantidad: 0,
        fechaHasta: null,
        detalle: null,
      }
    },

    getAccionPersonalById(empleadoId) {
      Api.getAccionPersonalByID(empleadoId).then((response) => {
        this.accionPersonalList = response.data.data
      })
    },
    loadData() {
      this.clearAccionPersonal();
      if (this.empleado.id) {
        setTimeout(() => this.getAccionPersonalById(this.empleado.id), 500)
      }
    },
  },

  watch: {
    empleado() {
      if (this.showModal) {
        console.log(this.empleado)
        Api.getAllTipoAcciones().then((response) => {
          this.tipoAcciones = response.data.data
        })

        this.loadData()
        this.imageUrl = `${process.env.VUE_APP_API_URL}/api/files/public/${
          this.empleado.idImagenPerfil ?? -1
        }`;
      }
    },
  },

  props: {
    showModal: Boolean,
    empleado: Object,
    accionPersonal: Array,
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
