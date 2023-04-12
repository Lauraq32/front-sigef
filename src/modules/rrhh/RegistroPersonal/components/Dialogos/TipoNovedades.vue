<template>
  <CModal backdrop="static" @close="closeModal" size="lg" :visible="showModal">
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
        :sorterValue="{ column: 'status', state: 'asc' }"
        pagination
      >
        <template #status="{ item }">
          <td>
            <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
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
              @click="editTipoAccion(item)"
            >
              {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
            </CButton>
          </td>
        </template>
      </CSmartTable>
    </CModalBody>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Close
      </button>

      <button
        class="btn btn-info btn-block mt-1"
        @click="
          () => {
            showTipoNovedad = true
            clearTipoAccion()
          }
        "
      >
        Nuevo
      </button>
    </div>
  </CModal>

  <CModal
    backdrop="static"
    @close="
      () => {
        showTipoNovedad = false
      }
    "
    size="m"
    :visible="showTipoNovedad"
  >
    <CModalHeader>
      <CModalTitle>Tipo de Novedad</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <div class="row mt-3">
          <div class="col-4">
            <CFormLabel>Descripción</CFormLabel>
          </div>
          <div class="col-8">
            <CFormInput v-model="postTipoAccion.descripcion" />
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-4"></div>
          <div class="col-8">
            <CFormLabel for="cambiaStatus" class="d-flex">
              Cambia estatus?
              <input
                v-model="postTipoAccion.cambiaStatus"
                class="form-check-input mx-3"
                type="checkbox"
                id="cambiaStatus"
              />
            </CFormLabel>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-4">
            <CFormLabel for="selectTipoAccion">Estatus</CFormLabel>
          </div>
          <div class="col-8">
            <CFormSelect v-model="postTipoAccion.estatus" id="selectTipoAccion">
              <option>Activo</option>
              <option>Inactivo</option>
              <option>Licencia</option>
              <option>Vacaciones</option>
            </CFormSelect>
          </div>
        </div>
      </CCardBody>
    </CModalBody>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="showTipoNovedad = false"
      >
        Cancelar
      </button>

      <button
        class="btn btn-info btn-block mt-1"
        v-on:click="submitTipoAcciones"
      >
        Guardar
      </button>
    </div>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

export default {
  name: 'TipoNovedadDialog',
  components: {
    CSmartTable,
    CModal,
  },

  data: function () {
    return {
      showTipoNovedad: false,
      tipoAcciones: [],
      postTipoAccion: {
        descripcion: null,
        cambiaStatus: false,
        estatus: 'Activo',
        comprobado: false,
      },
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
      this.$emit('closeModal', false)
    },

    getTipoAcciones() {
      Api.getAllTipoAcciones().then((response) => {
        this.tipoAcciones = response.data.data
      })
    },

    editTipoAccion(item) {
      Api.getTipoAccionByID(item.id).then((response) => {
        this.postTipoAccion = response.data.data
        this.id = item.id
      })
      this.showTipoNovedad = true
    },

    postTipoAcciones() {
      Api.postTipoAcciones(this.postTipoAccion)
        .then(() => {
          this.show({
            content: 'Registro guardado correctamente',
            closable: true,
          })
        })
        .catch(({ response }) => {
          this.show({
            content: response.data.message,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },

    clearTipoAccion() {
      ;(this.id = null),
        (this.postTipoAccion = {
          id: null,
          descripcion: null,
          cambiaStatus: null,
          estatus: null,
          comprobado: null,
        })
    },

    submitTipoAcciones() {
      if (this.id != null) {
        Api.putTipoAcciones(this.id, this.postTipoAccion)
          .then(() => {
            this.show({
              content: 'Registro guardado correctamente',
              closable: true,
            })
          })
          .catch(({ response }) => {
            this.show({
              content: response.data.message,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
        setTimeout(this.getTipoAcciones, 500)
      } else {
        this.postTipoAcciones()
        console.log('klk')
      }
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
