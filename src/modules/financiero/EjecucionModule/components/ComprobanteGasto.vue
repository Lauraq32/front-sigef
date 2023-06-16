<template>
  <AppActionHeader :actions="pageActions">
    <CButton color="secondary" @click="goToComprobanteIngreso">Ir a Comprobante ingreso</CButton>
    <CButton color="primary" @click="showComprobanteDialog">Agregar</CButton>
  </AppActionHeader>
  <!-- <CButton color="secondary" @click="goToGasto">Ir a Formulaci&oacute;n Gasto</CButton>  -->
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" header :items="tableData" :columns="tableColumns" columnFilter
    :footer="footer" itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'nombres', state: 'asc' }"
    pagination>
    <template #show_details="{ item, index }">
      <td>
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem v-for="action in actions" @click="action.clickHandler && action.clickHandler(item)">{{
              action.label }}</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </td>
    </template>
  </CSmartTable>


  <CompranteGastoCapturaDialog :showModal="ComprobanteoDialog" @post-gasto="submitForm" @close-modal="closeComprobanteDialog" />
  <FormularioCodificacionGastoDialog :showModal="FormularioCodificacionGastoDialog" />
</template>
<script>

import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import CompranteGastoCapturaDialog from '../components/dialogs/CompranteGastoCapturaDialog.vue'
import FormularioCodificacionGastoDialog from '../components/dialogs/FormularioCodificacionGastoDialog.vue'
import AppActionHeader from '@/components/AppActionHeader.vue'
import ComprobanteGastoTable from '../components/tables/ComprobanteGastoTable.vue'
import { CSmartTable } from '@coreui/vue-pro'
import Api from '../services/EjecucionServices'

import router from '@/router'
export default {
  components: {
    CompranteGastoCapturaDialog,
    FormularioCodificacionGastoDialog,
    AppActionHeader,
    ComprobanteGastoTable,
    CSmartTable
  },
  data: function () {
    return {
      comprobante:{

      },
      tableData: [],
      tableColumns: [{ key: 'detalle', label: 'Test' }, {
        key: 'show_details',
        label: '',
        filter: false,
        sorter: false,
      },],
      actions: [
        {
          label: 'Editar',
          clickHandler: () => {
           this.showComprobanteDialog()
          }
        },
        {
          label: 'Cancelar Comprobante',
          clickHandler: () => {
            console.log('hola')
          }
        },
        {
          label: 'Documentos Asociados al 815',
          clickHandler: () => {
            this.showFormularioCodificacionGastoDialog()
          }
        },
      ]

      ,
      ComprobanteoDialog: false,
      FormularioCodificacionGastoDialog: false,
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),

    closeComprobanteDialog(){
      this.ComprobanteoDialog = false
    },

    submitForm(payload) {
      if (payload.id != null) {
        Api.putEmpleado(payload.id, payload)
          .then(() => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
            })
            this.closeRegistroPersonalModal()
            setTimeout(this.getRegistroPersonal, 500)
          })
          .catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      } else {
        Api.postEmpleado(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
            setTimeout(this.getRegistroPersonal, 500)
            this.closeRegistroPersonalModal()
          })
          .catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      }
    },

    showComprobanteDialog() {
      this.ComprobanteoDialog = true
    },
    showFormularioCodificacionGastoDialog() {
      this.FormularioCodificacionGastoDialog = true
    },

    getRegistroGasto(){
      Api.getRegistroGasto().then((response)=>{
        this.tableData = response.data.data
      })
    },
    goToComprobanteIngreso() {
      router.push({ name: 'comprobanteIngreso' })
    }
  },
  computed: {
    pageActions() {
      const actions = [
        {
          label: 'Imprimir Reporte',
          // accionHandler: this.funcionVacia(),
          icon: 'cilPrint'
        },
      ];

      if (!this.isFiscalYearApprovedOrClose) {
        actions.push({
          label: 'Importar Ingresos',
          // accionHandler: this.funcionVacia(),
          type: 'upload'
        });
      }

      return actions;
    }
  },
  mounted(){
    this.getRegistroGasto()
  }
}
</script>
  
<style>
.top {
  margin-top: 27px;
}

.left {
  margin-left: 910px;
  margin-top: 15px;
}
</style>
  

<!-- data: -->