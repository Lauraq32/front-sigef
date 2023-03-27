<template>
      
  <h3 class="text-center">Direccion o Dependencias</h3>

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

  <CSmartTable class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    
    header
    :items="programas"
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
      <CModalTitle>Direccion o Dependencias</CModalTitle>
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
            <div class="col-12">
              <CCol :md="3">
                <CFormLabel for="validationCustom01">Codigo</CFormLabel>
                <input
                  disabled
                  type="text"
                  class="form-control"
                  v-model="postPrograma.id"
                  id="exampleInputEmail1"
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-12">
              <CCol :md="12">
                <CFormLabel for="validationCustom01">Nombre</CFormLabel>
                <input
                  ref="name"
                  type="text"
                  class="form-control"
                  v-model="postPrograma.nombre"
                  id="exampleInputEmail1"
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-12">
              <CCol :md="4">
                <CFormLabel for="validationCustom02">Programa</CFormLabel>
                <CFormInput
                  v-model="postPrograma.estructura"
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
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
import { useRegistroStore } from '../store/Nomina/ProgramaDivision'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
 
import { useToastStore } from '@/store/toast'
import Api from '../services/NominaServices'
export default {
  components: {
    CSmartTable,
    CModal,
      
  },
  data: () => {
    return {
      postPrograma: {
        id: 0,
        nombre: null,
        estructura: null,
        ayuntamientoId: parseInt(JSON.parse(localStorage.getItem('usuario',)).user.ayuntamiento.id),
        variacion: 0,
      },

      validatedCustom01: null,
      lgDemo: false,
      columns: [
        { key: 'id', label: 'Código', _style: { width: '40%' } },
        {
          key: 'nombre',
          label: 'Programa',
          _style: { width: '40%' },
        },
        {
          key: 'estructura',
          label: 'Estructura Program.',
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

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['programas']),
  },

  methods: {
    ...mapActions(useRegistroStore, [
      'getProgramas',
      'addProgramas',
      'putProgramas',
    ]),
    ...mapActions(useToastStore, ['show']),

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

    submitForm() {
      if (this.id) {
        Api.putProgramaDivision(this.id, this.postPrograma).then((response) => {
          this.lgDemo = false
          this.show({
            content: response.data.message,
            closable: true,
            color: 'success',
          })
          setTimeout(this.getProgramas, 500)
          this.postPrograma = {
            id: 0,
            nombre: null,
            estructura: null,
            ayuntamientoId: parseInt(JSON.parse(localStorage.getItem('usuario',)).user.ayuntamiento.id),
            variacion: 0,
          }
        })
        setTimeout(this.getProgramas, 500)
      } else {
        setTimeout(this.getProgramas, 500)
        Api.postProgramaDivision(this.postPrograma)
          .then((response) => {
                 this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          })
           .catch((error) => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })

        this.lgDemo = true
        setTimeout(this.getArea, 500)
        ;(this.postPrograma = {
          id: 0,
          nombre: null,
          estructura: null,
          ayuntamientoId: parseInt(JSON.parse(localStorage.getItem('usuario',)).user.ayuntamiento.id),
          variacion: 0,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getProgramas, 500)
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
      if (item.programas !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true

      Api.getProgramaDivisionbyid(item.id).then((response) => {
        this.postPrograma = response.data.data

        this.id = item.id
      })
    },
  },
  mounted() {
    this.getProgramas()
  },
}
</script>
