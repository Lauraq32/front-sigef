<template>
  <CModal @close="CloseModal" size="lg" :visible="showModal">
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
                  lgDemo5 = true
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

        <template #show_details="{ item, index }">
          <td class="py-2">
            <CButton
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="getAccionesPersonalById(item.id)"
            >
              {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
            </CButton>
          </td>
        </template>
        <template #details="{ item }">
          <CCollapse :visible="this.details.includes(item._id)">
            <CCardBody>
              <h4>
                {{ item.username }}
              </h4>
              <p class="text-muted">User since: {{ item.registered }}</p>
              <CButton size="sm" color="info" class=""> User Settings </CButton>
              <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
            </CCardBody>
          </CCollapse>
        </template>
      </CSmartTable>
    </CModalBody>

    <div class="modal-footer">
      <button
        @click="
          () => {
            lgDemo4 = false
          }
        "
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>

      <button class="btn btn-info btn-block mt-1">Guardar</button>
    </div>
  </CModal>

  <CModal
    @close="
      () => {
        lgDemo5 = false
      }
    "
    size="lg"
    :visible="lgDemo5"
  >
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
          <div class="col-3">
            <CFormLabel for="validationCustom01">Fechas</CFormLabel>
          </div>
          <div class="col-9 col-md-4">
            <CFormInput
              v-model="postAccionesPersonals.fechaDesde"
              type="date"
            />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3">
            <CFormLabel>Tipo</CFormLabel>
          </div>
          <div class="col-9 col-md-4">
            <CFormInput v-model="postAccionesPersonals.tipoAccionId" />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3">
            <CFormLabel>Cantidad</CFormLabel>
          </div>
          <div class="col-9 col-md-2">
            <CFormInput v-model="postAccionesPersonals.cantidad" />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3">
            <CFormLabel>Hasta</CFormLabel>
          </div>
          <div class="col-9 col-md-2">
            <CFormInput
              type="date"
              v-model="postAccionesPersonals.fechaHasta"
            />
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-3">
            <CFormLabel>Detalle</CFormLabel>
          </div>
          <div class="col-9">
            <textarea
              v-model="postAccionesPersonals.detalle"
              class="col-md-7"
              rows="3"
            ></textarea>
          </div>
        </div>
      </CCardBody>
    </CModalBody>

    <div class="modal-footer">
      <button
        @click="
          () => {
            lgDemo4 = true
          }
        "
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Close
      </button>

      <button
        class="btn btn-info btn-block mt-1"
        v-on:click="postAccionesPersonal"
      >
        Guardar
      </button>
    </div>
  </CModal>
</template>

<script>
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'

export default {
  name: 'AccionPersonalDialog',
  components: {
    CSmartTable,
    CModal,
  },

  data: function () {
    return {
      lgDemo5: false,
      accionPersonal: [],
      IdEmpleado: null,
      postAccionesPersonals: {
        fechaDesde: new Date(),
        tipoAccionId: 1,
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

      details: [],
    }
  },

  methods: {
    CloseModal() {
      this.$emit('closeModal', false)
    },

    SubmitForm() {
      if (this.id) {
        Api.putAccionesPersonales(this.id, this.postAccionesPersonals).then(
          (response) => {},
        )
      } else {
        this.postAccionesPersonal()
      }
    },

    getAccionesPersonalById(items) {
      this.lgDemo5 = true
      Api.getAccionesPersonalByIds(items.id).then((response) => {
        this.postAccionesPersonals = response.data.data
      })
    },

    postAccionesPersonal() {
      Api.postAccionesPersonal(this.postAccionesPersonals).then(
        (response) => {},
      )
    },

    getAccionPersonalById(IdEmpleado) {
      Api.getAccionPersonalByID(IdEmpleado).then((response) => {
        this.accionPersonal.push(...response.data.data)
      })
    },
  },
  watch: {
    empleado() {
      if (this.showModal) {
        this.getAccionPersonalById(this.empleado.id)
      }
    },
  },

  props: {
    showModal: Boolean,
    empleado: Object,
  },
}
</script>
