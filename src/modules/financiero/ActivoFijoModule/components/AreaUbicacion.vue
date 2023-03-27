<template>
      
  <h3 class="text-center">Area Ubicacion</h3>
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
    :items="areaUbicacion"
    :columns="columns"
    :footer="footerItem"
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
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Programas</CModalTitle>
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
            <CFormLabel for="validationCustom02">Código</CFormLabel>
            <CFormInput
              v-model="postAreaUbicacion.id"
              id="validationCustom02"
              required
              disabled
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom02">Descripción</CFormLabel>
            <CFormInput
              v-model="postAreaUbicacion.descripcion"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom02">Ubicación</CFormLabel>
            <CFormInput
              v-model="postAreaUbicacion.descripcion2"
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
import { useRegistroStore } from '../store/ActivoFijo/AreaUbicacion'
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
      postAreaUbicacion: {
        id: 0,
        ayuntamientoId: this.$ayuntamientoId,
        descripcion: null,
        descripcion2: null,
      },

      validatedCustom01: null,
      lgDemo: false,
      columns: [
        { key: 'id', label: 'Codigo' },
        { key: 'descripcion', label: 'Descripcion' },
        { key: 'descripcion2', label: 'Ubicación' },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },

      ],
      details: [],
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['areaUbicacion']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getArea', 'addArea', 'putArea']),
    ...mapActions(useToastStore, ['show']),

    submitForm() {
      if (this.id) {
        Api.putArea(this.id, this.postAreaUbicacion).then((response) => {
          this.lgDemo = false
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })

          setTimeout(this.getArea, 500)
          this.postAreaUbicacion = {
            id: 0,
            variacion: 0,
            ayuntamientoId: this.$ayuntamientoId,
            descripcion: null,
            descripcion2: null,
          }
        })
        setTimeout(this.getArea, 500)
      } else {
        setTimeout(this.getArea, 500)
        this.addArea(this.postAreaUbicacion)
        Api.postArea(this.postAreaUbicacion)
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
        ;(this.postAreaUbicacion = {
          variacion: 0,
          ayuntamientoId: this.$ayuntamientoId,
          descripcion: null,
          descripcion2: null,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getArea, 500)
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
      if (item.areaUbicacion !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true

      Api.getAreaByID(item.id).then((response) => {
        this.postAreaUbicacion = response.data.data
        this.id = item.id
      })
    },
  },
  mounted() {
    this.getArea()
  },
}
</script>
