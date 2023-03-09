<template>
  <h3 class="text-center">Sectores</h3>
  <hr />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            lgDemo = true
          }
        "
        >Agregar</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable
    clickableRows
    :tableProps="{
     striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    
    header
    :items="sectores"
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
          @click="toggleDetails(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
        </CButton>
      </td>
      <td class="py-1">
        <CButton
          class="mt-1"
          color="danger"
          variant="outline"
          square
          size="sm"
          @click="deleteSec(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Eliminar' }}
        </CButton>
      </td>
    </template>
  </CSmartTable>
  <CModal
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Sectores</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="4">
            <CFormLabel for="validationCustom02">Sectores</CFormLabel>
            <CFormInput
              v-model="postSectores.nombre"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-on:click="close"
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="submitForm">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/RegistroPersonal/sectores'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Api from '../services/RegistroPersonalServices'
export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      postSectores: {
        id: 0,
        nombre: null,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        ayuntamiento: {
          id: 0,
          secuencial: 0,
          codigo: null,
          descripcion: null,
        },
      },
      columns: [
        { key: 'id', label: 'id', _style: { width: '40%' } },
        { key: 'nombre', label: 'Sectores', _style: { width: '40%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
      details: [],
      validatedCustom01: null,
      lgDemo: false,
    }
  },
  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['sectores']),
  },
  methods: {
    ...mapActions(useRegistroStore, ['getSectore', 'addSectores']),
    close() {
      this.lgDemo = false
    },
    toggleDetails(item) {
      if (item.sectores !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true

      Api.getSectorbyid(item.id).then((response) => {
        this.postSectores = response.data.data
        this.id = item.id
      })
    },
    getBadge(status) {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          'primary'
      }
    },
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },
    submitForm() {
      if (this.id) {
        Api.putSector(this.id, this.postSectores).then((response) => {
          this.lgDemo = false
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          setTimeout(this.getSectore, 500)
          this.postSectores = {
            id: 0,
            nombre: null,
            variacion: 0,
            ayuntamientoId: 0,
            ayuntamiento: {
              id: 0,
              secuencial: 0,
              codigo: null,
              descripcion: null,
            },
          }
        })
        setTimeout(this.getSectore, 500)
      } else {
        this.addSectores(this.postSectores)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
        //const form = event.currentTarget
        this.lgDemo = true
        setTimeout(this.getSectore, 500)
        ;(this.postSectores = {
          id: 0,
          nombre: null,
          ayuntamientoId: 0,
          ayuntamiento: {
            id: 0,
            secuencial: 0,
            codigo: null,
            descripcion: null,
          },
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getSectore, 500)
      }
    },
    deleteSec(item) {
      Api.deleteSector(item.id)
        .then((response) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
        })
        .catch((error) => {
          this.$swal({
            position: 'top-end',
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          })
        })
    },
  },
  mounted() {
    this.getSectore()
  },
}
</script>
