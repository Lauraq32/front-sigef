<template>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" header :items="tableData" :columns="tablecolumns" columnFilter
    itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
    <template #sexo="{ item,index }">
      <td>
        {{ item.sexo == 'M' ? 'Masculino' : 'Femenino' }}
      </td>
    </template>
    <template #posicion="{ item,index }">
      <td>
        {{ item.posicion.nombre }}
      </td>
    </template>
    <template #programaDivision="{ item,index }">
      <td>
        {{ item.programaDivision.nombre }}
      </td>
    </template>

    <template #fechaIngreso="{ item,index }">
      <td>
        {{ formatDate(item.fechaIngreso) }}
      </td>
    </template>
    <template #fechaNacimiento="{ item,index }">
      <td>
        {{ formatDate(item.fechaNacimiento) }}
      </td>
    </template>

    <template #formaPago="{ item,index }">
      <td>
        {{ item.formaPago }}
      </td>
    </template>
    <template #show_details="{ item,index }">
          <CDropdown>
        <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem v-for="action in actions" @click="action.IsFunction(item)">{{action.label}}</CDropdownItem>
          <!-- <CDropdownItem @click="deleteEmp(item)">Eliminar</CDropdownItem>
          <CDropdownItem @click="
            () => {
              lgDemo4 = true
            }
          ">Evaluación</CDropdownItem>
          <CDropdownItem>Eventualidad</CDropdownItem> -->
        </CDropdownMenu>
      </CDropdown>
      <!-- <CDropdown>
        <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem @click="toggleDetails(item)">Editar</CDropdownItem>
          <CDropdownItem @click="deleteEmp(item)">Eliminar</CDropdownItem>
          <CDropdownItem @click="
            () => {
              lgDemo4 = true
            }
          ">Evaluación</CDropdownItem>
          <CDropdownItem>Eventualidad</CDropdownItem>
        </CDropdownMenu>
      </CDropdown> -->
    </template> -->
    <!-- <template #details="{ item }">
        <CCollapse :visible="this.details.includes(item._id)">
          <CCardBody>
            <h4>
              {{ item.username }}
            </h4>
            <p class="text-muted">User since: {{ item.registered }}</p>
            <CButton size="sm" color="info" class=""> User Settings </CButton>
            <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
          </CCardBody>
        </CCollapse>
      </template> -->
    </CSmartTable>

    </template>
  <script>
    import { CSmartTable } from '@coreui/vue-pro'
    import {formatDate} from '@/utils/format'

    export default {
      name:'RegistroPersonalTable',
      components: {
        CSmartTable,

      },
      data: () => {
        return{
          formatDate
        }
       
      },
      watch: {

      },
      methods: {
    
      },
      props:{
          tableData:[],
          tablecolumns:[],
          actions:[],
      }
   
    }
    </script>
  