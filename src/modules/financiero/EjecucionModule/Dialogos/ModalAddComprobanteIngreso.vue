<template>
  <CModal backdrop="static" size="xl" :visible="showModal" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Comprobantes de Ingresos</CModalTitle>
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
              <div class="row">
                <div class="col-6">
                  <CFormLabel for="codigoIngresoTalonario"
                    >No. de Recibo:</CFormLabel
                  >
                  <CFormInput
                    id="codigoIngresoTalonario"
                    v-model="ingresoPost.codigoIngresoTalonario"
                  >
                  </CFormInput>
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <CFormLabel for="fecha">Fecha</CFormLabel>
                  <CFormInput v-model="fecha" type="date" id="fecha" required />
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </div>

                <div class="col-6">
                  <CFormLabel for="etapa">Etapa</CFormLabel>
                  <CFormSelect required v-model="ingresoPost.etapa" id="etapa">
                    <option value="Ingreso">Ingreso</option>
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
                  <CFormInput
                    required
                    class="form-control padding-input"
                    v-model="ingresoPost.contribuyente.nombre"
                    id="displayNameContribuyentes"
                  >
                  </CFormInput>
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
                  <CFormLabel for="tipoDocumento"
                    >Tipo de Documento:</CFormLabel
                  >
                  <CFormSelect
                    required
                    v-model="ingresoPost.contribuyente.tipoDocumento"
                    id="tipoDocumento"
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
                  <CFormLabel for="documento">Documento:</CFormLabel>
                  <CFormInput
                    v-on:keypress="checkDocument($event)"
                    required
                    v-model="ingresoPost.contribuyente.documento"
                    id="documento"
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
                  <CFormInput
                    class="form-control"
                    v-model="ingresoPost.contribuyente.telefono"
                    id="Teléfono"
                    required
                    @keypress="onlyNumber"
                  />
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
                <CurrencyInput
                  class="form-control text-end"
                  required
                  id="presupuestoBco1"
                  v-model="detallePost.valor"
                  :options="{
                    locale: 'en-US',
                    currency: 'USD',
                    precision: 2,
                    currencyDisplay: 'hidden',
                  }"
                />
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
        no-items-label="No hay registros"
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
            {{
              formatPrice(
                Number(item.valor.toString().replace(',', '') ?? 0) *
                  item.cantidad,
              )
            }}
          </td>
        </template>

        <template #cantidad="{ item }">
          <td class="text-end">
            {{ item.cantidad }}
          </td>
        </template>

        <template #valor="{ item }">
          <td class="text-end">
            {{
              formatPrice(Number(item.valor.toString().replace(',', '') ?? 0))
            }}
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
import { onlyNumber } from '@/utils/validator'
import { mapActions } from 'pinia'
import { CModalFooter } from '@coreui/vue-pro'
import ClasificadorSelectorDialog from '@/modules/financiero/FormulacionModule/components/ClasificadorSelectorDialog.vue'
import contribuyentesDialog from '../Dialogos/ModalSelectContribuyentes.vue'
import Api from '../services/EjecucionServices'
import { formatPrice, formatDate } from '@/utils/format'
import { useToastStore } from '@/store/toast'
import CurrencyInput from '@/utils/CurrencyInput.vue'

