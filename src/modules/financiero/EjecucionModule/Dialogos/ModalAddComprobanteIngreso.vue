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
              <div>
                <CFormLabel for="compIngresosId">No. de recibo:</CFormLabel>
                <CFormInput
                  id="compIngresosId"
                  required
                  v-model="ingresoPost.compIngresosId"
                >
                </CFormInput>
                <CFormFeedback invalid> Campo requerido</CFormFeedback>
              </div>

              <div class="row">
                <div class="col-6">
                  <CFormLabel for="fecha">Fecha</CFormLabel>
                  <CFormInput
                    v-model="ingresoPost.fecha"
                    type="date"
                    id="fecha"
                    required
                  />
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>

                <div class="col-6">
                  <CFormLabel for="etapa">Etapa</CFormLabel>
                  <CFormSelect required v-model="ingresoPost.etapa" id="etapa">
                    <option value="Ingreso">INGRESO</option>
                    <option value="Variacion">Variación</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
              </div>
            </div>

            <div class="col-6">
              <div>
                <CFormLabel for="displayNameContribuyentes"
                  >Contribuyente</CFormLabel
                >
                <div class="position-relative">
                  <vue3-simple-typeahead
                    type="text"
                    required
                    class="form-control padding-input"
                    v-model="ingresoPost.contribuyente.nombre"
                    id="displayNameContribuyentes"
                    placeholder="Escriba Aqui..."
                    :items="contribuyenteNameList"
                    :minInputLength="1"
                    @selectItem="selectItemEventHandler"
                    :itemProjection="mapContribuyenteItem"
                  >
                  </vue3-simple-typeahead>
                  <span
                    class="position-absolute icon-input"
                    v-if="!notAllowEdit"
                  >
                    <CIcon
                      icon="cisSearch"
                      size="xl"
                      v-on:click="() => (showContribuyentesModal = true)"
                    />
                  </span>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <CFormLabel for="tipoDcto">Tipo de Documento:</CFormLabel>
                  <CFormSelect
                    required
                    v-model="ingresoPost.contribuyente.tipoDcto"
                    id="tipoDcto"
                  >
                    <option value="Rnc">RNC</option>
                    <option value="Cedula">Cédula</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </CFormSelect>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
                <div class="col-6">
                  <CFormLabel for="rncCedPas">Documento:</CFormLabel>
                  <CFormInput
                    required
                    v-model="ingresoPost.contribuyente.rncCedPas"
                    id="rncCedPas"
                  >
                  </CFormInput>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <CFormLabel for="direccion">Dirección:</CFormLabel>
                  <CFormInput
                    v-model="ingresoPost.contribuyente.direccion"
                    id="direccion"
                  >
                  </CFormInput>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
                <div class="col-6">
                  <CFormLabel for="Teléfono">Teléfono:</CFormLabel>
                  <VueNumberFormat
                    id="Teléfono"
                    required
                    v-model:value="ingresoPost.contribuyente.telefono"
                    class="form-control"
                    :options="{
                      precision: 0,
                      prefix: '',
                      decimal: '',
                      thousand: '',
                    }"
                  >
                  </VueNumberFormat>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <CCol :md="12">
              <CFormLabel for="Detalle">Detalle</CFormLabel>
              <CFormTextarea
                style="resize: none"
                required
                v-model="ingresoPost.detalle"
                id="Detalle"
              ></CFormTextarea>
              <CFormFeedback invalid> Campo requerido</CFormFeedback>
            </CCol>
          </div>
        </CForm>

        <CForm
          class="needs-validation"
          novalidate
          :validated="isFormEventTypeValidatedDetalle"
          ref="eventTypeFormDetalle"
        >
          <div class="border-top pt-3">
            <div class="row">
              <div class="col-12 row align-items-center my-2">
                <CFormLabel for="ctgClasificadorId" class="col-1 col-form-label"
                  >Clasificador:</CFormLabel
                >
                <div class="col-2">
                  <div class="position-relative">
                    <input
                      v-model="detallePost.ctgClasificadorId"
                      ref="clasificatorField"
                      required
                      @keyup.enter.prevent="findClasificador"
                      maxlength="6"
                      class="form-control padding-input"
                      type="number"
                      id="ctgClasificadorId"
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
          </div>

          <div class="row border-bottom mb-3">
            <div class="col-12 row align-items-center my-2">
              <CFormLabel for="Monto" class="col-1 col-form-label"
                >Monto:</CFormLabel
              >
              <div class="col-2">
                <VueNumberFormat
                  id="Monto"
                  required
                  v-model:value="detallePost.valor"
                  class="form-control text-end"
                  :options="{
                    precision: 2,
                    prefix: '',
                    decimal: '.',
                    thousand: ',',
                  }"
                >
                </VueNumberFormat>

                <CFormFeedback invalid> Campo requerido</CFormFeedback>
              </div>

              <CFormLabel for="Cantidad" class="col-1 col-form-label"
                >Cantidad:</CFormLabel
              >
              <div class="col-1">
                <div class="col-md-12">
                  <VueNumberFormat
                    id="Cantidad"
                    required
                    v-model:value="detallePost.cantidad"
                    class="form-control text-end"
                    :options="{
                      precision: 0,
                      prefix: '',
                      decimal: '',
                      thousand: '',
                    }"
                  >
                  </VueNumberFormat>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>
              </div>

              <div
                class="col-3 d-flex justify-content-center align-items-center"
              >
                <span class="col-form-label fw-bold p-2">Sub total:</span>
                {{ subTotal }}
              </div>

              <div class="col-3 d-flex justify-content-end">
                <CButton
                  type="button"
                  class="mt-1"
                  color="info"
                  variant="outline"
                  @click="addDetalle"
                >
                  Agregar
                </CButton>
              </div>
            </div>
          </div>
        </CForm>
      </CCardBody>

      <CSmartTable
        clickableRows
        :tableProps="{
          striped: true,
          hover: true,
        }"
        :tableHeadProps="{}"
        :activePage="1"
        header
        :items="ingresoPost.detalleRegistroIngresos"
        :columns="columns"
        :footer="footerItem"
        columnFilter
        :itemsPerPage="5"
        columnSorter
        :sorterValue="{ column: 'status', state: 'asc' }"
        pagination
      >
        <template #finOrigin="{ item }">
          <td class="text-center">
            {{ item.ctgFuenteId }}/{{ item.ctgFuenteEspecificaId }}/{{
              item.ctgOrganismoFinanciadorId
            }}
          </td>
        </template>

        <template #subTotal="{ item }">
          <td class="text-end">
            {{ formatPrice(item.valor * item.cantidad) }}
          </td>
        </template>

        <template #cantidad="{ item }">
          <td class="text-end">
            {{ item.cantidad }}
          </td>
        </template>

        <template #valor="{ item }">
          <td class="text-end">
            {{ formatPrice(item.valor) }}
          </td>
        </template>
      </CSmartTable>
    </CModalBody>

    <CModalFooter>
      <CButton class="btn btn-secondary btn-block mt-1" @click="closeModal">
        Cancelar
      </CButton>

      <CButton class="btn btn-info btn-block mt-1" @click="sendData">
        Guardar
      </CButton>
    </CModalFooter>
  </CModal>

  <ClasificadorSelectorDialog
    :origin="'ingresos'"
    :isVisible="showFindClasificadorModal"
    @close="selectClasificator"
  />

  <contribuyentesDialog
    :showModal="showContribuyentesModal"
    @contribuyenteSeleccionado="setContribuyente"
    @closeModal="closeModalContribuyentes"
  />
