<template>
    <CModal size="md" :visible="showModal" @close="closeModal">
      <CModalHeader>
        <CModalTitle>Profesiones</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardBody>
         
        </CCardBody>
      </CModalBody>
    </CModal>
  </template>
  
  <script>
  import { CModal } from '@coreui/vue'
  import { CSmartTable } from '@coreui/vue-pro'
  import { CIcon } from '@coreui/icons-vue'
  import Api from '../../services/EducationServices'
  
  export default {
    name: 'EducacionDialog',
    components: {
      CSmartTable,
      CModal,
      CIcon
    },
  
    data: function () {
      return {
        profesionesList: [],
        tabPaneActiveKey: 1,
        reclutamientoObject: {},
        columns: [
          { key: 'name', label: 'Nombre', _style: { width: '50%' } },
  
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
  
      
      closeModal() {
        this.$emit('closeModal')
      },

      listarEducation(id){
        Api.getEmployeeById(id).then(response => {
          console.log(response)
        })
      }
    },
  
    watch:{
      employeeId(id){
        this.listarEducation(id)
      }
    },

    props: {
      showModal: Boolean,
      employeeId: null,
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
  