export default {
  name: 'ModalAddComprobanteIngreso',
  components: {
    CModal,
    CModalFooter,
    CSmartTable,
    ClasificadorSelectorDialog,
    contribuyentesDialog,
    CurrencyInput,
  },

  data: function () {
    return {
      formatPrice,
      onlyNumber,
      formatDate,
      ingresosList: [],
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
        etapa: 'Ingreso',
        valor: 0,
        nombre: null,
        cantidad: 1,
        institucionOrtongate: '0000',
      },
      ingresoPost: {
        codigoIngresoTalonario: null,
        etapa: 'Ingreso',
        contribuyenteId: 0,
        contribuyente: {
          nombre: null,
          tipoDocumento: null,
          documento: null,
          telefono: null,
          direccion: null,
        },
        detalle: `RESUMEN DE INGRESO ${formatDate(new Date())}`,
        fecha: new Date().toISOString(),
        detalleRegistroIngresos: [],
      },
      columns: [
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '7%' },
        },

        { key: 'nombre', label: 'Denominación', _style: { width: '37%' } },
        {
          key: 'finOrigin',
          label: 'O/Fin',
          _style: { width: '20%' },
        },

        {
          key: 'valor',
          label: 'Monto',
          _style: { width: '12%' },
          filter: false,
          sorter: false,
        },

        {
          key: 'cantidad',
          label: 'Cantidad',
          _style: { width: '12%' },
          filter: false,
          sorter: false,
        },

        {
          key: 'subTotal',
          label: 'Sub Total',
          _style: { width: '12%' },
          filter: false,
          sorter: false,
        },
      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

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
        this.clearDetalle()
        return
      }
      this.isFormEventTypeValidatedDetalle = true
    },

    addComprobanteIngreso() {
      Api.postIngresos(this.ingresoPost)
        .then((response) => {
          this.clearModaComprobanteIngreso()
          this.$emit('actualizar-table')
          this.show({
            content: response.data,
            closable: true,
          })
        })
        .catch(({ response }) => {
          this.show({
            content: response.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (!this.ingresoPost.detalleRegistroIngresos.length) {
        this.isFormEventTypeValidated = true
        return this.show({
          content: 'Debe agregar el detalle',
          closable: true,
          color: 'warning',
          time: 7_000,
        })
      }
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.addComprobanteIngreso({
          ...this.ingresoPost,
          valor: Number(
            this.detallePost.valor.toString().replace(',', '') ?? 0,
          ),
        })
      }

      this.isFormEventTypeValidated = true
    },

    goToContribuyentes() {
      router.push({ name: 'Contribuyentes' })
    },

    selectItemEventHandler(payload) {
      this.ingresoPost.contribuyente = payload
    },

    clearDetalle() {
      this.isFormEventTypeValidatedDetalle = false
      this.detallePost = {
        ctgClasificadorId: null,
        ctgFuenteId: 0,
        ctgFuenteEspecificaId: 0,
        ctgOrganismoFinanciadorId: 0,
        fecha: new Date().toISOString(),
        etapa: 'Ingreso',
        institucionOrtongate: 0,
        valor: 0,
        nombre: null,
        cantidad: 1,
      }
    },

    clearModaComprobanteIngreso() {
      this.id = null
      this.sendDetalle = false
      this.isFormEventTypeValidated = false
      this.isFormEventTypeValidatedDetalle = false
      this.ingresoPost = {
        codigoIngresoTalonario: null,
        etapa: 'Ingreso',
        contribuyenteId: 0,
        contribuyente: {
          nombre: null,
          tipoDocumento: null,
          documento: null,
          telefono: null,
          direccion: null,
        },
        detalle: `RESUMEN DE INGRESO ${formatDate(new Date())}`,
        fecha: new Date(),
        detalleRegistroIngresos: [],
      }
    },

    setContribuyente(payload) {
      this.selectItemEventHandler(payload)
      this.showContribuyentesModal = false
    },

    checkDocument(e) {
      if (this.ingresoPost.contribuyente.tipoDocumento === 'Cedula') {
        onlyNumber(e)
      }
    },

    selectClasificator(infoClasificador) {
      if (infoClasificador) {
        this.detallePost.ctgClasificadorId = infoClasificador.clasifica
        this.detallePost.ctgFuenteEspecificaId =
          infoClasificador.ctgFuenteEspecificaId
        this.detallePost.ctgFuenteId = infoClasificador.ctgFuenteId
        this.detallePost.ctgOrganismoFinanciadorId =
          infoClasificador.ctgOrganismoFinanciadorId
        this.detallePost.nombre = infoClasificador.nombre
      }
      this.showFindClasificadorModal = false
    },
  },
  computed: {
    subTotal() {
      if (
        Number.isNaN(this.detallePost.cantidad) ||
        Number.isNaN(this.detallePost.valor.toString().replace(',', '') ?? 0)
      ) {
        return ''
      }
      return formatPrice(
        this.detallePost.cantidad *
          Number(this.detallePost.valor.toString().replace(',', '') ?? 0),
      )
    },

    fecha: {
      get() {
        let date = this.ingresoPost.fecha
        if (
          this.ingresoPost.fecha !== null &&
          this.ingresoPost.fecha?.toString() !== 'Invalid Date'
        ) {
          if (typeof this.ingresoPost.fecha === 'string') {
            date = new Date(this.ingresoPost.fecha)
            return date.toISOString().split('T')[0]
          }
        }
        return date?.toISOString()?.split('T')?.[0]
      },
      set(value) {
        return (this.ingresoPost.fecha = new Date(`${value}T00:00:00`))
      },
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
    payloadRegistroIngreso: Object,
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
