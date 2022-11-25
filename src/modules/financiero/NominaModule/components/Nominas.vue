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
        >
          <div class="row">
            <div class="col-7">
              <div class="col-11">
                <CCol :md="8">
                  <CFormLabel for="validationCustom01">Programa</CFormLabel>
                  <CFormInput
                    v-model="postNomina.programaDivnullionId"
                    id="validationCustom01"
                    required
                  />

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
                  <CFormLabel
                    v-model="postNomina.programaDivisionId"
                    for="validationCustom01"
                    >Programa</CFormLabel
                  >
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
                  <CFormInput
                    v-model="postNomina.fecha"
                    id="validationCustom01"
                    required
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div>
                <CCol :md="4">
                  <CFormLabel for="validationCustom02">Tipo de Pago</CFormLabel>
                  <CFormInput
                    v-model="postNomina.tipoPago"
                    id="validationCustom02"
                    required
                  />
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
                      <CFormLabel for="validationCustom01">Dividir</CFormLabel>
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
import { useRegistroStore } from '../store/Nomina/nomina'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Api from '../services/NominaServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      postNomina: {
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        departamentoId: 0,
        afpMonto: 0,
        fecha: new Date(Date.now()),
        tipoCobro: null,
        tipoPago: null,
        empleadoId: 0,
        programaDivisionId: 0,
        estatus: 0,
        grupoNom: null,
        codEmpl: null,
        nombreEmpleado: null,
        posicionId: 0,
        descCargo: null,
        sectorId: 0,
        sueldo: 0,
        ing2: 0,
        ing3: 0,
        ing4: 0,
        ing5: 0,
        ing6: 0,
        ing7: 0,
        ing8: 0,
        ing9: 0,
        ing10: 0,
        impSR: 0,
        arsMonto: 0,
        egr4: 0,
        egr5: 0,
        egr6: 0,
        egr7: 0,
        egr8: 0,
        egr9: 0,
        egr10: 0,
        cantDiasTrabanulldos: null,
        valorDias: 0,
        nota: null,
        noCheque: 0,
        finiContrato: 0,
        ffinContrato: 0,
        id: 0,
        variacion: 0,
      },

      tabPaneActiveKey: 1,
      columns: [
        { key: 'fecha', label: 'Fecha', _style: { width: '40%' } },
        {
          key: 'departamentoId',
          label: 'Departamento',
          _style: { width: '40%' },
        },

        {
          key: 'programaDivisionId',
          label: 'Programa',
          _style: { width: '40%' },
        },
        { key: 'Est.Pro', label: 'Est.Pro', _style: { width: '40%' } },
        {
          key: 'Clasificador',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        { key: 'nombreEmpleado', label: 'Empleado', _style: { width: '40%' } },
        { key: 'Total Bruto', label: 'Total Bruto', _style: { width: '40%' } },
        { key: 'Total Neto', label: 'Total Neto', _style: { width: '40%' } },
        { key: 'tipoPago', label: 'T/Pago', _style: { width: '40%' } },
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
    ...mapActions(useRegistroStore, ['getNomina', 'addNomina']),
    submitForm() {
      if (this.id) {
        Api.putNomina(this.id, this.postNomina).then((response) => {
          console.log(response.data)
          this.lgDemo = false
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          this.getNomina()
          this.postNomina = {
            anioFiscalId: parseInt(localStorage.getItem('ano')),
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
            departamentoId: 0,
            afpMonto: 0,
            fecha: new Date(Date.now()),
            tipoCobro: null,
            tipoPago: null,
            empleadoId: 0,
            programaDivisionId: 0,
            estatus: 0,
            grupoNom: null,
            codEmpl: null,
            nombreEmpleado: null,
            posicionId: 0,
            descCargo: null,
            sectorId: 0,
            sueldo: 0,
            ing2: 0,
            ing3: 0,
            ing4: 0,
            ing5: 0,
            ing6: 0,
            ing7: 0,
            ing8: 0,
            ing9: 0,
            ing10: 0,
            impSR: 0,
            arsMonto: 0,
            egr4: 0,
            egr5: 0,
            egr6: 0,
            egr7: 0,
            egr8: 0,
            egr9: 0,
            egr10: 0,
            cantDiasTrabanulldos: null,
            valorDias: 0,
            nota: null,
            noCheque: 0,
            finiContrato: 0,
            ffinContrato: 0,
            id: 0,
            variacion: 0,
          }
        })
        this.getNomina()
      } else {
        this.addNomina(this.postNomina)
        //const form = event.currentTarget
        this.lgDemo = true
        this.getNomina()
        ;(this.postNomina = {
          anioFiscalId: parseInt(localStorage.getItem('ano')),
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          departamentoId: 0,
          afpMonto: 0,
          fecha: new Date(Date.now()),
          tipoCobro: null,
          tipoPago: null,
          empleadoId: 0,
          programaDivisionId: 0,
          estatus: 0,
          grupoNom: null,
          codEmpl: null,
          nombreEmpleado: null,
          posicionId: 0,
          descCargo: null,
          sectorId: 0,
          sueldo: 0,
          ing2: 0,
          ing3: 0,
          ing4: 0,
          ing5: 0,
          ing6: 0,
          ing7: 0,
          ing8: 0,
          ing9: 0,
          ing10: 0,
          impSR: 0,
          arsMonto: 0,
          egr4: 0,
          egr5: 0,
          egr6: 0,
          egr7: 0,
          egr8: 0,
          egr9: 0,
          egr10: 0,
          cantDiasTrabanulldos: null,
          valorDias: 0,
          nota: null,
          noCheque: 0,
          finiContrato: 0,
          ffinContrato: 0,
          id: 0,
          variacion: 0,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        this.getNomina()
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
    close() {
      this.lgDemo = false
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

    // toggleDetails(item) {
    //   if (this.details.includes(item._id)) {
    //     this.details = this.details.filter((_item) => _item !== item._id)
    //     return
    //   }
    //   this.details.push(item._id)
    // },

    toggleDetails(item) {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      console.log(item)
      if (item.Nomina !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true
      console.log(item.id)
      Api.getNominabyid(item.id).then((response) => {
        this.postNomina = response.data.data
        console.log(response)
        this.id = item.id
        //this.postIngreso = response.data.data
      })
    },
  },

  mounted() {
    this.getNomina()
  },
}
</script>

<!-- <template>
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
                  <CFormInput
                    v-model="postNomina.departamentoId"
                    id="validationCustom01"
                    required
                  />

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
                  <CFormInput
                    v-model="postNomina.programaDivnullionId"
                    id="validationCustom01"
                    required
                  />

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
                  <CFormInput
                    v-model="postNomina.tipoPago"
                    id="validationCustom02"
                    required
                  />
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
            <button v-on:click="submitForm" class="btn btn-info btn-block mt-1">
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
      postNomina: {
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        fecha: null,
        tipoCobro: null,
        tipoPago: null,
        empleadoId: null,
        programaDivnullionId: null,
        departamentoId: null,
        grupoNom: null,
        codEmpl: null,
        nombreEmpleadnull: null,
        posicionId: null,
        descCargo: null,
        estatus: null,
        sectorId: null,
        sueldo: null,
        ing2: 0,
        ing3: 0,
        ing4: 0,
        ing5: 0,
        ing6: 0,
        ing7: 0,
        ing8: 0,
        ing9: 0,
        ing10: 0,
        impSR: 0,
        arsMonto: null,
        afpMonto: null,
        egr4: 0,
        egr5: 0,
        egr6: 0,
        egr7: 0,
        egr8: 0,
        egr9: 0,
        egr10: 0,
        cantDiasTrabanulldos: null,
        valorDias: null,
        nota: null,
        noCheque: null,
        finiContrato: null,
        ffinContrato: null,
        tabPaneActiveKey: null,
      },
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

    submitForm() {
      this.addNomina(this.postNomina)
    },
  },

  mounted() {
    this.getNomina()
    // this.getListarIngresos(
    //   localStorage.getItem('id_Ayuntamiento'),
    //   localStorage.getItem('ano'),
    // )
  },
}
</script> -->
