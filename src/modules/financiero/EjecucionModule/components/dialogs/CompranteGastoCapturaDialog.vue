<template>
  <CModal size="xl" :visible="showModal" @close="closeModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Documento del Gasto (815)</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm class="needs-validation" novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm">
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <CCol :md="12">
                    <div class="row">
                      <CCol :md="6">
                        <CFormLabel for="fecha">Fecha</CFormLabel>
                        <AppDateField class="form-control" v-model="postRegistroGasto.fecha" />
                      </CCol>

                      <CCol :md="6">
                        <CFormLabel for="etapa">Etapa</CFormLabel>
                        <CFormSelect :disabled="postRegistroGasto.detalleRegistroGastos.length > 0" @change="changeEtapa" v-model="postRegistroGasto.etapa" id="etapa" required>
                          <option value="Devengado">Devengado</option>
                          <option value="Pagado">Pagado</option>
                          <option value="Variacion">Variaci&oacute;n</option>
                        </CFormSelect>
                      </CCol>

                      <CCol :md="6">
                        <CFormLabel for="Resolucion">Resoluci&oacute;n No.</CFormLabel>
                        <CFormInput id="Resolucion" />
                      </CCol>

                      <CCol :md="6">
                        <CFormLabel for="fechaResolucion">Fecha Resoluci&oacute;n</CFormLabel>
                        <AppDateField class="form-control" v-model="postRegistroGasto.fechaResolucion" />
                      </CCol>

                      <CCol :md="6">
                        <CFormLabel for="formaPago">Forma de Pago</CFormLabel>
                        <div class="row">
                          <div class="col-12">
                            <CFormSelect @change="changeFormaPago" :disabled="disableFormaPago"
                              v-model="postRegistroGasto.formaPago">
                              <option :key="0">Selecionar Cuenta de banco</option>
                              <option value="Cheque">
                                Cheque
                              </option>
                              <option value="CargoBancario">
                                Cargo a Banco
                              </option>
                              <option value="Transferencia">
                                Transferencia
                              </option>
                              <option value="Reversar">
                                Reversar
                              </option>
                            </CFormSelect>
                          </div>
                        </div>
                      </CCol>


                      <CCol :md="6">
                        <CFormLabel for="nombre">Comprobante Modificado</CFormLabel>
                        <CFormInput :disabled="disabledComprobante" @keypress="onlyNumber" id="nombre" />
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
                        <v-select v-model="displayConceptoGasto" :options="conceptosGasto"
                          :disabled="notAllowEdit"></v-select>
                      </CCol>
                      <CCol :md="12">
                        <CFormLabel for="nombre">Cuenta de banco</CFormLabel>
                        <CFormSelect required v-model="postRegistroGasto.bancoId" @change="getCuentabanco">
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
          <template #show_details="{ item, index }">
            <td>
              <CButton class="fw-bold text-white" color="danger" size="sm" @click="deleteDetalle(item)">&times;
              </CButton>
            </td>
          </template>
          <template #montoBruto="{ item, index }">
            <td class="text-end">
              {{ formatPrice(item.montoBruto) }}
            </td>
          </template>

          <template #montoRetenciones="{ item, index }">
            <td class="text-end">
              {{ formatPrice(item.montoRetenciones) }}
            </td>
          </template>

          <template #montoNeto="{ item, index }">
            <td class="text-end">
              {{ formatPrice(item.montoNeto) }}
            </td>
          </template>
        </CSmartTable>
      </CCardBody>
      <SelectBeneficiario :isVisible="showBeneficiarioModal" @close="closeBeneficiarioModal" />
      <FormularioCodificacionGastoDialog @saveDetalle="saveDetalle" :registroGasto="postRegistroGasto"
        :cuentaBanco="cuentaBanco" :showModal="ShowCodificacionGastoModal" @closeModal="closeCodificacionGasto" />
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" data-bs-dismiss="modal" v-on:click="closeModal">
        Cerrar
      </CButton>
      <CButton color="info" @click="sendData">Agregar</CButton>
    </CModalFooter>
  </CModal>
</template>
  
<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'
import SelectBeneficiario from './SelectBeneficiario.vue'
import FormularioCodificacionGastoDialog from './FormularioCodificacionGastoDialog.vue'
import CuentaService from '@/modules/rrhh/RegistroPersonal/services/DeparmentServices'
import AppDateField from '@/components/AppDateField.vue'
import { useToastStore } from '@/store/toast'
import { onlyNumber } from '@/utils/validator'
import { mapActions } from 'pinia'
import { formatPrice } from '@/utils/format'

