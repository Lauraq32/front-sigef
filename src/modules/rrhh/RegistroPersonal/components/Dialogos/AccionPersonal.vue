<template>
  <CModal backdrop="static" @close="CloseModal" size="lg" :visible="showModal">
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
              <div class="border" style="height: 200px"></div>
              <h4>Guardar Imagen</h4>
              <h4>Abrir Carpeta</h4>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="d-flex flex-row-reverse">
            <button
              class="btn btn-info btn-block mt-1"
              @click="
                () => {
                  showAgregarAcciones = true
                  clearModal()
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
        class="sticky-top"
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
        :sorterValue="{ column: 'status', state: 'asc' }"
        pagination
      >
        <template #status="{ item }">
          <td>
            <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
          </td>
        </template>

        <template #fechaDesde="{ item }">
          <td>
            {{ formatDate(item.fechaDesde) }}
          </td>
        </template>

        <template #show_details="{ item, index }">
          <td class="py-2">
            <CButton
              color="primary"
              variant="outline"
              square
              size="sm"
              v-on:click="setTimeout(this.getAccionesPersonalById(item), 10000)"
            >
              {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
            </CButton>
          </td>
        </template>
      </CSmartTable>
    </CModalBody>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>

      <button class="btn btn-info btn-block mt-1">Guardar</button>
    </div>
  </CModal>

  <CModal
    backdrop="static"
    @close="
      () => {
        showAgregarAcciones = false
      }
    "
    size="s"
    :visible="showAgregarAcciones"
  >
    <CModalHeader>
      <CModalTitle>Acción de Personal</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <div class="row">
          <div class="col-3">
            <CFormLabel for="validationCustom01">Fechas</CFormLabel>
          </div>
          <div class="col-9 col-md-6">
            <CFormInput v-model="fechaDesde" type="date" />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3">
            <CFormLabel>Tipo de Acciones</CFormLabel>
          </div>
          <div class="col-9 col-md-6">
            <CFormSelect v-model="postAccionesPersonals.tipoAccionId">
              <option
                v-for="acciones in this.tipoAcciones"
                :key="acciones.id"
                :value="acciones.id"
              >
                {{ acciones.id }}
              </option>
            </CFormSelect>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3">
            <CFormLabel>Cantidad</CFormLabel>
          </div>
          <div class="col-9 col-md-6">
            <CFormInput v-model="postAccionesPersonals.cantidad" />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3">
            <CFormLabel>Hasta</CFormLabel>
          </div>
          <div class="col-9 col-md-6">
            <CFormInput type="date" v-model="fechaHasta" />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3">
            <CFormLabel>Detalle</CFormLabel>
          </div>
          <div class="col-9">
            <textarea
              v-model="postAccionesPersonals.detalle"
              class="col-md-10"
              rows="3"
            ></textarea>
          </div>
        </div>
      </CCardBody>
    </CModalBody>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>

      <button class="btn btn-info btn-block mt-1" v-on:click="SubmitForm">
        Guardar
      </button>
    </div>
  </CModal>
</template>

<script>
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

export default {
  name: 'AccionPersonalDialog',
  components: {
    CSmartTable,
    CModal,
  },

  data: function () {
    return {
      showAgregarAcciones: false,
      accionPersonal: [],
      tipoAcciones: [{}],
      postAccionesPersonals: {
        fechaDesde: new Date(),
        tipoAccionId: 4,
        empleadoId: 1,
        cantidad: 100,
        fechaHasta: new Date(),
        detalle: null,
      },
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

  computed: {
    fechaDesde: {
      get() {
        if (
          this.postAccionesPersonals.fechaDesde !== null &&
          this.postAccionesPersonals.fechaDesde?.toString() !== 'Invalid Date'
        ) {
          let date = this.postAccionesPersonals.fechaDesde
          if (typeof this.postAccionesPersonals.fechaDesde === 'string') {
            date = new Date(this.postAccionesPersonals.fechaDesde)
            return date.toISOString().split('T')[0]
          }
        } else {
          return
        }
      },
      set(value) {
        return (this.postAnoFiscal.fechaInicial = new Date(`${value}T00:00:00`))
      },
    },

    fechaHasta: {
      get() {
        if (
          this.postAccionesPersonals.fechaHasta !== null &&
          this.postAccionesPersonals.fechaHasta?.toString() !== 'Invalid Date'
        ) {
          let date = this.postAccionesPersonals.fechaHasta
          if (typeof this.postAccionesPersonals.fechaHasta === 'string') {
            date = new Date(this.postAccionesPersonals.fechaHasta)
            return date.toISOString().split('T')[0]
          }
        } else {
          return
        }
      },
      set(value) {
        return (this.postAnoFiscal.fechaInicial = new Date(`${value}T00:00:00`))
      },
    },
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    CloseModal() {
      this.$emit('closeModal', false)
    },

    SubmitForm() {
      if (this.id) {
        Api.putAccionesPersonales(this.id, this.postAccionesPersonals)
          .then((response) => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
            })
          })
          .catch(({ response }) => {
            this.show({
              content: response.data.message,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      } else {
        this.postAccionesPersonal()
      }
    },

    getTipoAcciones() {
      Api.getAllTipoAcciones().then((response) => {
        this.tipoAcciones = response.data.data
      })
    },

    clearModal() {
      this.postAccionesPersonals = {
        id: null,
        fechaDesde: null,
        tipoAccionId: null,
        empleadoId: null,
        cantidad: null,
        fechaHasta: null,
        detalle: null,
      }
    },

    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },

    getAccionesPersonalById(item) {
      this.getTipoAcciones()
      this.showAgregarAcciones = true
      Api.getAccionesPersonalByIds(item.id).then((response) => {
        this.postAccionesPersonals = response.data.data
        this.id = item.id
      })
    },

    postAccionesPersonal() {
      Api.postAccionesPersonal(this.postAccionesPersonals)
        .then((response) => {
          this.show({
            content: 'Registro guardado correctamente',
            closable: true,
          })
        })
        .catch(({ response }) => {
          this.show({
            content: response.data.message,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },

    getAccionPersonalById(empleadoId) {
      Api.getAccionPersonalByID(empleadoId).then((response) => {
        this.accionPersonal = response.data.data
      })
    },
  },
  watch: {
    empleado() {
      setTimeout(this.getAccionPersonalById(this.empleado.id), 10000)
    },
  },

  props: {
    showModal: Boolean,
    empleado: Object,
  },
}
</script>
