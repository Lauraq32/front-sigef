<template>
  <CModal
    :visible="showModal"
    @close="closeCatalogoFuncion"
    backdrop="static"
  >
    <CModalHeader>
      <CModalTitle>Catalogo de Funciones</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="needs-validation"
          novalidate
          :validated="grupoFormValidated"
          ref="formRef"
        >
          <CCol>
            <CFormLabel for="postGrupo.descripcion">Finalidad</CFormLabel>
            <CFormInput id="postGrupo.descripcion" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="postGrupo.fechaInicio">Funci&oacute;n</CFormLabel>
            <CFormInput id="postGrupo.fechaInicio" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="postGrupo.fechaFin">Sub-Funci&oacute;n</CFormLabel>
            <CFormInput id="postGrupo.fechaFin" required />
            <CFormFeedback invalid>
              La fecha no puede ser menor a la fecha inicio
            </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="postGrupo.fechaInicio"
              >Denominaci&oacute;n</CFormLabel
            >
            <CFormInput id="postGrupo.fechaInicio" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
        </CForm>
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <CButton
        type="button"
        color="secondary"
        data-bs-dismiss="modal"
        @click="closeCatalogoFuncion"
        >Cerrar
      </CButton>
      <CButton type="button" color="primary" v-on:click="saveGrupo">
        Guardar
      </CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import { CModal } from '@coreui/vue'

export default {
  name: 'catalogoFuncionesModal',
  components: {
    CModal,
  },

  data: function () {
    return {
      grupoFormValidated: false,
      postCatalogoDeFunciones: {
        descripcion: '',
        fechaInicio: new Date(),
        fechaFin: new Date(),
      },
    }
  },

  methods: {
    closeCatalogoFuncion() {
      this.$emit('close-modal', false)
    },
  },

  props: {
    showModal: Boolean,
  },
}
</script>
