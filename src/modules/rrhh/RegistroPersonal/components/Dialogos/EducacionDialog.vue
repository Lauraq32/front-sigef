<template>
  <CModal size="lg" :visible="showModal" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Profesiones</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate :validated="profesionFormValidated" @submit="saveEducation">
          <CCol :md="4">
            <CFormLabel for="validationCustom04">C&oacute;digo Empleado</CFormLabel>
            <CFormInput required id="validationCustom04" v-model="employeeInfo.id" disabled> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="8">
            <CFormLabel for="validationCustom04">Nombre Empleado</CFormLabel>
            <CFormInput required id="validationCustom04" v-model="employeeInfo.nombres" disabled> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="12">
            <CFormLabel for="validationCustom04">Nombre Curso</CFormLabel>
            <CFormInput required id="validationCustom04" v-model="education.courseName"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="12">
            <CFormLabel for="validationCustom04">Duracion del Curso</CFormLabel>
            <CFormInput v-model="education.courseTime" required id="validationCustom04"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="validationCustom04">Fecha inicio</CFormLabel>
            <CFormInput type="date" v-model="education.startDate" required id="validationCustom04"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="validationCustom04">Fecha Final</CFormLabel>
            <CFormInput type="date" v-model="education.finishDate" required id="validationCustom04"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="12">
            <CFormLabel for="validationCustom04">Record del Curso</CFormLabel>
            <CFormTextarea v-model="education.courseRecord" id="exampleFormControlTextarea1">
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
import { mapActions } from 'pinia'

export default {
  name: 'EducacionDialog',
  components: {
    CSmartTable,
    CModal,
    CIcon
  },
  data: function () {
    return {
      educationId: null,
      education: {
        employeeId: 0,
        courseName: "",
        courseTime: 0,
        startDate: "",
        finishDate: "",
        courseRecord: ""
      },
      profesionFormValidated: false,
      educationList: [],
      tabPaneActiveKey: 1,
      columns: [
        { key: 'courseName', label: 'Nombre', _style: { width: '40%' } },
        // { key: 'courseRecord', label: 'Nota', _style: { width: '50%' } },
        { key: 'courseTime', label: 'Tiempo', _style: { width: '10%' } },
        // { key: 'employee', label: 'Nombre', _style: { width: '50%' } },
        // { key: 'employeeId', label: 'Nombre', _style: { width: '50%' } },
        { key: 'startDate', label: 'Fecha Inicio', _style: { width: '30%' } },
        { key: 'finishDate', label: 'Fecha Final', _style: { width: '30%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '5%' },
          filter: false,
          sorter: false,
        },

        // { key: 'id', label: 'Nombre', _style: { width: '50%' } },


      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },

    closeModal() {
      this.$emit('closeModal')
    },

    saveEducation(event) {
      const form = event.currentTarget
      if (form.checkValidity() === true) {
        if (this.educationId == null) {
          Api.postEmployee(this.education).then(response => {
            if (response.status === 200) {
              this.show({
                content: 'Registro añadido correctamente',
                closable: true,
              })
            }
            setTimeout(this.listarEducation(this.employeeInfo.id), 500)
          }).catch(error => {
            console.log(error.response.data.errors)
            this.show({
              content: error.response.data.errors,
              closable: true,
              color: 'danger'
            })
          })
          this.educationId = null,
            this.education = {
              employeeId: this.employeeInfo.id,
              courseName: "",
              courseTime: 0,
              startDate: "",
              finishDate: "",
              courseRecord: ""
            }
        }
        else {
          Api.putEmployee(this.education, this.educationId).then(response => {
            setTimeout(this.listarEducation(this.employeeInfo.id), 500)
          })
        }
      }
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
  