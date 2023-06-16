<template>
  <CModal
    size="lg"
    :visible="beneficiarioModal"
    backdrop="static"
    @close="closeModalBeneficiario"
  >
    <CModalHeader>
      <CModalTitle>Beneficiarios</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="beneficiarioFormValidated"
          ref="formRef"
        >
          <div class="row">
            <div class="col-6 mt-2">
              <CCol :md="7">
                <CFormLabel for="validationCustom02">
                  Tipo de Documento</CFormLabel
                >
                <CFormSelect
                  v-model="beneficiarioForm.tipoDcto"
                  id="validationCustom05"
                  v-on:change="changeDocument()"
                >
                  <option value="cedula">C&eacute;dula</option>
                  <option value="Pasaporte">Pasaporte</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol :md="7">
                <CFormLabel for="validationCustom04">Documento</CFormLabel>
                <CFormInput
                  v-model="beneficiarioForm.rncCedPas"
                  :maxlength="cedulaMax"
                  v-on:keypress="checkDocument($event)"
                  required
                  id="validationCustom04"
                >
                </CFormInput>

                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="15">
                <CFormLabel for="validationCustom04">Nombre</CFormLabel>
                <CFormInput
                  v-model="beneficiarioForm.nombre"
                  id="validationCustom04"
                >
                </CFormInput>

                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="15">
                <CFormLabel for="validationCustom04"
                  >Direcci&oacute;n</CFormLabel
                >
                <CFormInput
                  v-model="beneficiarioForm.direccion"
                  id="validationCustom04"
                >
                </CFormInput>

                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <div class="row">
                <div class="col-6">
                  <CCol :md="15">
                    <CFormLabel for="validationCustom04">Teléfono 1</CFormLabel>
                    <CFormInput
                      v-model="beneficiarioForm.telefono"
                      id="validationCustom04"
                    >
                    </CFormInput>

                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
                <div class="col-6">
                  <CCol :md="15">
                    <CFormLabel for="validationCustom04">Teléfono 1</CFormLabel>
                    <CFormInput
                      v-model="beneficiarioForm.celular"
                      id="validationCustom04"
                    >
                    </CFormInput>

                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
              </div>
              <CCol :md="6">
                <CFormLabel for="validationCustom04">Contacto</CFormLabel>
                <CFormInput
                  v-model="beneficiarioForm.contacto"
                  id="validationCustom04"
                >
                </CFormInput>

                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="15">
                <CFormLabel for="validationCustom04">Email</CFormLabel>
                <CFormInput
                  v-model="beneficiarioForm.email"
                  id="validationCustom04"
                >
                </CFormInput>

                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>

            <div class="col-6 mt-2" style="position: relative; left: 57px">
              <CCol :md="7" class="mb-5">
                <CFormLabel for="validationCustom04"
                  >Fecha de ingreso</CFormLabel
                >
                <CFormInput
                  v-model="ingresoDate"
                  type="date"
                  id="validationCustom04"
                >
                </CFormInput>

                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol :md="7" class="mb-5">
                <CFormLabel for="validationCustom04"
                  >Tipo de Beneficiario</CFormLabel
                >
                <CFormSelect
                  v-model="beneficiarioForm.tipo"
                  id="validationCustom05"
                >
                  <option>Ayudas</option>
                  <option>Empleado</option>
                  <option>Empresa</option>
                  <option>Institucional</option>
                  <option>Pensionado</option>
                  <option>Personal</option>
                  <option>Subvencion</option>
                  <option>Comercial</option>
                  <option>otros</option>
                </CFormSelect>
              </CCol>

              <CCol :md="7">
                <CFormLabel for="validationCustom05">Estatus</CFormLabel>
                <CFormSelect
                  v-model="beneficiarioForm.estatus"
                  id="validationCustom05"
                >
                  <option>Activo</option>
                  <option>Inanctivo</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-on:click="closeModalBeneficiario"
            >
              Cerrar
            </button>
            <button
              class="btn btn-info btn-block mt-1"
              v-on:click="saveBeneficiario"
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
import { CModal } from '@coreui/vue'
import Api from '../../services/EjecucionServices'
import { onlyNumber } from '@/utils/validator'

export default {
  name: 'BeneficiarioModal',
  components: {
    CModal,
  },

  data: function () {
    return {
      onlyNumber,
      beneficiarioFormValidated: false,
      cedulaMax: 11,
      beneficiarioForm: {
        id: null,
        nombre: '',
        tipoDcto: 'cedula',
        rncCedPas: '',
        ingreso: new Date(Date.now()),
        tipo: '',
        direccion: '',
        ciudad: '',
        contacto: '',
        telefono: '',
        celular: '',
        email: '',
        estatus: '',
        mensual: 0,
        recomienda: 0,
        ayuntamientoId: this.$ayuntamientoId,
      },
    }
  },

  methods: {
    saveBeneficiario() {
      this.beneficiarioFormValidated = false
      if (this.$refs.formRef.$el.checkValidity()) {
        this.$emit('post-beneficiario', { ...this.beneficiarioForm })
        return
      }
      this.beneficiarioFormValidated = true
    },

    checkDocument(e) {
      if (this.beneficiarioForm.tipoDcto === 'cedula') {
        onlyNumber(e)
        this.cedulaMax = 11
      }
    },

    changeDocument() {
      this.cedulaMax = this.beneficiarioForm.tipoDcto === 'cedula' ? 11 : 15
    },

    clearForm() {
      this.beneficiarioForm = {
        id: null,
        nombre: '',
        tipoDcto: 'cedula',
        rncCedPas: '',
        ingreso: new Date(Date.now()),
        tipo: '',
        direccion: '',
        ciudad: '',
        contacto: '',
        telefono: '',
        celular: '',
        email: '',
        estatus: '',
        mensual: 0,
        recomienda: 0,
        ayuntamientoId: this.$ayuntamientoId,
      }
    },

    closeModalBeneficiario() {
      this.$emit('close-modal', false)
      this.clearForm()
    },

    getBeneficiarioByIds(id) {
      Api.getBeneficiariosById(id).then((response) => {
        this.Beneficiarios = response.data.data
      })
    },
  },

  computed: {
    ingresoDate: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        if (
          this.beneficiarioForm.ingreso !== null &&
          this.beneficiarioForm.ingreso?.toString() !== 'Invalid Date'
        ) {
          let date = this.beneficiarioForm.ingreso

          if (typeof this.beneficiarioForm.ingreso === 'string') {
            date = new Date(this.beneficiarioForm.ingreso)
            return date.toISOString().split('T')[0]
          }
        }
      },

      set(value) {
        return (this.beneficiarioForm.ingreso = new Date(`${value}T00:00:00`))
      },
    },
  },

  watch: {
    beneficiario(newValue) {
      if (this.beneficiarioModal && newValue) {
        this.beneficiarioForm = { ...newValue }
      }
    },
  },
  props: {
    beneficiarioModal: Boolean,
    beneficiario: {
      type: Object,
    },
  },
}
</script>
