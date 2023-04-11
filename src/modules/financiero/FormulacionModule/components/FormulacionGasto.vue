<template>
  <h3 class="text-center">Cargar Formulación del presupuesto de gastos</h3>
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        style="font-weight: bold"
        color="info"
        @click="
          () => {
            openModal()
            clearForm
          }
        "
        >Agregar</CButton
      >
    </div>
    <div class="p-2">
      <CButton color="info" @click="IngresoReport">Imprimir</CButton>
    </div>
    <div class="p-2">
      <CButton color="info" @click="cargarEstructuras"
        >Cargar Estructuras</CButton
      >
    </div>
    <div class="p-2">
      <CButton color="info" @click="goToIngreso"
        >Ir a Formulacion Ingreso</CButton
      >
    </div>
  </div>
  <div>
    <h5>Importar Proyectos</h5>
    <CFormInput type="file" id="formFile" @change="onFileChangeProyectos" />
  </div>
  <div>
    <h5>Importar Formulacion</h5>
    <CFormInput type="file" id="formFile" @change="onFileChange" />
  </div>
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
    columnFilter
    :items="prepGastoList"
    :columns="columns"
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #totalPresupuesto="{ item }">
      <td class="text-end">
        {{ formatPrice(item.totalPresupuesto) }}
      </td>
    </template>
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
            <input
              ref="name"
              class="form-control"
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
              v-model="post.actObra"
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
            <CFormSelect v-model="post.tipo" id="validationCustom04">
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
              v-model="post.costObra"
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
            <button
              class="btn btn-info btn-block mt-1"
              @click="toggleDetails1()"
            >
              Adicionar Detalle
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
              Guardar Estructura
            </button>
          </div>
        </CForm>
        <CSmartTable
          class="sticky-top"
          clickableRows
          :tableProps="{
            striped: true,
            hover: true,
          }"
          :tableHeadProps="{}"
          :activePage="1"
          header
          :items="detallePresGastos"
          :columns="columns2"
          itemsPerPageSelect
          columnFilter
          :footer="footerItems"
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

          <template #totalOriginal="{ item }">
            <td class="text-end">
              {{ formatPrice(item.totalOriginal) }}
            </td>
          </template>

          <template #oriBco1="{ item }">
            <td class="text-end">
              {{ formatPrice(item.oriBco1) }}
            </td>
          </template>

          <template #oriBco2="{ item }">
            <td class="text-end">
              {{ formatPrice(item.oriBco2) }}
            </td>
          </template>

          <template #oriBco3="{ item }">
            <td class="text-end">
              {{ formatPrice(item.oriBco3) }}
            </td>
          </template>

          <template #oriBco4="{ item }">
            <td class="text-end">
              {{ formatPrice(item.oriBco4) }}
            </td>
          </template>

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
          <CModalTitle>Registro de la partida del gasto</CModalTitle>
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
                <input
                  ref="klk"
                  type="text"
                  class="form-control"
                  v-model="detallePost.ctgClasificadorId"
                  id="exampleInputEmail1"
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
                <button
                  class="btn btn-primary"
                  style="margin-top: 32px; height: 37px"
                  v-on:click="getClasificador"
                >
                  Buscar
                </button>
              </CCol>

              <hr />
              <div class="row">
                <div class="col-12">
                  <h3>Seleccionar el origen del financiamiento</h3>
                </div>
              </div>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(20, 1955, 100)"
                  >20/1955/100
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9998, 102)"
                  >30/9998/102
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 103)"
                  >40/9992/103
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('50', '2006', '001')"
                >
                  50/2006/001
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('10', '0100', '100')"
                >
                  10/0100/100</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('10', '0104', '100')"
                >
                  10/0104/100
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9995, 102)"
                  >30/9995/102
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9999, 102)"
                  >30/9999/102
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 112)"
                  >40/9992/112
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('50', '2006', '099')"
                >
                  50/2006/099
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('10', '0100', '104')"
                >
                  10/0100/104
                </CButton>
              </CCol>
              <CCol> </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9996, 102)"
                  >30/9996/102
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 102)"
                  >40/9992/102
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 102)"
                >
                  40/9992/102</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(50, 5011, 109)"
                  >50/5011/109
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('10', '0100', '105')"
                >
                  10/0100/105</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton style="font-weight: bold" color="info"
                  >Introducir Manualmente</CButton
                >
              </CCol>

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

              <hr />
              <div class="row">
                <div class="col-6">
                  <div class="col-12">
                    <div class="row">
                      <h3>Cuenta</h3>
                      <div class="col-4">
                        <CFormLabel for="validationCustom04"
                          >Personal</CFormLabel
                        >
                        <CFormInput
                          type="number"
                          v-model="this.detallePost.oriBco1"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>

                      <div class="col-8">
                        <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                        <CFormSelect
                          v-model="detallePost.TIPO_GASTO1"
                          id="validationCustom04"
                        >
                          <option>11-GASTOS DE PERSONAL 25%</option>
                          <option>
                            311-Para Gastos en Personal (Corto Plazo)
                          </option>
                          <option>
                            321-Para Gastos en Personal (Largo Plazo)
                          </option>
                        </CFormSelect>

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
                          >Servicios</CFormLabel
                        >
                        <CFormInput
                          type="number"
                          v-model="this.detallePost.oriBco2"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>

                      <div class="col-8">
                        <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                        <CFormSelect
                          v-model="detallePost.TIPO_GASTO2"
                          id="validationCustom04"
                        >
                          <option>12-SERVICIOS MUNICIPALES 31% (1.S)</option>
                          <option>
                            312-Para Gastos en Servicios (Corto Plazo)
                          </option>
                          <option>
                            322-Para Gastos en Servicios (Largo Plazo)
                          </option>
                        </CFormSelect>
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
                          >Inversión</CFormLabel
                        >
                        <CFormInput
                          type="number"
                          v-model="this.detallePost.oriBco3"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>

                      <div class="col-8">
                        <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                        <CFormSelect
                          v-model="detallePost.TIPO_GASTO3"
                          id="validationCustom04"
                        >
                          <option>
                            21-BIENES MUEBLES, INMUEBLES NO CLASIFICADO EN
                            CATEGORIA PROYECTO (I.1)
                          </option>
                          <option>22-OBRAS DE INFRAESTRUCTURA (I.2)</option>
                          <option>
                            23-GASTOS DE PRE INVERSION ASOCIADOS AL DESARROLLO
                            ECONOMICO LOCALl (I-3)
                          </option>
                          <option>
                            314-Para Gastos en Inversion (Corto Plazo) (SI ES
                            PROGRAMA 96)
                          </option>
                          <option>
                            324-Para Gastos en Inversion (Largo Plazo)
                          </option>
                        </CFormSelect>
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
                          >E/G Salud</CFormLabel
                        >
                        <CFormInput
                          type="number"
                          v-model="this.detallePost.oriBco4"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>

                      <div class="col-8">
                        <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                        <CFormSelect
                          v-model="detallePost.TIPO_GASTO4"
                          id="validationCustom04"
                        >
                          <option>
                            13-PROGRAMAS DE EDUCACION, GENERO Y SALUD 4% (1.E)
                          </option>
                          <option>
                            313-Para Gastos en Educacion (Corto Plazo)
                          </option>
                          <option>
                            323-Para Gastos en Educacion (Largo Plazo)
                          </option>
                        </CFormSelect>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="vr col-1" style="height: 278px"></div>
                <div class="col-4">
                  <h4>Balance disponible por origen del financiamiento:</h4>
                  <h3>
                    <span style="font-weight: 500 !important">{{
                      formatPrice(formulado.preS_FORM)
                    }}</span>
                  </h3>
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
      </div>
    </div>
  </CModal>
