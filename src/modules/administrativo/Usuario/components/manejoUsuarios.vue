<template>
  <CModal
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = true
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Formulación Ingreso</CModalTitle>
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
            <CFormLabel for="validationCustom02">Nombre</CFormLabel>
            <CFormInput id="validationCustom02" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Email</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
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
      <CButton style="font-weight: bold; color: white;" color="danger" @click="GastoReport">Eliminar Usuario</CButton>
    </div>
  </div>
  <hr />
  <CSmartTable 
    clickableRows
    :tableProps="{
      striped: false,
      hover: true,
    }"
    :tableHeadProps="{
      
    }"
    :activePage="1"
    footer
    header
    :items="this.$store.state.AdministrativoModule.users"
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
  <template #status="{item}">
    <td><CBadge :color="getBadge(item.status)">{{item.status}}</CBadge></td>
    </template>
    <template #show_details="{item, index}">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item, index)"
        >
          {{Boolean(item._toggled) ? 'Hide' : 'Show'}}
        </CButton>
      </td>
    </template>
    <template #details="{item}">
      <CCollapse :visible="this.details.includes(item._id)">
        <CCardBody>
          <h4>
            {{item.username}}
          </h4>
          <p class="text-muted">User since: {{item.registered}}</p>
          <CButton size="sm" color="info" class="">
            User Settings
          </CButton>
          <CButton size="sm" color="danger" class="ml-1">
            Delete
          </CButton>
        </CCardBody>
      </CCollapse>
    </template>
  </CSmartTable>
</template>
<script>

import { CSmartTable } from '@coreui/vue-pro'
  export default {
    components: {
      CSmartTable
    },
    data: () => {
      return {
        validatedCustom01: null,
      lgDemo: false,
        columns: [
          { key: 'nombre',  _style: { width: '40%'} },
          'email',
         
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