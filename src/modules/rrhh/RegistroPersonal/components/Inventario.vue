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
          <CDropdownItem @click="abrirModal(item)"
            >Agregar Útiles</CDropdownItem
          >
          <CDropdownItem @click="">Agregar Movimientos</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </template>
  </CSmartTable>
  <CModal
    backdrop="static"
    size="m"
    :visible="showAgregarCantidad"
    @close="
      () => {
        showAgregarCantidad = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>útiles Laboral</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row mx-3">
        <div class="col-6">
          <h5>Descripción:</h5>
        </div>
        <div class="col-6">
          <h6>{{ postInventario.descripcion }}</h6>
        </div>
      </div>

      <div class="row mx-3">
        <div class="col-6">
          <h5>Tipo:</h5>
        </div>
        <div class="col-6">
          <h6>{{ postInventario.tipo }}</h6>
        </div>
      </div>

      <CCardBody class="mt-3">
        <div class="row">
          <div class="row mt-4 mx-4">
            <div class="col-4 col-label">Fecha</div>
            <div class="col-8 col-md-6">
              <CFormInput type="date" v-model="postInventarioCantidad.fecha" />
            </div>
          </div>

          <div class="row mt-4 mx-4">
            <div class="col-4 col-label">Observacion</div>
            <div class="col-8 col-md-6">
              <CFormInput v-model="postInventarioCantidad.observacion" />
            </div>
          </div>

          <div class="row mt-4 mx-4">
            <div class="col-4 col-label">autorizadoPor</div>
            <div class="col-8 col-md-6">
              <CFormInput v-model="postInventarioCantidad.autorizadoPor" id="validationCustom04"> </CFormInput>
            </div>
          </div>

          <div class="row mt-4 mx-4">
            <div class="col-4 col-label">Cantidad</div>
            <div class="col-8 col-md-6">
              <VueNumberFormat
                v-model:value="postInventarioCantidad.cantidad"
                class="form-control"
                :format="'0'"
                :options="{
                  precision: 0,
                  prefix: '',
                  decimal: '',
                  thousand: '',
                }"
              >
              </VueNumberFormat>
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
                this.showAgregarCantidad = false
              }
            "
          >
            Close
          </button>
          <button
            class="btn btn-info btn-block mt-1"
            v-on:click="AgregarInventario"
          >
            Guardar
          </button>
        </div>
      </CCardBody>
    </CModalBody>
  </CModal>
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
          <div class="row mt-4 mx-3">
            <div class="col-4 col-label">Descripción</div>
            <div class="col-8">
              <CFormInput v-model="postInventario.descripcion" />
            </div>
          </div>

          <div class="row mt-4 mx-3">
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
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/RegistroPersonalServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      inventario: [],
      inventarioById: {},
      postInventarioCantidad: {
        fecha: null,
        observacion: null,
        autorizadoPor: null,
        cantidad: 0,
      },
      validatedCustom01: null,
      showAgregarCantidad: false,
      showInventario: false,
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

  computed: {
    fechaInventario: {
      get() {
        if (
          this.postInventarioCantidad.fecha !== null &&
          this.postInventarioCantidad.fecha?.toString() !== 'Invalid Date'
        ) {
          let date = this.postInventarioCantidad.fecha
          if (typeof this.postInventarioCantidad.fecha === 'string') {
            date = new Date(this.postInventarioCantidad.fecha)
            return date.toISOString().split('T')[0]
          }
        } else {
          return
        }
      },
      set(value) {
        return (this.postInventarioCantidad.fecha = new Date(
          `${value}T00:00:00`,
        ))
      },
    },
  },
  methods: {
    getInventario() {
      Api.getAllInventario().then((response) => {
        this.inventario = response.data.data
      })
    },

    abrirModal(item) {
      this.showAgregarCantidad = true
      this.id = item.id
      this.postInventario.tipo = item.tipo
      this.postInventario.descripcion = item.descripcion
    },

    AgregarInventario() {
      Api.postInventarioById(this.id, this.postInventarioCantidad)
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
