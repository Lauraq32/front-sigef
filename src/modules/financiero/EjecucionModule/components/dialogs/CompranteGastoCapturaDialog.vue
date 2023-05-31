<template>
  <CModal size="xl" :visible="showModal" @close="closeModal" backdrop="static" >
    <CModalHeader>
      <CModalTitle>Documento del Gasto</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm>
          <div class="row">
            <div class="col-12">
              <div class="row">

                <div class="col-6">
                  <CCol :md="12">
                    <div class="row">
                      <CCol :md="6">
                        <CFormLabel for="nombre">fecha</CFormLabel>
                        <CFormInput type="date" id="nombre" required />


                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="nombre">Estatus</CFormLabel>
                        <CFormInput id="nombre" required />


                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="nombre">Etapa</CFormLabel>
                        <CFormSelect id="validationCustom05">
                          <option>Activo</option>
                          <option>Inactivo</option>
                        </CFormSelect>


                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="nombre">Comp Modifica</CFormLabel>
                        <CFormInput id="nombre" required />


                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="nombre">Resolucion No.</CFormLabel>
                        <CFormInput id="nombre" required />


                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="nombre">Fecha Resolucion</CFormLabel>
                        <CFormInput type="date" id="nombre" required />


                      </CCol>
                      <CCol :md="12">
                        <CFormLabel for="nombre">Forma de Pago</CFormLabel>
                        <div class="row">
                          <div class="col-6">
                            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                              label="Default radio" />
                            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault2" label="Checked radio"
                              checked />
                          </div>
                          <div class="col-6">
                            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                              label="Default radio" />
                            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault2" label="Checked radio"
                              checked />
                          </div>
                        </div>
                      </CCol>
                    </div>
                  </CCol>
                </div>
                <div class="col-6">
                  <CCol :md="12">
                    <div class="row">

                      <CCol :md="12">
                        <CFormLabel for="nombre">Beneficiario</CFormLabel>
                        <div class="position-relative">
                          <input ref="name" disabled required class="form-control padding-input" type="text"
                            id="displayNameProfesion" />
                          <span class="position-absolute icon-input">
                            <CIcon icon="cisSearch" size="xl" v-on:click="openBeneficiarioModal" />
                          </span>
                        </div>

                      </CCol>
                      <CCol :md="12">
                        <CFormLabel for="nombre">Por Concepto de</CFormLabel>
                        <CFormInput id="nombre" required />


                      </CCol>
                      <CCol :md="12">
                        <CFormLabel for="nombre">Cta Bancaria</CFormLabel>
                        <CFormInput id="nombre" required />


                      </CCol>

                    </div>
                  </CCol>
                </div>
                <div class="col-12">
                  <label for="">Detalle</label>
                  <textarea name="" id="" style="width: 100%;">

                  </textarea>
                </div>
              </div>




            </div>
          </div>
        </CForm>
        <h1>Tabla</h1>
      </CCardBody>
    </CModalBody>
  </CModal>
  <SelectBeneficiario :isVisible="showBeneficiarioModal"   @close="selectClasificator" />
</template>
  
<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'
import SelectBeneficiario from './SelectBeneficiario.vue'

export default {
  name: 'CompranteGastoCapturaDialog',
  components: {
    CSmartTable,
    CModal,
    CIcon,
    SelectBeneficiario
  },

  data: function () {
    return {
      showBeneficiarioModal: false,
      profesionesList: [],
      tabPaneActiveKey: 1,
      reclutamientoObject: {},

    }
  },

  methods: {
    // selectClasificator(clasificador) {
    //   if (clasificador) {
    //     props.formulacionIngreso.ctgClasificadorId = clasificador.clasifica
    //     props.formulacionIngreso.ctaControl = clasificador.cControl;
    //     props.formulacionIngreso.detalle = clasificador.nombre;
    //     props.formulacionIngreso.ctgFuenteId = clasificador.ctgFuenteId || props.formulacionIngreso.ctgFuenteId;
    //     props.formulacionIngreso.ctgFuenteEspecificaId = clasificador.ctgFuenteEspecificaId || props.formulacionIngreso.ctgFuenteEspecificaId;
    //     props.formulacionIngreso.ctgOrganismoFinanciadorId = clasificador.ctgOrganismoFinanciadorId || props.formulacionIngreso.ctgOrganismoFinanciadorId;

    //     validateInputctgFuente(clasificador);
    //     validateInputctgFuenteEspecificaId(clasificador);
    //     validateInputctgOrganismoFinanciadorId(clasificador);
    //   }
    //   showFindClasificadorModal.value = false;
    // },

    closeModal() {
      this.$emit('closeModal')
    },

    openBeneficiarioModal() {
      console.log('gol')
      this.showBeneficiarioModal = true;
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.saveGasto()
      }
      this.isFormEventTypeValidated = true
    },

    saveGasto() {
      this.$emit('post-gasto', {
        ...this.postEmpleado
      })
    },

    closeModal() {
      this.$emit('close-modal')
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
  