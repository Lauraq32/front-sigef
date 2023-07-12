<template>
  <CModal size="xl" :visible="showModal" @close="closeModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Documento del Gasto</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm :validated="isFormEventTypeValidated" ref="eventTypeForm">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <CCol :md="12">
                    <div class="row">
                      <CCol :md="6">
                        <CFormLabel for="fecha">Fecha</CFormLabel>
                        <CFormInput v-model="postRegistroGasto.fecha" type="date" id="fecha" required />
                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="etapa">Etapa</CFormLabel>
                        <CFormSelect v-model="postRegistroGasto.etapa" id="etapa">
                          <option value="1">Devengado</option>
                          <option value="2">Pagado</option>
                          <option value="2">Variacion</option>
                          <option value="2">Compromiso</option>
                        </CFormSelect>
                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="nombre">Comprobante Modificado</CFormLabel>
                        <CFormInput @keypress="onlyNumber" id="nombre" required />
                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="Resolucion">Resoluci&oacute;n No.</CFormLabel>
                        <CFormInput id="Resolucion" required />
                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="fechaResolucion">Fecha Resoluci&oacute;n</CFormLabel>
                        <CFormInput v-model="postRegistroGasto.fechaResolucion" type="date" id="fechaResolucion"
                          required />
                      </CCol>
                      <CCol :md="12">
                        <CFormLabel for="formaPago">Forma de Pago</CFormLabel>
                        <div class="row">
                          <div class="col-6">
                            <CFormSelect required v-model="postRegistroGasto.formaPago">
                              <option :key="0">Selecionar Cuenta de banco</option>
                              <option value="cheque">
                                Cheque
                              </option>
                              <option value="cargoBanco">
                                Cargo a Banco
                              </option>
                              <option value="transferencia">
                                Transferencia
                              </option>
                              <option value="reversar">
                                Reversar
                              </option>
                            </CFormSelect>
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
                        <CFormLabel for="displayBeneficiario">Beneficiario</CFormLabel>
                        <div class="position-relative">
                          <input v-model="displayBeneficiario" ref="name" disabled required
                            class="form-control padding-input" type="text" id="displayBeneficiario" />
                          <span class="position-absolute icon-input">
                            <CIcon icon="cisSearch" size="xl" v-on:click="openBeneficiarioModal" />
                          </span>
                        </div>
                      </CCol>
                      <CCol :md="12">
                        <CFormLabel for="conceptoGastoId">Por Concepto de</CFormLabel>
                        <CFormInput v-model="postRegistroGasto.conceptoGastoId" id="conceptoGastoId" required />
                      </CCol>
                      <CCol :md="12">
                        <CFormLabel for="nombre">Cuenta de banco</CFormLabel>
                        <CFormSelect required v-model="postRegistroGasto.bancoId">
                          <option :key="0">Selecionar Cuenta de banco</option>
                          <option v-for="cuenta in cuentasBanco" :value="`${cuenta.bancoId}`" :key="cuenta.bancoId">
                            {{ cuenta.nombreCuenta }}
                          </option>
                        </CFormSelect>
                      </CCol>
                    </div>
                  </CCol>
                </div>
                <div class="col-12">
                  <CFormLabel for="">Detalle</CFormLabel>
                  <textarea v-model="postRegistroGasto.detalle" name="" id="detalle" style="width: 100%;">

                  </textarea>
                </div>
              </div>
            </div>
          </div>
        </CForm>

          <CButton color="secondary" @click="openCodificacionGasto">Agregar detalle</CButton>


        <CSmartTable class="sticky-top" clickableRows :tableProps="{
          striped: true,
          hover: true,
        }" :tableHeadProps="{}" :activePage="1" header :items="postRegistroGasto.detalleRegistroGastos"
          :columns="detalleGastoColumns" columnFilter :footer="footer" itemsPerPageSelect :itemsPerPage="5" columnSorter
          :sorterValue="{ column: 'nombres', state: 'asc' }" pagination>
        </CSmartTable>
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <div>
        <div class="d-inline p-2">
          <CButton style="font-weight: bold" color="info" @click="sendData">Agregar</CButton>
        </div>
      </div>
    </CModalFooter>
  </CModal>
  <SelectBeneficiario :isVisible="showBeneficiarioModal" @close="closeBeneficiarioModal" />
  <FormularioCodificacionGastoDialog @saveDetalle="saveDetalle" :registroGasto="postRegistroGasto"
    :showModal="ShowCodificacionGastoModal" @close="closeCodificacionGasto" />
