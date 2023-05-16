<template>
  <CModal size="lg" :visible="showModal" @close="closeModal">
    <CModalHeader>
      <CModalTitle
        >Configuración de Impuesto Sobre la Renta/ Factor de
        División.</CModalTitle
      >
    </CModalHeader>

    <CModalBody>
      <CCard>
        <CCardBody>
          <CCardTitle class="mx-5 pb-4">
            <h5>Escala de Sueldos para Calculo del Impuesto Sobre la Renta</h5>
          </CCardTitle>
          <CForm>
            <div class="row">
              <div class="col-md-5">
                <CFormLabel for="excento">Excento Hasta:</CFormLabel>
                <CFormInput id="excento" />
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <CFormLabel for="excento">Sueldo Escala 1:</CFormLabel>
                <CFormInput id="excento" />
              </div>

              <div class="input-group col-2">
                <span class="input-group-text" id="basic-addon1">%</span>
                <input type="text" class="form-control" />
              </div>

              <div class="col-5">
                <CFormLabel for="excento">Valor Fijo</CFormLabel>
                <CFormInput id="excento" />
              </div>
            </div>

            <div class="row">
              <div class="col-5">
                <CFormLabel for="excento">Sueldo Escala 2:</CFormLabel>
                <CFormInput id="excento" />
              </div>
              <div class="input-group col-2">
                <span class="input-group-text" id="basic-addon1">%</span>
                <input type="text" class="form-control" />
              </div>
              <div class="col-5 input-position">
                <CFormInput id="excento" />
              </div>
            </div>

            <div class="row">
              <div class="col-5">
                <CFormLabel for="excento">Sueldo Escala 3:</CFormLabel>
                <CFormInput id="excento" />
              </div>
              <div class="input-group col-2">
                <span class="input-group-text" id="basic-addon1">%</span>
                <input type="text" class="form-control" />
              </div>
              <div class="col-5 input-position">
                <CFormInput id="excento" />
              </div>
            </div>

            <div class="row">
              <div class="col-5">
                <CFormLabel for="excento">Sueldo Escala 4:</CFormLabel>
                <CFormInput id="excento" />
              </div>
              <div class="input-group col-2">
                <span class="input-group-text" id="basic-addon1">%</span>
                <input type="text" class="form-control" />
              </div>
              <div class="col-5 input-position">
                <CFormInput id="excento" />
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-6">
                <CFormLabel for="excento">Retencion AFP</CFormLabel>
                <CFormInput id="excento" />
              </div>
              <div class="col-6">
                <CFormLabel for="excento">Hasta el sueldo</CFormLabel>
                <CFormInput id="excento" />
              </div>
            </div>

            <div class="row">
              <div class="col-6">
                <CFormLabel for="excento">Retencion ARS</CFormLabel>
                <CFormInput id="excento" />
              </div>
              <div class="col-6">
                <CFormLabel for="excento">Hasta el sueldo</CFormLabel>
                <CFormInput id="excento" />
              </div>
            </div>

            <div class="row fw-bold my-5 mx-3 p-2">
              <div class="col-7">
                <di v class="row mt-3">
                  <div class="col-auto">
                    <CFormLabel for="sueldoMensual" class="col-form-label"
                      >Sueldo Mensual:</CFormLabel
                    >
                  </div>
                  <div class="col-auto">
                    <CFormInput id="sueldoMensual" />
                  </div>
                </di>

                <div class="mt-3">
                  <CFormLabel for="excento">Sueldo Quincenal:</CFormLabel>
                </div>
                <div class="mt-3">
                  <CFormLabel for="excento">Sueldo Anual:</CFormLabel>
                </div>
                <div class="mt-3">
                  <CFormLabel for="excento">AFP Anual:</CFormLabel>
                </div>
                <div class="mt-3">
                  <CFormLabel for="excento">AFP Mensual:</CFormLabel>
                </div>
                <div class="mt-3">
                  <CFormLabel for="excento">ARS Anual:</CFormLabel>
                </div>
                <div class="mt-3">
                  <CFormLabel for="excento">ARS Mensual:</CFormLabel>
                </div>
              </div>
              <div class="col-5">
                <div class="mt-3">
                  <CFormLabel for="excento">Sueldo - AFP - ARS:</CFormLabel>
                </div>
                <div class="mt-3">
                  <CFormLabel for="excento">ISR Anual:</CFormLabel>
                </div>
                <div class="mt-3">
                  <CFormLabel for="excento">IRS Mensual:</CFormLabel>
                </div>
                <div class="mt-3">
                  <CFormLabel for="excento">IRS Quincenal:</CFormLabel>
                </div>
              </div>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CModalBody>

    <CModalFooter>
      <CButton color="secondary" @click="closeModal">Cerrar</CButton>
      <CButton color="primary">Guardar</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CFormInput, CFormLabel } from '@coreui/vue-pro'
export default {
  name: 'ConfiguracionRentaAndFactorDivision',
  components: {
    CModal,
    CFormLabel,
    CFormInput,
  },

  data: function () {
    return {}
  },

  methods: {
    closeModal() {
      this.$emit('close-modal', false)
    },
  },

  props: {
    showModal: Boolean,
  },
}
</script>
<style>
.input-group {
  width: inherit;
  width: 16%;
  height: 25%;
  margin-top: 33px;
}

.input-position {
  margin-top: 33px;
}
</style>
