<template>
  <h3 class="text-center">Grupos de Pago</h3>
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton color="info" @click="() => {
        grupoModal = true
      }
        ">Agregar</CButton>
    </div>
  </div>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" :footer="footerItem" header :items="grupoPago" :columns="columns"
    itemsPerPageSelect columnFilter :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
    pagination>
    <template #show_details="{ item }">
      <td class="py-2">
        <CButton color="primary" variant="outline" square size="sm" @click="editarGrupo(item)">
          Editar
        </CButton>
      </td>
    </template>
    <template #fechaInicio="{ item }">
      <td class="py-2">
        {{ formatDate(item.fechaInicio) }}
      </td>
    </template>
    <template #fechaFin="{ item }">
      <td class="py-2">
        {{ item.fechaFin ? formatDate(item.fechaFin) : '' }}
      </td>
    </template>
  </CSmartTable>
  <grupoPagoModal :grupoModal="grupoModal" @close-modal="closeModal" @post-grupo="saveGrupoPago"
    :groupToUpdate="groupToUpdate" />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import grupoPagoModal from './Dialogos/GrupoPagoModal.vue'
import Api from '../services/EjecucionServices'
import { formatDate } from '@/utils/format'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'


export default {
  components: {
    CSmartTable,
    CModal,
    grupoPagoModal,

  },
  data: () => {
    return {
      formatDate,
      itemsCount: null,
      grupoModal: false,
      validatedCustom01: null,
      groupToUpdate: {},
      grupoPago: [],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            color: '',
            colspan: 6,
            style: 'font-weight:bold;',
          },
        },
      ],
      columns: [
        { key: 'id', label: 'Código', _style: { width: '10%' } },
        { key: 'descripcion', label: 'Descripción', _style: { width: '49%' } },

        {
          key: 'fechaInicio',
          label: 'Fecha Inicial',
          _style: { width: '20%' },
        },
        { key: 'fechaFin', label: 'Fecha Final', _style: { width: '20%' } },

        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal() {
      this.grupoModal = false
      this.groupToUpdate = {}
    },

    getAllGrupoPago() {
      Api.getGrupoPagoList().then((response) => {
        this.grupoPago = response.data.data.map(x=>{
          return{
            id:x.id,
            descripcion:x.descripcion,
            fechaInicio:x.fechaInicio,
            fechaFin: x.fechaFin 
          }
        })
        this.itemsCount = this.grupoPago.length
        this.footerItem[0].label = `Total items: ${this.itemsCount}`
      })
    },

    saveGrupoPago(payload) {
      if (payload.id) {
        Api.putGrupoPago(payload.id, payload).then(() => {
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
            life: 15000,
          })
          setTimeout(() => this.getAllGrupoPago(), 200)
          this.closeModal();
        })
          .catch((error) => {
            return this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
            })
          })
      }
      else {
        Api.postGrupoPago(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllGrupoPago(), 200)
          })
          .catch((error) => {
            return this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
            })
          })
      }
    },

    editarGrupo(item) {
      this.groupToUpdate = item
      this.grupoModal = true
    },

  },

  mounted() {
    this.getAllGrupoPago()
  },
}
</script>
