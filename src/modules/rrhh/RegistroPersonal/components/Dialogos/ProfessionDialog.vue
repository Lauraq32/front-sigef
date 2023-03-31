<template>
  <CModal size="sm" :visible="showModal">
    <CModalHeader>
      <CModalTitle>Mantenimiento Profesiones</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01" @submit="handleSubmitCustom01">
          <CCol :md="6">
            <CFormLabel for="validationCustom01">Solicitud número</CFormLabel>
            <CFormInput disabled id="validationCustom01" />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'

export default {
  name: 'ProfessionDialog',
  components: {
    CSmartTable,
    CModal,
    CIcon
  },

  data: function () {
    return {
      lgDemo5: false,
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
    onClick() {
      this.$emit('custom-event', false)
    },
    // saveReclutamiento(){
    //   this.$emit('post-reclutamiento', this.reclutamientoObject)
    // },
    // openProfesionModal(){
    //   console.log('abrir modal')
    // }
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
