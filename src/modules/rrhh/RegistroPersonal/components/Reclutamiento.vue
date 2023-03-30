<template>
  <h3 class="text-center">Reclutamiento y/o solicitudes</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton color="info" @click="
        () => {
          lgDemo = true
        }
      ">Agregar</CButton>
    </div>
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport">Imprimir</CButton>
    </div>
  </div>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" :footer="footerItem" header
    :items="this.$store.state.RRHHModule.reclutamientoSolicitud" :columns="columns" columnFilter itemsPerPageSelect
    :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails(item, index)">
          Eliminar
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
  <CModal size="lg" :visible="lgDemo" @close="
    () => {
      lgDemo = false
    }
  ">
    <CNav class="p-2"  variant="tabs" role="tablist">
      <CNavItem>
        <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 1" @click="() => { tabPaneActiveKey = 1 }">
          General
        </CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 2" @click="() => { tabPaneActiveKey = 2 }">
          Notas
        </CNavLink>
      </CNavItem>

    </CNav>
    <CTabContent>
      <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">
        <CModalHeader>
          <CModalTitle>Formulario de solicitudes</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01"
              @submit="handleSubmitCustom01">
              <CCol :md="6">
                <CFormLabel for="validationCustom01">Solicitud número</CFormLabel>
                <CFormInput disabled id="validationCustom01" />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom02">Fecha Solicitud</CFormLabel>
                <CFormInput type="date" id="validationCustom02" required />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustomUsername">Nombre solicitante</CFormLabel>
                <CInputGroup class="has-validation">
                  <CFormInput id="validationCustomUsername" value="" aria-describedby="inputGroupPrepend" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom03">Direcci&oacute;n</CFormLabel>
                <CFormInput id="validationCustom03" required />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom03">Telefono</CFormLabel>
                <CFormInput id="validationCustom03" required />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Edad</CFormLabel>
                <CFormInput id="validationCustom04"> </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom05">Profesión</CFormLabel>
                <CFormInput id="validationCustom05" required />
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Posición solicitada</CFormLabel>
                <CFormInput id="validationCustom04"> </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Entrevistado</CFormLabel>
                <CFormSelect id="validationCustom04">
                  <option>Si</option>
                  <option>No</option>
                </CFormSelect>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Evaluado</CFormLabel>
                <CFormSelect id="validationCustom04">
                  <option>Si</option>
                  <option>No</option>
                </CFormSelect>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Descalificado</CFormLabel>
                <CFormSelect id="validationCustom04">
                  <option>Si</option>
                  <option>No</option>
                </CFormSelect>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Remitido a</CFormLabel>
                <CFormInput id="validationCustom04"> </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

            </CForm>
          </CCardBody>
        </CModalBody>
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 2">
        <CModalHeader>
          <CModalTitle>Formulario de solicitudes</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01"
              @submit="handleSubmitCustom01">
              <CCol :md="6">
                <CFormLabel for="validationCustom01">Solicitud número</CFormLabel>
                <CFormInput id="validationCustom01" />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom01">Fecha Solicitud</CFormLabel>
                <CFormInput type id="validationCustom01" />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="12">
                <CFormLabel for="validationCustom01">Nombre Solicitante</CFormLabel>
                <CFormInput id="validationCustom01" />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom01">La Entrevista</CFormLabel>
                <CFormTextarea id="validationCustom01"></CFormTextarea>

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom01">Observaci&oacute;n</CFormLabel>
                <CFormTextarea id="validationCustom01"></CFormTextarea>

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

            </CForm>
          </CCardBody>
        </CModalBody>

      </CTabPane>

    </CTabContent>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="() => {
        lgDemo = false
      }">
        Cerrar
      </button>
      <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
        Guardar
      </button>
    </div>
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
      tabPaneActiveKey: 1,
      validatedCustom01: null,
      lgDemo: false,
      columns: [
        {
          key: 'Solicitud No.',
          label: 'Solicitud No.',
          _style: { width: '20%' },
        },
        {
          key: 'Nombre solicitante',
          label: 'Nombre solicitante',
          _style: { width: '30%' },
        },
        { key: 'Teléfono', label: 'Teléfono', _style: { width: '10%' } },
        { key: 'Edad', label: 'Edad', _style: { width: '10%' } },
        {
          key: 'Entrevistado',
          label: 'Entrevistado',
          _style: { width: '10%' },
        },
        { key: 'Evaluado', label: 'Evaluado', _style: { width: '10%' } },
        { key: 'Califica', label: 'Califica', _style: { width: '10%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
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
    this.$store.dispatch('AdministrativoModule/getUsuarios')
  },
}
</script>
