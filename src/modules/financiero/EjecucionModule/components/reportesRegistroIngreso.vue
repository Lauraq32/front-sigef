<template>
  <CModal
    @close="() => closeModal()"
    :visible="showModalReporte"
    backdrop="static"
  >
    <CModalHeader>
      <CModalTitle>Generar Reporte</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="mb-3">
        <CFormLabel>Reporte por</CFormLabel>
        <CFormSelect v-model="datosImprimir.selectedOption">
          <option value="option1">Rango de Fecha/Contribuyentes</option>
          <option value="option2">Clasificador/Rango de Fecha</option>
          <option value="option3">Un clasficador x fecha</option>
          <option value="option4">Rango de Fecha/Desc.Impuesto</option>
          <option value="option5">Resumen x Clasificador/Rango de Fecha</option>
        </CFormSelect>
      </div>

      <div>
        <div v-if="datosImprimir.selectedOption == 'option1'">
          <div class="row">
            <div class="col-6">
              <CFormLabel>Fecha Inicial</CFormLabel>
              <div>
                <CFormInput v-model="datosImprimir.fechaDesde" type="date" />
              </div>
            </div>

            <div class="col-6">
              <CFormLabel>Fecha Final</CFormLabel>
              <div>
                <CFormInput v-model="datosImprimir.fechaHasta" type="date" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="datosImprimir.selectedOption == 'option2'">
          <CFormLabel for="ctgClasificadorId">Clasificador</CFormLabel>
          <div>
            <div class="position-relative">
              <input
                v-model="clasificador"
                ref="clasificatorField"
                required
                @keyup.enter.prevent="findClasificador"
                maxlength="6"
                class="form-control padding-input"
                type="number"
                id="ctgClasificadorId"
              />
              <span class="position-absolute icon-input">
                <CIcon
                  icon="cisSearch"
                  size="xl"
                  v-on:click="() => (showFindClasificadorModal = true)"
                />
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <CFormLabel>Fecha Inicial</CFormLabel>
              <div>
                <CFormInput type="date" />
              </div>
            </div>

            <div class="col-6">
              <CFormLabel>Fecha Final</CFormLabel>
              <div>
                <CFormInput type="date" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="datosImprimir.selectedOption == 'option3'">
          <CFormLabel for="ctgClasificadorId">Clasificador</CFormLabel>
          <div>
            <div class="position-relative">
              <input
                v-model="clasificador"
                ref="clasificatorField"
                required
                @keyup.enter.prevent="findClasificador"
                maxlength="6"
                class="form-control padding-input"
                type="number"
                id="ctgClasificadorId"
              />
              <span class="position-absolute icon-input">
                <CIcon
                  icon="cisSearch"
                  size="xl"
                  v-on:click="() => (showFindClasificadorModal = true)"
                />
              </span>
            </div>
          </div>
          <div>
            <CFormLabel>Fecha</CFormLabel>
            <CFormInput type="date" />
          </div>
        </div>

        <div v-if="datosImprimir.selectedOption == 'option4'">
          <div class="row">
            <div class="col-6">
              <CFormLabel>Fecha Inicial</CFormLabel>
              <div>
                <CFormInput type="date" />
              </div>
            </div>

            <div class="col-6">
              <CFormLabel>Fecha Final</CFormLabel>
              <div>
                <CFormInput type="date" />
              </div>
            </div>
          </div>
          <div>
            <CFormLabel>Desc.Impuestos</CFormLabel>
            <CFormInput />
          </div>
        </div>

        <div v-if="datosImprimir.selectedOption == 'option5'">
          <div class="row">
            <div class="col-6">
              <CFormLabel>Fecha Inicial</CFormLabel>
              <div>
                <CFormInput type="date" />
              </div>
            </div>

            <div class="col-6">
              <CFormLabel>Fecha Final</CFormLabel>
              <div>
                <CFormInput type="date" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CModalBody>

    <CModalFooter>
      <CButton class="btn btn-secondary" @click="closeModal"> Cancelar </CButton>
      <CButton @click="imprimirReport" color="info"> imprimir </CButton>
    </CModalFooter>
  </CModal>

  <ClasificadorSelectorDialog
    :origin="'ingresos'"
    :isVisible="showFindClasificadorModal"
    @close="selectClasificator"
  />
</template>

<script>
import ClasificadorSelectorDialog from '@/modules/financiero/FormulacionModule/components/ClasificadorSelectorDialog.vue'

export default {
  name: 'reportesRegistroIngreso',
  components: {
    ClasificadorSelectorDialog,
  },

  data: () => {
    return {
      datosImprimir: {
        fechaDesde: null,
        fechaHasta: null,
        selectedOption: 'option1',
        contribuyente: '',
        clasificador: '',
      },

      showFindClasificadorModal: false,

      showContribuyentesModal: false,
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModalReporte', false)
      this.clearModal()
    },

    setContribuyente(payload) {
      this.showContribuyentesModal = false
      this.contribuyente = payload.nombre
    },

    imprimirReport() {
      this.$emit('imprimir-report', this.datosImprimir)
    },

    clearModal() {
      this.selectedOption = ''
      this.clasificador = ''
      this.contribuyente = ''
    },

    closeModalContribuyentes() {
      this.showContribuyentesModal = false
    },

    selectClasificator(infoClasificador) {
      if (infoClasificador) {
        this.clasificador = infoClasificador.clasifica
      }
      this.showFindClasificadorModal = false
    },
  },

  props: {
    showModalReporte: Boolean,
  },
}
</script>
