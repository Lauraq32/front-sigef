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
        <CFormSelect v-model="selectedOption">
          <option value="option1">Rango de Fecha/Contribuyentes</option>
          <option value="option2">Clasificador/Rango de Fecha</option>
          <option value="option3">Un clasficador x fecha</option>
          <option value="option4">Rango de Fecha/Desc.Impuesto</option>
          <option value="option5">Resumen x Clasificador/Rango de Fecha</option>
        </CFormSelect>
      </div>

      <div>
        <div v-if="selectedOption == 'option1'">
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
            <CFormLabel for="displayNameContribuyentes"
              >Contribuyente</CFormLabel
            >
            <div class="position-relative">
              <CFormInput
                v-model="contribuyente"
                required
                class="form-control padding-input"
                id="displayNameContribuyentes"
              >
              </CFormInput>
              <span class="position-absolute icon-input">
                <CIcon
                  icon="cisSearch"
                  size="xl"
                  v-on:click="() => (showContribuyentesModal = true)"
                />
              </span>
            </div>
          </div>
        </div>

        <div v-if="selectedOption == 'option2'">
          <CFormLabel for="ctgClasificadorId">Clasificador:</CFormLabel>
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

        <div v-if="selectedOption == 'option3'">
          <CFormLabel for="ctgClasificadorId">Clasificador:</CFormLabel>
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
            <CFormLabel>fecha</CFormLabel>
            <CFormInput type="date" />
          </div>
        </div>

        <div v-if="selectedOption == 'option4'">
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

        <div v-if="selectedOption == 'option5'">
          <div>
            <CFormLabel>Resumen x clasificador</CFormLabel>
            <CFormInput />
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
      </div>
    </CModalBody>

    <CModalFooter>
      <CButton @click="() => closeModal()" class="btn btn-secondary">
        Cancelar
      </CButton>
      <CButton @click="closeFiltro" color="info"> Filtrar </CButton>
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
import ClasificadorSelectorDialog from '@/modules/financiero/FormulacionModule/components/ClasificadorSelectorDialog.vue'
import contribuyentesDialog from '../Dialogos/ModalSelectContribuyentes.vue'

export default {
  name: 'reportesRegistroIngreso',
  components: {
    ClasificadorSelectorDialog,
    contribuyentesDialog,
  },

  data: () => {
    return {
      selectedOption: 'option1',
      showFindClasificadorModal: false,
      clasificador: '',
      showContribuyentesModal: false,
      contribuyente: '',
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
