<template>
   <h3 class="text-center">Registro Personal</h3>
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
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport"
        >Imprimir</CButton
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
    :items="items"
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
          @click="toggleDetails(item, index)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
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
      <CModalTitle>Formulación gasto</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="2">
            <CFormLabel for="validationCustom01">PNAP</CFormLabel>
            <CFormInput id="validationCustom01"  />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom02">Programa</CFormLabel>
            <CFormInput  id="validationCustom02" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustomUsername">Proyecto</CFormLabel>
            <CInputGroup class="has-validation">
              <CFormInput
                
                id="validationCustomUsername"
                value=""
                aria-describedby="inputGroupPrepend"
                required
              />
              <CFormFeedback valid> Exito! </CFormFeedback>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CInputGroup>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom03"
              >Actividad/Obra</CFormLabel
            >
            <CFormInput  id="validationCustom03" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Est. Programática control</CFormLabel>
            <CFormInput  id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05"
              >Denominación</CFormLabel
            >
            <CFormInput  id="validationCustom05" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Unidad responsable</CFormLabel>
            <CFormInput id="validationCustom04" > </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Tipo</CFormLabel>
            <CFormSelect id="validationCustom04">

              <option>DETALLE</option>
              <option>CABECERA</option>
              

            </CFormSelect>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04"
              >No. fondo transferido</CFormLabel
            >
            <CFormInput id="validationCustom04"></CFormInput>
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
          { key: 'Apellido', label: 'Apellido', _style: { width: '40%'} },
          { key: 'Nombre', label: 'Nombre', _style: { width: '40%'} },
          { key: 'Cédula', label: 'Cédula', _style: { width: '40%'} },
          { key: 'Código', label: 'Código', _style: { width: '40%'} },
          { key: 'Programa', label: 'Programa', _style: { width: '40%'} },
          { key: 'Direccion o Dependencia', label: 'Direccion o Dependencia', _style: { width: '40%'} },
          { key: 'Cargo', label: 'Cargo', _style: { width: '40%'} },
          { key: 'Fecha de ingreso', label: 'Fecha de ingreso', _style: { width: '40%'} },
          { key: 'Fecha de nacimiento', label: 'Fecha de nacimiento', _style: { width: '40%'} },
          { key: 'Edad', label: 'Edad', _style: { width: '40%'} },
          { key: 'Sexo', label: 'Sexo', _style: { width: '40%'} },
          { key: 'Sueldo', label: 'Sueldo', _style: { width: '40%'} },
         
          {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            filter: false,
            sorter: false,
            // _props: { color: 'primary', class: 'fw-semibold'}
          }
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
      getBadge (status) {
        switch (status) {
          case 'Active': return 'success'
          case 'Inactive': return 'secondary'
          case 'Pending': return 'warning'
          case 'Banned': return 'danger'
          default: 'primary'
        }
      },
      toggleDetails (item) {
        if (this.details.includes(item._id)) {
          this.details = this.details.filter((_item) => _item !== item._id)
          return
        }
        this.details.push(item._id)
      }
    },
    mounted(){
      this.$store.dispatch('AdministrativoModule/getUsuarios')
    }
    
   
  }
</script>