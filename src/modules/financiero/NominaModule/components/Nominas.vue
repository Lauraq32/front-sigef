<template>
  <h3 class="text-center">Mantenimientos Empleados</h3>

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
    :items="Nomina"
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
    <CModalHeader>
      <CModalTitle>Sectores</CModalTitle>
    </CModalHeader>
    <CModalBody class="mt-2">
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <div class="row">
            <div class="col-7">
              <div class="col-11">
                <CCol :md="8">
                  <CFormLabel for="validationCustom01">Programa</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-11">
                <CCol :md="8">
                  <CFormLabel for="validationCustom01">Departamento</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">PNAP</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Programa</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Sub-Programa</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Proyecto</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Actividad</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="5">
                  <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="8">
                  <CFormLabel for="validationCustom01"
                    >Desc.Clasificador</CFormLabel
                  >
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="4">
                  <CFormLabel for="validationCustom01"
                    >Fecha de la Nomina</CFormLabel
                  >
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="4">
                  <CFormLabel for="validationCustom02">Tipo de Pago</CFormLabel>
                  <CFormInput id="validationCustom02" required />
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Nomina de Regalia?
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Permitir Duplicidad en Nomina?
                </label>
              </div>
            </div>

            <div class="col-5">
              <div class="row">
                <CNav variant="tabs" role="tablist">
                  <CNavItem>
                    <CNavLink
                      href="javascript:void(0);"
                      :active="tabPaneActiveKey === 1"
                      @click="
                        () => {
                          tabPaneActiveKey = 1
                        }
                      "
                    >
                      Home
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      href="javascript:void(0);"
                      :active="tabPaneActiveKey === 2"
                      @click="
                        () => {
                          tabPaneActiveKey = 2
                        }
                      "
                    >
                      Profile
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent class="border p-3">
                  <CTabPane
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    :visible="tabPaneActiveKey === 1"
                  >
                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"
                            >Retenciones:</CFormLabel
                          >
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"
                          >Dividir</CFormLabel
                        >
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"
                          >Cod.Ejec/Pres</CFormLabel
                        >
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>
                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <div class="row">
                      <CCol :md="6">
                        <div>
                          <CFormLabel for="validationCustom01"></CFormLabel>
                          <CFormInput id="validationCustom01" required />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </div>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>

                      <CCol :md="3">
                        <CFormLabel for="validationCustom01"></CFormLabel>
                        <CFormInput id="validationCustom01" required />

                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </CCol>
                    </div>

                    <hr />
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Nomina con Retenciones?
                      </label>
                    </div>
                    <hr />
                    <div>
                      <button type="button" class="btn btn-outline-dark">
                        Consultar Empleados
                      </button>
                    </div>
                    <div class="mt-3 mb-2">
                      <button type="button" class="btn btn-outline-dark">
                        Consultar Departamentos
                      </button>
                    </div>
                  </CTabPane>
                  <CTabPane
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                    :visible="tabPaneActiveKey === 2"
                  >
                    Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                    single-origin coffee squid. Exercitation +1 labore velit,
                  </CTabPane>
                </CTabContent>
              </div>
            </div>
            <hr />
            <div>
              <p class="font-weight-bold">Nota (Encabezado Nomina):</p>
              <CCol :md="7">
                <CFormInput
                  id="validationCustom01"
                  required
                  placeholder="NOMINA DE PAGO DEL MES DE NOVIEMBRE DEL 2022"
                />
              </CCol>
              <CCol :md="7">
                <input
                  class="mt-2 form-control form-control-lg"
                  type="text"
                  aria-label=".form-control-lg example"
                />
              </CCol>
              <div class="row">
                <div class="col-3">
                  <button type="button" class="mt-2 btn btn-outline-dark">
                    Procesar Nomina
                  </button>
                </div>

                <div class="form-check col-9 mt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Nomina de Regalia?
                  </label>
                </div>
              </div>

              <div class="mt-3">
                <button type="button" class="btn btn-outline-dark">
                  Imprimir Nomina
                </button>
              </div>

              <div class="mt-3">
                <button type="button" class="btn btn-outline-dark">
                  Emp. con descuento MAYOR a % del sueldo, segun Ley
                </button>
              </div>
            </div>
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
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/Nomina/nomina'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      tabPaneActiveKey: 1,
      columns: [
        { key: 'Fecha', label: 'Fecha', _style: { width: '40%' } },
        {
          key: 'Departamento',
          label: 'Departamento',
          _style: { width: '40%' },
        },

        { key: 'Programa', label: 'Programa', _style: { width: '40%' } },
        { key: 'Est.Pro', label: 'Est.Pro', _style: { width: '40%' } },
        {
          key: 'Clasificador',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        { key: 'Empleado', label: 'Empleado', _style: { width: '40%' } },
        { key: 'Total Bruto', label: 'Total Bruto', _style: { width: '40%' } },
        { key: 'Total Neto', label: 'Total Neto', _style: { width: '40%' } },
        { key: 'T/Pago', label: 'T/Pago', _style: { width: '40%' } },
        { key: 'Comprobante', label: 'Comprobante', _style: { width: '40%' } },
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
    ...mapState(useRegistroStore, ['Nomina']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getNomina']),

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
    this.getNomina()
  },
}
</script>

<!-- <template>
  <h3 class="text-center">Registro Personal</h3>
  zxb <noframes></noframes>
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
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport"
        >Imprimir</CButton
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
    :items="Personal"
    :columns="columns"
    cleaner
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    pagination
  >
    <template #status="{}">
      <td>{item.Nombre}</td>
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
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Formulación gasto</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="2">
            <CFormLabel for="validationCustom01">Apellido</CFormLabel>
            <CFormInput
              v-model="postPersonal.Apellido"
              id="validationCustom01"
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom02">Nombre</CFormLabel>
            <CFormInput
              v-model="postPersonal.Nombre"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustomUsername">Cédula</CFormLabel>
            <CFormInput
              v-model="postPersonal.Cédula"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom03">Código</CFormLabel>
            <CFormInput
              v-model="postPersonal.Código"
              id="validationCustom03"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Programa</CFormLabel>
            <CFormInput v-model="postPersonal.Programa" id="validationCustom04">
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05"
              >Direccion o Dependencia</CFormLabel
            >
            <CFormInput
              v-model="postPersonal.Direccion"
              id="validationCustom05"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Cargo</CFormLabel>
            <CFormInput v-model="postPersonal.Cargo" id="validationCustom04">
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Fecha de ingreso</CFormLabel>
            <CFormInput
              v-model="postPersonal.FechaIngreso"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04"
              >Fecha de nacimiento</CFormLabel
            >
            <CFormInput
              v-model="postPersonal.FechaNacimiento"
              id="validationCustom04"
            ></CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Edad</CFormLabel>
            <CFormInput
              v-model="postPersonal.Edad"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Sexo</CFormLabel>
            <CFormInput
              v-model="postPersonal.Sexo"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Sueldo</CFormLabel>
            <CFormInput
              v-model="postPersonal.Sueldo"
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
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1">Guardar</button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
//import store from '@/store'
import { useRegistroStore } from '../store/RegistroPersonal/Empleados'
import { computed } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
  components: { CSmartTable },

  setup() {
    onMounted(() => {
      console.log('klk')
      getRegistroPersonal()
    })
    function toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    }

    const validatedCustom01 = null
    const lgDemo = false

    const postPersonal = {
      id: 34,
      Apellido: 'JIMENEZ CORDERO',
      Nombre: 'EDWING FRANCISCO',
      Cédula: '001-0004972-5',
      Código: '377',
      Programa: '16-DIR. DE CAP. Y FORM',
      Direccion: '',
      Cargo: '',
      FechaIngreso: '01/01/1999',
      FechaNacimiento: '28/10/1963',
      Edad: '58',
      Sexo: 'MASCULINO',
      Sueldo: '25,000.00 RD$',
    }

    const store = useRegistroStore()
    function submit() {
      this.addPersonal(postPersonal)
    }
    const columns = [
      { key: 'Apellido', label: 'Apellido', _style: { width: '40%' } },
      { key: 'Nombre', label: 'Nombre', _style: { width: '40%' } },
      { key: 'Cédula', label: 'Cédula', _style: { width: '40%' } },
      { key: 'Código', label: 'Código', _style: { width: '40%' } },
      { key: 'Programa', label: 'Programa', _style: { width: '40%' } },
      {
        key: 'Direccion o Dependencia',
        label: 'Direccion o Dependencia',
        _style: { width: '40%' },
      },
      { key: 'Cargo', label: 'Cargo', _style: { width: '40%' } },
      {
        key: 'Fecha de ingreso',
        label: 'Fecha de ingreso',
        _style: { width: '40%' },
      },
      {
        key: 'Fecha de nacimiento',
        label: 'Fecha de nacimiento',
        _style: { width: '40%' },
      },
      { key: 'Edad', label: 'Edad', _style: { width: '40%' } },
      { key: 'Sexo', label: 'Sexo', _style: { width: '40%' } },
      { key: 'Sueldo', label: 'Sueldo', _style: { width: '40%' } },

      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
        // _props: { color: 'primary', class: 'fw-semibold'}
      },
    ]
    const details = []
    const {
      registroPersonal,
      getRegistroPersonal,
      addPersonal,
      getAllPersonal,
      is_loading,
    } = store

    return {
      // you can return the whole store instance to use it in the template
      store,
      CModal,
      CSmartTable,
      registroPersonal,
      addPersonal,
      getAllPersonal,
      toggleDetails,
      details,
      validatedCustom01,
      lgDemo,
      columns,
      submit,
      is_loading,
      getRegistroPersonal,
      Personal: computed(() => store.registroPersonal),
    }
  },
}
</script> -->
