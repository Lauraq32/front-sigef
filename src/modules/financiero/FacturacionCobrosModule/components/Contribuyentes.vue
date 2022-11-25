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
    <CModalBody class="mt-3">
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <div class="row">
            <div class="col-6">
              <CCol :md="10">
                <CFormLabel for="validationCustom01">Nombre</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.nombre"
                  id="validationCustom01"
                  required
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>

            <div class="col-3">
              <CCol :md="10">
                <CFormLabel for="validationCustom02">Codigo</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.codigo"
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>

            <div class="col-3">
              <CCol :md="10">
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
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <CCol :md="6">
                <CFormLabel for="validationCustom01"
                  >Tipo Contribuyente</CFormLabel
                >
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
            </div>

            <div class="col-3">
              <CCol :md="10">
                <CFormLabel for="validationCustom01">Tipo Documento</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.tipoDcto"
                  id="validationCustom01"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-3">
              <CCol :md="10">
                <CFormLabel for="validationCustom03">#Documento</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.rncCedPas"
                  id="validationCustom03"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>
          <hr />

          <div class="row">
            <div class="col-6">
              <CCol :md="17">
                <CFormLabel for="validationCustom03">Direccion</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.direccion"
                  id="validationCustom03"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-3">
              <CCol :md="14">
                <CFormLabel for="validationCustom04">Pais</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.pais"
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-3">
              <CCol :md="14">
                <CFormLabel for="validationCustom05">Ciudad</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.ciudad"
                  type="email"
                  id="validationCustom05"
                  required
                />
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <CCol :md="7">
                <CFormLabel for="validationCustom01">Telefono</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.telefono"
                  id="validationCustom01"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-6">
              <CCol :md="7">
                <CFormLabel for="validationCustom01">Fax</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.fax"
                  id="validationCustom01"
                  required
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <CCol :md="7">
                <CFormLabel for="validationCustom01">Contacto</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.conctato"
                  id="validationCustom01"
                  required
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>

            <div class="col-6">
              <CCol :md="17">
                <CFormLabel for="validationCustom01">Email</CFormLabel>
                <CFormInput
                  v-model="postContribuyente.email"
                  id="validationCustom01"
                  required
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

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
        codigo: 0,
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
        nombre: null,
      },

      validatedCustom01: null,
      lgDemo: false,
      columns: [
        { key: 'nombre', label: 'Nombre', _style: { width: '15%' } },
        { key: 'codigo', label: 'Codigo', _style: { width: '8%' } },
        { key: 'tipoDcto', label: 'Documento', _style: { width: '10%' } },
        { key: 'direccion', label: 'Direccion', _style: { width: '30%' } },
        { key: 'telefono', label: 'Telefono', _style: { width: '10%' } },
        { key: 'fecha', label: 'Fecha Reg.', _style: { width: '10%' } },
        { key: 'tipo', label: 'Tipo', _style: { width: '10%' } },
        { key: 'estatus', label: 'Estatus', _style: { width: '10%' } },
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
    },
    close() {
      this.lgDemo = false
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
            setTimeout(this.getContribuyente, 500)
            this.postContribuyente = {
              id: 0,
              variacion: 0,
              ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
              nombre: null,
              direccion: null,
              estatus: null,
              fecha: new Date(Date.now()),
              telefono: null,
              tipo: null,
              tipoDcto: null,
            }
          },
        )
        setTimeout(this.getContribuyente, 500)
      } else {
        setTimeout(this.getContribuyente, 500)
        this.addContribuyente(this.postContribuyente)
        //const form = event.currentTarget
        this.lgDemo = true
        setTimeout(this.getContribuyente, 500)
        ;(this.postContribuyente = {
          id: 0,
          variacion: 0,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          nombre: null,
          direccion: null,
          estatus: null,
          fecha: new Date(Date.now()),
          telefono: null,
          tipo: null,
          tipoDcto: null,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getContribuyente, 500)
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
