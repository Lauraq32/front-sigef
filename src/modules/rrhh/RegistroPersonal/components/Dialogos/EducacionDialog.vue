<template>
  <CModal size="lg" :visible="showModal" @close="closeModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Educaci&oacute;n</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate :validated="profesionFormValidated" @submit="saveEducation">
          <CCol :md="4">
            <CFormLabel for="employeeInfoId">C&oacute;digo Empleado</CFormLabel>
            <CFormInput required id="employeeInfoId" v-model="employeeInfo.id" disabled> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="8">
            <CFormLabel for="nombres">Nombre Empleado</CFormLabel>
            <CFormInput required id="nombres" v-model="employeeInfo.nombres" disabled> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="12">
            <CFormLabel for="courseName">Nombre del Curso</CFormLabel>
            <CFormInput required id="courseName" v-model="education.courseName"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="12">
            <CFormLabel for="courseTime">Duraci&oacute;n del Curso en Horas</CFormLabel>
            <CFormInput v-model="education.courseTime" required id="courseTime"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="startDate">Fecha Inicio</CFormLabel>
            <CFormInput type="date" v-model="startDate" required id="startDate"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="finishDate">Fecha Final</CFormLabel>
            <CFormInput type="date" v-model="finishDate" required id="finishDate"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="12">
            <CFormLabel for="courseRecord">R&eacute;cord del Curso</CFormLabel>
            <CFormTextarea v-model="education.courseRecord" id="courseRecord" required>
            </CFormTextarea>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">
              Cerrar
            </button>
            <input class="btn btn-info btn-block mt-1" type="submit" value="Guardar" />
          </div>
        </CForm>
        <CSmartTable clickableRows :tableProps="{
            striped: true,
            hover: true,
          }" :tableHeadProps="{}" :activePage="1" header :items="educationList" :columns="columns" itemsPerPageSelect
          :itemsPerPage="5" :sorterValue="{ column: 'status', state: 'asc' }" pagination>

          <template #startDate="{ item, index }">
            <td class="py-2">
              {{ formatDate(item.startDate) }}
            </td>
          </template>
          <template #finishDate="{ item, index }">
            <td class="py-2">
              {{ formatDate(item.finishDate) }}
            </td>
          </template>
          <template #courseTime="{ item, index }">
            <td class="py-2">
              {{ item.courseTime}} horas
            </td>
          </template>
          <template #show_details="{ item, index }">
            <td class="py-2">
              <CButton color="primary" variant="outline" @click="selectEducation(item)">Editar</CButton>
            </td>
          </template>
        </CSmartTable>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
  
<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'
import Api from '../../services/EducationServices'
import { useToastStore } from '@/store/toast'

import { formatDate } from '@/utils/format'
import { mapStores,mapActions } from 'pinia'


export default {
  name: 'EducacionDialog',
  components: {
    CSmartTable,
    CModal,
    CIcon
  },
  data: function () {

    return {
      formatDate,
      educationId: null,
      education: {
        employeeId: 0,
        courseName: "",
        courseTime: 0,
        startDate: new Date(Date.now()),
        finishDate: new Date(Date.now()),
        courseRecord: ""
      },
      profesionFormValidated: false,
      educationList: [],
      tabPaneActiveKey: 1,
      columns: [
        { key: 'courseName', label: 'Nombre', _style: { width: '40%' } },
        { key: 'courseTime', label: 'Tiempo', _style: { width: '20%' } },
        { key: 'startDate', label: 'Fecha Inicio', _style: { width: '20%' } },
        { key: 'finishDate', label: 'Fecha Final', _style: { width: '20%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '5%' },
          filter: false,
          sorter: false,
        },
      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    clearModal(){
      this.education = {
        employeeId: this.employeeInfo.id,
        courseName: "",
        courseTime: 0,
        startDate: new Date(Date.now()),
        finishDate: new Date(Date.now()),
        courseRecord: "",
      }
    },

    closeModal() {
      
      this.$emit('closeModal')
      this.clearModal()
    },

    saveEducation(event) {

      const form = event.currentTarget
      if (form.checkValidity() === true) {
        if (this.educationId == null) {
          Api.postEmployee(this.education).then(response => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
            this.profesionFormValidated = false
            setTimeout(this.listarEducation(this.employeeInfo.id), 500)
            this.clearModal()
          }).catch(error => {
            this.show({
              content: error.response.data.errors,
              closable: true,
              color: 'danger'
            })
            
          })
      
        }
        else {
          Api.putEmployee(this.education, this.educationId).then(response => {
              this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          })
            setTimeout(this.listarEducation(this.employeeInfo.id), 500)
            this.profesionFormValidated = false
            this.clearModal()
          }).catch(error => {
            this.show({
              content: error.response.data.errors,    
              closable: true,
              color: 'danger'
            })
            
          })
        }
      }
      this.profesionFormValidated = true
      this.educationId = null
    },

    selectEducation(item) {
      this.education = { ...item }
      this.educationId = item.id
    },

    listarEducation(id) {
      Api.getEmployeeById(id).then(response => {
        this.educationList = response.data.data
      })
      this.education.employeeId = id
    },

  },

  watch: {
    employeeInfo(employeeInfo) {
      this.listarEducation(employeeInfo.id)
    },
  },

  computed: {
    ...mapStores(useToastStore),
    startDate: {
      get() {
        if (
          this.education.startDate !== null &&
          this.education.startDate?.toString() !== 'Invalid Date'
        ) {
          let date = this.education.startDate
          if (typeof this.education.startDate === 'string') {
            date = new Date(this.education.startDate)
            return date.toISOString().split('T')[0]
          }
        }
      },
      set(value) {
        return (this.education.startDate = new Date(
          `${value}T00:00:00`,
        ))
      },
    },
    finishDate: {
      get() {
        if (
          this.education.finishDate !== null &&
          this.education.finishDate?.toString() !== 'Invalid Date'
        ) {
          let date = this.education.finishDate
          if (typeof this.education.finishDate === 'string') {
            date = new Date(this.education.finishDate)
            return date.toISOString().split('T')[0]
          }
        }
      },
      set(value) {
        return (this.education.finishDate = new Date(
          `${value}T00:00:00`,
        ))
      },
    },
  },
  props: {
    showModal: Boolean,

    employeeInfo: {}
  },
  mounted() {

  }
}
</script>
<style>
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
  