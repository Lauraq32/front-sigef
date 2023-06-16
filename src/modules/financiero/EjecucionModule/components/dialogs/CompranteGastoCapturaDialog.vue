<template>
  <CModal size="xl" :visible="showModal" @close="closeModal" backdrop="static">
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
                        <CFormInput v-model="postRegistroGasto.fecha" type="date" id="nombre" required />


                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="nombre">Estatus</CFormLabel>
                        <CFormInput v-model="postRegistroGasto.estatus" id="nombre" required />


                      </CCol>
                      <CCol :md="6">
                        <CFormLabel for="nombre">Etapa</CFormLabel>
                        <CFormSelect v-model="postRegistroGasto.etapa" id="validationCustom05">
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
                        <CFormInput v-model="postRegistroGasto.fechaResolucion" type="date" id="nombre" required />


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
                          <input v-model="displayBeneficiario" ref="name" disabled required
                            class="form-control padding-input" type="text" id="displayNameProfesion" />
                          <span class="position-absolute icon-input">
                            <CIcon icon="cisSearch" size="xl" v-on:click="openBeneficiarioModal" />
                          </span>
                        </div>

                      </CCol>
                      <CCol :md="12">
                        <CFormLabel for="nombre">Por Concepto de</CFormLabel>
                        <CFormInput v-model="postRegistroGasto.conceptoGastoId" id="nombre" required />


                      </CCol>
                      <CCol :md="12">
                        <CFormLabel for="nombre">Cta Bancaria</CFormLabel>
                        <CFormInput v-model="postRegistroGasto.bancoId" id="nombre" required />


                      </CCol>

                    </div>
                  </CCol>
                </div>
                <div class="col-12">
                  <label for="">Detalle</label>
                  <textarea v-model="postRegistroGasto.detalle" name="" id="" style="width: 100%;">

                  </textarea>
                </div>
              </div>




            </div>
          </div>
          <CButton
          style="font-weight: bold"
          color="info"
          @click="
            () => {
              lgDemo = true
            }
          "
          >Agregar</CButton
        >
        </CForm>
        <CSmartTable class="sticky-top" clickableRows :tableProps="{
          striped: true,
          hover: true,
        }" :tableHeadProps="{}" :activePage="1" header :items="postRegistroGasto.detalleRegistroGastos"
          :columns="detalleGastoColumns" columnFilter :footer="footer" itemsPerPageSelect :itemsPerPage="5" columnSorter
          :sorterValue="{ column: 'nombres', state: 'asc' }" pagination>
          <template #show_details="{ item, index }">
            <td>
              <CDropdown>
                <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem v-for="action in actions" @click="action.clickHandler && action.clickHandler(item)">{{
                    action.label }}</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </td>
          </template>
        </CSmartTable>
      </CCardBody>
    </CModalBody>
   
  </CModal>
  <SelectBeneficiario :isVisible="showBeneficiarioModal" @close="close" />
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
      detalleGasto: [],
      displayBeneficiario: null,
      postRegistroGasto: {
        formaPago: "Cheque",
        detalle: "string",
        fecha: "'2023-06-16T14:22:57.408Z'",
        etapa: "Ingreso",
        beneficiarioId: 0,
        conceptoGastoId: 0,
        bancoId: 0,
        numeroCheque: "string",
        totalBruto: 0,
        montoNeto: 0,
        fechaResolucion: "'2023-06-16T14:22:57.408Z'",
        numeroResolucion: 'string',
        cantidadFacturaCXP: 0,
        totalCXP: 0,
        cantidadPagoXGrupo: 0,
        totalPagoXGrupo: 0,
        cantidadRetencion: 0,
        totalRetenciones: 0,
        documentoInicial: 0,
        documentoFinal: 0,
        cantidadDocumento: 0,
        estatus: true,
        tipoGastoId: 0,
        detalleRegistroGastos: [
          {
            fecha: "2023-06-16T14:22:57.408Z",
            bancoId: 0,
            estructuraProgramatica: 'string',
            clasificadorId: 'string',
            fuenteId: 'string',
            fuenteEspecificaId: 'string',
            organismoFinanciadorId: 'string',
            funcionId: 'string',
            montoBruto: 0,
            baseImponible: 0,
            montoRetenciones: 0,
            neto: 0,
            detalleRetencion: [
              {
                fecha: '2023-06-16T14:22:57.408Z',
                beneficiarioId: 0,
                tipoRetencionId: 0,
                montoAplica: 0,
                montoAplicado: 0,
                detalleRegistroGastoId: 0
              }
            ]
          }
        ]
      },
      showBeneficiarioModal: false,
      profesionesList: [],
      tabPaneActiveKey: 1,
      reclutamientoObject: {},
      detalleGastoColumns: [
        { key: 'estructuraProgramatica', label: 'Estructura Programatica', _style: { width: '40%' } },
        { key: 'clasificadorId', label: 'Clasificador'},
        { key: 'fuenteEspecificaId', label: 'Fuente especifica'},
        { key: 'organismoFinanciadorId', label: 'Organismo Financiador'},
        { key: 'montoBruto', label: 'Monto'},
      ]
    }
  },

  methods: {
    close(payload) {
      console.log('se cerro', payload);
      this.displayBeneficiario = payload.nombre
      this.postRegistroGasto.beneficiarioId = payload.beneficiarioId
      this.showBeneficiarioModal = false;
    },

    closeModal() {
      this.$emit('closeModal')
    },

    openBeneficiarioModal() {
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
  