<template>
  <div class="d-flex flex-row justify-content-between w-100 card shadow-sm py-2 my-4">
    <div class="d-flex" v-if="anoFiscal">
      <label class="form-label col-auto col-form-label mx-2">Anio Fiscal</label>
      <CFormSelect v-model="selectedAnio" v-on:change="setFiscalYear($event)" aria-label="Select anio(arreglame) fiscal"
        :options="fiscalYear">
        <option></option>
      </CFormSelect>
    </div>

    <div class="sticky-top">
      <div v-if="addButton" class="d-inline p-2">
        <CButton color="info" @click="addButtonForm.accion">{{
          addButtonForm.label
        }}</CButton>
      </div>

      <div class="d-inline p-2">
        <CButtonGroup role="group" aria-label="Button group with nested dropdown">
          <CDropdown variant="btn-group">
            <CDropdownToggle v-if="addDropdowm" color="ligth">Acciones</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem v-for="(action, index) in actions" @click="action.accion">{{ action.label }}</CDropdownItem>
              <CDropdownDivider />

              <div v-if="addFileButton" class="p-2">
                <label class="file-select">
                  <div class="select-button">
                    <CIcon :icon="cilCloudUpload" size="m" />
                  </div>
                  <input type="file" id="formFile" @change="onFileChange" />
                </label>
                <label v-if="fileName"> {{ fileName }}</label>
              </div>
            </CDropdownMenu>
          </CDropdown>
        </CButtonGroup>
      </div>
    </div>
  </div>
</template>
<script>

import { cilCloudUpload } from '@coreui/icons-pro'
import { mapActions, mapStores, mapState } from 'pinia'
import { useToastStore } from '@/store/toast'
import { useAuthStore } from '@/store/AuthStore'
import { mount } from '@vue/test-utils'
import { onMounted } from 'vue'



export default {
  name: 'AppPageHeader',
  props: {

    addButtonForm: {},
    actions: [],
    anoFiscal: false,
    addButton: false,
    input: false,
    addDropdowm: true,
    addFileButton: false,
    anioFiscal: false,


  },

  data: function () {
    return {
      datas: [],
      selectedAnio: 0,
      //    selectedAnio: fiscalYear.modelValue,

      cilCloudUpload,
      texto: null,
      fileName: '',


    }
  },

  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ['authInfo']),
    fiscalYear() {
      return this.authInfo.fiscalListYears.map(yearFiscal => {
        return ({
          label: yearFiscal.id,
          id: yearFiscal.id,
          year: yearFiscal.anio,
          status: yearFiscal.estatus
        })
      })


    }
  },
  methods: {
    ...mapActions(useAuthStore, ['changeFiscalYear']),

    setFiscalYear(selectedAnio) {
      this.changeFiscalYear(selectedAnio.target.value)
      console.log(selectedAnio.target.value)
      this.recargarRouter()

    },
    recargarRouter() {
      this.$router.go();

    },
    setcurrentfiscalYear() {
      this.changeFiscalYear(this.authInfo.currentFiscalYearId)
      this.selectedAnio = this.authInfo.currentFiscalYearId
      console.log(this.selectedAnio)


    }

  },
  mounted() {
    this.setcurrentfiscalYear()
  },

}

</script>
<style scoped>
.file-select>.select-button {
  padding: 0.5rem;
  line-height: 1.5;
  color: white;
  background-color: #375b80;

  border-radius: 0.3rem;
  cursor: pointer;
  text-align: center;


}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 1021;
}

.file-select>input[type='file'] {
  display: none;
}
</style>

