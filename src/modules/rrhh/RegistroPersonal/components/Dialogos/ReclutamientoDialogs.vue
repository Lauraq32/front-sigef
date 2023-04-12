<template>
  <CModal @close="closeModal" size="lg" :visible="showModal" backdrop="static">

    <CModalHeader>
      <CModalTitle>Formulario de solicitudes</CModalTitle>
    </CModalHeader>
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
        <CModalBody>
          <CCardBody>
            <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01"
              @submit="handleSubmitCustom01">
              <CCol :md="6">
                <CFormLabel for="cedula">Solicitud número</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.cedula" id="cedula" />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="fecha">Fecha Solicitud</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.fecha" type="date" id="fecha" required />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="nombre">Nombre solicitante</CFormLabel>
                <CInputGroup class="has-validation">
                  <CFormInput v-model="solicitudEmpleo.nombre" id="nombre" value="" aria-describedby="inputGroupPrepend"
                    required />

                </CInputGroup>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="direccion1">Direcci&oacute;n 1</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.direccion1" id="direccion1" required />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="direccion2">Direcci&oacute;n 2</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.direccion2" id="direccion2" required />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="telefono">Tel&eacute;fono</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.telefono" id="telefono" required />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="celular">Celular</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.celular" id="celular" required />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="edad">Edad</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.edad" id="edad"> </CFormInput>

              </CCol>
              <CCol :md="6">
                <CFormLabel for="displayNameProfesion">Profesión</CFormLabel>
                <div class="position-relative">
                  <input v-model="displayNameProfesion" ref="name" required class="form-control padding-input" type="text"
                    id="displayNameProfesion" />
                  <span class="position-absolute icon-input">
                    <CIcon icon="cisSearch" size="xl" v-on:click="openProfesionModal" />
                  </span>
                </div>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="posicionId">Posición solicitada</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.posicionId" id="posicionId"> </CFormInput>

              </CCol>
              <CCol :md="6">
                <CFormLabel for="entrevistado">Entrevistado</CFormLabel>
                <CFormSelect v-model="solicitudEmpleo.entrevistado" id="entrevistado">
                  <option value='Si'>Si</option>
                  <option value='No'>No</option>
                </CFormSelect>

              </CCol>
              <CCol :md="6">
                <CFormLabel for="evaluado">Evaluado</CFormLabel>
                <CFormSelect v-model="solicitudEmpleo.evaluado" id="evaluado">
                  <option value='Si'>Si</option>
                  <option value='No'>No</option>
                </CFormSelect>

              </CCol>
              <CCol :md="6">
                <CFormLabel for="descalificado">Descalificado</CFormLabel>
                <CFormSelect v-model="solicitudEmpleo.descalificado" id="descalificado">
                  <option value='Si'>Si</option>
                  <option value='No'>No</option>
                </CFormSelect>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="remitidoA">Remitido a</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.remitidoA" id="remitidoA"> </CFormInput>

              </CCol>

            </CForm>
          </CCardBody>
        </CModalBody>
      </CTabPane>
      <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 2">
        <CModalBody>
          <CCardBody>
            <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01"
              @submit="handleSubmitCustom01">
              <CCol :md="12">
                <CFormLabel for="nombre">Nombre Solicitante</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.nombre" id="nombre" />


              </CCol>
              <CCol :md="6">
                <CFormLabel for="resultado">La Entrevista</CFormLabel>
                <CFormTextarea v-model="solicitudEmpleo.resultado" id="resultado"></CFormTextarea>

              </CCol>
              <CCol :md="6">
                <CFormLabel for="observacion">Observaci&oacute;n</CFormLabel>
                <CFormTextarea v-model="solicitudEmpleo.observacion" id="observacion"></CFormTextarea>


              </CCol>

            </CForm>
          </CCardBody>
        </CModalBody>

      </CTabPane>

    </CTabContent>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">
        Cerrar
      </button>
      <button class="btn btn-info btn-block mt-1" v-on:click="saveReclutamiento">
        Guardar
      </button>
    </div>
  </CModal>
  <ProfessionDialog :showModal="showProfessionModal" @selectProfesion="setProfesion" @closeModal="closeProfesionModal" />
</template>

<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'
import ProfessionDialog from './SelectProfesionDialog.vue'
import Api from '../../services/SolicitudEmpleo'

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
      validatedCustom01: null,
      displayNameProfesion: '',
      showProfessionModal: false,
      solicitudEmpleo: {
        cedula: "",
        fecha: (new Date().toISOString()),
        nombre: "",
        direccion1: "",
        direccion2: "",
        telefono: "",
        celular: "",
        edad: 0,
        profesionId: 0,
        posicionId: 0,
        remitidoA: "",
        entrevistado: 'Si',
        evaluado: 'Si',
        descalificado: 'Si',
        resultado: "",
        observacion: ""
      },
      professionModal: false,
      tabPaneActiveKey: 1,
      reclutamientoObject: {},
    }
  },

  methods: {

    closeProfesionModal() {
      this.showProfessionModal = false
    },
    setProfesion(payload) {
      this.solicitudEmpleo.profesionId = payload.id
      this.displayNameProfesion = payload.name
    },
    closeModal() {
      this.$emit('closeModal')
      this.clearForm()
    },
    saveReclutamiento(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        this.$emit('post-reclutamiento', {
          ...this.solicitudEmpleo,
          evaluado: this.solicitudEmpleo.evaluado === 'Si',
          entrevistado: this.solicitudEmpleo.entrevistado === 'Si',
          descalificado: this.solicitudEmpleo.descalificado === 'Si'
        })
        this.clearForm()
        solicitudEmpleoId = null
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true

    },
    clearForm() {

      this.solicitudEmpleo = {
        cedula: "",
        fecha: (new Date().toISOString()),
        nombre: "",
        direccion1: "",
        direccion2: "",
        telefono: "",
        celular: "",
        edad: 0,
        profesionId: 0,
        posicionId: 0,
        remitidoA: "",
        entrevistado: 'Si',
        evaluado: 'Si',
        descalificado: 'Si',
        resultado: "",
        observacion: ""
      }
    },
    openProfesionModal() {
      this.showProfessionModal = true
    },
    getSolicitudEmpleoById(id) {
      Api.getByIdSolicitudEmpleo(id).then((response) => {
        this.solicitudEmpleo = response.data.data

      })
    },
  },
  watch: {
    solicitudEmpleoId(newId) {
      if (newId) {
        this.getSolicitudEmpleoById(newId)
      }
    },
  },


  props: {
    showModal: Boolean,
    solicitudEmpleoId: null
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
