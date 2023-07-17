<template>
  <h3 class="text-center mb-4">Cargos</h3>
  <div class="table-headers mb-4 gap-1">
    <CButton
      color="info"
      @click="
        () => {
          cargoModal = true
        }
      "
      >Agregar</CButton
    >
    <CButton color="secondary">Imprimir</CButton>
  </div>
  <CargosTable
    :columns="columns"
    :footerItems="footerItem"
    :items="cargos"
    :showButtons="true"
    @edit="getCargosById"
  />
  <CargosModal
    :cargoModal="cargoModal"
    @close-modal="closeModal"
    @post-cargo="saveCargo"
    :cargoToUpdate="cargo"
  />
</template>
<script>
import CargosTable from '@/modules/rrhh/RegistroPersonal/components/CargosTable.vue'
import CargosModal from './Dialogos/CargosModal.vue'
import { mapActions } from 'pinia'
import Api from '../services/RegistroPersonalServices'
import { useToastStore } from '@/store/toast'
export default {
  components: {
    CargosModal,
    CargosTable,
  },
  data: () => {
    return {
      cargo: null,
      cargos: [],
      cargoModal: false,
      columns: [
        {
          key: 'id',
          label: 'ID',
          _style: { width: '10%' },
        },
        {
          key: 'nombre',
          label: 'Posición o cargo',
          _style: { width: '70%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            colspan: 3,
            style: 'font-weight:bold;',
          },
        },
      ],
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal(payload) {
      this.cargoModal = payload
    },
    deleteCargo(id) {

      this.$swal({
        title: 'Estás seguro de realizar esta acción? ',
        text: 'No podrás revertirlo',
        icon: 'Confirmación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          Api.deleteCargo(id).then(() => {
            this.show({
              content: 'Registro eliminado correctamente',
              closable: true,

            })
            setTimeout(() => this.getAllCargo(), 200)
          }).catch((error) => {
            this.show({
              content: error.response.data.message,
              closable: true,

              color: 'danger'
            })
          })
         
        }

      });
      
    },
    getCargosById(item) {
      this.cargo = item
      this.cargoModal = true
    },
    saveCargo(payload) {
      if (payload.id != null) {
        Api.updateCargo(payload.id, payload)
          .then(() => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllCargo(), 200)
          })
          .catch((error) => {
            return this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
            })
          })
      } else {
        Api.addCargos(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllCargo(), 200)
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
    getAllCargo() {
      Api.getAllCargos().then((response) => {
        this.cargos = response.data.data
        this.footerItem[0] = `Total Items ${response.data.data.length}`
      })
    },
  },
  mounted() {
    this.getAllCargo()
  },
}
</script>