</template>

<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import router from '@/router'
import { CModalFooter } from '@coreui/vue-pro'
import ClasificadorSelectorDialog from '@/modules/financiero/FormulacionModule/components/ClasificadorSelectorDialog.vue'
import contribuyentesDialog from '../Dialogos/ModalSelectContribuyentes.vue'
import Api from '../services/EjecucionServices'
import { formatPrice } from '@/utils/format'

export default {
  name: 'ModalAddComprobanteIngreso',
  components: {
    CModal,
    CModalFooter,
    CSmartTable,
    ClasificadorSelectorDialog,
    contribuyentesDialog,
  },

  data: function () {
    return {
      formatPrice,
      showContribuyentesModal: false,
      contribuyenteNameList: [],
      isFormEventTypeValidated: false,
      isFormEventTypeValidatedDetalle: false,
      showFindClasificadorModal: false,
      direccion: null,
      detallePost: {
        ctgClasificadorId: null,
        ctgFuenteId: null,
        ctgFuenteEspecificaId: null,
        ctgOrganismoFinanciadorId: null,
        fecha: new Date().toISOString(),
        etapa: null,
        institucionOrtongate: null,
        valor: 0,
        nombre: null,
        cantidad: 1,
      },
      ingresoPost: {
        compIngresosId: null,
        etapa: null,
        contribuyenteId: 0,
        contribuyente: {
          nombre: null,
          tipoDcto: null,
          rncCedPas: null,
          telefono: null,
          direccion: null,
        },
        detalle: null,
        fecha: new Date().toISOString(),
        detalleRegistroIngresos: [],
      },
      columns: [
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '7%' },
        },

        { key: 'nombre', label: 'Denominación', _style: { width: '10%' } },
        {
          key: 'finOrigin',
          label: 'O/Fin',
          _style: { width: '10%' },
        },

        {
          key: 'valor',
          label: 'Monto',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        },

        {
          key: 'cantidad',
          label: 'Cantidad',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        },

        {
          key: 'subTotal',
          label: 'Sub Total',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        },
      ],
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal', false)
      this.clearModaComprobanteIngreso()
    },

    closeModalContribuyentes() {
      this.showContribuyentesModal = false
    },

    addDetalle() {
      this.isFormEventTypeValidatedDetalle = false
      if (this.$refs.eventTypeFormDetalle.$el.checkValidity()) {
        this.ingresoPost.detalleRegistroIngresos = [
          { ...this.detallePost },
          ...this.ingresoPost.detalleRegistroIngresos,
        ]
      }
      this.isFormEventTypeValidatedDetalle = true
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

    selectItemEventHandler(payload) {
      this.ingresoPost.contribuyente = payload
    },

    mapContribuyenteItem(contribuyente) {
      return `${contribuyente.id}-${contribuyente.nombre} (${contribuyente.tipoDcto}:${contribuyente.rncCedPas})`
    },

    clearModaComprobanteIngreso() {
      this.id = null
      this.isFormEventTypeValidated = false
      this.isFormEventTypeValidatedDetalle = false
      this.ingresoPost = {
        compIngresosId: null,
        etapa: null,
        contribuyenteId: 0,
        contribuyente: {
          nombre: null,
          tipoDcto: null,
          rncCedPas: null,
          telefono: null,
          direccion: null,
        },
        detalle: null,
        fecha: null,
        detalleRegistroIngresos: [],
      }
      this.detallePost = {
        ctgClasificadorId: null,
        ctgFuenteId: 0,
        ctgFuenteEspecificaId: 0,
        ctgOrganismoFinanciadorId: 0,
        fecha: new Date().toISOString(),
        etapa: null,
        institucionOrtongate: 0,
        valor: 0,
        nombre: null,
        cantidad: 1,
      }
    },

    setContribuyente(payload) {
      this.selectItemEventHandler(payload)
      this.showContribuyentesModal = false
    },
  },
  computed: {
    subTotal() {
      if (
        Number.isNaN(this.detallePost.cantidad) ||
        Number.isNaN(this.detallePost.valor)
      ) {
        return ''
      }
      return formatPrice(this.detallePost.cantidad * this.detallePost.valor)
    },
  },
  watch: {
    showModal() {
      if (this.showModal) {
        Api.getContribuyente().then((response) => {
          this.contribuyenteNameList = response.data.data
        })
      }
    },
  },

  props: {
    showModal: Boolean,
    contribuyentesName: Array,
    contribuyentes: null,
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
