<template>
  <div>
    <CModal backdrop="static" @close="onClick" size="lg" :visible="showModal">
      <CModalHeader>
        <CModalTitle>Captura de imagenes Asociadas al Documento</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="d-flex justify-content-end">
          <CButton type="button" color="info" class="btn btn-primary" @click="() => { showModalSaveDocument = true }">Agregar Documento</CButton>
        </div>
        <CSmartTable clickableRows :tableProps="{
            striped: true,
            hover: true,
          }" :tableHeadProps="{}" :activePage="1" :footer="footerItem" header :items="documentos" :columns="columns"
          tableFilter :itemsPerPage="7" table-filter-label="Filtrar:" table-filter-placeholder="Nombre, fecha, tipo de imagen" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
          pagination>
          <template #createdAt="{ item, index }">
            <td class="py-2">
                {{ formatDate(item.createdAt) }}
              </td>
          </template>
          <template #show_details="{ item, index }">
              <td class="py-2">
                <CButton color="primary" variant="outline" square size="sm" @click="seeImage(item.id)">
                  Ver
                </CButton>
              </td>
          </template>
        </CSmartTable>
      </CModalBody>
    </CModal>
    <CModal backdrop="static" size="md" :visible="showModalSaveDocument" @close="closeModalSaveDocument">
      <CModalHeader>
        <CModalTitle>Agregar Documento</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm class="flex flex-column" novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm">
          <div class="mb-2">
            <CFormInput v-model="fileName" type="text" label="Nombre" required />
            <div class="my-2">
              <CFormLabel>Tipo de Documento</CFormLabel>
              <CFormSelect v-model="typeDocument" required>
                <option v-for="opt in optionsSelect" :value="opt">{{ opt }}</option>
              </CFormSelect>
            </div>
            <CFormTextarea v-model="fileDescription" label="Descripci&oacute;n" />
          </div>
          <div class="d-flex justify-content-center">
            <DropZone @fileSelected="selectedFile" :disableDrop="!!dropzoneFile" />
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="info" @click="closeModalSaveDocument">Cerrar</CButton>
        <CButton color="info" @click="sendData">Guardar</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script>
import { ref } from "vue";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter } from '@coreui/vue'
import Api from '../services/RegistroPersonalServices'
import ApiFile from '../services/Files'
import { CSmartTable, CButton, CCollapsePlugin, CForm } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'
import DropZone from "@/components/DropZone.vue"
import { formatDate } from "@/utils/format";
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

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
    DropZone,
    CForm
  },
  data: function () {
    return {
      filedata: {},
      lgDemo5: false,
      fullscreenDemo: false,
      visible: false,
      file: null,
      ModalSaveDocument: false,
      postEmpleado: {},
      documentos: [],
      typeDocument: '',
      fileName: '',
      fileDescription: '',
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },

      ],
      isFormEventTypeValidated: false,
      optionsSelect: [
        "Documento Personal",
        "Certificado",
        "Documento Estudio",
        "Otros"
      ],
      columns: [
        {
          key: 'name',
          label: 'Nombre',
          _style: { width: '55%' },
        },
        {
          key: 'createdAt',
          label: 'Fecha',
          sorter: false,
          _style: { width: '20%' },
        },
        {
          key: 'contentType',
          label: 'Tipo',
          _style: { width: '20%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '5%' },
          filter: false,
          sorter: false,
        },
      ],
      formatDate
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal() {
      this.$emit('closeModal', false)
    },
    closeModalSaveDocument() {
      this.showModalSaveDocument = false;
      this.clearForm();
    },
    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.postDocumentos()
      }
      this.isFormEventTypeValidated = true
    },
    postDocumentos() {
      if (this.empleado.id && this.dropzoneFile) {
        const formData = new FormData()
        formData.append('empleadoId', this.empleado.id)
        formData.append('fileCustomName', this.fileName)
        formData.append('fileCustomDescription', this.fileDescription)
        formData.append('fileCustomtype', this.typeDocument)
        formData.append('file', this.dropzoneFile)
        Api.postFiles(formData).then(() => {
          this.getFileById(this.empleado.id)
          this.show({
            content: "Imagen guardada correctamente",
            closable: true,
          });
          this.clearForm();
        }).catch((e) => console.log('error', e))
      }
    },
    onClick() {
      this.$emit('custom-event', false)
    },
    clearForm(){
      this.fileName = '';
      this.fileDescription = '';
      this.dropzoneFile = null;
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
        this.footerItem[0].label = `Total Items ${this.documentos.length}`
      })
    },
    seeImage(id){
      ApiFile.getFileById(id).then((response) => {
        window.open(response, "_blank")
      })
    },
  },
  setup() {
    let dropzoneFile = ref("");
    const selectedFile = (file) => {
      dropzoneFile.value = file;
    };
    return { dropzoneFile, selectedFile };
  },
  watch: {
    empleado() {
      this.getFileById(this.empleado.id)
    },
  },
  props: {
    showModal: Boolean,
    empleado: Object,
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

.file-select>input[type='file'] {
  display: none;
}
</style>