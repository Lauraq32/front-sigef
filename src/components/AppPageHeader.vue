<template>
  <div
    class="d-flex flex-row justify-content-between w-100 card shadow-sm py-2 my-4"
  >
    <div class="d-flex" v-if="anoFiscal">
      <label class="form-label col-auto col-form-label mx-2">Anio Fiscal</label>
      <CFormSelect
        aria-label="Default select example"
        :options="[
          '2019',
          { label: '2020', value: '1' },
          { label: '2021', value: '2' },
          { label: '2022', value: '3', disabled: true },
        ]"
      >
      </CFormSelect>
    </div>

    <div class="">
      <div v-if="addButton" class="d-inline p-2">
        <CButton color="info" @click="addButtonForm.accion">{{
          addButtonForm.label
        }}</CButton>
      </div>

      <div class="d-inline p-2 float-right">
        <CButtonGroup
          role="group"
          aria-label="Button group with nested dropdown"
        >
          <CDropdown variant="btn-group">
            <CDropdownToggle v-if="addDropdowm" color="ligth"
              >Acciones</CDropdownToggle
            >
            <CDropdownMenu>
              <CDropdownItem
                v-for="(action, index) in actions"
                @click="action.accion"
                >{{ action.label }}</CDropdownItem
              >
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



export default {
  name: 'AppPageHeader',
  props: {
    addButtonForm: {},
    actions: [],
    anoFiscal: false,
    addButton: false,
    input: false,
    addDropdowm: true,
    addFileButton:false,
  },

  data: function () {
    return {

cilCloudUpload,
      texto: null,
      fileName: '',

      
    }
}
}

</script>
<style scoped>
.file-select > .select-button {
  padding: 0.5rem;
  line-height: 1.5;
  color: white;
  background-color: #375b80;

  border-radius: 0.3rem;
  cursor: pointer;
  text-align: center;
}

.file-select > input[type='file'] {
  display: none;
}
</style>

