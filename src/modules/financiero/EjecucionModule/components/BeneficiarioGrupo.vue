<template>
  <h3 class="text-center">Beneficiario por Grupo</h3>
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton color="info" @click="() => {
        beneficiarioxGrupoModal = true
      }
        ">Agregar</CButton>
    </div>
  </div>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" :footer="footerItem" header :items="beneficiarioGrupoAll" :columns="columns"
    itemsPerPageSelect columnFilter :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
    pagination>
    <template #show_details="{ item }">
      <td class="py-2">
        <CButton color="primary" variant="outline" square size="sm" @click="updateBeneficiaryGroup(item)">
          Editar
        </CButton>
      </td>
    </template>
    <template #details="{ item }">
      <td>
        {{ item.username }}
      </td>
    </template>
    <template #grupoCompensacion="{ item }">
      <td>
        {{ item.grupoCompensacion.descripcion }}
      </td>
    </template>
    <template #beneficiario="{ item }">
      <td>
        {{ item.beneficiario.descripcion }}
      </td>
    </template>
    <template #documento="{ item }">
      <td>
        {{ item.beneficiario.id }}
      </td>
    </template>
    <template #monto="{item}">
      <td>
        {{ formatPrice(item.monto) }}
      </td>
    </template>
  </CSmartTable>
  <beneficiarioGrupoModal :beneficiarioxGrupoModal="beneficiarioxGrupoModal" @close-modal="closeModal"
    @post-Beneficiariogrupo="saveBeneficiarioGrupo" :beneficiarioGroupToUpdate="beneficiarioGroupToUpdate" />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import beneficiarioGrupoModal from './Dialogos/BeneficiarioGrupoModal.vue'
import Api from '../services/EjecucionServices'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import { formatPrice } from '../../../../utils/format';

export default {
  components: {
    CSmartTable,
    CModal,
    beneficiarioGrupoModal
  },

  data: () => {
    return {
      validatedCustom01: null,
      beneficiarioxGrupoModal: false,
      beneficiarioGroupToUpdate: {},
      beneficiarioGrupoAll: [],
      lgDemo: false,
      columns: [

        { key: 'id', label: 'Id', _style: { width: '4%' } },
        { key: 'beneficiario', label: 'Beneficiario', _style: { width: '10%' } },
        { key: 'documento', label: 'Cédula/Pasaporte/RNC', _style: { width: '14%' } },
        { key: 'grupoCompensacion', label: ' Grupo de Pago', _style: { width: '20%' } },
        { key: 'cargoBeneficiario', label: 'Cargo', _style: { width: '14%' } },
        { key: 'monto', label: 'Valor', _style: { width: '8%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
      formatPrice,
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            color: '',
            colspan: 2,
            style: 'font-weight:bold;',
          },
        },

      ],
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal() {
      this.beneficiarioxGrupoModal = false
    },
    getAllBeneficiarioGrupo() {
      Api.getBeneficiariosGrupoList().then((response) => {
        this.beneficiarioGrupoAll = response.data.data
        this.footerItem[0].label = `Total item: ${response.data.data.length}`
      })

    },

    saveBeneficiarioGrupo(payload) {
      if (payload.id) {
        Api.putBeneficiarioGrupo(payload.id, payload).then(() => {
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
            life: 15000,
          })
          setTimeout(() => this.getAllBeneficiarioGrupo(), 200)
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
        Api.postBeneficiarioGrupo(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllBeneficiarioGrupo(), 200)
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
    updateBeneficiaryGroup(item) {
      this.beneficiarioGroupToUpdate = item
      this.beneficiarioxGrupoModal = true
    },
  },
  mounted() {
    this.getAllBeneficiarioGrupo()
  },



}
</script>
