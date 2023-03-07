<template>
  <h3 class="text-center">Contribuyentes</h3>
  <hr />
  <div>
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

    <div class="d-inline p-2">
      <CButton color="info" @click="volver">Comprobacion Ingreso</CButton>
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
    columnFilter
    :items="Contribuyente"
    :columns="columns"
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #fecha="{ item }">
      <td>
        {{ formatDate(item.fecha) }}
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
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Contribuyentes</CModalTitle>
    </CModalHeader>
    <CModalBody class="mt-3">
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <div class="row">
            <div class="col-6">
              <CCol :md="10">
                <CFormLabel for="validationCustom01">Nombre</CFormLabel>
                <input
                  ref="name"
                  type="text"
                  class="form-control"
                  v-model="postContribuyente.nombre"
                  id="exampleInputEmail1"
                />
                <!-- <CFormInput
                  v-model="postContribuyente.nombre"
                  id="validationCustom01"
                  required
                /> -->

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-3">
              <CCol :md="10">
                <CFormLabel for="validationCustom01">Fecha</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.fecha"
                  id="validationCustom01"
                  type="date"
                  required
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <CCol :md="6">
                <CFormLabel for="validationCustom01"
                  >Tipo Contribuyente</CFormLabel
                >
                <CFormSelect
                  v-model="postContribuyente.tipo"
                  id="validationCustom05"
                >
                  <option>Empresa</option>
                  <option>Personal</option>
                </CFormSelect>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>

            <div class="col-3">
              <CCol :md="10">
                <CFormLabel for="validationCustom01">Tipo Documento</CFormLabel>
                <CFormSelect
                  v-model="postContribuyente.tipoDcto"
                  id="validationCustom05"
                >
                  <option>CEDULA</option>
                  <option>RNC</option>
                </CFormSelect>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-3">
              <CCol :md="10">
                <CFormLabel for="validationCustom03">#Documento</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.rncCedPas"
                  id="validationCustom03"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>
          <hr />

          <div class="row">
            <div class="col-6">
              <CCol :md="17">
                <CFormLabel for="validationCustom03">Direccion</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.direccion"
                  id="validationCustom03"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-3">
              <CCol :md="14">
                <CFormLabel for="validationCustom04">Pais</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.pais"
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-3">
              <CCol :md="14">
                <CFormLabel for="validationCustom05">Ciudad</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.ciudad"
                  type="email"
                  id="validationCustom05"
                  required
                />
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <CCol :md="7">
                <CFormLabel for="validationCustom01">Telefono</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.telefono"
                  id="validationCustom01"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-6">
              <CCol :md="7">
                <CFormLabel for="validationCustom01">Fax</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.fax"
                  id="validationCustom01"
                  required
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <CCol :md="7">
                <CFormLabel for="validationCustom01">Contacto</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.conctato"
                  id="validationCustom01"
                  required
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>

            <div class="col-6">
              <CCol :md="17">
                <CFormLabel for="validationCustom01">Email</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.email"
                  id="validationCustom01"
                  required
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <CCol :md="4">
            <CFormLabel for="validationCustom01">Estatus</CFormLabel>
            <CFormSelect
              v-model="postContribuyente.estatus"
              id="validationCustom05"
            >
              <option>A</option>
              <option>I</option>
            </CFormSelect>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-on:click="close"
            >
              Close
            </button>
            <button
              v-on:click="submitForm"
              type="button"
              class="btn btn-primary"
            >
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/FacturacionCobros/Contribuyente'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../services/FacturacionCobrosServices'
import router from '@/router'

export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      postContribuyente: {
        id: 0,
        codigo: 0,
        variacion: 0,
        ciudad: null,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        conctato: null,
        direccion: null,
        email: null,
        estatus: null,
        fax: null,
        fecha: new Date(Date.now()),
        pais: null,
        mensual: 0,
        recomienda: 0,
        rncCedPas: null,
        telefono: null,
        telefono1: null,
        tipo: null,
        tipoDcto: null,
        nombre: null,
      },

      validatedCustom01: null,
      lgDemo: false,
      columns: [
        { key: 'nombre', label: 'Nombre', _style: { width: '15%' } },
        { key: 'id', label: 'Codigo', _style: { width: '8%' } },
        { key: 'tipoDcto', label: 'Documento', _style: { width: '10%' } },
        { key: 'direccion', label: 'Direccion', _style: { width: '30%' } },
        { key: 'telefono', label: 'Telefono', _style: { width: '10%' } },
        { key: 'fecha', label: 'Fecha Reg.', _style: { width: '10%' } },
        { key: 'tipo', label: 'Tipo', _style: { width: '10%' } },
        { key: 'estatus', label: 'Estatus', _style: { width: '10%' } },
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

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['Contribuyente']),
  },

  methods: {
    ...mapActions(useRegistroStore, [
      'getContribuyente',
      'addContribuyente',
      'putContribuyente',
    ]),
    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    close() {
      this.lgDemo = false
    },

    volver() {
      router.push({ name: 'comprobanteIngreso' })
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

    submitForm() {
      if (this.id) {
        Api.putContribuyente(this.id, this.postContribuyente).then(
          (response) => {
            this.lgDemo = false
            this.$swal({
              position: 'top-end',
              icon: 'success',
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            })
            setTimeout(this.getContribuyente, 500)
            this.postContribuyente = {
              id: 0,
              variacion: 0,
              ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
              nombre: null,
              direccion: null,
              estatus: null,
              fecha: new Date(Date.now()),
              telefono: null,
              tipo: null,
              tipoDcto: null,
            }
          },
        )
        setTimeout(this.getContribuyente, 500)
      } else {
        setTimeout(this.getContribuyente, 500)
        this.addContribuyente(this.postContribuyente)
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
        setTimeout(this.getContribuyente, 500)
        ;(this.postContribuyente = {
          id: 0,
          variacion: 0,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          nombre: null,
          direccion: null,
          estatus: null,
          fecha: new Date(Date.now()),
          telefono: null,
          tipo: null,
          tipoDcto: null,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getContribuyente, 500)
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
    toggleDetails(item) {
      if (item.Contribuyente !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true

      Api.getContribuyenteById(item.id).then((response) => {
        this.postContribuyente = response.data.data

        this.id = item.id
      })
    },
  },
  mounted() {
    this.getContribuyente()
  },
}
</script>
