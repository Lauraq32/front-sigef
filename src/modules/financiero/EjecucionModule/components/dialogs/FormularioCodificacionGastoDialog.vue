<template>
  <CModal size="xl" fullscreen :visible="showModal" @close="closeModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Documento del Gasto2</CModalTitle>
    </CModalHeader>
    <CModalBody>

      <CCardBody>
        <div class="row">

          <div class="col-4">
            <CForm :validated="isFormEventTypeValidated" ref="eventTypeForm">
              <div class="row">
                <CCol :md="8">
                  <CFormLabel for="nombre">Programa o Proyecto</CFormLabel>
                  <div class="position-relative">
                    <input v-model="detalleRegistroGasto.estructuraProgramatica" ref="name" disabled required class="form-control padding-input"
                      type="text" id="displayNameProfesion" />
                    <span class="position-absolute icon-input">
                      <CIcon icon="cisSearch" size="xl" v-on:click="showMestProgDialog" />
                    </span>
                  </div>
                  <!-- <button @click="showMestProgDialog">Estructura</button>
                 
                  <CFormInput maxlength="10" v-model="detalleRegistroGasto.estructuraProgramatica"
                    @keyup="getMestProg($event)" id="nombre" required /> -->
                </CCol>
                <CCol :md="4">
                  <CFormLabel for="nombre" class="font-weight-bold">Etapa:</CFormLabel>
                  <span>{{ registroGasto.etapa }}</span>
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Administracion Municipal</CFormLabel>
                  <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault1" label="Default radio" />
                </CCol>
                <hr>
                <CCol :md="6">
                  <CFormLabel for="nombre" class="font-weight-bold">Clasificador</CFormLabel>
                  <CFormInput v-model="detalleRegistroGasto.clasificadorId" id="nombre" required />
                </CCol>
                <CCol :md="6" class="border">
                  <CFormLabel for="nombre" class="font-weight-bold">Balance disponible</CFormLabel>
                  <label for="">{{ balanceDisponible }}</label>
                </CCol>

                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Monto Bruto</CFormLabel>
                  <CFormInput @change="setBaseImponible" v-model="detalleRegistroGasto.montoBruto" id="nombre" required />
                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Fuente financiamiento: <span
                      class="font-weight-bold">{{ ctgFuenteId }}</span> </CFormLabel>

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Fuente Especifica: <span class="font-weight-bold">{{
                    ctgFuenteEspecificaId }}</span></CFormLabel>

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Organismo Financiador: <span
                      class="font-weight-bold">{{ ctgOrganismoFinanciadorId }}</span></CFormLabel>

                </CCol>
                <CCol :md="12">
                  <CFormLabel for="nombre" class="font-weight-bold">Base Imponible</CFormLabel>
                  <CFormInput v-model="detalleRetencion.baseImponible" id="nombre" required />
                </CCol>
                <CCol :md="6">
                  <CCol :md="12">

                    <CFormLabel for="nombre">Tipo Retencion</CFormLabel>
                    <v-select v-model="tipoRetencionObj" :options="tipoRetencionesList" @input="setRetencion"></v-select>
                    <!-- <CFormSelect required v-model="detalleRetencion.tipoRetencionId" @change="setRetencion">
                      <option :key="0">Selecionar Tipo Retencion</option>
                      <option v-for="retencion in tipoRetencionesList" :value="JSON.stringify(retencion)"
                        :key="retencion.id">
                        {{ retencion.detalle }}
                      </option>
                    </CFormSelect> -->
                  </CCol>
                </CCol>
                <CCol :md="6">
                  <CFormLabel for="nombre" class="font-weight-bold">% o Valor</CFormLabel>
                  <CFormInput v-model="detalleRetencion.montoAplica" id="nombre" required />
                </CCol>
                <CCol :md="12">
                  <CCol :md="12">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value="Transferencia" name="flexRadioDefault"
                        id="flexRadioDefault1">
                      <label class="form-check-label" for="flexRadioDefault1">
                        Total
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value="Transferencia" name="flexRadioDefault"
                        id="flexRadioDefault1">
                      <label class="form-check-label" for="flexRadioDefault1">
                        SubTotal
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" value="Transferencia" name="flexRadioDefault"
                        id="flexRadioDefault1">
                      <label class="form-check-label" for="flexRadioDefault1">
                        Otros
                      </label>
                    </div>
                  </CCol>

                  <CCol :md="12">
                    <CButton style="font-weight: bold" color="info" @click="saveRetencion">Guardar Retencion</CButton>

                  </CCol>
                </CCol>
                <CCol :md="12">
                  <CSmartTable class="sticky-top" clickableRows :tableProps="{
                    striped: true,
                    hover: true,
                  }" :tableHeadProps="{}" :activePage="1" header :items="detalleRegistroGasto.detalleRetencion"
                    :columns="RetencionColumn" columnFilter :footer="footer" itemsPerPageSelect :itemsPerPage="5"
                    columnSorter :sorterValue="{ column: 'nombres', state: 'asc' }" pagination>
                    <!-- <template #tipoRetencionId="{ item, index }">
                      <td>
                        {{ item. }}
                      </td>
                    </template> -->
                    <template #show_details="{ item, index }">
                      <td>
                        <CDropdown>
                          <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem v-for="action in actions"
                              @click="action.clickHandler && action.clickHandler(item)">{{
                                action.label }}</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </td>
                    </template>
                  </CSmartTable>
                </CCol>
                <CButton style="font-weight: bold;width: 100%;" color="info" @click="saveDetalle">Guardar Detalle
                </CButton>
              </div>
            </CForm>
          </div>
          <div class="col-8">
            <CCol :md="12">
              <CSmartTable class="" clickableRows :tableProps="{
                striped: true,
                hover: true,
              }" :tableHeadProps="{}" :activePage="1" header :items="mestProgList" :columns="clasificadoresTables"
                columnFilter :footer="footer" itemsPerPageSelect :itemsPerPage="5" columnSorter
                :sorterValue="{ column: 'nombres', state: 'asc' }" pagination>
                <template #show_details="{ item, index }">
                  <td>
                    <CButton @click="selectMestProg(item)" color="primary" variant="outline" square size="sm">
                      Seleccionar
                    </CButton>
                  </td>
                </template>

              </CSmartTable>


            </CCol>
            <CCol :md="12">

            </CCol>
          </div>
        </div>
      </CCardBody>
    </CModalBody>
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
      TipoRetencionList: [{
        code: 0,
        label: 'Seleccionar',
      }],
      tipoRetencionObj: null,
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
        valorAplicado: 0
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

      RetencionColumn: [

        { key: 'tipoRetencionId', label: 'Retencion' },
        { key: 'montoAplica', label: '% o valor' },
        { key: 'montoAplicado', label: 'Del Valor' },
        { key: 'valorAplicado', label: 'Valor Aplicado' },
      ],
      clasificadoresByCuentaTables: [
        { key: 'clasificador', label: 'Clasificadores' },
        { key: 'nombre', label: 'Descripcion' },
        { key: 'presupuestoBco', label: 'P/Original' },
        { key: 'variacionBco', label: 'Modific.' },

        // { key: '1', label: 'P/Actual.' },
        { key: 'totalDevengadoBco', label: 'Devengado.' },
        { key: 'totalPagadoBco', label: 'Pagado' },
        { key: 'show_details', label: 'Seleccionar' },
      ],
      clasificadoresTables: [
        { key: 'clasificador', label: 'Clasificadores' },
        { key: 'nombre', label: 'Descripcion' },
        { key: 'presupuestoBco', label: 'P/Original', _style: { display: 'none' } },
        { key: 'variacionBco', label: 'Modific.', _style: { display: 'none' } },
        { key: 'fuenteEspecificaId', label: 'fuenteEspecificaId.', _style: { display: 'none' } },
        { key: 'fuenteId', label: 'fuenteId.', _style: { display: 'none' } },
        { key: 'organismoFinanciadorId', label: 'organismoFinanciadorId.' },
        // { key: '1', label: 'P/Actual.' },
        { key: 'totalDevengadoBco', label: 'Devengado.' },
        { key: 'totalPagadoBco', label: 'Pagado' },
        { key: 'show_details', label: 'Seleccionar' },
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
      this.isFormEventTypeValidated = true
    },
    guardarRetencion() {
      this.detalleRetencion.tipoRetencionId = this.tipoRetencionObj.code
      this.detalleRegistroGasto.detalleRetencion = [{ ...this.detalleRetencion }, ...this.detalleRegistroGasto.detalleRetencion]
    },

    saveDetalle() {
      this.$emit('saveDetalle', { ...this.detalleRegistroGasto })
    },

    closeModal() {
      this.$emit('closeModal')
    },

    getMestProg(item) {
      if (item.length == 10) {
        Api.getRegistroGastoMesProg(item).then(response => {
          if (response.data.data.length > 1) {
            var dataResponse = response.data.data.reduce((acc, current) => {
              acc.push({
                clasificador: current.clasificador,
                nombre: current.nombre,
                fuenteId: current.fuenteId,
                organismoFinanciadorId: current.organismoFinanciadorId,
                fuenteEspecificaId: current.fuenteEspecificaId,
                presupuestoBco: current[`presupuestoBco${this.registroGasto.bancoId}`],
                totalDevengadoBco: current[`totalDevengadoBco${this.registroGasto.bancoId}`],
                totalPagadoBco: current[`totalPagadoBco${this.registroGasto.bancoId}`],
                variacionBco: current[`variacionBco${this.registroGasto.bancoId}`],
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

        }).catch(error => console.log(error))
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
          label: 'Seleccionar',
        })
      })
    },

    setRetencion(data) {
      let retencion = data
      this.detalleRetencion.tipoRetencionId = retencion.id
      if (retencion) {
        this.detalleRetencion.montoAplica = retencion.porciento
      } else {
        this.detalleRetencion.montoAplica = retencion.porciento
      }
    },
    setBaseImponible(event) {
      this.detalleRetencion.baseImponible = event.target.value
    },

    selectMestProg(item) {
      this.detalleRegistroGasto.fuenteEspecificaId = item.fuenteEspecificaId
      this.detalleRegistroGasto.organismoFinanciadorId = item.organismoFinanciadorId
      this.detalleRegistroGasto.clasificadorId = item.clasificador
      this.detalleRegistroGasto.fuenteId = item.fuenteId
      this.balanceDisponible = item.presupuestoBco
    }
  },

  watch: {
    tipoRetencionObj(value) {
      this.detalleRetencion.montoAplica = value.porciento;
      switch (value.operacion) {
        case "Multiplicar":
          break;
        case "Dividir":
          this.detalleRetencion.valorAplicado = this.detalleRegistroGasto.montoBruto / this.detalleRetencion.montoAplica
          break;
        default:
          break;
      }
    }
  },

  props: {
    showModal: Boolean,
    registroGasto: Object
  },
  mounted() {
    this.getTipoRetenciones()
  }
}
</script>
<style>
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
    