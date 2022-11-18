<template>
  <h3 class="text-center">Contribuyentes</h3>
  <hr />
  <div>
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
      striped: false,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer
    header
    :items="Contribuyente"
    :columns="columns"
    columnFilter
    tableFilter
    cleaner
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #fecha="{ item }">
      <td>
        {{ formatDate(item.fecha) }}
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
          @click="deleteItem(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Eliminar' }}
        </CButton>
      </td>
    </template>
    <template #details="{ item }">
      <CCollapse :visible="this.details.includes(item._id)">
        <CCardBody>
          <h4>
            {{ item.username }}
          </h4>
          <p class="text-muted">User since: {{ item.registered }}</p>
          <CButton size="sm" color="info" class=""> User Settings </CButton>
          <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
        </CCardBody>
      </CCollapse>
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
      <CModalTitle>Contribuyentes</CModalTitle>
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
            <CFormLabel for="validationCustom01">Pais</CFormLabel>
            <CFormInput
              v-model="postContribuyente.pais"
              id="validationCustom01"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom02">Ciudad</CFormLabel>
            <CFormInput
              v-model="postContribuyente.ciudad"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="validationCustom03">Direccion</CFormLabel>
            <CFormInput
              v-model="postContribuyente.direccion"
              id="validationCustom03"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Conctato</CFormLabel>
            <CFormInput
              v-model="postContribuyente.conctato"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Email</CFormLabel>
            <CFormInput
              v-model="postContribuyente.email"
              type="email"
              id="validationCustom05"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <!-- <CCol :md="3">
            <CFormLabel for="validationCustom05">Participativo</CFormLabel>
            <CFormSelect id="validationCustom05">
              <option>Si</option>
              <option>no</option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol> -->

          <CCol :md="4">
            <CFormLabel for="validationCustom01">Telefono</CFormLabel>
            <CFormInput
              v-model="postContribuyente.telefono"
              id="validationCustom01"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom01">Fecha</CFormLabel>
            <CFormInput
              v-model="postContribuyente.fecha"
              id="validationCustom01"
              type="date"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom01">Estatus</CFormLabel>
            <CFormSelect
              v-model="postContribuyente.estatus"
              id="validationCustom05"
            >
              <option>Activo</option>
              <option>Inactivo</option>
            </CFormSelect>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom01">Tipo</CFormLabel>
            <CFormSelect
              v-model="postContribuyente.tipo"
              id="validationCustom05"
            >
              <option>Empresa</option>
              <option>Personal</option>
            </CFormSelect>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom01">TipoDcto</CFormLabel>
            <CFormInput
              v-model="postContribuyente.tipoDcto"
              id="validationCustom01"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom01">Fax</CFormLabel>
            <CFormInput
              v-model="postContribuyente.fax"
              id="validationCustom01"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom01">Recomienda</CFormLabel>
            <CFormInput
              v-model="postContribuyente.recomienda"
              id="validationCustom01"
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
            <button
              v-on:click="submitForm"
              type="button"
              class="btn btn-primary"
            >
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/FacturacionCobros/Contribuyente'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Api from '../services/FacturacionCobrosServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      postContribuyente: {
        id: 0,
        variacion: 0,
        ciudad: null,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        conctato: null,
        direccion: null,
        email: null,
        estatus: null,
        fax: null,
        fecha: new Date(Date.now()),
        pais: null,
        mensual: 0,
        recomienda: 0,
        rncCedPas: null,
        telefono: null,
        telefono1: null,
        tipo: null,
        tipoDcto: null,
      },

      validatedCustom01: null,
      lgDemo: false,
      columns: [
        { key: 'id', label: 'ID', _style: { width: '40%' } },
        { key: 'pais', label: 'pais', _style: { width: '40%' } },
        { key: 'ciudad', label: 'ciudad', _style: { width: '40%' } },
        { key: 'direccion', label: 'Direccion', _style: { width: '40%' } },
        { key: 'conctato', label: 'Conctato', _style: { width: '40%' } },
        { key: 'email', label: 'Email', _style: { width: '40%' } },
        { key: 'telefono', label: 'Telefono', _style: { width: '40%' } },
        { key: 'fecha', label: 'Fecha', _style: { width: '40%' } },
        { key: 'estatus', label: 'Estatus', _style: { width: '40%' } },
        { key: 'tipoDcto', label: 'TipoDcto', _style: { width: '40%' } },
        { key: 'fax', label: 'Fax', _style: { width: '40%' } },
        { key: 'recomienda', label: 'Recomienda', _style: { width: '40%' } },
        { key: 'tipo', label: 'Tipo', _style: { width: '40%' } },
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
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['Contribuyente']),
  },

  methods: {
    ...mapActions(useRegistroStore, [
      'getContribuyente',
      'addContribuyente',
      'putContribuyente',
    ]),
    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
<<<<<<< HEAD
    },

    close() {
      this.lgDemo = false
=======
>>>>>>> alfredo/T-Condensado
    },

    submitForm() {
      if (this.id) {
        Api.putContribuyente(this.id, this.postContribuyente).then(
          (response) => {
            console.log(response.data)
            this.lgDemo = false
            this.$swal({
              position: 'top-end',
              icon: 'success',
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            })
            this.getContribuyente()
            this.postContribuyente = {
              id: 0,
              variacion: 0,
              ciudad: null,
              ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
              conctato: null,
              direccion: null,
              email: null,
              estatus: null,
              fax: null,
              fecha: new Date(Date.now()),
              pais: null,
              mensual: 0,
              recomienda: 0,
              rncCedPas: null,
              telefono: null,
              telefono1: null,
              tipo: null,
              tipoDcto: null,
            }
          },
        )
        this.getContribuyente()
      } else {
        this.getContribuyente()
        this.addContribuyente(this.postContribuyente)
        //const form = event.currentTarget
        this.lgDemo = true
        this.getContribuyente()
        ;(this.postContribuyente = {
          id: 0,
          variacion: 0,
          ciudad: null,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          conctato: null,
          direccion: null,
          email: null,
          estatus: null,
          fax: null,
          fecha: new Date(Date.now()),
          pais: null,
          mensual: 0,
          recomienda: 0,
          rncCedPas: null,
          telefono: null,
          telefono1: null,
          tipo: null,
          tipoDcto: null,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        this.getContribuyente()
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
    toggleDetails(item) {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      console.log(item)
      if (item.Contribuyente !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true
      console.log(item.id)
      Api.getContribuyenteById(item.id).then((response) => {
        this.postContribuyente = response.data.data
        console.log(response)
        this.id = item.id
        //this.postIngreso = response.data.data
      })
    },
  },
  mounted() {
    this.getContribuyente()
  },
}
</script>

<!-- <script>
import { useRegistroStore } from '../store/FacturacionCobros/Contribuyente'
import { computed, onMounted } from '@vue/runtime-core'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  setup() {
    onMounted(() => {
      console.log('klk')
      getContribuyente()
    }),
      function toggleDetails(item) {
        if (this.details.includes(item._id)) {
          this.details = this.details.filter((_item) => _item !== item._id)
          return
        }
        this.details.push(item._id)
      }
    const columns = [
      { key: 'id', label: 'ID', _style: { width: '40%' } },
      { key: 'Codigo', label: 'Codigo', _style: { width: '40%' } },
      { key: 'Finalidad', label: 'Finalidad', _style: { width: '40%' } },
      { key: 'funcion', label: 'funcion', _style: { width: '40%' } },
      { key: 'Sub funcion', label: 'Sub funcion', _style: { width: '40%' } },
      {
        key: 'Denominacion',
        label: 'Denominacion',
        _style: { width: '40%' },
      },
      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
        // _props: { color: 'primary', class: 'fw-semibold'}
      },
    ]

    function handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    }

    function getBadge(status) {
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
    }

    const validatedCustom01 = null
    const lgDemo = false

    const store = useRegistroStore()

    const { getContribuyente, Contribuyente } = store

    return {
      store,
      getContribuyente,
      Contribuyente,
      validatedCustom01,
      handleSubmitCustom01,
      lgDemo,
      getBadge,
      columns,
      Contribuyentes: computed(() => store.Contribuyente),
    }
  },
}
</script> -->
