<template>
  <CModal  size="lg" :visible="showModal">
    <CNav class="p-2" variant="tabs" role="tablist">
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
                <div class="position-relative">
              <input ref="name" required class="form-control padding-input"
                 type="number" id="clasifica" />
              <span class="position-absolute icon-input">
                <CIcon icon="cisSearch" size="xl" v-on:click="openProfesionModal" />
              </span>
            </div>
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
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="onClick">
        Cerrar
      </button>
      <button class="btn btn-info btn-block mt-1" v-on:click="saveReclutamiento">
        Guardar
      </button>
    </div>
  </CModal>
  <ProfessionDialog :show-modal="professionModal"/>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'
import ProfessionDialog from '../Dialogos/ProfessionDialog.vue'

export default {
  name: 'ReclutamientoDialog',
  components: {
    CSmartTable,
    CModal,
    CIcon,
    ProfessionDialog
  },

  data: function () {
    return {
      lgDemo5: false,
      professionModal:false,
      tabPaneActiveKey: 1,
      reclutamientoObject:{},
      columns2: [
        { key: 'fecha', label: 'Fecha', _style: { width: '20%' } },
        {
          key: 'tipoDeAccion',
          label: 'Tipo de acción',
          _style: { width: '20%' },
        },
        {
          key: 'detalle',
          label: 'Detalles',
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
    }
  },

  methods: {
    onClick() {
      this.$emit('custom-event', false)
    },
    saveReclutamiento(){
      this.$emit('post-reclutamiento', this.reclutamientoObject)
    },
    openProfesionModal(){
      this.professionModal = true
    }
  },

  props: {
    showModal: Boolean,
  },
}
</script>
<style>
.padding-input {
  padding-right: 2.5rem;
}

.icon-input {
  padding: 0.2rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  right: 2px;
}
</style>
