<template>
  <CModal
    size="md"
    :visible="newDireccionDependeciaModal"
    backdrop="static"
    style="width: 25%"
  >
    <CModalHeader>
      <CModalTitle>Direcci&oacute;n Dependencias</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="direccionDependeciaFormValidated"
          ref="formRef"
        >
          <CCol :md="12">
            <CFormLabel for="validationCustom04">Nombre</CFormLabel>
            <CFormInput
              required
              type="text"
              v-model="direccionDependeciaObject.nombre"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="12">
            <CFormLabel for="validationCustom04">Estructura</CFormLabel>
            <CFormInput
              required
              type="text"
              v-on:keypress="onlyNumber($event)"
              v-model="direccionDependeciaObject.estructura"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
        </CForm>
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" data-bs-dismiss="modal" @click="closeModal">
        Cerrar
      </CButton>
      <CButton color="primary" @click="saveDireccionDependecia">
        Guardar
      </CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import { CModalFooter } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import {onlyNumber} from '@/utils/validator'

export default {
  name: 'DireccionDependeciaDialogs',
  components: {
    CModal,
    CModalFooter,
  },

  data: function () {
  
    return {
      onlyNumber,
      direccionDependeciaFormValidated: false,
      direccionDependeciaObject: {
        nombre: '',
        estructura: '',
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    saveDireccionDependecia() {
      this.direccionDependeciaFormValidated = false
      if (this.$refs.formRef.$el.checkValidity()) {
        this.$emit('post-direccionDependecia', {
          ...this.direccionDependeciaObject,
        })
        return
      }
      this.direccionDependeciaFormValidated = true
    },
  },

  watch: {
    direccionDependecia(newValue) {
      this.direccionDependeciaObject = { ...newValue }
    },
  },

  props: {
    newDireccionDependeciaModal: Boolean,
    direccionDependecia: Number,
  },
}
</script>
