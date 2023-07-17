<template>
  <h3 class="text-center mb-4">Direcci&oacute;n Dependencia</h3>
  <div class="table-headers mb-4 gap-1">
      <CButton
        color="info"
        @click=" () => { newDireccionDependeciaModal = true }">Agregar</CButton>
      <CButton color="secondary">Imprimir</CButton>
  </div>
  <DireccionDepenciaTable
    :columns="columns"
    :footerItems="footerItem"
    :items="direccionDependecia"
    :showButtons="true"
    @edit="editDireccionDependecia"
  />
  <DireccionDependeciaDialogs
    :newDireccionDependeciaModal="newDireccionDependeciaModal"
    @close-modal="closeModal"
    @post-direccionDependecia="saveDireccionDependecia"
    :direccionDependecia="direccionDependeciaObject"
  />
</template>
<script>
import DireccionDepenciaTable from '@/modules/rrhh/RegistroPersonal/components/DireccionDepenciaTable.vue'
import { CModal } from '@coreui/vue'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import DireccionDependeciaDialogs from './Dialogos/DireccionDependenciaModal.vue'
import Api from '../services/RegistroPersonalServices'
export default {
  components: {
    DireccionDepenciaTable,
    CModal,
    DireccionDependeciaDialogs,
  },
  data: () => {
    return {
      direccionDependecia: [],
      newDireccionDependeciaModal: false,
      direccionDependeciaObject: {
        nombre: '',
        estructura: '',
      },
      columns: [
        { key: 'nombre', label: 'Nombre', _style: { width: '40%' } },
        {
          key: 'estructura',
          label: 'Estructura Programática',
          _style: { width: '40%' },
        },
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
            colspan: 2,
            style: 'font-weight:bold;',
          },
        },
      ],
    }
  },
  watch: {
    newDireccionDependeciaModal() {
      this.getAllDireccionDependecia()
    },
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal() {
      this.newDireccionDependeciaModal = false;
      this.direccionDependeciaObject= {
        nombre: '',
        estructura: '',
      }
    },
    editDireccionDependecia(item) {
      this.direccionDependeciaObject = item;
      this.newDireccionDependeciaModal = true
    },
    saveDireccionDependecia(payload) {
      if (payload.id) {
        Api.putDireccionDependecia(payload.id, payload)
          .then(() => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
              life: 7_500,
            })
            setTimeout(() => this.getAllDireccionDependecia(), 200)
          })
          .catch((error) => {
            return this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
            })
          })
      } else {
        Api.postDireccionDependecia(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
              life: 7_500,
            })
            setTimeout(() => this.getAllDireccionDependecia(), 200)
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
    getAllDireccionDependecia() {
      Api.getDireccionDependecia().then((response) => {
        this.direccionDependecia = response.data.data
        this.footerItem[0] = `Total Items ${response.data.data.length}`
      })
    },
  },
  mounted() {
    this.getAllDireccionDependecia()
  },
}
</script>
