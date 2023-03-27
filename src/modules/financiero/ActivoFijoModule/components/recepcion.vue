<template>
      
  <h3 class="text-center">Recepcion</h3>
  <hr />
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
  <hr />
  <CSmartTable class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    
    header
    :items="Recepcion"
    :columns="columns"
    itemsPerPageSelect
    :itemsPerPage="5"
    columnFilter
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
      <CModalTitle>Recepcion</CModalTitle>
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
            <CFormLabel for="validationCustom02">Fecha</CFormLabel>
            <CFormInput
              type="date"
              v-model="postRecepcion.fecha"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom02">Autoriza</CFormLabel>
            <CFormInput
              v-model="postRecepcion.autoriza"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom02">Realiza</CFormLabel>
            <CFormInput
              v-model="postRecepcion.realiza"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom02">Motivo</CFormLabel>
            <CFormInput
              v-model="postRecepcion.motivo"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom02">Recibido de</CFormLabel>
            <CFormInput
              v-model="postRecepcion.recibidoDe"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom02">Valor</CFormLabel>
            <CFormInput
              v-model="postRecepcion.valor"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom01">Estatus</CFormLabel>
            <CFormSelect
              v-model="postRecepcion.estatus"
              id="validationCustom05"
            >
              <option>True</option>
              <option>False</option>
            </CFormSelect>
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
import { useRegistroStore } from '../store/ActivoFijo/recepcion'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Api from '../services/ActivoFijoServices'
 
import { useToastStore } from '@/store/toast'

export default {
  components: {
    CSmartTable,
    CModal,
      
  },

  data: () => {
    return {
      secuencial: null,
      postRecepcion: {
        secuencial: 0,
        activoId: 2,
        ayuntamientoId: this.$ayuntamientoId,
        fecha: new Date(Date.now()),
        motivo: null,
        enviadoA: null,
        autoriza: null,
        recibidoDe: null,
        valor: null,
        realiza: null,
        estatus: true,
      },
      columns: [
        { key: 'secuencial', label: 'Codigo' },
        { key: 'fecha', label: 'Fecha' },
        { key: 'autoriza', label: 'Autoriza' },
        { key: 'motivo', label: 'Motivo' },
        { key: 'realiza', label: 'Realiza' },
        { key: 'estatus', label: 'Estatus' },
        { key: 'recibidoDe', label: 'Recibido De' },
        { key: 'valor', label: 'Valor' },
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
    ...mapState(useRegistroStore, ['Recepcion']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getRecepcion', 'addRecepcion']),
    ...mapActions(useToastStore, ['show']),

    toggleDetails(item) {
      if (item.Recepcion !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true

      this.secuencial = item.secuencial
      Api.getRecepcionByID(item.secuencial).then((response) => {
        this.postRecepcion = response.data.data

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
      if (this.secuencial != null) {
        Api.putRecepcion(this.secuencial, this.postRecepcion).then(
          (response) => {
            this.lgDemo = false
                 this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })

            setTimeout(this.getRecepcion, 500)
            this.postRecepcion = {
              secuencial: 0,
              fecha: new Date(Date.now()),
              motivo: null,
              autoriza: null,
              recibidoDe: null,
              valor: null,
              realiza: null,
              estatus: true,
            }
            this.secuencial = null
          },
        )
        setTimeout(this.getRecepcion, 500)
      } else {
        Api.postRecepcion(this.postRecepcion)
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
        setTimeout(this.getRecepcion, 500)
        ;(this.postRecepcion = {
          secuencial: 0,
          fecha: new Date(Date.now()),
          motivo: null,
          autoriza: null,
          recibidoDe: null,
          valor: null,
          realiza: null,
          estatus: true,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getRecepcion, 500)
      }
    },
  },

  mounted() {
    this.getRecepcion()
  },
}
</script>
