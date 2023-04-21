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
    <CForm
      novalidate
      :validated="validatedCustom01"
      :onsubmit="submitTipoAcciones"
    >
      <CModalBody>
        <CCardBody>
          <div class="row mt-3">
            <div class="col-4">
              <CFormLabel for="Descripcion">Descripción</CFormLabel>
            </div>
            <div class="col-8">
              <CFormInput
                required
                id="Descripcion"
                v-model="postTipoAccion.descripcion"
              />
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>

          <div class="row my-3">
            <div class="col-4">
              <CFormLabel for="cambiaStatus"> Cambia estatus? </CFormLabel>
            </div>
            <div class="col-8 d-flex">
              <span style="padding-right: 10px">No</span>
              <CFormSwitch
                style="height: 25px; width: 55px"
                id="cambiaStatus"
                v-model="postTipoAccion.cambiaStatus"
                checked
              />
              <span style="padding-left: 10px">Si</span>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-4">
              <CFormLabel for="selectTipoAccion">Estatus</CFormLabel>
            </div>
            <div class="col-8">
              <CFormSelect
                required
                v-model="postTipoAccion.estatus"
                id="selectTipoAccion"
              >
                <option>Activo</option>
                <option>Inactivo</option>
                <option>Licencia</option>
                <option>Vacaciones</option>
              </CFormSelect>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>
        </CCardBody>
      </CModalBody>
      <CModalFooter>
        <CButton
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          v-on:click="showTipoNovedad = false"
          >Cancelar
        </CButton>
        <input
          type="submit"
          class="btn btn-info btn-block mt-1"
          value="Guardar"
        />
      </CModalFooter>
    </CForm>
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
      validatedCustom01: null,
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
