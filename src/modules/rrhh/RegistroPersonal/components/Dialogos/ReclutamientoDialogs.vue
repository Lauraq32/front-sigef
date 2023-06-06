<template>
  <CModal @close="closeModal" size="lg" :visible="showModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Formulario de Solicitudes</CModalTitle>
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
    <CForm novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm">
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">
          <CModalBody>
            <CCardBody>
              <div class="row">
                <CCol :md="6">
                  <CCol :md="12">
                    <CFormLabel for="cedula">Documento de identidad</CFormLabel>
                    <section class="row">
                      <CCol :md="5">
                        <CFormSelect
                          v-model="solicitudEmpleo.tipoDocumento"
                          @change="changeDocument()"
                          required
                        >
                          <option value="cedula">C&eacute;dula</option>
                          <option value="pasaporte">Pasaporte</option>
                        </CFormSelect>
                      </CCol>
                      <CCol>
                        <CFormInput
                          v-model="solicitudEmpleo.codigoIdentidad"
                          id="cedula" minlength="9" required :maxlength="IdCodMaxLen"
                          @keypress="checkDocument"
                        />
                      </CCol>
                    </section>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="fecha">Fecha solicitud</CFormLabel>
                    <CFormInput v-model="fecha" type="date" id="fecha" required />
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="nombre">Nombre solicitante</CFormLabel>
                    <CInputGroup class="has-validation">
                      <CFormInput v-model="solicitudEmpleo.nombre" id="nombre" value="" v-on:keypress="onlyLetter($event)"
                        aria-describedby="inputGroupPrepend" required />
                    </CInputGroup>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="direccion1">Direcci&oacute;n 1</CFormLabel>
                    <CFormInput v-model="solicitudEmpleo.direccion1" id="direccion1" required />
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="direccion2">Direcci&oacute;n 2</CFormLabel>
                    <CFormInput v-model="solicitudEmpleo.direccion2" id="direccion2" />
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="telefono">Tel&eacute;fono</CFormLabel>
                    <CFormInput v-model="solicitudEmpleo.telefono" v-on:keypress="onlyNumber($event)"  id="telefono" type="text" />
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="celular">Celular</CFormLabel>
                    <CFormInput v-model="solicitudEmpleo.celular" v-on:keypress="onlyNumber($event)" id="celular" required type="text" />
                  </CCol>
                </CCol>
                <CCol :md="6">
                  <CCol :md="12">
                    <CFormLabel for="edad">Edad</CFormLabel>
                    <CFormInput v-model="solicitudEmpleo.edad" id="edad" type="number" required
                      v-on:keypress="minNumber($event), this.onlyNumber($event)" 
                      v-on:blur="this.olderThan($event)"/>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="displayNameProfesion">Profesión</CFormLabel>
                    <div class="position-relative">
                      <input v-model="displayNameProfesion" ref="name" disabled required class="form-control padding-input"
                        type="text" id="displayNameProfesion" />
                      <span class="position-absolute icon-input">
                        <CIcon icon="cisSearch" size="xl" v-on:click="openProfesionModal" />
                      </span>
                    </div>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="posicionId">Posici&oacute;n solicitada</CFormLabel>
                    <CFormSelect v-model="solicitudEmpleo.posicionId" id="posicionId">
                      <option v-for="posicion in posicionesList" :key="posicion.id" :value="posicion.id">
                        {{ posicion.nombre }}
                      </option>
                    </CFormSelect>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="entrevistado">Entrevistado</CFormLabel>
                    <CFormSelect v-model="solicitudEmpleo.entrevistado" id="entrevistado">
                      <option value='Si'>Si</option>
                      <option value='No'>No</option>
                    </CFormSelect>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="evaluado">Evaluado</CFormLabel>
                    <CFormSelect v-model="solicitudEmpleo.evaluado" id="evaluado">
                      <option value='Si'>Si</option>
                      <option value='No'>No</option>
                    </CFormSelect>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="descalificado">Descalificado</CFormLabel>
                    <CFormSelect v-model="solicitudEmpleo.descalificado" id="descalificado">
                      <option value='Si'>Si</option>
                      <option value='No'>No</option>
                    </CFormSelect>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="remitidoA">Remitido a</CFormLabel>
                    <CFormInput type="text" v-on:keypress="onlyLetter($event)" v-model="solicitudEmpleo.remitidoA"
                      id="remitidoA"> </CFormInput>
                  </CCol>
                </CCol>
              </div>
            </CCardBody>
          </CModalBody>
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="profile-tab" :visible="tabPaneActiveKey === 2">
          <CModalBody>
            <CCardBody>
              <CCol :md="12">
                <CFormLabel for="nombre">Nombre Solicitante</CFormLabel>
                <CFormInput v-model="solicitudEmpleo.nombre" id="nombre" required />
              </CCol>
              <CCol :md="12">
                <div class="row">
                  <CCol :md="6">
                    <CFormLabel for="resultado">La Entrevista</CFormLabel>
                    <CFormTextarea v-model="solicitudEmpleo.resultado" id="resultado"></CFormTextarea>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="observacion">Observaci&oacute;n</CFormLabel>
                    <CFormTextarea v-model="solicitudEmpleo.observacion" id="observacion"></CFormTextarea>
                  </CCol>
                </div>
              </CCol>
            </CCardBody>
          </CModalBody>
        </CTabPane>

      </CTabContent>
    </CForm>
    <CModalFooter>
      <CButton color="secondary" data-bs-dismiss="modal" @click="closeModal">
          Cerrar
      </CButton>
      <CButton color="primary" @click="sendData">Guardar </CButton>
    </CModalFooter>
  </CModal>
  <ProfessionDialog :showModal="showProfessionModal" @selectProfesion="setProfesion" @closeModal="closeProfesionModal" />
