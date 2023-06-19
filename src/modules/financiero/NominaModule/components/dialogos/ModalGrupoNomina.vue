<template>
  <CModal backdrop="static" :visible="showModal" @close="closeGrupoNomina">
    <CModalHeader>
      <CModalTitle>Grupo nómina</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="isFormEventTypeValidated"
          ref="eventTypeForm"
        >
          <div>
            <CFormLabel for="validationCustom01">Descripción</CFormLabel>
            <CFormInput
              v-model="postGrupoNominas.descripcion"
              id="validationCustom01"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>
          <div>
            <CFormLabel for="validationCustom01"
              >Estructura Programática</CFormLabel
            >
            <CFormInput
              v-model="postGrupoNominas.estructuraProgramaticaId"
              id="validationCustom01"
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>
          <div>
            <CFormLabel for="validationCustom01">Banco</CFormLabel>
            <CFormSelect
              v-model="postGrupoNominas.bancoId"
              id="validationCustom05"
            >
              <option
                v-for="bancos in this.grupoBancos"
                :key="bancos.id"
                :value="bancos.configKey"
              >
                {{ bancos.configValue }}
              </option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>
          <div>
            <CFormLabel for="validationCustom01"
              >Cuenta Corriente No.</CFormLabel
            >
            <CFormInput
              v-model="postGrupoNominas.cuentaCorrienteNumero"
              id="validationCustom01"
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>

          <div>
            <CFormLabel for="validationCustom01"
              >Codigo de la Nómina en el Banco
            </CFormLabel>
            <CFormInput
              v-model="postGrupoNominas.codigoNominaBanco"
              id="validationCustom01"
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <CButton
        @click="closeGrupoNomina"
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Cerrar
      </CButton>
      <CButton @click="sendData" type="button" class="btn btn-primary">
        Guardar
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import configuraciones from '@/utils/configuraciones'

export default {
  name: 'ModalGrupoNomina',

  components: {
    CModal,
  },

  data: function () {
    return {
      grupoBancos: [],
      postGrupoNominas: {
        descripcion: null,
        estructuraProgramaticaId: null,
        bancoId: 0,
        cuentaCorrienteNumero: null,
        codigoNominaBanco: null,
      },
      isFormEventTypeValidated: false,
    }
  },

  methods: {
    getGrupoNomina() {
      configuraciones
        .getGroupConfiguration(configuraciones.grupos.gruponomina)
        .then((response) => {
          this.grupoBancos = response.data.data
        })
    },

    closeGrupoNomina() {
      this.$emit('close-modal', false)
      this.clearModalGrupoNomina()
    },

    saveGrupoNomina() {
      this.$emit('postGrupoNomina', this.postGrupoNominas)
      this.clearModalGrupoNomina()
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.saveGrupoNomina({ ...this.postGrupoNominas })
      }
      this.isFormEventTypeValidated = true
    },

    clearModalGrupoNomina() {
      this.id = null
      this.isFormEventTypeValidated = false
      this.postGrupoNominas = {
        nombre: null,
        ayuntamientoId: this.$ayuntamientoId,
      }
    },
  },

  watch: {
    grupoNomina() {
      this.postGrupoNominas = {
        ...this.postGrupoNominas,
        ...this.grupoNomina,
      }
    },
  },

  props: {
    showModal: Boolean,
    grupoNomina: Object,
  },

  mounted() {
    this.getGrupoNomina()
  },
}
</script>
