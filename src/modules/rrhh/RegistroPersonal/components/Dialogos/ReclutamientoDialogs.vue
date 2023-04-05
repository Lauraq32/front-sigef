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
                <CFormLabel for="validationCustom01">Solicitud número</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.cedula" id="cedula" />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom02">Fecha Solicitud</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.fecha" type="date" id="fecha" required />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustomUsername">Nombre solicitante</CFormLabel>
                <CInputGroup class="has-validation">
                  <CFormInput v-model="solicitudEmpleo.nombre" id="nombre" value="" aria-describedby="inputGroupPrepend"
                    required />

                </CInputGroup>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom03">Direcci&oacute;n</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.direccion1" id="direccion1" required />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom03">Direcci&oacute;n</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.direccion2" id="direccion2" required />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom03">Telefono</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.telefono" id="telefono" required />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom03">Celular</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.celular" id="celular" required />

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Edad</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.edad" id="edad"> </CFormInput>

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom05">Profesión</CFormLabel>
                <div class="position-relative">
                  <input v-model="displayNameProfesion" ref="name" required class="form-control padding-input" type="text"
                    id="displayNameProfesion" />
                  <span class="position-absolute icon-input">
                    <CIcon icon="cisSearch" size="xl" v-on:click="openProfesionModal" />
                  </span>
                </div>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Posición solicitada</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.posicionId" id="posicionId"> </CFormInput>

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Entrevistado</CFormLabel>
                <CFormSelect v-model="solicitudEmpleo.entrevistado" id="entrevistado">
                  <option>Si</option>
                  <option>No</option>
                </CFormSelect>

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Evaluado</CFormLabel>
                <CFormSelect v-model="solicitudEmpleo.evaluado" id="evaluado">
                  <option>Si</option>
                  <option>No</option>
                </CFormSelect>

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Descalificado</CFormLabel>
                <CFormSelect v-model="solicitudEmpleo.descalificado" id="descalificado">
                  <option>Si</option>
                  <option>No</option>
                </CFormSelect>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Remitido a</CFormLabel>
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
                <CFormLabel for="validationCustom01">Nombre Solicitante</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.nombre" id="nombre" />


              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom01">La Entrevista</CFormLabel>
                <CFormTextarea v-model="solicitudEmpleo.resultado" id="resultado"></CFormTextarea>

              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom01">Observaci&oacute;n</CFormLabel>
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
  <ProfessionDialog :show-modal="professionModal" @selectProfesion="setProfesion" @closeModal="closeProfesionModal" />
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
      displayNameProfesion: '',
      solicitudEmpleo: {
        cedula: "",
        fecha: "2023-03-31T15:53:01.450Z",
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
    closeProfesionModal(payload) {
      this.showProfessionModal = payload
    },
    setProfesion(payload) {
      this.solicitudEmpleo.profesionId = payload.id
      this.displayNameProfesion = payload.name
    },
    closeModal() {
      this.$emit('closeModal', false)
      this.clearForm()
      this.showModal = false
    },
    saveReclutamiento() {
      this.solicitudEmpleo.entrevistado == 'Si' ? this.solicitudEmpleo.entrevistado = true : this.solicitudEmpleo.entrevistado = false
      this.solicitudEmpleo.evaluado == 'Si' ? this.solicitudEmpleo.evaluado = true : this.solicitudEmpleo.evaluado = false
      this.solicitudEmpleo.descalificado == 'Si' ? this.solicitudEmpleo.descalificado = true : this.solicitudEmpleo.descalificado = false
      this.$emit('post-reclutamiento', this.solicitudEmpleo)
      this.clearForm()
      this.closeModal()
      solicitudEmpleoId = null
    },
    clearForm() {

      this.solicitudEmpleo = {
        cedula: "",
        fecha: "2023-03-31T15:53:01.450Z",
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
        this.solicitudEmpleo.entrevistado == true ? this.solicitudEmpleo.entrevistado = 'Si' : this.solicitudEmpleo.entrevistado = 'No'
        this.solicitudEmpleo.evaluado == true ? this.solicitudEmpleo.evaluado = 'Si' : this.solicitudEmpleo.evaluado = 'No'
        this.solicitudEmpleo.descalificado == true ? this.solicitudEmpleo.descalificado = 'Si' : this.solicitudEmpleo.descalificado = 'No'
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
