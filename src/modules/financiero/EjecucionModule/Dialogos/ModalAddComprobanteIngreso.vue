<template>
  <CModal backdrop="static" size="xl" :visible="showModal" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Comprobantes de ingresos</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="needs-validation"
          novalidate
          :validated="isFormEventTypeValidated"
          ref="eventTypeForm"
        >
          <div class="row">
            <div class="col-6">
              <div class="col-md-4">
                <CFormLabel for="validationCustom04"
                  >Comprobante No.:</CFormLabel
                >
                <CFormInput
                  required
                  v-model="ingresoPost.compIngresosId"
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </div>

              <div>
                <CFormLabel for="validationCustom04">No. de recibo:</CFormLabel>
                <CFormInput
                  required
                  v-model="ingresoPost.compIngresosId"
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </div>

              <div class="row">
                <div class="col-6">
                  <CFormLabel for="validationCustom02">Fecha</CFormLabel>
                  <CFormInput
                    v-model="ingresoPost.fecha"
                    type="date"
                    id="validationCustom02"
                    required
                  />
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>

                <div class="col-6">
                  <CFormLabel for="validationCustom04">Etapa</CFormLabel>
                  <CFormSelect
                    required
                    v-model="ingresoPost.etapa"
                    id="validationCustom05"
                  >
                    <option>INGRESO</option>
                    <option>Variación</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
              </div>
            </div>

            <div class="col-6">
              <div>
                <CFormLabel for="validationCustom04">Contribuyente</CFormLabel>
                <div class="position-relative">
                  <vue3-simple-typeahead
                    required
                    class="form-control"
                    v-model="ingresoPost.contribuyenteId"
                    id="validationCustom04"
                    placeholder="Escriba Aqui..."
                    :items="contribuyentesName"
                    :minInputLength="1"
                    @selectItem="selectItemEventHandler"
                  >
                  </vue3-simple-typeahead>
                  <span
                    class="position-absolute icon-input"
                    v-if="!notAllowEdit"
                  >
                    <CIcon icon="cisSearch" size="xl" />
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <CFormLabel for="validationCustom04"
                    >Tipo de Documento:</CFormLabel
                  >
                  <CFormSelect required id="validationCustom05">
                    <option>RNC</option>
                    <option>Cédula</option>
                    <option>Pasaporte</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
                <div class="col-6">
                  <CFormLabel for="validationCustom04">Documento:</CFormLabel>
                  <CFormInput
                    required
                    v-model="ingresoPost.compIngresosId"
                    id="validationCustom04"
                  >
                  </CFormInput>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <CFormLabel for="validationCustom04">Dirección:</CFormLabel>
                  <CFormTextarea
                    style="resize: none"
                    row="1"
                    required
                    v-model="ingresoPost.detalle"
                    id="validationCustom04"
                  ></CFormTextarea>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
                <div class="col-6">
                  <CFormLabel for="validationCustom04">Teléfono:</CFormLabel>
                  <CFormInput
                    required
                    v-model="ingresoPost.compIngresosId"
                    id="validationCustom04"
                  >
                  </CFormInput>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <CCol :md="12">
              <CFormLabel for="validationCustom04">Detalle</CFormLabel>
              <CFormTextarea
                style="resize: none"
                required
                v-model="ingresoPost.detalle"
                id="validationCustom04"
              ></CFormTextarea>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CCol>
          </div>

          <div class="border-top pt-3">
            <div class="row">
              <div class="col-12 row align-items-center my-2">
                <CFormLabel class="col-1 col-form-label"
                  >Clasificador:</CFormLabel
                >
                <div class="col-2">
                  <div class="position-relative">
                    <input
                      ref="clasificatorField"
                      required
                      @keyup.enter.prevent="findClasificador"
                      maxlength="6"
                      class="form-control padding-input"
                      type="number"
                      id="clasifica"
                      :disabled="notAllowEdit"
                    />
                    <span
                      class="position-absolute icon-input"
                      v-if="!notAllowEdit"
                    >
                      <CIcon
                        icon="cisSearch"
                        size="xl"
                        v-on:click="() => (showFindClasificadorModal = true)"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row border-bottom mb-3">
              <div class="col-12 row align-items-center my-2">
                <CFormLabel class="col-1 col-form-label">Monto:</CFormLabel>
                <div class="col-2">
                  <input class="form-control" />
                </div>

                <CFormLabel class="col-1 col-form-label">Cantidad:</CFormLabel>
                <div class="col-1">
                  <div class="col-md-12">
                    <input class="form-control" />
                  </div>
                </div>

                <div class="col-3">
                  <span class="col-form-label"
                    >Sub total: {{ 'romulo kelokapopo' }}</span
                  >
                </div>

                <div class="col-3 d-flex justify-content-end">
                  <CButton
                    class="btn btn-info btn-block mt-1"
                    @click="sendData"
                  >
                    Agregar
                  </CButton>
                </div>
              </div>
            </div>
          </div>
        </CForm>
      </CCardBody>

      <CSmartTable
        class="sticky-top"
        clickableRows
        :tableProps="{
          striped: true,
          hover: true,
        }"
        :tableHeadProps="{}"
        :activePage="1"
        header
        :items="ingresosList"
        :columns="columns"
        :footer="footerItem"
        itemsPerPageSelect
        columnFilter
        :itemsPerPage="5"
        columnSorter
        :sorterValue="{ column: 'status', state: 'asc' }"
        pagination
      >
      </CSmartTable>
    </CModalBody>

    <CModalFooter>
      <CButton class="btn btn-info btn-block mt-1" @click="sendData">
        Guardar
      </CButton>
    </CModalFooter>
  </CModal>

  <ClasificadorSelectorDialog
    :isVisible="showFindClasificadorModal"
    :filtered="
      (clasificator) =>
        clasificator.tipo === 'DETALLE' &&
        clasificator.origen === 'INGRESO' &&
        clasificator?.clasifica?.toString().match(/^(1|3)/g)
    "
    @close="selectClasificator"
  />
