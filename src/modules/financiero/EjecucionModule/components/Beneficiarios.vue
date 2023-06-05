<template>
  <h3 class="text-center">Beneficiarios</h3>
  <div class="table-headers">
    <div class="p-2">
      <CButton
        style="font-weight: bold"
        color="info"
        @click="
          () => {
            beneficiarioModal = true
          }
        "
        >Agregar</CButton
      >
    </div>
  </div>
  <CSmartTable
    class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    header
    :items="Beneficiarios"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #ingreso="{ item }">
      <td>
        {{ formatDate(item.ingreso) }}
      </td>
    </template>
    <template #estatus="{ item }">
      <td>
        {{ item.estatus ? 'Activo' : 'Inactivo' }}
      </td>
    </template>
    <template #show_details="{ item }">
      <td class="py-1">
        <CButton
          class="mt-1"
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="getBeneficiarioById(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
        </CButton>
      </td>
      <td class="py-1">
        <CButton
          class="mt-1"
          color="danger"
          variant="outline"
          square
          size="sm"
          @click="deleteBeneficiario(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Eliminar' }}
        </CButton>
      </td>
    </template>
    <template #details="{ item }">
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
    </template>
  </CSmartTable>
  <BeneficiarioModal
    :beneficiarioModal="beneficiarioModal"
    @close-modal="closeModal"
    @post-beneficiario="saveBeneficiario"
    :beneficiario="beneficiario"
  />
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { mapActions } from 'pinia'
import BeneficiarioModal from './Dialogos/BeneficiarioModal.vue'
import { useToastStore } from '@/store/toast'
import Api from '../services/EjecucionServices'

export default {
  components: {
    CSmartTable,
    BeneficiarioModal,
  },

  data: function () {
    return {
      beneficiario: null,
      Beneficiarios: [],
      beneficiarioModal: false,
      columns: [
        { key: 'id', label: 'Código', _style: { width: '10%' } },
        {
          key: 'nombre',
          label: 'Beneficiario',
          _style: { width: '15%' },
        },
        {
          key: 'tipo',
          label: 'Tipo de Beneficiario',
          _style: { width: '10%' },
        },
        { key: 'direccion', label: 'Cédula', _style: { width: '15%' } },
        { key: 'ingreso', label: 'Fecha Ingreso', _style: { width: '15%' } },
        { key: 'tipoDcto', label: 'Tipo', _style: { width: '10%' } },

        { key: 'email', label: 'Email', _style: { width: '20%' } },
        { key: 'contacto', label: 'Contacto', _style: { width: '40%' } },
        { key: 'telefono', label: 'Teléfono 1', _style: { width: '20%' } },
        { key: 'celular', label: 'Teléfono 2', _style: { width: '20%' } },

        { key: 'estatus', label: 'Estatus', _style: { width: '20%' } },

        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
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
      details: [],
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal() {
      this.beneficiarioModal = false
    },
    formatDate(ingreso) {
      return new Date(ingreso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    getBeneficiarioById(item) {
      this.beneficiario = item
      this.beneficiarioModal = true
    },

    saveBeneficiario(payload) {
      if (this.beneficiario.id != null) {
        Api.putBeneficiarios(this.beneficiario.id, payload)
          .then(() => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllBeneficiario(), 200)
          })
          .catch((error) => {
            return this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
            })
          })
      } else {
        Api.postBeneficiarios(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllBeneficiario(), 200)
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

    deleteBeneficiario(item) {
      this.$swal({
        title: 'Estás seguro que quieres eliminar este registro?',
        text: 'No podrás revertirlo',
        icon: 'Confirmación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          Api.deleteBeneficiario(item.id).then(() => {
            this.show({
              content: 'Eliminado correctamente',
              closable: true,
            })
            setTimeout(() => this.getAllBeneficiario(), 200)
          })
        }
      })
    },

    getAllBeneficiario() {
      Api.getBeneficiarios().then((response) => {
        this.Beneficiarios = response.data.data
        this.itemsCount = this.Beneficiarios.length
        this.footerItem[0].label = `Total items: ${this.itemsCount}`
      })
    },
  },

  mounted() {
    this.getAllBeneficiario()
  },
}
</script>
