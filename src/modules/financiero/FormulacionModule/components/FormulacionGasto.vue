<template>
  <h3 class="text-center">Formulación gasto</h3>
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
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="cargarEstructuras"
        >Cargar Estructuras</CButton
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
    :items="prepGastoList"
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
    <!-- Borre el , index  dentro del template de abajo -->
    <template #show_details="{ item }">
      <td class="py-2">
        <CButton
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
  <div
    class="font-weight-normal"
    style="font-weight: 100 !important; margin-top: -3%; float: left"
  >
    <span style="font-weight: bold"><u>TOTAL PRESUPUESTADO:</u></span> Año
    anterior
    <span style="font-weight: 500 !important">{{
      formatPrice(formulado.anO_ANT)
    }}</span>
    A la fecha:
    <span style="font-weight: 500 !important">{{
      formatPrice(formulado.alafecha)
    }}</span>
    Presupuesto formulado:
    <span style="font-weight: 500 !important">{{
      formatPrice(formulado.preS_FORM)
    }}</span>
  </div>
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
      <CModalTitle class="text-center" style="margin-left: 35%"
        >Formulación Gastos</CModalTitle
      >
    </CModalHeader>
    <h5 class="p-3">Captura Estructuras Presupuesto de Gastos</h5>
    <hr />
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="2">
            <CFormLabel for="validationCustom01">PNAP</CFormLabel>
            <CFormInput
              :disabled="id != null ? true : false"
              v-on:change="sumOfProp"
              v-model="post.pnap"
              id="validationCustom01"
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom02">Programa</CFormLabel>
            <CFormInput
              :disabled="id != null ? true : false"
              v-on:change="sumOfProp"
              v-model="post.programa"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustomUsername">Proyecto</CFormLabel>
            <CInputGroup class="has-validation">
              <CFormInput
                :disabled="id != null ? true : false"
                v-on:change="sumOfProp"
                v-model="post.proyecto"
                id="validationCustomUsername"
                value=""
                aria-describedby="inputGroupPrepend"
                required
              />
              <CFormFeedback valid> Éxito! </CFormFeedback>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CInputGroup>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom03">Actividad/Obra</CFormLabel>
            <CFormInput
              :disabled="id != null ? true : false"
              v-on:change="sumOfProp"
              v-model="post.actControl"
              id="validationCustom03"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04"
              >Est. Programática control</CFormLabel
            >
            <CFormInput
              disabled
              v-model="post.mestprogId"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Denominación</CFormLabel>
            <CFormInput
              v-model="post.nombre"
              id="validationCustom05"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Unidad responsable</CFormLabel>
            <CFormInput v-model="post.unidadResp" id="validationCustom04">
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Tipo</CFormLabel>
            <CFormSelect id="validationCustom04">
              <option>DETALLE</option>
              <option>CABECERA</option>
            </CFormSelect>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04"
              >No. fondo transferido</CFormLabel
            >
            <CFormInput
              v-model="post.estControl"
              id="validationCustom04"
            ></CFormInput>
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
            <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
              Guardar
            </button>
            <button
              class="btn btn-info btn-block mt-1"
              @click="toggleDetails1()"
            >
              Guardar Detalle
            </button>
          </div>
        </CForm>
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
          :items="detallePresGastos"
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
          <!-- Borre el index de aquí -->
          <template #show_details="{ item }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="getEditDetalle(item)"
              >
                {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
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
        <div
          class="font-weight-normal"
          style="font-weight: 100 !important; margin-top: -3%; float: left"
        >
          <span style="font-weight: bold"><u>TOTAL PRESUPUESTADO:</u></span> Año
          anterior
          <span style="font-weight: 500 !important">{{
            formatPrice(formulado.anO_ANT)
          }}</span>
          A la fecha:
          <span style="font-weight: 500 !important">{{
            formatPrice(formulado.alafecha)
          }}</span>
          Presupuesto formulado:
          <span style="font-weight: 500 !important">{{
            formatPrice(formulado.preS_FORM)
          }}</span>
        </div>
      </CCardBody>
    </CModalBody>
  </CModal>
  <CModal
    size="xl"
    :visible="lgDemo1"
    @close="
      () => {
        lgDemo1 = false
      }
    "
  >
    <div class="row">
      <div class="col-12">
        <CModalHeader>
          <CModalTitle>Formulario de Clasificadores</CModalTitle>
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
                <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
                <CFormInput
                  v-model="detallePost.ctgClasificadorId"
                  id="validationCustom01"
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="2">
                <CFormLabel for="validationCustom02">Cta. Control</CFormLabel>
                <CFormInput
                  v-model="detallePost.cControl"
                  disabled
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom02">Detalle</CFormLabel>
                <CFormInput
                  v-model="detallePost.nombre"
                  disabled
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="2">
                <button class="btn btn-primary" v-on:click="getClasificador">
                  Buscar
                </button>
              </CCol>

              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(20, 1955, 100)"
                  >20/1955/100</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9996, 102)"
                  >30/9996/102</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9998, 102)"
                  >30/9998/102</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9999, 102)"
                  >30/9999/102</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('10', '0100', '104')"
                  >10/0100/104</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 102)"
                  >40/9992/102</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 103)"
                  >40/9992/103</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9996, 120)"
                  >40/9996/120</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 299)"
                  >40/9992/299</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('50', '2006', '001')"
                  >50/2006/001</CButton
                >
              </CCol>
              <CCol :md="4">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  >Introducir Manualmente</CButton
                >
              </CCol>
              <CCol :md="2"> </CCol>
              <CCol :md="2"> </CCol>
              <CCol :md="2"> </CCol>
              <CCol :md="2"> </CCol>
              <CCol :md="2"> </CCol>
              <CCol :md="3">
                <CFormLabel for="validationCustom03"
                  >Fuente Financiamiento</CFormLabel
                >
                <CFormInput
                  v-model="this.detallePost.ctgFuenteId"
                  disabled
                  id="validationCustom03"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="3">
                <CFormLabel for="validationCustom04"
                  >Fuente Especifica</CFormLabel
                >
                <CFormInput
                  v-model="this.detallePost.ctgFuenteEspecificaId"
                  disabled
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="3">
                <CFormLabel for="validationCustom05"
                  >Organismo Financiador</CFormLabel
                >
                <CFormInput
                  v-model="this.detallePost.ctgOrganismoFinanciadorId"
                  disabled
                  id="validationCustom05"
                  required
                />
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="3">
                <CFormLabel for="validationCustom04">Funcion:</CFormLabel>
                <CFormInput
                  v-model="this.detallePost.ctgFuncionId"
                  disabled
                  id="validationCustom04"
                >
                </CFormInput>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                <CFormFeedback valid> Exito! </CFormFeedback>
              </CCol>
              <hr />
              <div class="row">
                <div class="col-5">
                  <h2>Presupuesto</h2>
                </div>
                <div class="vr col-2"></div>
                <div class="col-5">
                <h3>Balance Disponible Origen del Financiamiento</h3>
                </div>
              </div>
              <hr>
              <div class="row">
                <div class="col-5">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-4">
                        <CFormLabel for="validationCustom04"
                          >Cta. de Personal</CFormLabel
                        >
                        <CFormInput
                          v-model="this.detallePost.oriBco1"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                      <div class="col-1"></div>
                      <div class="col-4">
                        <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                        <CFormInput
                          v-model="this.detallePost.tipo"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </div>
                  </div>
  
                  <div class="col-12">
                    <div class="row">
                      <div class="col-4">
                        <CFormLabel for="validationCustom04"
                          >Cta. de Servicios</CFormLabel
                        >
                        <CFormInput
                          v-model="this.detallePost.oriBco2"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                      <div class="col-1"></div>
                      <div class="col-4">
                        <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                        <CFormInput
                          v-model="this.detallePost.tipo"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </div>
                  </div>
  
                  <div class="col-12">
                    <div class="row">
                      <div class="col-4">
                        <CFormLabel for="validationCustom04"
                          >Cta. de Inversion</CFormLabel
                        >
                        <CFormInput
                          v-model="this.detallePost.oriBco3"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                      <div class="col-1"></div>
                      <div class="col-4">
                        <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                        <CFormInput
                          v-model="this.detallePost.tipo"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </div>
                  </div>
  
                  <div class="col-12">
                    <div class="row">
                      <div class="col-4">
                        <CFormLabel for="validationCustom04"
                          >Cta. de E/G y Salud</CFormLabel
                        >
                        <CFormInput
                          v-model="this.detallePost.oriBco4"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                      <div class="col-1"></div>
                      <div class="col-4">
                        <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                        <CFormInput
                          v-model="this.detallePost.tipo"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </div>
                  </div>

                </div><div class="vr col-1" style="height: 278px;"></div>
                <div class="col-6">
                  gastos:
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
                <button
                  class="btn btn-info btn-block mt-1"
                  v-on:click="guardarDetalleGasto"
                >
                  Guardar
                </button>
              </div>
            </CForm>
          </CCardBody>
        </CModalBody>
        <div
          class="font-weight-normal"
          style="font-weight: 100 !important; margin-top: -3%; float: left"
        >
          <span style="font-weight: bold"><u>TOTAL PRESUPUESTO:</u></span> Año
          anterior
          <span style="font-weight: 500 !important">{{
            formatPrice(formulado.anO_ANT)
          }}</span>
          A la fecha:
          <span style="font-weight: 500 !important">{{
            formatPrice(formulado.alafecha)
          }}</span>
          Presupuesto formulado:
          <span style="font-weight: 500 !important">{{
            formatPrice(formulado.preS_FORM)
          }}</span>
        </div>
      </div>
    </div>
  </CModal>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/FormulacionServices'
