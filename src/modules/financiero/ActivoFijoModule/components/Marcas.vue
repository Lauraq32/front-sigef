<template>
  <h3 class="text-center">Marcas</h3>
  <div class="table-headers">
    <div class="p-2">
      <CButton color="info" style="font-weight: bold" v-on:click="openModal"
        >Agregar</CButton
      >
    </div>
  </div>
  <CSmartTable class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    header
    :footer="footerItem"
    :items="Marcas"
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
    </template>
  </CSmartTable>
  <CModal size="lg" :visible="lgDemo" @close="lgDemo = false">
    <CModalHeader>
      <CModalTitle>Marcas</CModalTitle>
    </CModalHeader>
    <CAlert
      color="primary"
      :visible="liveExampleVisible"
      dismissible
      @close="
        () => {
          liveExampleVisible = false
        }
      "
      >{{ Error }}</CAlert
    >
    <CModalBody v-on:mousemove="closeModal()">
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="6">
            <CFormLabel for="validationCustom02">Marca</CFormLabel>

            <input
              ref="name"
              type="text"
              class="form-control"
              v-model="postMarcas.nombre"
              id="exampleInputEmail1"
            />
          </CCol>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-on:click="unaVez"
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
import { useRegistroStore } from '../store/ActivoFijo/Marca'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Api from '../services/ActivoFijoServices'

import { useToastStore } from '@/store/toast'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      Error: '',
      status: 0,
      liveExampleVisible: false,
      modal: false,
      caca: false,
      runOnc: false,
      prueba: [{ prueba: '' }],
      // input: this.$refs.email,
      focus: false,
      postMarcas: {
        id: 0,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        nombre: null,
      },
      columns: [
        { key: 'id', label: 'Código' },
        { key: 'nombre', label: 'Descripción' },
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
          label: 'Total presupuesto',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },

      ],

      details: [],

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['Marcas']),
  },

  methods: {
    addField(prueba) {
      prueba.push({})
    },

    ...mapActions(useRegistroStore, ['getMarcas', 'addMarcas']),
    ...mapActions(useToastStore, ['show']),

    focusInput() {
      this.$refs.name.focus()
    },

    closeModal() {
      if (this.modal) {
        this.$nextTick(() => {
          this.$refs.inputElement.focus()
        })
      }
    },

    unaVez() {
      this.focusInput()
    },

    funcionKlk() {
      if (this.lgDemo == true) {
        this.unaVez()
      } else {
        this.unaVez()
      }
    },

    focusInput() {
      this.$refs.name.focus()
    },

    unaVez() {
      this.focusInput()
    },

    openModal() {
      this.lgDemo = true

      setTimeout(this.unaVez, 200)
    },

    alert() {
      if (this.status == 200) {
        this.Error
      } else {
        this.Error = 'klk'
      }

      this.liveExampleVisible = true
    },

    toggleDetails(item) {
      if (item.Marcas !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true

      Api.getMarcaByID(item.id).then((response) => {
        this.postMarcas = response.data.data

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
        Api.putMarca(this.id, this.postMarcas).then((response) => {
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })

          setTimeout(this.getMarcas, 500)
          this.postMarcas = {
            id: 0,
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
            nombre: null,
          }
        })
        setTimeout(this.getMarcas, 500)
      } else {
        Api.postMarca(this.postMarcas)
          .then((response) => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          })
          .catch((error) => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })

        this.lgDemo = true
        setTimeout(this.getMarcas, 500)
        ;(this.postMarcas = {
          id: 0,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          nombre: null,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getMarcas, 500)
      }
    },
  },

  mounted() {
    this.closeModal()
  },
}
</script>
