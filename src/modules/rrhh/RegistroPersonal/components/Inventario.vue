<template>
  <h3 class="text-center">Inventario útiles de trabajo</h3>
  <hr />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            showInventario = true
          }
        "
        >Agregar</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable
    class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    :footer="footerItem"
    header
    :items="inventario"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #show_details="{ item }">
      <CDropdown>
        <CDropdownToggle color="primary" variant="outline"
          >Acciones</CDropdownToggle
        >
        <CDropdownMenu>
          <CDropdownItem
            @click="
              () => {
                showAgregarCantidad = true
                inventarioById = item
              }
            "
            >Agregar Útiles</CDropdownItem
          >
          <CDropdownItem
            @click="
              () => {
                showModalEvento(item)
              }
            "
            >Agregar Movimientos</CDropdownItem
          >
        </CDropdownMenu>
      </CDropdown>
    </template>
  </CSmartTable>

  <CModal
    size="m"
    :visible="showInventario"
    @close="
      () => {
        showInventario = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Inventario útiles de trabajo</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <div class="row">
          <div class="row mt-4 mx-2">
            <div class="col-4 col-label">Descripción</div>
            <div class="col-8">
              <CFormInput v-model="postInventario.descripcion" />
            </div>
          </div>

          <div class="row mt-4 mx-2">
            <div class="col-4 col-label">Tipo</div>
            <div class="col-8">
              <CFormSelect
                v-model="postInventario.tipo"
                id="validationCustom04"
              >
                <option>Deducible</option>
                <option>No-retornable</option>
                <option>Retornable</option>
              </CFormSelect>
            </div>
          </div>
        </div>
        <div class="modal-footer mt-4">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="
              () => {
                showInventario = false
              }
            "
          >
            Close
          </button>
          <button
            class="btn btn-info btn-block mt-1"
            v-on:click="submitInvetario"
          >
            Guardar
          </button>
        </div>
      </CCardBody>
    </CModalBody>
  </CModal>

  <utilesLaborales
    :showModal="showAgregarCantidad"
    @closeModal="closeModal"
    @submitInvetario="agregarCantidadInventario"
    :inventario="inventarioById"
  />
  <eventoUtiles
    :showModal="showEvento"
    @closeModal="closeModal"
    @submitEventos="agregarEventos"
    :inventario="inventarioById"
  />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/RegistroPersonalServices'
import utilesLaborales from '@/modules/rrhh/RegistroPersonal/components/Dialogos/UtilesLaboralesDialogs.vue'
import eventoUtiles from '@/modules/rrhh/RegistroPersonal/components/Dialogos/EventosUtilesDialogs.vue'

export default {
  components: {
    CSmartTable,
    CModal,
    utilesLaborales,
    eventoUtiles,
  },
  data: () => {
    return {
      inventario: [],
      inventarioById: {},
      validatedCustom01: null,
      showAgregarCantidad: false,
      showInventario: false,
      showEvento: false,
      postInventario: {
        descripcion: null,
        tipo: null,
      },

      columns: [
        { key: 'descripcion', label: 'Descripción', _style: { width: '20%' } },
        { key: 'tipo', label: 'Tipo', _style: { width: '10%' } },
        { key: 'cantidad', label: 'Existencia', _style: { width: '5%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '2%' },
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
    }
  },

  methods: {
    getInventario() {
      Api.getAllInventario().then((response) => {
        this.inventario = response.data.data
      })
    },

    closeModal(close) {
      this.showAgregarCantidad = close
      this.showEvento = close
    },

    showModalEvento(item) {
      this.showEvento = true
      this.id = item.id
    },

    showModalUtilsLaboral(item) {
      this.showAgregarCantidad = true
      this.id = item.id
      this.postInventario.tipo = item.tipo
      this.postInventario.descripcion = item.descripcion
    },

    agregarCantidadInventario(payload) {
      Api.postInventarioById(this.id, payload)
        .then(() => {
          setTimeout(this.getInventario, 500)
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
        })
        .catch((error) => {
          this.show({
            content: error.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },

    agregarEventos(payload) {
      Api.postEventos(this.id, payload)
        .then(() => {
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
        })
        .catch((error) => {
          this.show({
            content: error.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },

    submitInvetario() {
      if (this.id != null) {
        Api.putInventario(this.id, this.postInventario)
          .then(() => {
            setTimeout(this.getInventario, 500)
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          })
          .catch((error) => {
            this.show({
              content: error.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      } else {
        this.postInventarios()
      }
    },

    postInventarios() {
      Api.postInventario(this.postInventario)
        .then(() => {
          setTimeout(this.getInventario, 500)
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
        })
        .catch((error) => {
          this.show({
            content: error.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },
  },
  mounted() {
    this.getInventario()
  },
}
</script>
