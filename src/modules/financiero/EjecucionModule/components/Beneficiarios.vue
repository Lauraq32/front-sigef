<template>
  <h3 class="text-center">Beneficiarios</h3>
  <div class="table-headers">
    <div class="p-2">
      <CButton style="font-weight: bold" color="info" @click="() => {
        showBeneficiarioModal = true
      }
        ">Agregar</CButton>
    </div>
  </div>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" header :items="Beneficiarios" :columns="columns" itemsPerPageSelect
    columnFilter :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
    <template #ingreso="{ item }">
      <td>
        {{ formatDate(item.ingreso) }}
      </td>
    </template>
    <template #show_details="{ item }">
      <td class="py-1">
        <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="EditBeneficiary(item)">
          Editar
        </CButton>
      </td>
      <td class="py-1">
        <CButton class="mt-1" color="danger" variant="outline" square size="sm" @click="deleteBeneficiario(item)">
          Eliminar
        </CButton>
      </td>
    </template>
    <template #estatus="{ item }">
      <td>
        <CBadge class="d-block mt-1" :color="item.estatus ? 'success' : 'danger'">{{ item.estatus ? 'Activo' : 'Inactivo'
        }}
        </CBadge>
      </td>
    </template>
  </CSmartTable>
  <BeneficiariosModal :beneficiarioToUpdate="beneficiarioToUpdate" :showModal="showBeneficiarioModal"
    @postBeneficiarios="submitForm" @close-modal="closeForm" />
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import Api from '../services/EjecucionServices'
import BeneficiariosModal from '../components/Dialogos/BeneficiariosModal.vue'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

export default {
  components: {
    CSmartTable,
    BeneficiariosModal
  },

  data: function () {
    return {
      beneficiario: null,
      Beneficiarios: [],
      showBeneficiarioModal: false,
      beneficiarioToUpdate: {},
      columns: [
        { key: 'id', label: 'Código', _style: { width: '7%' } },
        {
          key: 'tipo',
          label: 'Tipo de Beneficiario',
          _style: { width: '12%' },
        },
        {
          key: 'nombre',
          label: 'Beneficiario',
          _style: { width: '15%' },
        },
        { key: 'rncCedPas', label: 'RNC/Cédula/Pasaporte', _style: { width: '12%' } },
        { key: 'contacto', label: 'Contacto', _style: { width: '10%' } },
        { key: 'email', label: 'Email', _style: { width: '20%' } },
        { key: 'telefono', label: 'Teléfono 1', _style: { width: '10%' } },
        { key: 'celular', label: 'Teléfono 2', _style: { width: '10%' } },
        { key: 'estatus', label: 'Estatus', _style: { width: '5%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
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
      validatedCustom01: null,
      lgDemo: false,
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    getAllBeneficiarios() {
      Api.getBeneficiarios().then((response) => {
        this.Beneficiarios = response.data.data
      })
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
          Api.deleteBeneficiarios(item.id).then(() => {
            this.show({
              content: 'Registro eliminado correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(this.getAllBeneficiarios(), 200)
          }).catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              life: 15000,
            })
          })
        }
      })
    },

    closeForm() {
      this.showBeneficiarioModal = false
    },
    submitForm(payload) {
      if (payload.id) {
        Api.putBeneficiarios(payload.id, payload).then(() => {
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
            life: 15000,
          })
          setTimeout(() => this.getAllBeneficiarios(), 200)
        }).catch((error) => {
          return this.show({
            content: error.response.data,
            closable: true,
            color: 'danger',
          })
        })
      }
      else {
        Api.postBeneficiarios(payload).then(() => {
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
            life: 15000,
          })
          setTimeout(() => this.getAllBeneficiarios(), 200)
        }).catch((error) => {
          return this.show({
            content: error.response.data,
            closable: true,
            color: 'danger',
          })
        })
      }
    },

    EditBeneficiary(item) {
      this.showBeneficiarioModal = true
      this.beneficiarioToUpdate = item
    }
  },

  mounted() {
    this.getAllBeneficiarios()
  },
}

</script>
