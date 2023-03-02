<template>
  <h3 class="text-center">Beneficiarios</h3>
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
    :items="Beneficiarios"
    :columns="columns"
    columnFilter
    tableFilter
    cleaner
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #ingreso="{ item }">
      <td>
        {{ formatDate(item.ingreso) }}
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
      <td class="py-1">
        <CButton
          class="mt-1"
          color="danger"
          variant="outline"
          square
          size="sm"
          @click="deleteItem(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Eliminar' }}
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
      <CModalTitle>Beneficiarios</CModalTitle>
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
            <div class="col-6 mt-2">
              <CCol :md="7">
                <CFormLabel for="validationCustom02">
                  Tipo de Documento</CFormLabel
                >
                <CFormSelect
                  v-model="postBeneficiario.tipoDcto"
                  id="validationCustom05"
                >
                  <option>Cedula</option>
                  <option>Pasaporte</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol :md="7">
                <CFormLabel for="validationCustom04">Documento</CFormLabel>
                <CFormInput
                  v-model="postBeneficiario.rncCedPas"
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="15">
                <CFormLabel for="validationCustom04">Nombre</CFormLabel>
                <CFormInput
                  v-model="postBeneficiario.nombre"
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="15">
                <CFormLabel for="validationCustom04">Direccion</CFormLabel>
                <CFormInput
                  v-model="postBeneficiario.direccion"
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <div class="row">
                <div class="col-6">
                  <CCol :md="15">
                    <CFormLabel for="validationCustom04">Teléfono 1</CFormLabel>
                    <CFormInput
                      v-model="postBeneficiario.telefono"
                      id="validationCustom04"
                    >
                    </CFormInput>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
                <div class="col-6">
                  <CCol :md="15">
                    <CFormLabel for="validationCustom04">Teléfono 1</CFormLabel>
                    <CFormInput
                      v-model="postBeneficiario.celular"
                      id="validationCustom04"
                    >
                    </CFormInput>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
              </div>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Contacto</CFormLabel>
                <CFormInput
                  v-model="postBeneficiario.contacto"
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="15">
                <CFormLabel for="validationCustom04">Email</CFormLabel>
                <CFormInput
                  v-model="postBeneficiario.email"
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>

            <div class="col-6 mt-2" style="position: relative; left: 57px">
              <CCol :md="7" class="mb-5">
                <CFormLabel for="validationCustom04"
                  >Fecha de ingreso</CFormLabel
                >
                <CFormInput
                  v-model="postBeneficiario.ingreso"
                  type="date"
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol :md="7" class="mb-5">
                <CFormLabel for="validationCustom04"
                  >Tipo de Beneficiario</CFormLabel
                >
                <CFormSelect
                  v-model="postBeneficiario.tipo"
                  id="validationCustom05"
                >
                  <option>Ayudas</option>
                  <option>Empleado</option>
                  <option>Empresa</option>
                  <option>Institucional</option>
                  <option>Pensionado</option>
                  <option>Personal</option>
                  <option>Subvencion</option>
                  <option>Comercial</option>
                  <option>otros</option>
                </CFormSelect>
              </CCol>

              <CCol :md="7">
                <CFormLabel for="validationCustom05">Estatus</CFormLabel>
                <CFormSelect
                  v-model="postBeneficiario.estatus"
                  id="validationCustom05"
                >
                  <option>A</option>
                  <option>I</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
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
import { useRegistroStore } from '../store/Ejecucion/Beneficiarios'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapActions, mapState } from 'pinia'
import { mapStores } from 'pinia'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../services/EjecucionServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      postBeneficiario: {
        id: 0,
        nombre: null,
        tipoDcto: null,
        rncCedPas: null,
        ingreso: new Date(Date.now()),
        tipo: null,
        direccion: null,
        ciudad: null,
        contacto: null,
        telefono: null,
        celular: null,
        email: null,
        estatus: null,
        mensual: 0,
        recomienda: 0,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
      },

      columns: [
        { key: 'id', label: 'Código', _style: { width: '10%' } },
        {
          key: 'nombre',
          label: 'Beneficiario',
          _style: { width: '15%' },
        },
        {
          key: 'tipo',
          label: 'Tipo de beneficiario',
          _style: { width: '10%' },
        },
        { key: 'direccion', label: 'Cédula', _style: { width: '15%' } },
        { key: 'ingreso', label: 'Fecha Ingreso', _style: { width: '15%' } },
        { key: 'tipoDcto', label: 'Tipo', _style: { width: '10%' } },

        { key: 'email', label: 'Email', _style: { width: '20%' } },
        { key: 'contacto', label: 'Contacto', _style: { width: '40%' } },
        { key: 'telefono', label: 'Teléfono 1', _style: { width: '20%' } },
        { key: 'celular', label: 'Teléfono 2', _style: { width: '20%' } },

        { key: 'estatus', label: 'Estatus', _style: { width: '20%' } },

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
    ...mapState(useRegistroStore, ['Beneficiarios']),
  },
  methods: {
    formatDate(ingreso) {
      return new Date(ingreso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    ...mapActions(useRegistroStore, ['getBeneficiarios', 'addBeneficiarios']),

    close() {
      this.lgDemo = false
    },

    focusInput() {
      this.$refs.name.focus()
    },

    unaVez() {
      // if (!this.runOnce) {
      this.focusInput()
      // this.runOnce = true
      // }
    },

    openModal() {
      this.lgDemo = true
      // <input ref="name" type="text" class="form-control" v-model="postMarcas.nombre" id="exampleInputEmail1"  >
      setTimeout(this.unaVez, 200)
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
      if (item.Beneficiarios !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true
      Api.getBeneficiariosById(item.id).then((response) => {
        this.postBeneficiario = response.data.data

        this.id = item.id
      })
    },

    submitForm() {
      if (this.id) {
        Api.putBeneficiarios(this.id, this.postBeneficiario).then(
          (response) => {
            this.lgDemo = false
            this.$swal({
              position: 'top-end',
              icon: 'success',
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            })
            setTimeout(this.getBeneficiarios, 500)
            this.postBeneficiario = {
              id: 0,
              nombre: null,
              tipoDcto: null,
              rncCedPas: null,
              ingreso: new Date(Date.now()),
              tipo: null,
              direccion: null,
              ciudad: null,
              contacto: null,
              telefono: null,
              celular: null,
              email: null,
              estatus: null,
              mensual: 0,
              recomienda: 0,
              ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
              variacion: 0,
            }
          },
        )
        setTimeout(this.getBeneficiarios, 500)
      } else {
        this.getBeneficiarios()
        this.addBeneficiarios(this.postBeneficiario)
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
        setTimeout(this.getBeneficiarios, 500)
        ;(this.postBeneficiario = {
          id: 0,
          nombre: null,
          tipoDcto: null,
          rncCedPas: null,
          ingreso: new Date(Date.now()),
          tipo: null,
          direccion: null,
          ciudad: null,
          contacto: null,
          telefono: null,
          celular: null,
          email: null,
          estatus: null,
          mensual: 0,
          recomienda: 0,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          variacion: 0,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getBeneficiarios, 500)
      }
    },
  },

  mounted() {
    this.getBeneficiarios()
  },
}
</script>

<!-- <script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      validatedCustom01: null,
      lgDemo: false,
      columns: [
        { key: 'Código', label: 'Código', _style: { width: '40%' } },
        {
          key: 'Beneficiario',
          label: 'Beneficiario',
          _style: { width: '40%' },
        },
        { key: 'Cédula', label: 'Cédula', _style: { width: '40%' } },
        { key: 'Tipo', label: 'Tipo', _style: { width: '40%' } },
        { key: 'Contacto', label: 'Contacto', _style: { width: '40%' } },
        { key: 'Teléfono 1', label: 'Teléfono 1', _style: { width: '40%' } },
        { key: 'Teléfono 2', label: 'Teléfono 2', _style: { width: '40%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ]
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
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },
  },
  mounted() {
    this.$store.dispatch('Formulacion/getProyectos')
  },
}
</script> -->
