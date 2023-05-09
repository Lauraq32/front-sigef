<template>
  <h3 class="text-center">Direcci&oacute;n Dependencia</h3>
  <hr />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            newDireccionDependeciaModal = true
          }
        "
        >Agregar</CButton
      >
    </div>
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info">Imprimir</CButton>
    </div>
  </div>
  <hr />
  <DireccionDepenciaTable
    :columns="columns"
    :footerItems="footerItem"
    :items="direccionDependecia"
    :showButtons="true"
    @edit="editDireccionDependecia"
  >
    <template #show_details="{ item }">
      <td class="py-2">
        <CButton
          class="mt-1"
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="editDireccionDependecia(item)"
          >Editar</CButton
        >
      </td>
    </template>
  </DireccionDepenciaTable>
  <DireccionDependeciaDialogs
    :newDireccionDependeciaModal="newDireccionDependeciaModal"
    @close-modal="closeModal"
    @post-direccionDependecia="saveDireccionDependecia"
    :direccionDependeciaId="direccionDependeciaId"
  />
</template>
<script>
import DireccionDepenciaTable from '@/modules/rrhh/RegistroPersonal/components/DireccionDepenciaTable.vue'
import { CModal } from '@coreui/vue'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import DireccionDependeciaDialogs from '../Dialogos/DireccionDependenciaModal.vue'
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
      direccionDependeciaId: null,
      newDireccionDependeciaModal: false,
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
            colspan: 1,
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
      this.newDireccionDependeciaModal = false
    },
    editDireccionDependecia(item) {
      this.direccionDependeciaId = item.id
      this.newDireccionDependeciaModal = true
    },
    saveDireccionDependecia(payload) {
      if (this.direccionDependeciaId != null) {
        Api.putDireccionDependecia(this.direccionDependeciaId, payload)
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
