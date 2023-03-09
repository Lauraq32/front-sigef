<template>
  <h3 class="text-center">Posición o Cargo</h3>
 
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            openModal()
          }
        "
        >Agregar</CButton
      >
    </div>
  </div>

  <CSmartTable
    clickableRows
    :tableProps="{
     striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer
    header
    :items="pocision"
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
    <template #show_details="{ item }">
      <td class="py-1">
        <CButton
          class="mt-1"
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item)"
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
    size="md"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Posición o Cargo</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <div class="row">
            <div class="row">
              <div class="col-6">
                <CCol :md="8">
                  <CFormLabel for="validationCustom02">Codigo</CFormLabel>
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    v-model="postPosicionesCargo.id"
                    id="exampleInputEmail1"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4" style="position: relative; left: 115px">
                <CCol :md="5">
                  <CFormLabel for="validationCustom02"
                    >Id_Ayuntamiento</CFormLabel
                  >
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    v-model="postPosicionesCargo.id"
                    id="exampleInputEmail1"
                  />
                  <!-- <CFormInput
              v-model="postPosicionesCargo.nombre"
              id="validationCustom02"
              required
            /> -->
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
            </div>
          </div>
          <div class="col-12">
            <CCol :md="10">
              <CFormLabel for="validationCustom02">Nombre</CFormLabel>
              <input
                ref="name"
                type="text"
                class="form-control"
                v-model="postPosicionesCargo.nombre"
                id="exampleInputEmail1"
              />
              <!-- <CFormInput
              v-model="postPosicionesCargo.nombre"
              id="validationCustom02"
              required
            /> -->
              <CFormFeedback valid> Exito! </CFormFeedback>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CCol>
          </div>

          <div class="col-12">
            <div class="row">
              <div class="col-6">
                <CFormLabel
                  style="position: relative; top: 7px"
                  for="validationCustom02"
                  >Cod. del map:</CFormLabel
                >
              </div>

              <div class="col-6">
                <CCol :md="5">
                  <input
                    style="position: relative; left: -88px"
                    type="text"
                    class="form-control"
                    v-model="postPosicionesCargo.id"
                    id="exampleInputEmail1"
                  />
                  <!-- <CFormInput
              v-model="postPosicionesCargo.nombre"
              id="validationCustom02"
              required
            /> -->
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-6">
                <CFormLabel
                  style="position: relative; top: 7px"
                  for="validationCustom02"
                  >Grupo ocupacional</CFormLabel
                >
              </div>

              <div class="col-6">
                <CCol :md="5">
                  <input
                    style="position: relative; left: -88px"
                    type="text"
                    class="form-control"
                    v-model="postPosicionesCargo.id"
                    id="exampleInputEmail1"
                  />
                  <!-- <CFormInput
              v-model="postPosicionesCargo.nombre"
              id="validationCustom02"
              required
            /> -->
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-on:click="close"
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="submitForm">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { useRegistroStore } from '../store/Nomina/Pocision'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../services/NominaServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      ayun: [],

      postPosicionesCargo: {
        id: 0,
        nombre: null,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
      },

      columns: [
        { key: 'id', label: 'Código', _style: { width: '40%' } },
        {
          key: 'nombre',
          label: 'Posición o Cargo',
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

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['pocision']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getPocisions', 'addPocision']),

    close() {
      this.lgDemo = false
    },

    focusInput() {
      this.$refs.name.focus()
    },

    unaVez() {
      this.focusInput()
    },

    openModal() {
      this.lgDemo = true

      setTimeout(this.unaVez, 200)
    },

    toggleDetails(item) {
      if (item.pocision !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true

      Api.getPocisionbyid(item.id).then((response) => {
        this.postPosicionesCargo = response.data

        this.id = item.id
      })
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

    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },

    submitForm() {
      if (this.id) {
        Api.putPocision(this.id, this.postPosicionesCargo).then((response) => {
          this.lgDemo = false
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          this.postPosicionesCargo = {
            id: 0,
            nombre: null,
            variacion: 0,
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          }
          event.preventDefault()
          event.stopPropagation()
        })
        setTimeout(this.getPocisions, 500)
      } else {
        this.addPocision(this.postPosicionesCargo)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
        //const form = event.currentTarget
        this.lgDemo = true
        setTimeout(this.getPocisions, 500)
        ;(this.postPosicionesCargo = {
          id: 0,
          nombre: null,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getPocisions, 500)
      }
    },
  },
  mounted() {
    this.getPocisions()

    Api.getAyuntamiento().then((response) => {
      this.ayun = response.data.data
    })
  },
}
</script>
