<template>
  <h3 class="text-center">Comprobante de gastos</h3>
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
    :items="this.$store.state.Formulacion.proyecto"
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
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item, index)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
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
    size="xl"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader class="text-center">
      <CModalTitle>Comprobante de gastos</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <div class="row">
            <div class="col-4">
              <CCol :md="17">
                <CFormLabel for="validationCustom01">Comp No:</CFormLabel>
                <CFormInput id="validationCustom01" required />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="17">
                <CFormLabel for="validationCustom04">Fecha</CFormLabel>
                <CFormInput type="date" id="validationCustom04"> </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="17">
                <CFormLabel for="validationCustom02">Status</CFormLabel>
                <CFormInput id="validationCustom02" required />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="17">
                <CFormLabel for="validationCustom05">Etapa</CFormLabel>
                <CFormSelect id="validationCustom05">
                  <option>Devengado</option>
                  <option>OPCION 2</option>
                  <option>OPCION 3</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="17">
                <CFormLabel for="validationCustom01">Resolución No.</CFormLabel>
                <CFormInput id="validationCustom01" required />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="17">
                <CFormLabel for="validationCustom04">Fecha Resol.</CFormLabel>
                <CFormInput type="date" id="validationCustom04"> </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="17">
                <CFormLabel for="validationCustom01">Comp. Modifica</CFormLabel>
                <CFormInput id="validationCustom01" required />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="16">
                <CFormLabel for="validationCustom05"> Forma/pago</CFormLabel>
                <CFormSelect id="validationCustom05">
                  <option>Cheque</option>
                  <option>Caego Beneficiario</option>
                  <option>Transferencia</option>
                  <option>Revesar</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
            <div class="col-4 top">
              <button
                class="btn btn-primary btn-block mt-1"
                v-on:click="getClasificador"
              >
                Buscar
              </button>
            </div>
            <div class="col-4">
              <CCol :md="12">
                <CFormLabel for="validationCustom01">Beneficiario</CFormLabel>
                <CFormInput id="validationCustom01" required />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol :md="15">
                <CFormLabel for="validationCustom01"
                  >Concepto/auxiliar</CFormLabel
                >
                <CFormInput id="validationCustom01" required />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol :md="15">
                <CFormLabel for="validationCustom01"
                  >Cuenta de banco</CFormLabel
                >
                <CFormInput id="validationCustom01" required />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <hr />
          <div>
            <CCol :md="12">
              <CFormLabel for="validationCustom01">Detalle</CFormLabel>
              <CFormInput id="validationCustom01" required />

              <CFormFeedback valid> Exito! </CFormFeedback>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CCol>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
              Guardar
            </button>
          </div>
        </CForm>
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
          :items="[]"
          :columns="columns2"
          columnFilter
          tableFilter
          cleaner
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
          <template #show_details="{ item, index }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails(item, index)"
              >
                {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
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
                <CButton size="sm" color="info" class="">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" class="ml-1">
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          </template>
        </CSmartTable>
        <CCol :md="2.3" class="left">
          <CFormLabel for="validationCustom01">Valor Total</CFormLabel>
          <CFormInput id="validationCustom01" required />

          <CFormFeedback valid> Exito! </CFormFeedback>
          <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
        </CCol>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      validatedCustom01: null,
      lgDemo: false,
      columns: [
        { key: 'pnap', label: 'pnap', _style: { width: '40%' } },
        { key: 'control', label: 'control', _style: { width: '40%' } },
        { key: 'funcion', label: 'funcion', _style: { width: '40%' } },
        { key: 'numero', label: 'numero', _style: { width: '40%' } },
        { key: 'obra', label: 'obra', _style: { width: '40%' } },
        { key: 'presupuesto', label: 'presupuesto', _style: { width: '40%' } },
        { key: 'programa', label: 'programa', _style: { width: '40%' } },
        { key: 'proyecto', label: 'proyecto', _style: { width: '40%' } },
        { key: 'tipo', label: 'tipo', _style: { width: '40%' } },
        {
          key: 'unidadResponsable',
          label: 'unidadResponsable',
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
      ],

      columns2: [
        {
          key: 'Estructura',
          label: 'Estructura',
          _style: { width: '40%' },
        },
        {
          key: 'Clasificador',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        { key: 'Descripcion', label: 'Descripcion', _style: { width: '40%' } },
        {
          key: 'Fuente_de_financiamiento',
          label: 'Fuente de financiamiento',
          _style: { width: '40%' },
        },
        {
          key: 'Fuente_especifica',
          label: 'Fuente especifica',
          _style: { width: '40%' },
        },
        {
          key: 'Organismo_de_financiamiento',
          label: 'Organismo de financiamiento',
          _style: { width: '40%' },
        },
        { key: 'Sub_total', label: 'Sub-total', _style: { width: '40%' } },
        { key: 'Retencion', label: 'Retencion', _style: { width: '40%' } },
        { key: 'Valor_neto', label: 'Valor neto', _style: { width: '40%' } },
        {
          key: 'unidadResponsable',
          label: 'unidadResponsable',
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
      ],
      details: [],
    }
  },
  methods: {
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
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },
  },
  mounted() {
    this.$store.dispatch('Formulacion/getProyectos')
  },
}
</script>

<style>
/* .flex-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.spacing {
  display: flex;
  flex-direction: column;
  margin-left: 450px;
} */

.top {
  margin-top: 27px;
}

.left {
  margin-left: 910px;
  margin-top: 15px;
}
</style>
