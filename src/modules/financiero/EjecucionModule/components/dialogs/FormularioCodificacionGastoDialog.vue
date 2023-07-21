<template>
  <CModal size="xl" fullscreen :visible="showModal" @close="closeModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Distribuci&oacute;n del Gasto</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <div class="row">
          <div class="col-4">
            <CForm :validated="isFormEventTypeValidated" ref="eventTypeForm">
              <div class="row">
                <CCol :md="8" class="mb-3">
                  <CFormLabel for="estructuraProgramatica">Programa o Proyecto</CFormLabel>
                  <div class="position-relative">
                    <input v-model="detalleRegistroGasto.estructuraProgramatica" ref="name" disabled required
                      class="form-control padding-input" type="text" id="displayNameProfesion" />
                    <span class="position-absolute icon-input">
                      <CIcon icon="cisSearch" size="xl" v-on:click="showMestProgDialog" />
                    </span>
                  </div>
                </CCol>
                <CCol :md="4" class=" text-center">
                  <CFormLabel for="etapa" class="d-block">Etapa:</CFormLabel>
                  <span class="fw-bold">{{ registroGasto.etapa }}</span>
                </CCol>
                <hr>
                <CCol :md="6">
                  <CFormLabel for="clasificadorId">Clasificador</CFormLabel>

                  <CFormInput disabled :keypress="onlyNumber" v-model="detalleRegistroGasto.clasificadorId" id="nombre"
                    required />
                </CCol>
                <CCol :md="6" class="border text-center">
                  <CFormLabel for="balanceDisponible" class="font-weight-bold ">Balance Disponible</CFormLabel>
                  <span class="d-block" style="font-weight: bold;">{{ formatPrice(balanceDisponible) }}</span>
                </CCol>
                <CCol :md="12" class="mt-3 p-2 bg-light bg-clasificador text-center">
                  <span class="fw-bold"> {{ nombreClasificador }} </span>
                </CCol>
                <CCol :md="6" class="mt-3">
                  <CFormLabel for="montoBruto" class="font-weight-bold">Monto Bruto</CFormLabel>
                  <VueNumberFormat v-model:value="detalleRegistroGasto.montoBruto" @change="setMontoBruto" type="text"
                    step="any" class="form-control text-end" :options="{
                      precision: 2,
                      prefix: '',
                      decimal: '.',
                      thousand: ',',
                    }"></VueNumberFormat>
                </CCol>
                <CCol :md="6" class="mt-3">
                  <CFormLabel for="baseImponible" class="font-weight-bold">Base Imponible</CFormLabel>
                  <VueNumberFormat v-model:value="detalleRetencion.baseImponible" @change="setBaseImponible" type="text"
                    step="any" class="form-control text-end" :options="{
                      precision: 2,
                      prefix: '',
                      decimal: '.',
                      thousand: ',',
                    }"></VueNumberFormat>

                </CCol>
                <fieldset :disabled="registroGasto.etapa !== 'Pagado'">
                  <legend>Retenciones</legend>
                  <div class="row">

                    <CCol :md="6">
                      <v-select :disabled="registroGasto.etapa !== 'Pagado' || this.detalleRegistroGasto.montoBruto == 0"
                        v-model="tipoRetencionObj" :options="tipoRetencionesList" @input="setRetencion"></v-select>
                    </CCol>
                    <CCol :md="2">

                      <VueNumberFormat v-model:value="detalleRetencion.montoAplica" type="text"
                        class="form-control text-end" :options="{
                          precision: 2,
                          prefix: '',
                          decimal: '.',
                          thousand: ',',
                        }">
                      </VueNumberFormat>
                    </CCol>
                    <CCol :md="4">

                      <v-select :disabled="registroGasto.etapa !== 'Pagado' || this.detalleRegistroGasto.montoBruto == 0"
                        v-model="delValor" :options="RetencionesSelectList" @input="setRetencion"></v-select>
                    </CCol>

                    <CCol :md="6">
                      <CButton class="fw-bold text-white" color="info" @click="saveRetencion">Guardar</CButton>

                    </CCol>
                  </div>
                </fieldset>

                <CCol :md="12">
                  <CSmartTable class="" clickableRows :tableProps="{
                    striped: true,
                    hover: true,
                  }" :tableHeadProps="{}" :activePage="1" header :items="detalleRegistroGasto.detalleRetencion"
                    :columns="RetencionColumn" columnFilter :footer="footerItemRetenciones" :itemsPerPage="10"
                    columnSorter :sorterValue="{ column: 'nombres', state: 'asc' }" pagination>
                    <template #montoAplicado="{ item, index }">
                      <td>
                        {{ formatPrice(item.montoAplicado) }}
                      </td>
                    </template>
                    <template #valorAplicado="{ item, index }">
                      <td>
                        {{ formatPrice(item.valorAplicado) }}
                      </td>
                    </template>
                    <template #show_details="{ item, index }">
                      <td>
                        <CButton class="fw-bold text-white" color="danger" size="sm" @click="deleteRetencion">&times;
                        </CButton>
                      </td>
                    </template>
                  </CSmartTable>
                </CCol>

              </div>
            </CForm>
          </div>
          <div class="col-8">
            <CCol :md="12">
              <h5>Cuenta Banco: <span class="fw-bold">{{ cuentaBanco }}</span> </h5>

              <CSmartTable class="" clickableRows :tableProps="{
                striped: true,
                hover: true,
              }" :tableHeadProps="{}" :activePage="1" header :items="mestProgList" :columns="clasificadoresTables"
                :footer="footer" :sorterValue="{ column: 'nombres', state: 'asc' }" pagination>
                <template #show_details="{ item, index }">
                  <td>
                    <CButton @click="selectMestProg(item)" color="primary" variant="outline" square size="sm">
                      Seleccionar
                    </CButton>
                  </td>
                </template>
                <template #presupuestoBco="{ item, index }">
                  <td>
                    {{ formatPrice(item.presupuestoBco) }}
                  </td>
                </template>
                <template #variacionBco="{ item, index }">
                  <td>
                    {{ formatPrice(item.variacionBco) }}
                  </td>
                </template>
                <template #pActual="{ item, index }">
                  <td>
                    {{ formatPrice(item.pActual) }}
                  </td>
                </template>
                <template #devengadoEjecutado="{ item, index }">
                  <td>
                    {{ formatPrice(item.devengadoEjecutado) }}
                  </td>
                </template>
                <template #devengadoDisponible="{ item, index }">
                  <td>
                    {{ formatPrice(item.devengadoDisponible) }}
                  </td>
                </template>
                <template #pagadoEjecutado="{ item, index }">
                  <td>
                    {{ formatPrice(item.pagadoEjecutado) }}
                  </td>
                </template>
                <template #pagadoDisponible="{ item, index }">
                  <td>
                    {{ formatPrice(item.pagadoDisponible) }}
                  </td>
                </template>

              </CSmartTable>
            </CCol>
            <CCol :md="12">
              <h3>holaa</h3>
              <div class="row">
                  <div class="col-4">
                    <h4>Un texto grande</h4>
                  </div>
                  <div class="col-8">
                    <div class="col-4">una cuenta</div>
                    <div class="col-4">una cuenta</div>
                    <div class="col-4">una cuenta</div>
                    <div class="col-4">una cuenta</div>
             
                  </div>
                  
              </div>
            </CCol>
          </div>
        </div>
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <div>
        <div class="d-inline p-2">
          <CButton style="font-weight: bold;width: 100%;" color="info" @click="saveDetalle">Guardar Detalle
          </CButton>
        </div>
      </div>
    </CModalFooter>

  </CModal>

  <MestProgDialog @closeMestProg="closeMestProgDialog" :showModal="MestProgDialogProp" />
