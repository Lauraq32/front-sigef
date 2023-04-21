<template>
  <CModal backdrop="static" size="lg" :visible="showModal">
    <CModalHeader>
      <CModalTitle>Tipo de Novedad</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CSmartTable
        style="margin-top: 10px"
        clickableRows
        :tableProps="{
          striped: true,
          hover: true,
        }"
        :tableHeadProps="{}"
        :activePage="1"
        header
        :items="tipoAcciones"
        :columns="columns"
        columnFilter
        itemsPerPageSelect
        :itemsPerPage="5"
        columnSorter
        pagination
      >
        <template #show_details="{ item }">
          <td class="py-1">
            <CButton
              class="mt-1"
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="editTipoAccion(item)"
            >
              Editar
            </CButton>
          </td>
        </template>
      </CSmartTable>
    </CModalBody>

    <CModalFooter>
      <CButton
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="closeModal"
        >Cerrar
      </CButton>
      <CButton
        class="btn btn-info btn-block mt-1"
        @click="
          () => {
            showTipoNovedad = true
            clearTipoAccion()
          }
        "
        >Nuevo</CButton
      >
    </CModalFooter>
  </CModal>

  <TipoNovedadDialog @close="closeModal" :showModal="showTipoNovedad" />
</template>

<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import TipoNovedadDialog from './Dialogos/TipoNovedadDialog.vue'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

export default {
  components: {
    CModal,
    CSmartTable,
    TipoNovedadDialog,
  },

  data: function () {
    return {
      showTipoNovedad: false,
      validatedCustom01: null,
      tipoAcciones: [],

      columns: [
        { key: 'id', label: 'Código', _style: { width: '5%' } },
        {
          key: 'descripcion',
          label: 'Descripción',
          _style: { width: '20%' },
        },
        {
          key: 'cambiaStatus',
          label: 'Cambia Estatus',
          _style: { width: '10%' },
        },
        {
          key: 'estatus',
          label: 'Estatus',
          _style: { width: '10%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    closeModal() {
      this.showTipoNovedad = false
    },

    getTipoAcciones() {
      Api.getAllTipoAcciones().then((response) => {
        this.tipoAcciones = response.data.data
      })
    },

    editTipoAccion(item) {
      this.clearTipoAccion()
      Api.getTipoAccionByID(item.id).then((response) => {
        this.postTipoAccion = response.data.data
        this.id = item.id
      })
      this.showTipoNovedad = true
    },

    postTipoAcciones() {
      Api.postTipoAcciones(this.postTipoAccion)
        .then(() => {
          setTimeout(this.getTipoAcciones, 500)
          this.show({
            content: 'Registro guardado correctamente',
            closable: true,
          })
        })
        .catch(({ response }) => {
          this.show({
            content: response.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },

    clearTipoAccion() {
      this.validatedCustom01 = null
      this.id = null
      this.postTipoAccion = {
        id: null,
        descripcion: null,
        cambiaStatus: false,
        estatus: 'Activo',
        comprobado: false,
      }
    },

    submitTipoAcciones(event) {
      const form = event.currentTarget
      event.preventDefault()
      event.stopPropagation()

      if (form.checkValidity() === true) {
        if (this.id != null) {
          setTimeout(this.getTipoAcciones, 500)
          Api.putTipoAcciones(this.id, this.postTipoAccion)
            .then(() => {
              this.show({
                content: 'Registro guardado correctamente',
                closable: true,
              })
            })
            .catch(({ response }) => {
              this.show({
                content: response.data,
                closable: true,
                color: 'danger',
                class: 'text-white',
              })
            })
        } else {
          this.postTipoAcciones()
        }
      }
      this.validatedCustom01 = true
    },
  },

  watch: {
    showModal() {
      this.getTipoAcciones()
    },
  },

  props: {
    showModal: Boolean,
  },
}
</script>
