<template>
  <CModal size="xl" :visible="showModal" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Documento del Gasto2</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>

        <div class="row">
          <div class="col-4">
            <CForm>
              <div class="row">
                <CCol :md="8">
                  <CFormLabel for="nombre">Programa o Proyecto</CFormLabel>
                  <CFormInput id="nombre" required />
                </CCol>
                <CCol :md="4">
                  <CFormLabel for="nombre" class="font-weight-bold">Etapa</CFormLabel>
                  <span>Devengado</span>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Administracion Municipal</CFormLabel>
                  <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault1" label="Default radio" />
                </CCol>
                <hr>
                <CCol :md="6">
                  <CFormLabel for="nombre" class="font-weight-bold">Clasificador</CFormLabel>
                  <CFormInput id="nombre" required />
                </CCol>
                <CCol :md="6" class="border">
                  <CFormLabel for="nombre" class="font-weight-bold">Balance disponible</CFormLabel>

                </CCol>

                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Monto Bruto</CFormLabel>
                  <CFormInput id="nombre" required />
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Fuente financiamiento:</CFormLabel>

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Fuente Especifica:</CFormLabel>

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Organismo Financiador:</CFormLabel>

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Base Imponible</CFormLabel>
                  <CFormInput id="nombre" required />
                </CCol>
                <CCol :md="6">
                  <CFormLabel for="nombre" class="font-weight-bold">Tipo Retencion</CFormLabel>
                  <CFormInput id="nombre" required />
                </CCol>
                <CCol :md="6">
                  <CFormLabel for="nombre" class="font-weight-bold">% o Valor</CFormLabel>
                  <CFormInput id="nombre" required />
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Del</CFormLabel>
                  <CCol :md="12">
                    <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault1" label="Default radio" />
                    <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault2" label="Checked radio"
                      checked />
                  </CCol>

                  <CFormInput id="nombre" required />
                </CCol>
                <CCol :md="12">
                  <h1>Tabla</h1>
                </CCol>

              </div>
            </CForm>
          </div>
          <div class="col-8">
            <CCol :md="12">
              <h1>Tabla</h1>
            </CCol>
            <CCol :md="12">
              <h1>Cosa extrana debajo de la tabla</h1>
            </CCol>
          </div>
        </div>

      </CCardBody>
    </CModalBody>
  </CModal>
</template>
    
<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'


export default {
  name: 'FormularioCodificacionGasto',
  components: {
    CSmartTable,
    CModal,
    CIcon
  },

  data: function () {
    return {
      profesionesList: [],
      tabPaneActiveKey: 1,
      reclutamientoObject: {},

    }
  },

  methods: {
    openBeneficiarioModal() {

    },

    closeModal() {
      this.$emit('closeModal')
    },
  },

  props: {
    showModal: Boolean,
  },
  mounted() {

  }
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
    