import axios from 'axios'
import { mapActions, mapState } from 'pinia'
import { usePrepGastoStore } from '../store/Formulacion/prepGasto'
import { mount } from '@vue/test-utils'
import { mapStores } from 'pinia'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'


export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      id: null,
      idDetalle: null,
      detallePresGastos: [],
      sumOfFlieds: null,
      detallePost: {
        presGastoId: null,
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        anioFiscalId: localStorage.getItem('ano'),
        mestProgId: '',
        ctgClasificadorId: '',
        cControl: '',
        auxiliar: '',
        ctgFuenteId: '',
        ctgFuenteEspecificaId: '',
        ctgOrganismoFinanciadorId: '',
        oriFondos: 0,
        ctgFuncionId: '1',
        nombre: '',
        tipo: '',
        tipoGasto: '',
        oriBco1: 0,
        oriBco2: 0,
        oriBco3: 0,
        oriBco4: 0,
        totalOriginal: 0,
        totalCompromiso: 0,
        totalDevengado: 0,
        totalPagado: 0,
        totalVariacion: 0,
      },
      post: {
        clasifica: '',
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        anioFiscalId: localStorage.getItem('ano'),
        mestprogId: '',
        pnap: '',
        nombre: '',
        programa: '',
        proyecto: '',
        actControl: '',
        estControl: '',
        unidadResp: '',
        tipo: '',
        totalPresupuesto: 0,
        actObra: '',
        pppm: 'n',
        modContatro: '',
        asignadoA: 0,
        fechaIniciada: '2022-10-31T14:18:15.972Z',
        // sumTotalPresupuesto: 0,
        // sumCostObra: 0,
      },
      formulado: {
        alafecha: 0,
        anO_ANT: 0,
        preS_FORM: 0,
      },
      validatedCustom01: null,
      lgDemo: false,
      lgDemo1: false,
      lgDemo2: false,
      columns: [
        { key: 'pnap', label: 'Pnap', _style: { width: '10%' } },
        { key: 'programa', label: 'Programa', _style: { width: '10%' } },
        { key: 'proyecto', label: 'Proyecto', _style: { width: '10%' } },
        { key: 'actControl', label: 'Control', _style: { width: '10%' } },
        { key: 'nombre', label: 'Denominación', _style: { width: '20%' } },
        // {
        //   key: 'denominacion',
        //   label: 'Denominacion',
        //   _style: { width: '40%' },
        // },
        { key: 'tipo', label: 'tipo', _style: { width: '20%' } },
        {
          key: 'unidadResp',
          label: 'Unidad responsable',
          _style: { width: '40%' },
        },
        {
          key: 'totalPresupuesto',
          label: 'presupuesto',
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
      items: [
        {
          name: 'John Doe',
          registered: '2018/01/01',
          role: 'Guest',
          status: 'Pending',
        },
      ],
      columns2: [
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        {
          key: 'nombre',
          label: 'Denominacion',
          _style: { width: '40%' },
        },
        {
          Object: 'detallePresGastos',
          key: 'totalOriginal',
          label: 'Original',
          _style: { width: '40%' },
        },
        {
          key: 'oriBco1',
          label: 'Gastos Personal',
          _style: { width: '40%' },
        },
        { key: 'oriBco2', label: 'Servicios', _style: { width: '40%' } },
        { key: 'oriBco3', label: 'Inversion', _style: { width: '40%' } },
        {
          key: 'oriBco4',
          label: 'Educ/Genero/Salud',
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
      items2: [
        {
          name: 'John Doe',
          registered: '2018/01/01',
          role: 'Guest',
          status: 'Pending',
        },
      ],
    }
  },
  methods: {
    ...mapActions(usePrepGastoStore, [
      'getListarGastos',
      'getListarGastosById',
      'addGasto',
      'addDetalleGasto',
      'updatePresGastoDetalle',
      'updatePresGasto',
      'getDetalleGasto'
    ]),
    sumOfProp() {
      this.post.mestprogId = `${this.post.pnap}${this.post.programa}${this.post.proyecto}${this.post.actControl}`
    },
    Guardar() {
      if (this.id != null) {
        Api.updateFormulacion(this.id, this.post)
          .then((response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'Datos Actualizado con exito',
              title: 'Actualizado',
              showConfirmButton: false,
              timer: 1500,
            })
          })
          .catch((error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: `${error.data.message}`,
              title: 'Actualizado',
              showConfirmButton: false,
              timer: 1500,
            })
          })
      } else {
        this.addGasto(this.post)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
      }
      event.preventDefault()
      event.stopPropagation()
    },
    guardarDetalleGasto() {
      if (this.idDetalle != null) {
        Api.updateFormulacionDetalle(this.idDetalle, this.detallePost)
          .then((response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'Datos Actualizado con exito',
              title: 'Actualizado',
              showConfirmButton: false,
              timer: 1500,
            })
          })
          .catch((error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: `${error.data.message}`,
              title: 'Actualizado',
              showConfirmButton: false,
              timer: 1500,
            })
          })
      } else {
        this.addDetalleGasto(this.detallePost)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
      }
      event.preventDefault()
      event.stopPropagation()
      Api.getListarGastosById(this.detallePost.presGastoId).then((response) => {
        console.log(response.data.data)
        console.log(item)
        this.detallePresGastos = response.data.data.detallePresGastos
        //console.log(getGasto.value.data)
        //GastosListDos.value = response.data.data
      })
      event.preventDefault()
      event.stopPropagation()
    },

    getClasificador() {
      Api.getClasificador(this.detallePost.ctgClasificadorId).then(
        (response) => {
          console.log(response.data.data.cControl)
          this.detallePost.cControl = response.data.data.cControl
          this.detallePost.nombre = response.data.data.nombre
          // this.postIngreso.control = response.data.data.cControl
          // this.postIngreso.detalle = response.data.data.nombre
        },
      )
    },
    setValueButtonGasto(
      FuenteFinanciamiento,
      FuenteEspecifica,
      OrganismoFinanciador,
    ) {
      this.detallePost.ctgFuenteId = FuenteFinanciamiento
      this.detallePost.ctgFuenteEspecificaId = FuenteEspecifica
      this.detallePost.ctgOrganismoFinanciadorId = OrganismoFinanciador
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    handleSubmitCustom01(event) {
      // this.addGasto(this.post)
      // const form = event.currentTarget
      // if (form.checkValidity() === false) {
      //   event.preventDefault()
      //   event.stopPropagation()
      // }
      // this.validatedCustom01 = true
    },
    getTotal() {
      axios
      Api.getTotalIngresos(
        localStorage.getItem('id_Ayuntamiento'),
        localStorage.getItem('ano'),
      ).then((response) => {
        this.formulado.alafecha = response.data.alafecha
        this.formulado.anO_ANT = response.data.anO_ANT
        this.formulado.preS_FORM = response.data.preS_FORM
      })
    },
    IngresoReport() {
      window
        .open(
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fseguridad%2fReport1&rs:Command=Render&id=${localStorage.getItem(
            'id_ayuntamiento',
          )}&ano=${localStorage.getItem('ano')}`,
          '_blank',
        )
        .focus()
    },
    cargarEstructuras(){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: "Estructuras Cargadas",
        title: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      Api.cargarEstructuras()
      this.getListarGastos()
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
      this.id = item.id
      Api.getListarGastosById(item.id).then((response) => {
        console.log(response.data.data)
        console.log(item)
        this.post = response.data.data
        this.detallePost.presGastoId = item.id
        this.detallePost.mestProgId = item.mestProgId
        // this.detallePost.ctgFuncionId = item.ctgFuncionId
        this.post.mestprogId = `${this.post.pnap}${this.post.programa}${this.post.proyecto}${this.post.actControl}`
        this.detallePresGastos = response.data.data.detallePresGastos
       
        //console.log(getGasto.value.data)
        //GastosListDos.value = response.data.data
      })
      // // this.details.push(item._id)
      // console.log(this.getGasto)
      //this.post.presGasto.pnap = "00"
      this.lgDemo = true
    },
    toggleDetails1(item) {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      
      this.lgDemo1 = true
    },
    getEditDetalle(item){
      this.idDetalle = item.id
      Api.getDetalle(item.id).then((response) => {
        this.lgDemo1 = true
      this.detallePost = response.data.data
    })
     
    }
  },

  computed: {
    ...mapStores(usePrepGastoStore),
    //  ...mapGetters(usePrepGastoStore,['getAllGasto']),
    ...mapState(usePrepGastoStore, [
      'prepGastoList',
      'GastosListDos',
      'getGasto',
      'dataDummy',
    ]),
  },

  mounted() {
    this.getListarGastos()
  },
}
</script>
<!-- <script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue-pro'
import Api from '../services/FormulacionServices'
import axios from 'axios'
import { usePrepGastoStore } from '../store/Formulacion/prepGasto'
import { onMounted } from 'vue'



export default {
  components:{
    CSmartTable,
    CModal
  },

  setup() {
    const store = usePrepGastoStore()
    const { getListarGastos} = store

    //Variables
    const formulado=  {
        alafecha: 0,
        anO_ANT: 0,
        preS_FORM: 0,
      }
      const validatedCustom01= null
      const lgDemo= false
      const lgDemo1= false
      const lgDemo2= false
      const columns= [
        { key: 'pnap', label: 'Pnap', _style: { width: '40%' } },
        { key: 'programa', label: 'Programa', _style: { width: '40%' } },
        { key: 'proyecto', label: 'Proyecto', _style: { width: '40%' } },
        { key: 'obra', label: 'Obra', _style: { width: '40%' } },
        {
          key: 'denominacion',
          label: 'Denominacion',
          _style: { width: '40%' },
        },
        { key: 'control', label: 'Control', _style: { width: '40%' } },
        { key: 'tipo', label: 'tipo', _style: { width: '40%' } },
        {
          key: 'unidadResponsable',
          label: 'Unidad responsable',
          _style: { width: '40%' },
        },
        { key: 'presupuesto', label: 'presupuesto', _style: { width: '40%' } },
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





     const  formatPrice = (value) => {
      let val = (value / 1).toFixed(2).replace('.', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const handleSubmitCustom01 = (event) => {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    }
    const getTotal = () => {
      axios
      Api.getTotalIngresos(
        localStorage.getItem('id_Ayuntamiento'),
        localStorage.getItem('ano'),
      ).then((response) => {
        this.formulado.alafecha = response.data.alafecha
        this.formulado.anO_ANT = response.data.anO_ANT
        this.formulado.preS_FORM = response.data.preS_FORM
      })
    }
    const consIngresoReport = () => {
      window
        .open(
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fseguridad%2fReport1&rs:Command=Render&id=${localStorage.getItem(
            'id_ayuntamiento',
          )}&ano=${localStorage.getItem('ano')}`,
          '_blank',
        )
        .focus()
    }
    const getBadge = (status) => {
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
   const toggleDetails = () => {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      this.lgDemo = true
    }
    const toggleDetails1 = () => {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      this.lgDemo1 = true
    }

    onMounted(() => {
      console.log('holla')
    })



    return {
      CSmartTable,
      formulado,
      validatedCustom01,
      lgDemo,
      lgDemo1,
      lgDemo2,
      columns,
      details,
      toggleDetails1,
      toggleDetails,
      getBadge,
      consIngresoReport,
      getTotal,
      handleSubmitCustom01,
      formatPrice,
      getListarGastos
    }
  }



}


</script> -->
