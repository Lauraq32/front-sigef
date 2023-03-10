<template>
      
  <h3 class="text-center">Grupo nomina</h3>

  <div class="table-headers">
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

  <CSmartTable
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    
    header
    :items="grupoNomina"
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
      <CModalTitle>Grupo Nomina</CModalTitle>
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
            <div class="col-6">
              <CCol :md="8">
                <CFormLabel for="validationCustom02">Codigo</CFormLabel>
                <input
                  disabled
                  type="text"
                  class="form-control"
                  v-model="postGrupoNominas.id"
                  id="exampleInputEmail1"
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-4" style="position: relative; left: 115px">
              <CCol :md="5">
                <CFormLabel for="validationCustom02"
                  >Id_Ayuntamiento</CFormLabel
                >
                <input
                  style="position: relative; left: 25px"
                  disabled
                  type="text"
                  class="form-control"
                  v-model="postGrupoNominas.id"
                  id="exampleInputEmail1"
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>
          <CCol :md="11">
            <CFormLabel for="validationCustom01">Nombre</CFormLabel>
            <CFormInput
              v-model="postGrupoNominas.nombre"
              id="validationCustom01"
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
import { useRegistroStore } from '../store/Nomina/grupoNomina'

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
      postGrupoNominas: {
        nombre: null,
        variacion: 0,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
      },

      columns: [
        { key: 'id', label: 'Código', _style: { width: '40%' } },
        {
          key: 'nombre',
          label: 'Grupo Nomina',
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

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['grupoNomina']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getGNomina', 'addGrupoNomina']),
    ...mapActions(useToastStore, ['show']),

    submitForm() {
      if (this.id) {
        Api.putGrupoNomina(this.id, this.postGrupoNominas).then((response) => {
          this.lgDemo = false
          this.show({
            content: response.data.message,
            closable: true,
            color: 'success',
          })
          setTimeout(this.getGNomina, 500)
          this.postGrupoNominas = {
            nombre: null,
            variacion: 0,
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          }
        })
        setTimeout(this.getGNomina, 500)
      } else {
        setTimeout(this.getGNomina, 500)
        Api.postGrupoNomina(this.postGrupoNominas)
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
        setTimeout(this.getGNomina, 500)
        ;(this.postGrupoNominas = {
          nombre: null,
          variacion: 0,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getGNomina, 500)
      }
    },

    close() {
      this.lgDemo = false
    },

    toggleDetails(item) {
      if (item.grupoNomina !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true
      console.log(item.id)
      Api.getGrupoNominaById(item.id).then((response) => {
        this.postGrupoNominas = response.data.data

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
  },

  mounted() {
    this.getGNomina()
  },
}
</script>