</template>
    
<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'
import Api from '../../services/EjecucionServices'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import MestProgDialog from './MestProgDialog.vue'
import { onlyNumber } from '@/utils/validator'
import { formatPrice } from '@/utils/format'
export default {
  name: 'FormularioCodificacionGasto',
  components: {
    CSmartTable,
    CModal,
    CIcon,
    MestProgDialog
  },

  data: function () {
    return {
      formatPrice,
      TipoRetencionList: [{
        code: 0,
        label: 'Seleccionar',
      }],
      nombreClasificador: '',
      delValor: {
        require: true,
        type: Array,
        default: [],
      },
      tipoRetencionObj: {
        require: true,
        type: Array,
        default: [],
      },
      MestProgDialogProp: false,
      profesionesList: [],
      mestProgList: [],
      tipoRetencionesList: [],
      tabPaneActiveKey: 1,
      reclutamientoObject: {},
      ctgFuenteEspecificaId: '',
      ctgOrganismoFinanciadorId: '',
      ctgFuenteId: '',
      isFormEventTypeValidated: false,
      balanceDisponible: null,
      detalleRetencion: {
        fecha: '2023-07-07',
        beneficiarioId: 1,
        tipoRetencionId: 0,
        montoAplica: 0,
        montoAplicado: 0,
        valorAplicado: 0,
        nombreRetencion: ''
      },
      detalleRegistroGasto: {
        fecha: '2023-07-07',
        bancoId: 1,
        estructuraProgramatica: "",
        clasificadorId: "",
        fuenteId: "",
        fuenteEspecificaId: "",
        organismoFinanciadorId: "",
        funcionId: "",
        montoBruto: 0,
        baseImponible: 0,
        retenciones: 0,
        neto: 0,
        detalleRetencion: []
      },

      RetencionesSelectList: [
        { key: 'Total', label: 'del Total' },
        { key: 'SubTotal', label: 'del SubTotal' },
      ],
      RetencionColumn: [

        { key: 'nombreRetencion', label: 'Retencion', filter: false, sort: false },
        { key: 'montoAplica', label: '% o valor', filter: false, sort: false },
        { key: 'montoAplicado', label: 'Del Valor', filter: false, sort: false },
        { key: 'valorAplicado', label: 'Valor Aplicado', filter: false, sort: false },
        { key: 'show_details', label: '', filter: false, sort: false },
      ],
      clasificadoresByCuentaTables: [
        { key: 'clasificador', label: 'Clasificadores' },
        { key: 'OFin', label: 'O/Fin' },
        { key: 'nombre', label: 'Descripcion' },
        { key: 'presupuestoBco', label: 'P/Original' },
        { key: 'variacionBco', label: 'Modific.' },

        { key: 'totalDevengadoBco', label: 'Devengado.' },
        { key: 'totalPagadoBco', label: 'Pagado' },
        { key: 'show_details', label: '' },
      ],
      footerItemRetenciones: [
        {
          label: '',
          _props: {
            color: '',
            colspan: 2,
            style: 'font-weight:bold;',
          },
        },
        {
          label: '',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },

        {
          label: '',
          _props: {
            color: '',
            colspan: 2,
            style: 'font-weight:bold;',
          },
        },

      ],
      clasificadoresTables:
        [

          {
            group: ' ',
            children: [
              { key: 'clasificador', label: 'Clasificador' },
              { key: 'nombre', label: 'Descripcion' },
              { key: 'OFin', label: 'O/Fin' },
              { key: 'presupuestoBco', label: 'P/Original' },
              { key: 'variacionBco', label: 'Modific.' },
              { key: 'pActual', label: 'P/Actual' },
            ]
          },
          {
            group: 'Devengado',
            children: [
              { key: 'devengadoEjecutado', label: 'Ejecutado.' },
              { key: 'devengadoDisponible', label: 'Disponible.' },
            ],
            _props: { class: 'text-center' }
          },
          {
            group: 'Pagado',
            children: [
              { key: 'pagadoEjecutado', label: 'Ejecutado' },
              { key: 'pagadoDisponible', label: 'Disponible.' },
            ],
            _props: { class: 'text-center' }
          },
          { key: 'show_details', label: '' }

        ]
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),

    showMestProgDialog() {
      this.MestProgDialogProp = true;
    },

    closeMestProgDialog(data) {
      this.detalleRegistroGasto.funcionId = data.ctgFuncionId;
      this.ctgFuenteId = data.ctgFuncionId
      this.detalleRegistroGasto.estructuraProgramatica = data.numero
      this.getMestProg(data.numero)
      this.MestProgDialogProp = false;
    },

    saveRetencion() {
      this.guardarRetencion()
    },
    saveDetalle() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        this.saveDetalle()
      }
      this.closeModal()
      this.isFormEventTypeValidated = true
    },
    guardarRetencion() {
      if (this.tipoRetencionObj.code) {
        this.detalleRegistroGasto.neto = this.detalleRetencion.baseImponible
        this.detalleRetencion.tipoRetencionId = this.tipoRetencionObj.code
        this.detalleRetencion.nombreRetencion = this.tipoRetencionObj.label
        this.detalleRetencion.montoAplicado = this.detalleRegistroGasto.montoBruto
        this.detalleRegistroGasto.detalleRetencion = [{ ...this.detalleRetencion }, ...this.detalleRegistroGasto.detalleRetencion]
        this.footerItemRetenciones[2].label = this.formatPrice(Number(this.detalleRetencion.valorAplicado) + Number(this.footerItemRetenciones[2].label))
        this.footerItemRetenciones[1].label = this.formatPrice(Number(this.detalleRegistroGasto.montoBruto) - Number(this.footerItemRetenciones[2].label))
        return
      }
      this.show({
        content: 'Debe elegir un tipo de Retención',
        closable: true,
        color: 'danger'
      })



      this.detalleRetencion = {
        fecha: '2023-07-07',
        beneficiarioId: 1,
        tipoRetencionId: 0,
        montoAplica: 0,
        montoAplicado: 0,
        valorAplicado: 0,
        nombreRetencion: ''
      }
      this.tipoRetencionObj = {
        require: true,
        type: Array,
        default: [],
      }

      this.delValor = {
        require: true,
        type: Array,
        default: [],
      }

    },

    saveDetalle() {
      this.$emit('saveDetalle', { ...this.detalleRegistroGasto })
    },

    closeModal() {
      this.$emit('closeModal')
    },

    deleteRetencion(item) {
      this.detalleRegistroGasto.detalleRetencion.splice(this.detalleRegistroGasto.detalleRetencion.indexOf(item), 1);
      this.footerItemRetenciones[2].label = this.formatPrice(Number(this.detalleRetencion.valorAplicado) + Number(this.footerItemRetenciones[2].label))
      this.footerItemRetenciones[1].label = this.formatPrice(Number(this.detalleRegistroGasto.montoBruto) - Number(this.footerItemRetenciones[2].label))
    },

    getMestProg(item) {
      if (item.length == 10) {
        Api.getRegistroGastoMesProg(item).then(response => {
          if (response.data.data.length > 1) {
            var clasificadores = response.data.data.filter(item => item.clasificador.length == 6)
            var dataResponse = clasificadores.reduce((acc, current) => {
              acc.push({
                clasificador: current.clasificador,
                nombre: current.nombre,
                fuenteId: current.fuenteId,
                organismoFinanciadorId: current.organismoFinanciadorId,
                fuenteEspecificaId: current.fuenteEspecificaId,
                presupuestoBco: current[`presupuestoBco${this.registroGasto.bancoId}`],
                OFin: `${current.fuenteId}/${current.organismoFinanciadorId}/${current.fuenteEspecificaId}`,
                totalPagadoBco: current[`totalPagadoBco${this.registroGasto.bancoId}`],
                variacionBco: current[`variacionBco${this.registroGasto.bancoId}`],
                pActual: current[`presupuestoBco${this.registroGasto.bancoId}`] + current[`variacionBco${this.registroGasto.bancoId}`],
                devengadoEjecutado: this.registroGasto.etapa == 'Devengado' ? current[`totalDevengadoBco${this.registroGasto.bancoId}`] : 0,
                devengadoDisponible: this.registroGasto.etapa == 'Devengado' ? (current[`presupuestoBco${this.registroGasto.bancoId}`] + current[`variacionBco${this.registroGasto.bancoId}`]) - current[`totalDevengadoBco${this.registroGasto.bancoId}`] : 0,
                pagadoEjecutado: this.registroGasto.etapa == 'Pagado' ? current[`totalPagadoBco${this.registroGasto.bancoId}`] : 0,
                pagadoDisponible: this.registroGasto.etapa == 'Pagado' ? current[`totalDevengadoBco${this.registroGasto.bancoId}`] - current[`totalPagadoBco${this.registroGasto.bancoId}`] : 0
              });
              return acc;
            }, []);
            this.mestProgList = dataResponse;

            this.show({
              content: 'Data encontrada con exito',
              closable: true,
            })
          } else {
            this.show({
              content: 'No se encontraron datos',
              closable: true,
              color: 'danger'
            })
            this.mestProgList = []
          }

        }).catch(error => this.show({
          content: error.message,
          closable: true,
          color: 'danger'
        }))
      }
    },

    getTipoRetenciones() {
      Api.getTipoRetencion().then(({ data: { data } }) => {
        this.tipoRetencionesList = data.map((elem) => ({
          code: elem.id,
          label: `(${elem.id})  ${elem.detalle}`,
          porciento: elem.porciento,
          operacion: elem.operacion,
          porciento: elem.porciento,
        }))
        this.tipoRetencionesList.unshift({
          code: 0,
          label: 'Tipo de retención',
        })
      })
    },

    setRetencion(data) {
      let retencion = data
      this.detalleRetencion.tipoRetencionId = retencion.id
      if (retencion) {
        this.detalleRetencion.montoAplica = retencion.porciento
      }
    },
    setMontoBruto(event) {
      if (this.balanceDisponible >= Number(event.target.value.replaceAll(',', ''))) {
        this.detalleRetencion.baseImponible = event.target.value
        return;
      }
      this.show({
        content: 'No puede superar el balance disponible',
        closable: true,
        color: 'danger'
      })
      this.detalleRegistroGasto.montoBruto = 0;
    },

    setBaseImponible(event) {
      if (this.balanceDisponible > event.target.value) {
        return;
      }
      this.show({
        content: 'No puede superar el balance disponible',
        closable: true,
        color: 'danger'
      })
      this.detalleRegistroGasto.baseImponible = 0;
    },

    selectMestProg(item) {
      this.nombreClasificador = item.nombre
      this.detalleRegistroGasto.fuenteEspecificaId = item.fuenteEspecificaId
      this.detalleRegistroGasto.organismoFinanciadorId = item.organismoFinanciadorId
      this.detalleRegistroGasto.clasificadorId = item.clasificador
      this.detalleRegistroGasto.fuenteId = item.fuenteId
      if (this.registroGasto.etapa == 'Devengado') {
        if (item.devengadoEjecutado !== item.devengadoDisponible) {
          this.balanceDisponible = item.devengadoDisponible;
          return;
        }

      }

      this.balanceDisponible = item.pagadoDisponible;


    }
  },

  watch: {

    tipoRetencionObj(value) {

      this.detalleRetencion.montoAplica = value.porciento;
      switch (value.operacion) {
        case "Multiplicar":
          this.detalleRetencion.valorAplicado = value.calculada ? this.detalleRegistroGasto.montoBruto * (this.detalleRetencion.montoAplica / 100) : this.detalleRegistroGasto.montoBruto + this.detalleRetencion.montoAplica
          this.detalleRetencion.neto = this.detalleRetencion.valorAplicado
          break;
        case "Dividir":
          this.detalleRetencion.valorAplicado = value.calculada ? this.detalleRegistroGasto.montoBruto / 1.10 : this.detalleRegistroGasto.montoBruto + this.detalleRetencion.montoAplica
          this.detalleRetencion.neto = this.detalleRetencion.valorAplicado
          break;
        default:
          break;
      }
    }
  },

  props: {
    showModal: Boolean,

    registroGasto: Object,
    cuentaBanco: String
  },
  mounted() {
    this.getTipoRetenciones()

  }
}
</script>
<style>
.bg-clasificador {

  --cui-light-rgb: 225, 225, 225
}

.big-modal {
  width: calc(100vw - 2rem);
  margin: 1rem;
  height: calc(100% - 2rem);
}

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
    