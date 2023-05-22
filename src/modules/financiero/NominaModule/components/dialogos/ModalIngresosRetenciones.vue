<template>
  <CModal backdrop="static" size="lg" :visible="showModal" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Conceptos de Ingresos y Retenciones</CModalTitle>
    </CModalHeader>

    <CModalBody>
      <CCardBody>
        <CForm>
          <div class="row">
            <div class="col-7">
              <CSmartTable
                clickableRows
                :tableProps="{
                  striped: true,
                  hover: true,
                }"
                :tableHeadProps="{}"
                :activePage="1"
                header
                :items="
                  dataConfiguracionNomina?.filter((x) => x.type == 'retencion')
                "
                :columns="tableConfiguracionNominaRetencion"
                :sorterValue="{ column: 'status', state: 'asc' }"
                pagination
              >
              </CSmartTable>

              <h6><u>Nota</u></h6>

              <p>
                Debe crear el concepto de la retencion en el modulo de ejecucion
                presupuestaria <br />
                y luego, poner el codigo asignado en la casilla correspondiente
              </p>
            </div>

            <div class="col-5 border border-bottom-dark p-2">
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

                <p>El tope de sueldo es obligatorio para el calculo de AFP.</p>
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
              <div class="border box-tall">
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
                  <br />
                  En caso de que las retenciones sobrepasen este pocentaje,
                  restar la diferencia de la siguiente retencion.
                  <CFormInput
                    v-model="sinNombrePorAhora1"
                    class="input-style"
                    type="text"
                  />
                  <br />
                  <br />
                  si es = cero (0), rebajar de:
                  <CFormInput class="input-style" type="number" />
                </p>
              </div>
            </div>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>

    <CModalFooter>
      <CButton color="secondary" @click="closeModal">Cerrar</CButton>
      <CButton color="primary">Guardar</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CFormInput, CFormLabel, CSmartTable } from '@coreui/vue-pro'
import ApiNomina from '../../services/NominaServices'
import { getConfiguracionNomina } from '@/utils/format'

export default {
  name: 'IngresosAndRetenciones',
  components: {
    CModal,
    CFormLabel,
    CFormInput,
    CSmartTable,
  },

  data: function () {
    return {
      sinNombrePorAhora: '60%',
      sinNombrePorAhora1: 5,
      tabPaneActiveKey: 1,
      dataConfiguracionNomina: [],
      getConfiguracionNomina,

      tableConfiguracionNominaRetencion: [
        { key: 'type', label: 'Ingresos', _style: { width: '40%' } },
        {
          key: 'retention',
          label: 'Retenciones',
          _style: { width: '40%' },
        },
        {
          key: 'divide',
          label: 'Factor Division',
          _style: { width: '40%' },
        },
      ],
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal', false)
    },

    getConfiguracionNominaApi() {
      ApiNomina.getConfiguracionNomina().then((response) => {
        this.dataConfiguracionNomina = this.getConfiguracionNomina(
          response.data.data,
        )
      })
    },
  },

  props: {
    showModal: Boolean,
  },

  mounted() {
    this.getConfiguracionNominaApi()
  },
}
</script>

<style>
.input-style {
  width: 60px;
  display: inline;
}

.box-tall {
  margin-top: 36px;
}
</style>