</template>

<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import router from '@/router'
import { CModalFooter } from '@coreui/vue-pro'
import ClasificadorSelectorDialog from '@/modules/financiero/FormulacionModule/components/ClasificadorSelectorDialog.vue'

export default {
  name: 'ModalAddComprobanteIngreso',
  components: {
    CModal,
    CModalFooter,
    CSmartTable,
    ClasificadorSelectorDialog,
  },

  data: function () {
    return {
      isFormEventTypeValidated: false,
      showFindClasificadorModal: false,
      ingresoPost: {
        compIngresosId: '2',
        etapa: 'Ingreso',
        contribuyenteId: 4,
        detalle: 'hola',
        fecha: '2023-05-22',
        detalleRegistroIngresos: [
          {
            ctgClasificadorId: '151312',
            ctgFuenteId: '20',
            ctgFuenteEspecificaId: '0332',
            ctgOrganismoFinanciadorId: '100',
            fecha: '2023-05-22',
            etapa: 'INGRESO',
            institucionOrtongate: '0',
            valor: 2500,
          },
        ],
      },
      columns: [
        {
          key: '',
          label: 'Clasificador',
          _style: { width: '7%' },
        },

        { key: '', label: 'Denominación', _style: { width: '10%' } },
        { key: '', label: 'Fuente Financiera', _style: { width: '10%' } },
        { key: '', label: 'Fuente Específico', _style: { width: '10%' } },
        {
          key: '',
          label: 'Origen Financiador',
          _style: { width: '18%' },
        },
        { key: '', label: 'Monto', _style: { width: '10%' } },
      ],
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal', false)
      this.clearModaComprobanteIngreso()
    },

    addComprobanteIngreso() {
      this.$emit('addComprobanteIngreso', this.ingresoPost)
      this.clearModaComprobanteIngreso()
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.addComprobanteIngreso({ ...this.ingresoPost })
      }
      this.isFormEventTypeValidated = true
    },

    goToContribuyentes() {
      router.push({ name: 'Contribuyentes' })
    },

    selectItemEventHandler(id) {
      this.ingresoPost.contribuyenteId = id.split('-')[0]
    },

    clearModaComprobanteIngreso() {
      this.id = null
      this.ingresoPost = {
        transaccionId: 0,
        ayuntamientoId: this.$ayuntamientoId,
        anioFiscalId: this.$fiscalYearId,
        numeroComprobante: 0,
        compIngresosId: '',
        etapa: 'INGRESOS',
        contribuyenteId: 0,
        detalle: '',
        fecha: new Date(Date.now()),
        totalValor: 0,
        estatus: 'A',
      }
    },
  },

  props: {
    showModal: Boolean,
    contribuyentesName: Array,
  },
}
</script>

<style scoped>
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