</template>
<script>
import { CSmartTable, CCol } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/FormulacionServices'
import axios from 'axios'
import { mapActions, mapState } from 'pinia'
import { usePrepGastoStore } from '../store/Formulacion/prepGasto'
import { mount } from '@vue/test-utils'
import { mapStores } from 'pinia'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import XLSX from 'xlsx/xlsx.mjs'
import router from '@/router'
import { formatPrice } from '../../../../utils/format'
export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: function () {
    return {
      numero: 1234567,
      numeroFormateado: 0,
      hasRun: false,
      totalItems: 0,
      sumaGPersonal: 0,
      sumaServicio: 0,
      sumaInversion: 0,
      sumaEdiGenero: 0,
      sumaPresupuesto: 0,
      proyectosList: [],
      pregastoMasivo: [],
      id: null,
      idDetalle: null,
      detallePresGastos: [],
      sumOfFlieds: null,
      pnap: null,
      programa: null,
      detallePost: {
        id: 0,
        presGastoId: 0,
        ayuntamientoId: this.$ayuntamientoId,
        anioFiscalId: this.$fiscalYearId,
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
        TIPO_GASTO1: '11-GASTOS DE PERSONAL 25%',
        TIPO_GASTO2: '12-SERVICIOS MUNICIPALES 31% (1.S)',
        TIPO_GASTO3:
          '21-BIENES MUEBLES, INMUEBLES NO CLASIFICADO EN CATEGORIA PROYECTO (I.1)',
        TIPO_GASTO4: '13-PROGRAMAS DE EDUCACION, GENERO Y SALUD 4% (1.E)',
        tipoGasto: '',
        oriBco1: 0,
        estimadoBco1: 0,
        presupuestoBco1: 0,
        variacionBco1: 0,
        totalDevengadoBco1: 0,
        disponiblePagadoBco1: 0,
        totalPagadoBco1: 0,
        oriBco2: 0,
        estimadoBco2: 0,
        presupuestoBco2: 0,
        variacionBco2: 0,
        totalDevengadoBco2: 0,
        disponiblePagadoBco2: 0,
        totalPagadoBco2: 0,
        oriBco3: 0,
        estimadoBco3: 0,
        presupuestoBco3: 0,
        variacionBco3: 0,
        totalDevengadoBco3: 0,
        disponiblePagadoBco3: 0,
        totalPagadoBco3: 0,
        oriBco4: 0,
        estimadoBco4: 0,
        presupuestoBco4: 0,
        variacionBco4: 0,
        totalDevengadoBco4: 0,
        disponiblePagadoBco4: 0,
        totalPagadoBco4: 0,
        totalOriginal: 0,
        totalCompromiso: 0,
        totalDevengado: 0,
        totalPagado: 0,
        totalVariacion: 0,
        sumTotalOriginal: 0,
        sumTotalCompromiso: 0,
        sumTotalDevengado: 0,
        sumTotalPagado: 0,
        sumTotalVariacion: 0,
      },
      post: {
        clasifica: '',
        ayuntamientoId: this.$ayuntamientoId,
        anioFiscalId: this.$fiscalYearId,
        mestprogId: '',
        costObra: '',
        pnap: '',
        nombre: '',
        programa: '',
        proyecto: '',
        actObra: '',
        estControl: '',
        unidadResp: '',
        tipo: '',
        totalPresupuesto: 0,
        actControl: '',
        pppm: 'n',
        modContatro: 'n',
        asignadoA: 0,
        asignadoA: 0,
        fechaIniciada: '2022-10-31T14:18:15.972Z',
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
      footerItem: [
        {
          label: formatPrice(0),
          _props: {
            color: '',
            colspan: 8,
            style: { width: '90px' },
          },
        },
        ,
        {
          label: formatPrice(0),
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
      ],
      footerItems: [
        {
          label: 'Total Items',
          _props: {
            color: '',
            colspan: 2,
            style: 'font-weight:bold; text-align:left',
          },
        },
        {
          label: 0,
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
          },
        },
        {
          label: 0,
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
          },
        },
        {
          label: 0,
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
          },
        },
        {
          label: 0,
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
          },
        },
        {
          label: 0,
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
          },
        },
      ],

      columns: [
        { key: 'pnap', label: 'Pnap', _style: { width: '10%' } },
        { key: 'programa', label: 'Programa', _style: { width: '10%' } },
        { key: 'proyecto', label: 'Proyecto', _style: { width: '10%' } },
        { key: 'actObra', label: 'Act/Obra', _style: { width: '10%' } },
        { key: 'estControl', label: 'Control', _style: { width: '10%' } },
        { key: 'nombre', label: 'Denominación', _style: { width: '20%' } },
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
          _style: { width: '20%' },
        },
        {
          key: 'nombre',
          label: 'Denominacion',
          _style: { width: '60%' },
        },
        {
          Object: 'detallePresGastos',
          key: 'totalOriginal',
          label: 'Presupuesto',
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
    ...mapActions(usePrepGastoStore, [
      'getListarGastos',
      'getListarGastosById',
      'addGasto',
      'addDetalleGasto',
      'updatePresGastoDetalle',
      'updatePresGasto',
      'getDetalleGasto',
    ]),
    sumOfProp() {
      this.post.mestprogId = `${this.post.pnap}${this.post.programa}${this.post.proyecto}${this.post.actObra}`
      this.getEstructura()
    },
    goToIngreso() {
      router.push({ name: 'Formulación Ingreso' })
    },

    onFileChangeProyectos(event) {
      this.file = event.target.files ? event.target.files[0] : null
      if (this.file) {
        const reader = new FileReader()

        reader.onload = (e) => {
          const bstr = e.target.result
          const wb = XLSX.read(bstr, {
            type: 'binary',
            cellDates: true,
            dateNF: 'yyyy/mm/dd;@',
          })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws)
          data.map((item) => {
            if (Object.values(item)[2] < 90) {
              this.pnap = '00'
              this.programa = Object.values(item)[2].toString().padStart(2, 0)
            } else if (Object.values(item)[2] > 90) {
              this.pnap = Object.values(item)[2]
              this.programa = '00'
            }

            this.proyectosList.push({
              AyuntamientoId: this.$ayuntamientoId,
              AnioFiscalId: this.$fiscalYearId,
              MestProgId: `0011${Object.values(item)[4]
                .toString()
                .padStart(2, 0)}${Object.values(item)[5]
                .toString()
                .padStart(4, 0)}`,

              PNAP: this.pnap,
              Programa: this.programa,
              Proyecto: `${Object.values(item)[4].toString().padStart(2, 0)}`,
              ActObra: `${Object.values(item)[5].toString().padStart(4, 0)}`,
              EstControl: `${Object.values(item)[2].toString()}${Object.values(
                item,
              )[3].toString()}${Object.values(item)[4].toString()}0000`,
              Nombre: Object.values(item)[6],
              UnidadResp: '',
              Tipo: 'DETALLE',
              CtgFuncionId: '',
              TotalPresupuesto: 0,
              CostObra: 0,
              Pppm: '',
              ModContatro: '',
              AsignadoA: 0,
              Fecha: new Date(Date.now()),
            })
          })

          Api.postCargaMasivaCabecera(this.proyectosList).then((response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: response.message,
              title: 'Agregado',
              showConfirmButton: false,
              timer: 1500,
            })
          })
          setTimeout(this.getListarGastos, 500)
        }

        reader.readAsBinaryString(this.file)
      }
    },

    focusInput() {
      this.$refs.name.focus()
    },

    focusInputs() {
      this.$refs.klk.focus()
    },

    unaVez() {
      this.focusInput()
    },

    unaVezs() {
      this.focusInputs()
    },

    openModal() {
      this.lgDemo = true
      setTimeout(this.unaVez, 200)
    },

    onFileChange(event) {
      this.file = event.target.files ? event.target.files[0] : null
      if (this.file) {
        const reader = new FileReader()

        reader.onload = (e) => {
          const bstr = e.target.result
          const wb = XLSX.read(bstr, {
            type: 'binary',
            cellDates: true,
            dateNF: 'yyyy/mm/dd;@',
          })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws)
          data.map((item) => {
            if (Object.values(item)[2] < 90) {
              this.pnap = '00'
              this.programa = Object.values(item)[2].toString().padStart(2, 0)
            } else if (Object.values(item)[2] > 90) {
              this.pnap = Object.values(item)[2]
              this.programa = '00'
            }

            this.pregastoMasivo.push({
              presGastoId: 0,
              ayuntamientoId: this.$ayuntamientoId,
              anioFiscalId: this.$fiscalYearId,
              mestProgId: `${this.pnap}${this.programa}${Object.values(item)[4]
                .toString()
                .padStart(2, 0)}${Object.values(item)[5]
                .toString()
                .padStart(4, 0)}`,
              ctgClasificadorId: `${Object.values(item)[6]}${
                Object.values(item)[7]
              }${Object.values(item)[8]}${
                Object.values(item)[9]
              }${Object.values(item)[10].toString().padStart(2, 0)}`,
              cControl: `${Object.values(item)[8]}`,
              auxiliar: `${Object.values(item)[10].toString().padStart(2, 0)}`,
              ctgFuenteId: `${Object.values(item)[15]}`,
              ctgFuenteEspecificaId: `${Object.values(item)[16]}`,
              ctgOrganismoFinanciadorId: `${Object.values(item)[17]}`,
              oriFondos: 0,
              ctgFuncionId: '1',
              nombre: null,
              tipo: '',
              tipoGasto: '',
              oriBco1: 0,
              estimadoBco1: 0,
              presupuestoBco1: `${
                Object.values(item)[11] == 'P' ? Object.values(item)[18] : 0
              }`,
              variacionBco1: 0,
              totalDevengadoBco1: 0,
              disponiblePagadoBco1: 0,
              totalPagadoBco1: 0,
              oriBco2: 0,
              estimadoBco2: 0,
              presupuestoBco2: `${
                Object.values(item)[11] == 'S' ? Object.values(item)[18] : 0
              }`,
              variacionBco2: 0,
              totalDevengadoBco2: 0,
              disponiblePagadoBco2: 0,
              totalPagadoBco2: 0,
              oriBco3: 0,
              estimadoBco3: 0,
              presupuestoBco3: `${
                Object.values(item)[11] == 'I' ? Object.values(item)[18] : 0
              }`,
              variacionBco3: 0,
              totalDevengadoBco3: 0,
              disponiblePagadoBco3: 0,
              totalPagadoBco3: 0,
              oriBco4: 0,
              estimadoBco4: 0,
              presupuestoBco4: `${
                Object.values(item)[11] == 'E' ? Object.values(item)[18] : 0
              }`,
              variacionBco4: 0,
              totalDevengadoBco4: 0,
              disponiblePagadoBco4: 0,
              totalPagadoBco4: 0,
              totalOriginal: 0,
              totalCompromiso: 0,
              totalDevengado: 0,
              totalPagado: 0,
              totalVariacion: 0,
              sumTotalOriginal: 0,
              sumTotalCompromiso: 0,
              sumTotalDevengado: 0,
              sumTotalPagado: 0,
              sumTotalVariacion: 0,
            })
          })
          this.pregastoMasivo.map((item) => {
            Api.getEstruturaProgramaticaById(item.mestProgId).then(
              (response) => {
                item.nombre = response.data.data.nombre
              },
            )
          })

          Api.postCargaMasivaDetalle(this.pregastoMasivo).then((response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: response.message,
              title: 'Agregado',
              showConfirmButton: false,
              timer: 500,
            })
          })
          setTimeout(this.getListarGastos, 500)
        }

        reader.readAsBinaryString(this.file)
      }
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
        this.lgDemo1 = true
      }
      event.preventDefault()
      event.stopPropagation()
      this.clearForm()
      setTimeout(this.getListarGastos, 500)
    },
    guardarDetalleGasto() {
      if (this.idDetalle != null) {
        if (this.detallePost.oriBco1 === '') {
          this.detallePost.oriBco1 = 0
        }
        if (this.detallePost.oriBco2 === '') {
          this.detallePost.oriBco2 = 0
        }
        if (this.detallePost.oriBco3 === '') {
          this.detallePost.oriBco3 = 0
        }
        if (this.detallePost.oriBco4 === '') {
          this.detallePost.oriBco4 = 0
        }
        this.detallePost.presupuestoBco1 = this.detallePost.oriBco1
        this.detallePost.presupuestoBco2 = this.detallePost.oriBco2
        this.detallePost.presupuestoBco3 = this.detallePost.oriBco3
        this.detallePost.presupuestoBco4 = this.detallePost.oriBco4
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
        this.detallePost.TIPO_GASTO1 =
          this.detallePost.TIPO_GASTO1.split('-')[0]
        this.detallePost.TIPO_GASTO2 =
          this.detallePost.TIPO_GASTO2.split('-')[0]
        this.detallePost.TIPO_GASTO3 =
          this.detallePost.TIPO_GASTO3.split('-')[0]
        this.detallePost.TIPO_GASTO4 =
          this.detallePost.TIPO_GASTO4.split('-')[0]
        if (this.detallePost.oriBco1 === '') {
          this.detallePost.oriBco1 = 0
        }
        if (this.detallePost.oriBco2 === '') {
          this.detallePost.oriBco2 = 0
        }
        if (this.detallePost.oriBco3 === '') {
          this.detallePost.oriBco3 = 0
        }
        if (this.detallePost.oriBco4 === '') {
          this.detallePost.oriBco4 = 0
        }
        this.detallePost.presupuestoBco1 = this.detallePost.oriBco1
        this.detallePost.presupuestoBco2 = this.detallePost.oriBco2
        this.detallePost.presupuestoBco3 = this.detallePost.oriBco3
        this.detallePost.presupuestoBco4 = this.detallePost.oriBco4
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
        this.detallePresGastos = response.data.data.detallePresGastos
      })
      event.preventDefault()
      event.stopPropagation()
      this.clearForm()
      setTimeout(this.getDetalleGasto, 500)
    },

    getClasificador() {
      Api.getClasificador(this.detallePost.ctgClasificadorId).then(
        (response) => {
          if (response.data.data.origen == 'GASTO') {
            this.detallePost.cControl = response.data.data.cControl
            this.detallePost.nombre = response.data.data.nombre
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',

              title: 'Clasificador no permitido',
              showConfirmButton: false,
              timer: 1500,
            })
            this.detallePost.cControl = ''
            this.detallePost.nombre = ''
          }
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
    clearForm() {
      this.post = {
        clasifica: '',
        ayuntamientoId: this.$ayuntamientoId,
        anioFiscalId: this.$fiscalYearId,
        mestprogId: '',
        costObra: '',
        pnap: '',
        nombre: '',
        programa: '',
        proyecto: '',
        actObra: '',
        estControl: '',
        unidadResp: '',
        tipo: '',
        totalPresupuesto: 0,
        actControl: '',
        pppm: 'n',
        modContatro: 'n',
        asignadoA: 0,
        asignadoA: 0,
        fechaIniciada: '2022-10-31T14:18:15.972Z',
      }
    },
    handleSubmitCustom01(event) {},
    getEstructura() {
      Api.getEstruturaProgramaticaById(this.post.mestprogId).then(
        (response) => {
          this.post.nombre = response.data.data.nombre
          this.post.unidadResp = response.data.data.unidadRespon
        },
      )
    },
    getTotal() {
      axios
      Api.getTotalIngresos(this.$ayuntamientoId, this.$fiscalYearId).then(
        (response) => {
          this.formulado.alafecha = response.data.alafecha
          this.formulado.anO_ANT = response.data.anO_ANT
          this.formulado.preS_FORM = response.data.preS_FORM
        },
      )
    },
    IngresoReport() {
      window.open(
        `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Gastos_Formulacion_FP08&rs:Command=Render&ANO=${this.$fiscalYearId}&CAPITULO_AYTO=${this.$ayuntamientoId}&FONDO=P`,
        '_blank',
      )`http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Gastos_Formulacion_FP08&rs:Command=Render&ANO=1&CAPITULO_AYTO=${this.$ayuntamientoId}&FONDO=P`.focus()
    },
    cargarEstructuras() {
      setTimeout(this.getListarGastos, 500)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Estructuras Cargadas',
        title: 'success',
        showConfirmButton: false,
        timer: 1500,
      })
      Api.cargarEstructuras()
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
      this.id = item.id
      Api.getListarGastosById(item.id).then((response) => {
        this.post = response.data.data
        this.detallePost.presGastoId = item.id
        this.detallePost.mestProgId = item.mestProgId

        this.post.mestprogId = `${this.post.pnap}${this.post.programa}${this.post.proyecto}${this.post.actObra}`
        this.detallePresGastos = response.data.data.detallePresGastos
        this.sumaPresupuesto = 0
        this.sumaGPersonal = 0
        this.sumaServicio = 0
        this.sumaInversion = 0
        this.sumaEdiGenero = 0

        this.detallePresGastos.map((detalle) => {
          this.sumaPresupuesto += parseInt(detalle.totalOriginal)
          this.sumaGPersonal += parseInt(detalle.oriBco1)
          this.sumaServicio += parseInt(detalle.oriBco2)
          this.sumaInversion += parseInt(detalle.oriBco3)
          this.sumaEdiGenero += parseInt(detalle.oriBco4)
          this.footerItems[1].label = this.formatPrice(this.sumaPresupuesto)
          this.footerItems[2].label = this.formatPrice(this.sumaGPersonal)
          this.footerItems[3].label = this.formatPrice(this.sumaServicio)
          this.footerItems[4].label = this.formatPrice(this.sumaInversion)
          this.footerItems[5].label = this.formatPrice(this.sumaEdiGenero)
          this.numeroFormateado = this.formatPrice(this.numero)
        })
        this.totalItems = this.detallePresGastos.length
        this.footerItems[0].label = `Total Items ${this.totalItems}`
      })

      this.lgDemo = true
    },
    toggleDetails1(item) {
      setTimeout(this.unaVezs, 200)

      this.lgDemo1 = true
    },
    getEditDetalle(item) {
      this.idDetalle = item.id
      Api.getDetalle(item.id).then((response) => {
        this.lgDemo1 = true
        this.detallePost = response.data.data
      })
    },
  },

  computed: {
    ...mapStores(usePrepGastoStore),
    ...mapState(usePrepGastoStore, [
      'prepGastoList',
      'gastoListCount',
      'GastosListDos',
      'getGasto',
      'dataDummy',
    ]),
  },

  mounted() {
    this.getListarGastos()
    this.footerItem[0].label = `Total items: ${this.gastoListCount}`
  },
}
</script>

<style>
.footerStyle {
  text-align: center;
}
</style>
