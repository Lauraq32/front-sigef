<template>
  <CModal backdrop="static" :visible="showModal" @close="closeGrupoNomina">
    <CModalHeader>
      <CModalTitle>Grupo Nómina</CModalTitle>
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
            <CFormLabel for="postGrupoNomina.descripcion"
              >Descripción</CFormLabel
            >
            <CFormInput
              v-model="postGrupoNomina.descripcion"
              id="postGrupoNomina.descripcion"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>
          <div>
            <CFormLabel for="postGrupoNomina.estructuraProgramaticaId"
              >Estructura Programática</CFormLabel
            >
            <CFormInput
              v-model="postGrupoNomina.estructuraProgramaticaId"
              id="postGrupoNomina.estructuraProgramaticaId"
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>
          <div>
            <CFormLabel for="postGrupoNomina.bancoId">Banco</CFormLabel>
            <CFormSelect
              v-model="postGrupoNomina.bancoId"
              id="postGrupoNomina.bancoId"
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
            <CFormLabel for="postGrupoNomina.cuentaCorrienteNumero"
              >Cuenta Corriente No.</CFormLabel
            >
            <CFormInput
              v-model="postGrupoNomina.cuentaCorrienteNumero"
              id="postGrupoNomina.cuentaCorrienteNumero"
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>

          <div>
            <CFormLabel for="postGrupoNomina.codigoNominaBanco"
              >Código de la Nómina en el Banco
            </CFormLabel>
            <CFormInput
              v-model="postGrupoNomina.codigoNominaBanco"
              id="postGrupoNomina.codigoNominaBanco"
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
  emits: ['postGrupoNomina', 'close-modal'],
  data: function () {
    return {
      grupoBancos: [],
      postGrupoNomina: {
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
      this.$emit('postGrupoNomina', this.postGrupoNomina)
      this.clearModalGrupoNomina()
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        console.log(this.postGrupoNomina)
        return this.saveGrupoNomina({ ...this.postGrupoNomina })
      }
      this.isFormEventTypeValidated = true
    },

    clearModalGrupoNomina() {
      this.id = null
      this.isFormEventTypeValidated = false
      this.postGrupoNomina = {
        descripcion: null,
        estructuraProgramaticaId: null,
        bancoId: 0,
        cuentaCorrienteNumero: null,
        codigoNominaBanco: null,
      }
    },
  },

  watch: {
    grupoNomina(newValue) {
      this.postGrupoNomina = {
        ...newValue,
        estructuraProgramaticaId: newValue.estructuraProgramatica?.id,
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
