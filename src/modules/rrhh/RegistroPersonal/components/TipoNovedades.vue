<template>
  <CModal @close="closeModal" backdrop="static" size="lg" :visible="showModal">
    <CModalHeader>
      <CModalTitle>Tipo de Novedad</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="d-flex justify-content-center mx-2">
        <CForm
          novalidate
          :validated="validatedCustom01"
          :onsubmit="submitTipoAcciones"
          class="w-75"
        >
          <div class="border p-3">
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
              <div class="col-8 d-flex align-items-center">
                <span class="p-2">No</span>
                <CFormSwitch
                  style="width: 2.5rem"
                  id="cambiaStatus"
                  v-model="postTipoAccion.cambiaStatus"
                  size="xl"
                />
                <span class="p-2">Si</span>
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

            <br />
            <div class="mt-5 d-flex justify-content-center mb-4">
              <input
                type="submit"
                class="btn btn-info btn-block mt-1"
                value="Guardar"
              />
            </div>
          </div>
        </CForm>
      </div>

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
        @click="
          () => {
            closeModal()
          }
        "
        >Cerrar
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

export default {
  components: {
    CModal,
    CSmartTable,
  },

  data: function () {
    return {
      postTipoAccion: {
        descripcion: null,
        cambiaStatus: false,
        estatus: 'Activo',
        comprobado: false,
      },
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
    },

    postTipoAcciones() {
      Api.postTipoAcciones(this.postTipoAccion)
        .then(() => {
          setTimeout(this.getTipoAcciones, 500)
          this.clearTipoAccion()
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
              this.clearTipoAccion()
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
