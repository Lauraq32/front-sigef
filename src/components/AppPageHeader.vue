<template>
  <div
    class="d-flex flex-row justify-content-between w-100 card shadow-sm py-2 my-4"
  >
    <div class="d-flex" v-if="anoFiscal">
      <label class="form-label col-auto col-form-label mx-2">Anio Fiscal</label>
      <CFormSelect
        v-model="selectedAnio"
        v-on:change="setFiscalYear($event)"
        aria-label="Select aniofiscal"
        :options="fiscalYearList"
      >
      </CFormSelect>
    </div>
    <div class="sticky-top">
      <div v-if="addButton" class="d-inline p-2">
        <CButton color="info" @click="addButtonForm.accion">{{
          addButtonForm.label
        }}</CButton>
      </div>

      <div class="d-inline p-2">
        <CButtonGroup
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <CDropdown variant="btn-group">
            <CDropdownToggle v-if="addDropdowm" color="ligth"
              >Acciones</CDropdownToggle
            >
            <CDropdownMenu>
              <CDropdownItem v-for="action in actions" @click="action.accion">{{
                action.label
              }}</CDropdownItem>
              <div v-for="uploadButton in uploadButtons" :id="'file-uploader-' + id" v-if="addFileButton" class="p-2">
                <label class="file-select">
                  <div class="row">
                    <div class="col-3">
                      <div class="select-button">
                        <CIcon icon="cilCloudUpload" size="lg" />
                      </div>
                    </div>
                  </div>
                  <input type="file" id="formFile" @change="onFileChange" />
                  <span class="ms-2">{{uploadButton.label}}</span>
                </label>
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
import { useAuthStore } from '@/store/AuthStore'
import AppUploadButton from '@/components/AppUploadButton.vue'

export default {
  name: 'AppPageHeader',
  components: {
    AppUploadButton,
  },

  props: {
    addButtonForm: {},
    actions: [],
    uploadButtons:[],
    anoFiscal: false,
    addButton: false,
    addDropdowm: true,
    addFileButton: false,
    anioFiscal: false,
  },

  data: function () {
    return {
      selectedAnio: 0,
      UploadButtonLabel: 'Subir Datos',
      cilCloudUpload,
      texto: null,
      fileName: '',
    }
  },

  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ['authInfo']),
    fiscalYearList() {
      return this.authInfo.fiscalListYears.map((yearFiscal) => {
        return {
          label: yearFiscal.id,
          id: yearFiscal.id,
          year: yearFiscal.anio,
          status: yearFiscal.estatus,
        }
      })
    },
  },
  methods: {
    ...mapActions(useAuthStore, ['changeFiscalYear']),

    setFiscalYear(selectedAnio) {
      this.changeFiscalYear(selectedAnio.target.value)
      this.$router.go()
    },
    setCurrentFiscalYear() {
      this.changeFiscalYear(this.authInfo.currentFiscalYearId)
      this.selectedAnio = this.authInfo.currentFiscalYearId
    },
  },
  mounted() {
    this.setCurrentFiscalYear()
  },
}
</script>
<style scoped>
.sticky-top {
  position: sticky;
  top: 0;
  z-index: 1021;
}

.file-select {
  display: flex;
}
.file-select > .select-button {
  padding: 1.75rem;
  line-height: 3.75;
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

.file-select > input[type='file'] {
  display: none;
}
</style>
