<template>
  <h3 class="text-center">Cargar Formulación del presupuesto de gastos</h3>
  <hr />
  <div>
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            lgDemo = true
            clearForm
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
    <div class="d-inline p-2" style="margin-left: 55%">
      <CButton style="font-weight: bold" color="info" @click="goToIngreso"
        >Ir a Formulacion Ingreso</CButton
      >
    </div>
  </div>
  <hr />
  <div>
    <h5>Importar Proyectos</h5>
    <CFormInput type="file" id="formFile" @change="onFileChangeProyectos" />
  </div>
  <hr />
  <div>
    <h5>Importar Formulacion</h5>
    <CFormInput type="file" id="formFile" @change="onFileChange" />
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
    <template #totalPresupuesto="{ item }">
      <td>
        {{ formatPrice(item.totalPresupuesto) }}
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
export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
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
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        anioFiscalId: parseInt(localStorage.getItem('ano')),
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
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        anioFiscalId: localStorage.getItem('ano'),
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
        { key: 'actObra', label: 'Act/Obra', _style: { width: '10%' } },
        { key: 'estControl', label: 'Control', _style: { width: '10%' } },
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
      'getDetalleGasto',
    ]),
    sumOfProp() {
      this.post.mestprogId = `${this.post.pnap}${this.post.programa}${this.post.proyecto}${this.post.actObra}`
      this.getEstructura()
    },
    goToIngreso() {
      router.push({ name: 'Formulacion Ingreso' })
    },

    onFileChangeProyectos(event) {
      console.log('hola')
      //this.cargarEstructuras()
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
            console.log(item)
            if (Object.values(item)[2] < 90) {
              this.pnap = '00'
              this.programa = Object.values(item)[2].toString().padStart(2, 0)
            } else if (Object.values(item)[2] > 90) {
              this.pnap = Object.values(item)[2]
              this.programa = '00'
            }

            this.proyectosList.push({
              AyuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
              AnioFiscalId: parseInt(localStorage.getItem('ano')),
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

          console.log(this.proyectosList)
          Api.postCargaMasivaCabecera(this.proyectosList).then((response) => {
            console.log(response)
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
    onFileChange(event) {
      this.cargarEstructuras()
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
            console.log(item)
            if (Object.values(item)[2] < 90) {
              this.pnap = '00'
              this.programa = Object.values(item)[2].toString().padStart(2, 0)
            } else if (Object.values(item)[2] > 90) {
              this.pnap = Object.values(item)[2]
              this.programa = '00'
            }

            this.pregastoMasivo.push({
              presGastoId: 0,
              ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
              anioFiscalId: parseInt(localStorage.getItem('ano')),
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
              oriBco1: `${
                Object.values(item)[11] == 'P' ? Object.values(item)[18] : 0
              }`,
              estimadoBco1: 0,
              presupuestoBco1: 0,
              variacionBco1: 0,
              totalDevengadoBco1: 0,
              disponiblePagadoBco1: 0,
              totalPagadoBco1: 0,
              oriBco2: `${
                Object.values(item)[11] == 'S' ? Object.values(item)[18] : 0
              }`,
              estimadoBco2: 0,
              presupuestoBco2: 0,
              variacionBco2: 0,
              totalDevengadoBco2: 0,
              disponiblePagadoBco2: 0,
              totalPagadoBco2: 0,
              oriBco3: `${
                Object.values(item)[11] == 'I' ? Object.values(item)[18] : 0
              }`,
              estimadoBco3: 0,
              presupuestoBco3: 0,
              variacionBco3: 0,
              totalDevengadoBco3: 0,
              disponiblePagadoBco3: 0,
              totalPagadoBco3: 0,
              oriBco4: `${
                Object.values(item)[11] == 'E' ? Object.values(item)[18] : 0
              }`,
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
            })
          })
          this.pregastoMasivo.map((item) => {
            Api.getEstruturaProgramaticaById(item.mestProgId).then(
              (response) => {
                item.nombre = response.data.data.nombre
              },
            )
          })
          console.log(this.pregastoMasivo)
          Api.postCargaMasivaDetalle(this.pregastoMasivo).then((response) => {
            console.log(response)
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
        console.log(response.data.data)
        console.log(item)
        this.detallePresGastos = response.data.data.detallePresGastos
        //console.log(getGasto.value.data)
        //GastosListDos.value = response.data.data
      })
      event.preventDefault()
      event.stopPropagation()
      this.clearForm()
      setTimeout(this.getDetalleGasto, 500)
    },

    getClasificador() {
      Api.getClasificador(this.detallePost.ctgClasificadorId).then(
        (response) => {
          console.log(response.data.data.cControl)
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
    clearForm() {
      this.post = {
        clasifica: '',
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        anioFiscalId: localStorage.getItem('ano'),
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
    handleSubmitCustom01(event) {
      // this.addGasto(this.post)
      // const form = event.currentTarget
      // if (form.checkValidity() === false) {
      //   event.preventDefault()
      //   event.stopPropagation()
      // }
      // this.validatedCustom01 = true
    },
    getEstructura() {
      Api.getEstruturaProgramaticaById(this.post.mestprogId).then(
        (response) => {
          this.post.nombre = response.data.data.nombre
          this.post.unidadResp = response.data.data.unidadRespon
          console.log(response)
        },
      )
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
      window.open(
        `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Gastos_Formulacion_FP08&rs:Command=Render&ANO=${localStorage.getItem(
          'ano',
        )}&CAPITULO_AYTO=${localStorage.getItem('id_Ayuntamiento')}&FONDO=P`,
        '_blank',
      )`http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Gastos_Formulacion_FP08&rs:Command=Render&ANO=1&CAPITULO_AYTO=${localStorage.getItem(
        'id_Ayuntamiento',
      )}&FONDO=P`.focus()
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
        this.post.mestprogId = `${this.post.pnap}${this.post.programa}${this.post.proyecto}${this.post.actObra}`
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