</template>
  
<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'
import SelectBeneficiario from './SelectBeneficiario.vue'
import FormularioCodificacionGastoDialog from './FormularioCodificacionGastoDialog.vue'
import CuentaService from '@/modules/rrhh/RegistroPersonal/services/DeparmentServices'
import { useToastStore } from '@/store/toast'
import { onlyNumber } from '@/utils/validator'

import Api from '../../services/EjecucionServices'
import { props } from 'vue-number-format'
export default {
  name: 'CompranteGastoCapturaDialog',
  components: {
    CSmartTable,
    CModal,
    CIcon,
    SelectBeneficiario,
    FormularioCodificacionGastoDialog
  },

  data: function () {
    return {
      cuentasBanco: [],
      isFormEventTypeValidated: false,
      detalleGasto: [],
      displayBeneficiario: null,
      showBeneficiarioModal: false,
      ShowCodificacionGastoModal: false,
      profesionesList: [],
      tabPaneActiveKey: 1,
      reclutamientoObject: {},
      postRegistroGasto: {
        detalle: "",
        fecha: null,
        etapa: 1,
        beneficiarioId: null,
        conceptoGastoId: 5,
        bancoId: null,
        numeroCheque: "1",
        totalBruto: 0,
        montoNeto: 0,
        fechaResolucion: null,
        numeroResolucion: "1",
        cantidadFacturaCXP: 1,
        totalCXP: 1,
        cantidadPagoXGrupo: 1,
        totalPagoXGrupo: 1,
        cantRetenci: 1,
        totalRetenciones: 1,
        documentoInicial: 1,
        documentoFinal: 1,
        cantidadDocumento: 1,
        estatus: true,
        formaPago: "Cheque",
        tipoGastoId: 1,
        detalleRegistroGastos: []
      },
      detalleGastoColumns: [
        { key: 'estructuraProgramatica', label: 'Estructura Programatica', _style: { width: '40%' } },
        { key: 'clasificadorId', label: 'Clasificador' },
        { key: 'fuenteEspecificaId', label: 'Fuente especifica' },
        { key: 'organismoFinanciadorId', label: 'Organismo Financiador' },
        { key: 'montoBruto', label: 'Monto' },
      ]
    }
  },

  methods: {
    saveDetalle(payload) {
      this.postRegistroGasto.detalleRegistroGastos = [payload, ...this.postRegistroGasto.detalleRegistroGastos]
    },

    getServiciosRequeridos() {
      CuentaService.getCuentasDeBancos().then(response => {
        this.cuentasBanco = response.data.data
      })
    },



    closeBeneficiarioModal(payload) {
      this.displayBeneficiario = payload.nombre
      this.postRegistroGasto.beneficiarioId = payload.id
      this.showBeneficiarioModal = false;
    },

    closeCodificacionGasto() {
      this.ShowCodificacionGastoModal = false;
    },

    closeModal() {
      this.$emit('closeModal')
    },

    openBeneficiarioModal() {
      this.showBeneficiarioModal = true;
    },
    openCodificacionGasto() {
      this.ShowCodificacionGastoModal = true
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
        ...this.postRegistroGasto
      })
    },
  },

  props: {
    showModal: Boolean,
  },
  mounted() {
    this.getServiciosRequeridos()
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
  