<template>
  <div>
    <CModal backdrop="static" @close="onClick" size="lg" :visible="showModal" >
      <CModalHeader>
        <CModalTitle>Captura de imagenes Asociadas al Documento</CModalTitle>
      </CModalHeader>
      <CModalBody>
      
        <CButton
          type="button"
          color="info"
          class="btn btn-primary" @click="() => { smDemo = true }">Agregar Documentos</CButton>
        <hr>
        
            <CSmartTable
          clickableRows
          :tableProps="{
            striped: true,
            hover: true,
          }"
          :tableHeadProps="{}"
          :activePage="1"
          :footer="footerItem"
          header
          :items="documentos"
          :columns="columns"
          tableFilter 
          itemsPerPageSelect
          :itemsPerPage="10"
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
        >      <template #show_details="{ item, index }">
            <td class="py-2">
              <CButton color="primary" variant="outline" square size="sm">
                Ver
              </CButton>
            </td>
          </template>
        </CSmartTable>
      </CModalBody>

      <div class="modal-footer">
       
      
        <CButton
          color="info"
          data-bs-dismiss="modal"
          @click="getFileById(this.empleado.id)"
        >
          Close
        </CButton>
        <CButton
          color="info"
          @click="postDocumentos"
        >
          Guardar
        </CButton>
      </div>
    </CModal>

    <CModal backdrop="static"  size="sm" :visible="smDemo" @close="() => { smDemo = false }">
    <CModalHeader>
      <CModalTitle>Agregar Documentos</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CFormInput
    type="text"
    label="Descripcion"
  />
  <CFormInput
    type="text"
    label="name"
  />
      <div class="p-2">
          <label class="file-select">
            <div class="select-button">
              <CIcon icon="cilCloudUpload" size="sm" />
              <span class="label ms-1">Adjuntar Documentos </span>
            </div>
            <input
              type="file"
              id="formFile"
              accept=".doc,.docx,.png,.jpge,.jpg, .pdf" 
              multiple
              @change="handleFileChange"
            />
          </label>
      </div>
    </CModalBody>
  </CModal>
  </div>
</template>

<script>
import { CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/vue'
import Api from '../services/RegistroPersonalServices'
import { CSmartTable } from '@coreui/vue-pro'
import { CButton, CCollapsePlugin } from '@coreui/vue-pro'
import { CCollapse } from '@coreui/vue'
import { CIcon } from '@coreui/icons-vue'

export default {
  components: {
    CModal,
    CSmartTable,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CButton,
    CIcon,
    CCollapsePlugin,
  },

  data: function () {
    return {
      filedata: {},
      lgDemo5: false,
      fullscreenDemo: false,
      visible: false,
      file: null,
      smDemo: false,
      postEmpleado: {},

      documentos: [],
      columns: [
        {
          key: 'name',
          label: 'Nombre',
          _style: { width: '20%' },
        },
        {
          key: 'createdAt',
          label: 'Fecha de creacion',
          sorter: false,
          _style: { width: '35%' },
        },
        {
          key: 'contentType',
          label: 'Tipo',
          _style: { width: '5%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '20%' },
          filter: false,
          sorter: false,
        },
      
      ],
    }
  },
  mounted() {
    this.getFileById(this.empleado.id)
  },
  methods: {
    CloseModal() {
      this.$emit('closeModal', false)
    },
    
    
 

    postDocumentos() {
      if (this.empleado.id != null) {
        const formData = new FormData()
        formData.append('userId', this.empleado.id)
        formData.append('file', this.filedata)

        Api.postFiles(formData)
      }
    },
    onClick() {

      this.$emit('custom-event', false)

    },

    handleFileChange(event) {
      this.filedata = event.target.files[0]
    },

    toggle(index) {
      this.documentos[index].visible = !this.documentos[index].visible
    },



    getFileById(id) {
      Api.getFileById(id).then((response) => {
        this.documentos = response.data.data
        console.log(this.documentos)
      })
    },
  },

  watch: {
    empleados() {
      this.getEmpleadosById(this.empleados.id)
    },
  },
  

  props: {
    showModal: Boolean,
    empleado: Object,
  },
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