</template>

<script>
import { CModal } from '@coreui/vue'
import { CCol } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'
import ProfessionDialog from './SelectProfesionDialog.vue'
import Api from '../../services/SolicitudEmpleo'
import { onlyNumber, onlyLetter } from '@/utils/validator'
import ProfesionesServices from '../../services/Profesiones'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import { format } from "date-fns";
export default {
  name: 'ReclutamientoDialog',
  components: {
    CModal,
    CIcon,
    ProfessionDialog,
    CCol
  },
  emits: ['closeModal', 'post-reclutamiento'],
  data: function () {
    return {
      onlyNumber,
      onlyLetter,
      isFormEventTypeValidated: false,
      validatedCustom01: null,
      displayNameProfesion: '',
      showProfessionModal: false,
      posicionesList: [],
      solicitudEmpleo: {
        tipoDocumento: 'cedula',
        codigoIdentidad: null,
        fecha: (new Date().toISOString()),
        nombre: null,
        direccion1: null,
        direccion2:null,
        telefono: null,
        celular: null,
        edad: null,
        profesionId: 0,
        posicionId: 0,
        remitidoA: null,
        entrevistado: 'Si',
        evaluado: 'Si',
        descalificado: 'Si',
        resultado: null,
        observacion: null
      },
      professionModal: false,
      tabPaneActiveKey: 1,
      reclutamientoObject: {},
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    minNumber(e) {
      if (e.target.value.length > 1) {
        e.preventDefault();
        return false;
      }
    },
    olderThan(e){
      if( e.target.value >= 18){
        e.preventDefault();
        return false;
      }
      else{
        this.show({
            content: 'Debe ser mayor de 18 a&ntilde;os',
            closable: true,
            color:'danger',
            class: 'text-white'
          })
        this.solicitudEmpleo.edad = null
      }
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.saveReclutamiento()
      }
      this.isFormEventTypeValidated = true;
      this.show({
        content: "Informaci&oacute;n incorrecta. Por favor revisar la informaci&oacute;n del formulario",
        closable: true,
        color: 'danger',
        class: 'text-white',
      });
    },

    getPosicion() {
      Api.getPosiciones().then(response => {
        this.posicionesList = response.data.data
        this.solicitudEmpleo.posicionId = this.posicionesList[0].id
      })
    },

    closeProfesionModal() {
      this.showProfessionModal = false
    },
    setProfesion(payload) {
      this.solicitudEmpleo.profesionId = payload.id
      this.displayNameProfesion = payload.name
    },
    closeModal() {
      this.clearForm()
      this.$emit('closeModal')

    },
    saveReclutamiento() {
      this.$emit('post-reclutamiento', {
        ...this.solicitudEmpleo,
        evaluado: this.solicitudEmpleo.evaluado === 'Si',
        entrevistado: this.solicitudEmpleo.entrevistado === 'Si',
        descalificado: this.solicitudEmpleo.descalificado === 'Si'
      })
    },
    clearForm() {
      this.displayNameProfesion = ''
      this.solicitudEmpleo = {
        tipoDocumento: 'cedula',
        codigoIdentidad: null,
        fecha: (new Date().toISOString()),
        nombre: null,
        direccion1: null,
        direccion2:null,
        telefono: null,
        celular: null,
        edad: null,
        profesionId: 0,
        posicionId: 0,
        remitidoA: null,
        entrevistado: 'Si',
        evaluado: 'Si',
        descalificado: 'Si',
        resultado: null,
        observacion: null
      }
    },
    formattedDate(fecha) {
      const date = new Date(fecha);
      return format(date, "yyyy-MM-dd");
    },
    openProfesionModal() {
      this.showProfessionModal = true
    },
    getSolicitudEmpleoById(id) {
      Api.getByIdSolicitudEmpleo(id).then((response) => {
        this.solicitudEmpleo = { ...response.data.data }

        profesionesApi.getProfesionesById(this.solicitudEmpleo.profesionId).then(response => {
          this.displayNameProfesion = response.data.data.name
        })
        this.getPosicion()
      })
    },
    checkDocument(e) {
      if (this.solicitudEmpleo.tipoDocumento === 'cedula') {
        this.IdCodMaxLen = 11;
        return onlyNumber(e);
      }
    },

    changeDocument() {
      this.IdCodMaxLen = this.solicitudEmpleo.tipoDocumento === 'cedula' ? 11 : 15
    },
  },
  watch: {
    solicitudEmpleoId(item) {
      this.solicitudEmpleo = item
              this.solicitudEmpleo.descalificado = item.descalificado ? 'Si' : 'No'
        this.solicitudEmpleo.evaluado = item.evaluado ? 'Si' : 'No'
        this.solicitudEmpleo.entrevistado = item.entrevistado ? 'Si' : 'No';

      if (item.profesionId) {
        ProfesionesServices.getProfesionesById(item.profesionId).then(response => {
          this.displayNameProfesion = response.data.data.name
        })
      }
    },
  },

  mounted() {
    this.getPosicion()
  },

  computed: {
    fecha: {
      get() {
        if (
          this.solicitudEmpleo.fecha !== null &&
          this.solicitudEmpleo.fecha?.toString() !== 'Invalid Date'
        ) {
          let date = this.solicitudEmpleo.fecha
          if (typeof this.solicitudEmpleo.fecha === 'string') {
            date = new Date(this.solicitudEmpleo.fecha)
            return date.toISOString().split('T')[0]
          }
        }
      },
      set(value) {
        return (this.solicitudEmpleo.fecha = new Date(
          `${value}T00:00:00`,
        ))
      },
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
