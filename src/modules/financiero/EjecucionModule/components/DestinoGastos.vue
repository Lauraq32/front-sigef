<template>
  <h3 class="text-center">Destinos de gastos</h3>
  <hr />
  <div>
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            lgDemo = true
          }
        "
        >Agregar</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable
    clickableRows
    :tableProps="{
      striped: false,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer
    header
    :items="tiposGastos"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
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
          @click="toggleDetails(item.id)"
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
  <CModal
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Tipos de Gastos</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="4">
            <CFormLabel for="validationCustom01">Ayuntamiento</CFormLabel>
            <CFormInput
              v-model="postTipoGasto.ayuntamientoId"
              id="validationCustom01"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom02">Descripcion</CFormLabel>
            <CFormInput
              v-model="postTipoGasto.descripcion"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/EjecucionServices'
export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      id: null,
      tiposGastos: [],
      validatedCustom01: null,
      lgDemo: false,
      postTipoGasto: {
        id: 0,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        descripcion: '',
      },
      columns: [
        {
          key: 'ayuntamientoId',
          label: 'Ayuntamiento',
          _style: { width: '40%' },
        },
        {
          key: 'descripcion',
          label: 'Descripcion',
          _style: { width: '40%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
      details: [],
    }
  },
  methods: {
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },
    clearModal1() {
      this.postTipoGasto = {
        id: 0,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        descripcion: '',
      }
    },
    getBadge(status) {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          'primary'
      }
    },
    getAllTipoGasto() {
      Api.getTipoGastoList().then((response) => {
        this.tiposGastos = response.data.data
      })
    },
    Guardar() {
      if (this.id != null) {
        Api.PutTipoGasto(this.id, this.postTipoGasto)
          .then((response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'Datos Actualizado con exito',
              title: 'Actualizado',
              showConfirmButton: false,
              timer: 1500,
            })
          })
          .catch((error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: `${error.data.message}`,
              title: 'Actualizado',
              showConfirmButton: false,
              timer: 1500,
            })
          })
        setTimeout(this.getAllTipoGasto, 500)
      } else {
        Api.PostTipoGasto(this.postTipoGasto)
        setTimeout(this.getAllTipoGasto, 500)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
      }
      event.preventDefault()
      event.stopPropagation()
    },
    toggleDetails(id) {
      this.lgDemo = true
      Api.getTipoGastoById(id).then((response) => {
        this.id = response.data.data.id
        this.postTipoGasto = response.data.data
      })
    },
  },
  mounted() {
    this.getAllTipoGasto()
    this.$store.dispatch('Formulacion/getProyectos')
  },
}
</script>
