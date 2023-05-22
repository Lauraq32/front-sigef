<template>
  <CModal backdrop="static" size="lg" :visible="showModal" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Conceptos de Ingresos y Retenciones</CModalTitle>
    </CModalHeader>

    <CModalBody>
      <CCard>
        <CCardBody>
          <CForm>
            <div class="row">
              <div class="row col-7">
                <div class="col-4">
                  <CFormLabel for="">Ingresos:</CFormLabel>
                  <div class="mt-2"><CFormInput id="excento" /></div>
                  <div class="mt-2"><CFormInput id="excento" /></div>
                  <div class="mt-2"><CFormInput id="excento" /></div>
                </div>
                <div class="col-4">
                  <CFormLabel for="">Retenciones:</CFormLabel>
                  <div class="mt-2"><CFormInput id="excento" /></div>
                  <div class="mt-2"><CFormInput id="excento" /></div>
                  <div class="mt-2"><CFormInput id="excento" /></div>
                </div>
                <div class="col-4">
                  <CFormLabel for="">Cod. Ejec/Pres.</CFormLabel>
                  <div class="mt-2"><CFormInput id="excento" /></div>
                  <div class="mt-2"><CFormInput id="excento" /></div>
                  <div class="mt-2"><CFormInput id="excento" /></div>
                </div>
              </div>
              <div class="col-5 border border-bottom-dark">
                <div class="row mt-3">
                  <div class="col-9">
                    <CFormLabel for="sueldoMensual" class="col-form-label"
                      >% Retencion ARS. (Empleado)</CFormLabel
                    >
                  </div>
                  <div class="col-3">
                    <CFormInput id="sueldoMensual" />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-9">
                    <CFormLabel for="sueldoMensual" class="col-form-label"
                      >% Retencion ARS. Patrono</CFormLabel
                    >
                  </div>
                  <div class="col-3">
                    <CFormInput id="sueldoMensual" />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-9">
                    <CFormLabel for="sueldoMensual" class="col-form-label"
                      >% Fondo Pension (Empleado)</CFormLabel
                    >
                  </div>
                  <div class="col-3">
                    <CFormInput id="sueldoMensual" />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-9">
                    <CFormLabel for="sueldoMensual" class="col-form-label"
                      >% Fondo Pension Patrono</CFormLabel
                    >
                  </div>
                  <div class="col-3">
                    <CFormInput id="sueldoMensual" />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-7">
                    <CFormLabel for="sueldoMensual" class="col-form-label"
                      >Total Sueldo:</CFormLabel
                    >
                  </div>
                  <div class="col-5">
                    <CFormInput id="sueldoMensual" />
                  </div>

                  <p>
                    El tope de sueldo es obligatorio para el calculo de AFP.
                  </p>
                </div>

                <div class="row mb-2 mt-1">
                  <div class="col-9">
                    <CFormLabel for="sueldoMensual" class="col-form-label"
                      >% Riesgo Laboral. Patrono</CFormLabel
                    >
                  </div>
                  <div class="col-3">
                    <CFormInput id="sueldoMensual" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-7" style="width: 418px"></div>
              <div class="col-5 border">
                <p class="mt-2">
                  Segun la ley, las retenciones a los empleados, no deben pasar
                  de un
                  <CFormInput
                    v-model="sinNombrePorAhora"
                    class="input-style"
                    type="text"
                  />
                  establecido de su sueldo bruto.
                  <br />
                  En caso de que las retenciones sobrepasen este pocentaje,
                  restar la diferencia de la siguiente retencion.
                  <CFormInput
                    v-model="sinNombrePorAhora1"
                    class="input-style"
                    type="text"
                  />
                  <br />
                  si es = cero (0), rebajar de:
                  <CFormInput class="input-style" type="number" />
                </p>
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
  name: 'IngresosAndRetenciones',
  components: {
    CModal,
    CFormLabel,
    CFormInput,
  },

  data: function () {
    return {
      sinNombrePorAhora: '60%',
      sinNombrePorAhora1: 5,
    }
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
.input-style {
  width: 60px;
  display: inline;
}
</style>
