<template>
  <h3 class="text-center">Departamentos</h3>
  <hr />
  <div class="table-headers justify-content-between">

    <div class="d-inline-flex gap-3 align-items-center">
      <CFormLabel class="form-label col-auto col-form-label" >Filtro:</CFormLabel>
      <CFormSelect id="fiscalYearSelect" @update:modelValue="handleFilterDepartmentsByStatus"
          aria-label="Selecionar año fiscal"
          :options="[
            { label: 'Activo', value: true },
            { label: 'Inactivo', value: 'false' }
            ]">

      </CFormSelect>
    </div>

    <div>
      <div class="d-inline p-2">
        <CButton
          color="info"
          @click="() => {showAddDeptModal = true; this.departamento = null}">Agregar</CButton
        >
      </div>

      <div class="d-inline p-2">
        <CButton style="font-weight: bold" color="info" @click="IngresoReport"
          >Imprimir</CButton
        >
      </div>
    </div>
  </div>
  <hr />


  <DepartmentsTable @onUpdate="handleUpdate" @handleDelete="handleDelete" :deparments="deparments"/>
  <AddDepartment  :modal-title="this.deparmentModalTitle" :departamento="this.departamento" @OnSubmit="handleSubmit" @onClose="handleModalClose" :showModal="showAddDeptModal" :is-nomina="false"/>

</template>
<script>
import AddDepartment from './Dialogos/AddDepartment.vue'
import DepartmentsTable from './DepartmentsTable.vue'
import deparmentServices from '../services/DeparmentServices'
import {useToastStore} from "@/store/toast"
import { CFormLabel } from '@coreui/vue-pro'
import { mapActions } from 'pinia';
export default {
  components: {
    AddDepartment,
    DepartmentsTable,
    CFormLabel
},
  data: () => {
    return {
      deparments: [],
      validatedCustom01: null,
      showAddDeptModal: false,
      departamento: null,
      deparmentModalTitle: null
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show'])
    ,
    handleFilterDepartmentsByStatus(value){
      deparmentServices.getDepartments(value).then((response) => this.deparments = response.data.data);
    },
    handleModalClose(event){
      this.showAddDeptModal = false,
      this.departamento = {},
      this.deparmentModalTitle = null
    },
    handleUpdate(dept){
      this.showAddDeptModal = true;
      this.deparmentModalTitle ="Modificar Departamento"
      this.departamento = dept;
    }
    ,
    handleDelete(item){
      deparmentServices.deleteDepartment(item.id)
      .then(result => {
        if(result.status == 204){
          this.deparments = this.deparments.filter(x => x.id != item.id);
        }
      }).catch(err => {
        this.show({content: err.response.data.message, color:'danger'})

      });
    }
    ,
    handleSubmit(dept) {

      if(dept.id !== 0){
        if (dept.status) {

          deparmentServices.updateDepartment(dept).then(response => {
            const deptIndex = this.deparments.findIndex(x => x.id === dept.id);
            this.deparments[deptIndex] = response.data.data;
            this.handleModalClose();
          })
        }
      }else{
        deparmentServices.createDepartment(dept).then((response) => {
          this.deparments = [response.data.data ,...this.deparments];
          this.handleModalClose();
        }).catch((error) => this.show({content: err.response.data, color:'danger'}))
      }
    },
  },
  mounted() {
    this.handleFilterDepartmentsByStatus(true);
  }
}
</script>