import Api from '../../services/EjecucionServices'
import { props } from 'vue-number-format'
export default {
  name: 'CompranteGastoCapturaDialog',
  components: {
    CSmartTable,
    CModal,
    AppDateField,
    CIcon,
    SelectBeneficiario,
    FormularioCodificacionGastoDialog
  },

  data: function () {
    return {
      formatPrice,
      onlyNumber,
      displayConceptoGasto: {},
      disableFormaPago: false,
      disabledComprobante: true,
      cuentasBanco: [],
      isFormEventTypeValidated: false,
      detalleGasto: [],
      cuentaBanco: '',
      conceptosGasto: {
        require: true,
        type: Array,
        default: [],
      },
      displayBeneficiario: null,
      showBeneficiarioModal: false,
      ShowCodificacionGastoModal: false,
      profesionesList: [],
      tabPaneActiveKey: 1,
      reclutamientoObject: {},
      postRegistroGasto: {
        detalle: "",
        fecha: new Date(),
        etapa: 'Devengado',
        beneficiarioId: null,
        conceptoGastoId: null,
        grupoCompensacionId: null,
        bancoId: null,
        numeroCheque: "1",
        montoBruto: 0,
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
        { key: 'estructuraProgramatica', label: 'Estructura Programática', _style: { width: '40%' } },
        { key: 'clasificadorId', label: 'Clasificador' },
        { key: 'fuenteId', label: 'Fuente' },
        { key: 'fuenteEspecificaId', label: 'Fuente Específica' },
        { key: 'organismoFinanciadorId', label: 'Organismo Financiador' },
        { key: 'montoBruto', label: 'Monto Bruto' },
        { key: 'montoRetenciones', label: 'Retención' },
        { key: 'montoNeto', label: 'Neto' },
        { key: 'show_details', label: '', filter: false, sort: false },

      ]
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    clearForm() {
      this.displayBeneficiario = null
      this.displayConceptoGasto = {},
      this.postRegistroGasto = {
        detalle: "",
        fecha: new Date(),
        etapa: 'Devengado',
        beneficiarioId: null,
        conceptoGastoId: null,
        grupoCompensacionId: null,
        bancoId: null,
        numeroCheque: "1",
        montoBruto: 0,
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
        bancoId:0,
        estatus: true,
        formaPago: "Cheque",
        tipoGastoId: 1,
        detalleRegistroGastos: []
      }
    },
    changeEtapa(e) {
      if (e.target.value == 'Variacion') {
        this.disableFormaPago = true
        return;
      }
      this.disableFormaPago = false;
    },
    deleteDetalle(item) {
      this.postRegistroGasto.detalleRegistroGastos.splice(this.postRegistroGasto.detalleRegistroGastos.indexOf(item), 1);
    },
    changeFormaPago(e) {
      if (e.target.value == 'Reversar') {
        this.disabledComprobante = false
        return;
      }
      this.disabledComprobante = true;
    },
    getCuentabanco(e) {
      this.cuentaBanco = Array.from(e.target).filter(cuenta => cuenta.value == e.target.value)[0].label
    },
    saveDetalle(payload) {
      if (payload.detalleRetencion.length > 0) {
        let montoNeto = payload.detalleRetencion.map(detalle => (
          detalle.valorAplicado
        ))
        this.postRegistroGasto.montoNeto = montoNeto.reduce(function (a, b) {
          return a + b;
        });

        this.postRegistroGasto.detalleRegistroGastos = [payload, ...this.postRegistroGasto.detalleRegistroGastos]

        return;
      }
      this.postRegistroGasto.montoBruto = payload.montoBruto
      this.postRegistroGasto.detalleRegistroGastos = [payload, ...this.postRegistroGasto.detalleRegistroGastos]

    },

    getServiciosRequeridos() {
      CuentaService.getCuentasDeBancos().then(response => {
        this.cuentasBanco = response.data.data
      })


      Api.getConceptoGastos().then(({ data: { data } }) => {
        this.conceptosGasto = data.map(elem => ({
          code: elem.id,
          label: `${elem.id}-${elem.descripcion}`,
        }))
      })

    },

    closeBeneficiarioModal(payload) {
      if (payload.grupoBeneficiarioId) {
        this.displayBeneficiario = payload.beneficiarioNombre
        this.postRegistroGasto.grupoCompensacionId = payload.grupoBeneficiarioId
        this.postRegistroGasto.beneficiarioId = payload.beneficiarioId
        this.showBeneficiarioModal = false;
        return;
      }
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
      if (this.postRegistroGasto.bancoId) {
        this.ShowCodificacionGastoModal = true
        return;
      }
      this.show({
        content: 'Debe de seleccionar una cuenta',
        closable: true,
        color: 'danger'
      })
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.saveGasto()
      }
      this.isFormEventTypeValidated = true
    },

    saveGasto() {
      this.postRegistroGasto.conceptoGastoId = this.displayConceptoGasto.code
      this.$emit('post-gasto', {
        ...this.postRegistroGasto
      })
    },
  },

  watch: {
    showModal() {
      this.clearForm()
    },
    postGasto(newValue) {
      if (newValue) {
        this.postRegistroGasto = { ...newValue, conceptoGastoId: newValue.conceptoGasto.id, bancoId: newValue.banco.id, beneficiarioId: newValue.beneficiario.id }
        this.displayBeneficiario = newValue.beneficiario.descripcion
        this.cuentaBanco = newValue.banco.descripcion

        this.postRegistroGasto.detalleRegistroGastos.map(detalle => {
          detalle.id = 0
          detalle.detalleRetencion.forEach((item) => {
            item.beneficiarioId = item.beneficiario.id
            item.tipoRetencionId = item.tipoRetencion.id
          })
        })
      }
    }
  },

  props: {
    showModal: Boolean,
    postGasto: Object
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
  