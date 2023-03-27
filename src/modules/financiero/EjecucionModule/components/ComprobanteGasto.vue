<template>
      
  <h3 class="text-center">Comprobante de gastos</h3>
  <div class="table-headers">
    <div class="p-2">
      <CButton
        style="font-weight: bold"
        color="info"
        @click="
          () => {
            lgDemo = true
            //clearModal1()
          }
        "
        >Agregar</CButton
      >
    </div>
    <div class="p-2">
      <CButton color="info" @click="IngresoReport"
        >Imprimir Comprobante</CButton
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
    :footer="footerItem"
    header
    :items="cabeceraGasto"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #totalBruto="{ item }">
      <td>
        {{ formatPrice(item.totalBruto) }}
      </td>
    </template>
    <template #totalRetenciones="{ item }">
      <td class="text-end">
        {{ formatPrice(item.totalRetenciones) }}
      </td>
    </template>
    <template #valorNeto="{ item }">
      <td class="text-end">
        {{ formatPrice(item.valorNeto) }}
      </td>
    </template>
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
          @click="toggleDetails1(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
        </CButton>
      </td>
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="showDetalle(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Detalle' }}
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
            <div class="col-6">
              <div class="col-12">
                <div class="row">
                  <CCol :md="6">
                    <CFormLabel for="validationCustom04">Fecha</CFormLabel>
                    <CFormInput
                      v-model="postGasto.fecha"
                      type="date"
                      id="validationCustom04"
                    >
                    </CFormInput>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom02">Estatus</CFormLabel>
                    <CFormInput
                      v-model="postGasto.estatus"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>

                  <CCol :md="6">
                    <CFormLabel for="validationCustom05">Etapa</CFormLabel>
                    <CFormSelect
                      v-model="postGasto.etapa"
                      id="validationCustom05"
                    >
                      <option>DEVENGADO</option>
                      <option>PAGADO</option>
                      <option>COMPROMISO</option>
                      <option>VARIACION</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom01"
                      >Resolución No.</CFormLabel
                    >
                    <CFormInput
                      :disabled="postGasto.etapa != 'VARIACION'"
                      v-model="postGasto.nResolucion"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>

                  <CCol :md="12">
                    <CFormLabel for="validationCustom04"
                      >Fecha Resol.</CFormLabel
                    >
                    <CFormInput
                      :disabled="postGasto.etapa != 'VARIACION'"
                      v-model="postGasto.fechaResolucion"
                      type="date"
                      id="validationCustom04"
                    >
                    </CFormInput>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>

                  <CCol :md="6">
                    <CFormLabel for="validationCustom05">
                      Forma/pago</CFormLabel
                    >
                    <CFormSelect
                      v-model="postGasto.nCheque"
                      id="validationCustom05"
                    >
                      <option>Cheque</option>
                      <option>Caego Beneficiario</option>
                      <option>Transferencia</option>
                      <option>Reversar</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom01"
                      >Comp. Modifica</CFormLabel
                    >
                    <CFormInput
                      :disabled="postGasto.nCheque != 'Reversar'"
                      v-model="postGasto.nResolucion"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="col-12">
                <div class="row">
                  <CCol :md="8">
                    <CFormLabel for="validationCustom04"
                      >Beneficiario</CFormLabel
                    >
                    <vue3-simple-typeahead
                      class="form-control"
                      v-model="postGasto.codBenefi"
                      id="validationCustom04"
                      placeholder="Escriba Aqui..."
                      :items="beneficiariosName"
                      :minInputLength="1"
                      :itemProjection="itemProjectionFunction"
                      @selectItem="selectItemEventHandler"
                      @onInput="onInputEventHandler"
                      @onFocus="onFocusEventHandler"
                      @onBlur="onBlurEventHandler"
                    >
                    </vue3-simple-typeahead>
                  </CCol>
                  <CCol :md="4">
                    <button
                      type="button"
                      class="btn btn-primary mt-4"
                      data-bs-dismiss="modal"
                      @click="gotToBeneficiario"
                    >
                      Agregar
                    </button>
                  </CCol>

                  <CCol :md="8">
                    <CFormLabel for="validationCustom01"
                      >Concepto/auxiliar</CFormLabel
                    >
                    <CFormSelect
                      v-model="postGasto.tipoGastoId"
                      id="validationCustom05"
                      v-on:change="changeAuxiliar($event)"
                    >
                      <option
                        v-for="tipoGasto in this.TipoGastoList"
                        :key="tipoGasto.id"
                        :value="tipoGasto.id"
                      >
                        {{ tipoGasto.descripcion }}
                      </option>
                    </CFormSelect>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="4">
                    <button
                      type="button"
                      class="btn btn-primary mt-4"
                      data-bs-dismiss="modal"
                      @click="goToGasto"
                    >
                      Agregar
                    </button>
                  </CCol>

                  <CCol :md="12">
                    <CFormLabel for="validationCustom05">
                      Cuenta de banco</CFormLabel
                    >
                    <CFormSelect
                      v-model="postGasto.bancoId"
                      id="validationCustom05"
                    >
                      <option value="1">1-Personal</option>
                      <option value="2">2-Servicios</option>
                      <option value="3">3-Inversiones</option>
                      <option value="4">4-Educ</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="validationCustom01">Detalle</CFormLabel>
                    <CFormTextarea
                      v-model="postGasto.detalle"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    >
                    </CFormTextarea>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
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
            <button
              class="btn btn-info btn-block mt-1"
              v-on:click="postCabecera"
            >
              Guardar
            </button>
          </div>
        </CForm>
        <hr />
        <CSmartTable class="sticky-top"
          clickableRows
          :tableProps="{
            striped: true,
            hover: true,
          }"
          :tableHeadProps="{}"
          :activePage="1"
          footer
          header
          :items="[]"
          :columns="columns2"
          itemsPerPageSelect
          :itemsPerPage="5"
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
        >
          <template #nombre="{ item }">
            <td>
              {{ item.ctgClasificador.nombre }}
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
  <CModal
    size="xl"
    backdrop="static"
    :visible="lgDemo1"
    @close="
      () => {
        lgDemo1 = false
        clearModal2()
      }
    "
  >
    <CModalHeader class="text-center">
      <CModalTitle>Detalles de Comprobante de Gasto</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit=""
        >
          <div class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-10">
                  <div class="row">
                    <CCol :md="4">
                      <CFormLabel for="validationCustom01"
                        >Programa o Proyecto</CFormLabel
                      >
                      <CFormInput
                        v-model="
                          postGastoDetalle.detalleRegistroGastoDto.estProg
                        "
                        id="validationCustom01"
                        required
                      />

                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                    <CCol :md="6">
                      <CFormLabel for="validationCustom02"
                        >Denominacion</CFormLabel
                      >
                      <CFormInput
                        disabled
                        v-model="nombreEst"
                        id="validationCustom02"
                        required
                      />
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                    <CCol :md="2">
                      <button
                        class="btn btn-primary"
                        style="margin-top: 32px"
                        @click="
                          () => {
                            lgDemo3 = true
                            getEstructuraById()
                          }
                        "
                      >
                        Buscar
                      </button>
                    </CCol>
                    <CCol :md="4">
                      <CFormLabel for="validationCustom02"
                        >Clasificador</CFormLabel
                      >
                      <CFormInput
                        disabled
                        v-model="
                          postGastoDetalle.detalleRegistroGastoDto
                            .ctgClasificadorId
                        "
                        id="validationCustom02"
                        required
                      />
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                    <CCol :md="6">
                      <CFormLabel for="validationCustom02"
                        >Denominacion</CFormLabel
                      >
                      <CFormInput
                        disabled
                        v-model="nombre"
                        id="validationCustom02"
                        required
                      />
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </CCol>
                  </div>
                </div>
                <div class="col-2">
                  <h5 class="mt-5">Balance Total</h5>
                </div>
              </div>
            </div>
            <div class="col-12 mt-3">
              <div class="row">
                <CCol :md="4">
                  <CFormLabel for="validationCustom01">Fuente</CFormLabel>
                  <CFormInput
                    disabled
                    v-model="
                      postGastoDetalle.detalleRegistroGastoDto.ctgFuenteId
                    "
                    id="validationCustom01"
                    required
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="4">
                  <CFormLabel for="validationCustom04"
                    >Fte. Especifica</CFormLabel
                  >
                  <CFormInput
                    disabled
                    v-model="
                      postGastoDetalle.detalleRegistroGastoDto
                        .ctgFuenteEspecificaId
                    "
                    id="validationCustom04"
                  >
                  </CFormInput>
                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>

                <CCol :md="4">
                  <CFormLabel for="validationCustom05">
                    Org. Financiador</CFormLabel
                  >
                  <CFormInput
                    disabled
                    v-model="
                      postGastoDetalle.detalleRegistroGastoDto
                        .ctgOrganismoFinanciadorId
                    "
                    id="validationCustom04"
                  >
                  </CFormInput>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <CCol :md="6">
                  <CFormLabel for="validationCustom01">Monto Bruto.</CFormLabel>
                  <CFormInput
                    v-model="
                      postGastoDetalle.detalleRegistroGastoDto.valorBruto
                    "
                    id="validationCustom01"
                    required
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
                <CCol :md="6">
                  <CFormLabel for="validationCustom01"
                    >Base Imponible</CFormLabel
                  >
                  <CFormInput id="validationCustom01" required />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
            </div>
            <div
              v-if="isVariacion"
              v-for="(inputs, i) in postGastoDetalle.detaRetencionDto.length"
            >
              <hr />
              <CAccordion class="mt-3">
                <CAccordionItem :item-key="i">
                  <CAccordionHeader> Retencion </CAccordionHeader>
                  <CAccordionBody>
                    <div class="col-12">
                      <div class="row">
                        <CCol :md="2">
                          <CFormLabel for="validationCustom01"
                            >Retenciones</CFormLabel
                          >
                          <CFormSelect
                            v-model="
                              postGastoDetalle.detaRetencionDto[i].retencion
                            "
                            id="validationCustom02"
                            v-on:change="changeRetenciones($event)"
                          >
                            <option
                              v-for="benef in this.tipoRentencion"
                              :key="benef.id"
                              :value="benef.id"
                            >
                              {{ benef.detalle }}
                            </option>
                          </CFormSelect>
                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </CCol>

                        <CCol :md="4">
                          <div class="row">
                            <CCol :md="4">
                              <CFormCheck
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                label="Total"
                              />
                            </CCol>
                            <CCol :md="4">
                              <CFormCheck
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                label="SubTotal"
                              />
                            </CCol>
                            <CCol :md="4">
                              <CFormCheck
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                label="Otros"
                              />
                            </CCol>

                            <CFormInput
                              v-model="
                                postGastoDetalle.detaRetencionDto[i].mAplicado
                              "
                              id="validationCustom01"
                              required
                            />

                            <CFormFeedback valid> Exito! </CFormFeedback>
                            <CFormFeedback invalid>
                              Favor agregar el campo
                            </CFormFeedback>
                          </div>
                        </CCol>

                        <CCol :md="3">
                          <CFormLabel for="validationCustom01"
                            >Valor</CFormLabel
                          >
                          <CFormInput
                            v-model="
                              postGastoDetalle.detaRetencionDto[i].mAplica
                            "
                            id="validationCustom01"
                            required
                          />

                          <CFormFeedback valid> Exito! </CFormFeedback>
                          <CFormFeedback invalid>
                            Favor agregar el campo
                          </CFormFeedback>
                        </CCol>
                      </div>
                    </div>
                  </CAccordionBody>
                </CAccordionItem>
              </CAccordion>
            </div>
          </div>

          <CCol :md="3">
            <button
              v-if="isVariacion"
              class="btn btn-primary"
              style="margin-top: 32px"
              v-on:click="addRetencion"
            >
              Adicionar Retencion
            </button>
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
              v-on:click="postDetalle"
            >
              Guardar
            </button>
          </div>
        </CForm>
        <hr />
        <CSmartTable class="sticky-top"
          clickableRows
          :tableProps="{
            striped: true,
            hover: true,
          }"
          :tableHeadProps="{}"
          :activePage="1"
          footer
          header
          :items="detalleGasto"
          :columns="columns2"
          itemsPerPageSelect
          :itemsPerPage="5"
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
          :backdrop="false"
        >
          <template #nombre="{ item }">
            <td>
              {{ item.ctgClasificador.nombre }}
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
    backdrop="static"
    size="xl"
    :visible="lgDemo3"
    @close="
      () => {
        lgDemo3 = false
      }
    "
  >
    <CModalHeader class="text-center">
      <CModalTitle>Estructurar por Clasificador</CModalTitle>
    </CModalHeader>
    <div class="row p-1">
      <div class="col-4">
        <label
          for="dni"
          style="font-weight: bold; margin-left: 12px; margin-top: 7px"
          >Programa o Proyecto</label
        >

        <input
          type="number"
          name="dni"
          id="dni"
          v-model="postGastoDetalle.detalleRegistroGastoDto.estProg"
          class="form-control"
          disabled
        />
      </div>
      <div class="col-8">
        <label
          for="dni"
          style="font-weight: bold; margin-left: 12px; margin-top: 7px"
          >Descripcion</label
        >
        <input
          type="text"
          name="dni"
          id="dni"
          v-model="nombreEst"
          class="form-control"
          disabled
        />
      </div>
    </div>

    <CModalBody>
      <CCardBody>
        <hr />
        <CSmartTable class="sticky-top"
          clickableRows
          :tableProps="{
            striped: true,
            hover: true,
          }"
          :tableHeadProps="{}"
          :activePage="1"
          footer
          header
          :items="EstructuraByClasificadores"
          :columns="columns3"
          itemsPerPageSelect
          :itemsPerPage="5"
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
        >
          <template #show_details="{ item, index }">
            <!-- <hr/> -->
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="seletectedItems(item)"
              >
                {{ Boolean(item._toggled) ? 'Hide' : 'Seleccionar' }}
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
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/EjecucionServices'
import ApiFormulacion from '../../FormulacionModule/services/FormulacionServices'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import SimpleTypeahead from 'vue3-simple-typeahead'
 import {mapActions} from 'pinia'
import { useToastStore } from '@/store/toast'
export default {
  components: {
    CSmartTable,
    CModal,
    SimpleTypeahead,
      
  },

  data: () => {
    return {
      isVariacion: false,
      isDevengado: false,
      tipoRentencion: [{}],
      TipoGastoList: [],
      EstructuraByClasificadores: [],
      cabeceraGasto: [],
      nombreEst: '',
      nombre: '',
      detalleGasto: [],
      validatedCustom01: null,
      beneficiariosName: [],
      beneficiariosList: [],
      lgDemo: false,
      lgDemo1: false,
      lgDemo3: false,
      id: null,
      cabeceraId: null,
      postGasto: {
        id: 0,
        tipoGastoId: 1,
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        anioFiscal: null,
        secuencialId: '',
        numeroComprobante: 0,
        detalle: '',
        fecha: '',
        etapa: 'D',
        codBenefi: 0,
        destGasto: 0,
        bancoId: 0,
        nCheque: '',
        totalBruto: 0,
        valorNeto: 0,
        fechaResolucion: '',
        nResolucion: '',
        cantFactCXP: 0,
        totalCXP: 0,
        cantPGrupo: 0,
        totalPGrupo: 0,
        cantRetenci: 0,
        totalRetenciones: 0,
        dtoInicial: 0,
        dtoFinal: 0,
        cantDocto: 0,
        estatus: 'A',
      },
      postGastoDetalle: {
        detalleRegistroGastoDto: {
          id: 0,
          anioFiscalId: parseInt(localStorage.getItem('ano')),
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          secuenciaComprobante: 0,
          fecha: 0,
          bancoId: 0,
          estProg: '',
          ctgClasificadorId: '',
          ctgFuenteId: '',
          ctgFuenteEspecificaId: '',
          ctgOrganismoFinanciadorId: '',
          ctgFuncionId: '',
          valorBruto: 0,
          retenciones: 0,
          neto: 0,
        },
        detaRetencionDto: [
          {
            anioFiscalId: parseInt(localStorage.getItem('ano')),
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
            id: 0,
            fecha: new Date(Date.now()),
            beneficiarioId: 0,
            bancoId: 0,
            fAplica: 0,
            retencion: 0,
            ctgMestProgId: '',
            cuenta: '',
            parteAplica: '',
            mAplica: 0,
            mAplicado: 0,
            orden: 0,
            estCuenta: '',
            ctgFuenteId: '',
            ctgFuenteEspecificaId: '',
            ctgOrganismoFinanciadorId: '',
            registroGastoId: 0,
          },
        ],
      },
      columns: [
        {
          key: 'numeroComprobante',
          label: 'Comp No',
          _style: { width: '10%' },
        },
        { key: 'fecha', label: 'Fecha', _style: { width: '10%' } },
        { key: 'etapa', label: 'Etapa', _style: { width: '10%' } },
        { key: 'nCheque', label: 'Forma/Pago', _style: { width: '10%' } },
        {
          key: 'codBenefi',
          label: 'Beneficiario',
          _style: { width: '20%' },
        },
        { key: 'bancoId', label: 'Cuenta de banco', _style: { width: '20%' } },
        { key: 'totalBruto', label: 'Total Bruto', _style: { width: '20%' } },
        {
          key: 'totalRetenciones',
          label: 'Total Retencion',
          _style: { width: '20%' },
        },
        { key: 'valorNeto', label: 'Valor Neto', _style: { width: '40%' } },
        { key: 'ck', label: 'No. CK/CR', _style: { width: '40%' } },

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
          key: 'estProg',
          label: 'Estructura',
          _style: { width: '40%' },
        },
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        { key: 'nombre', label: 'Descripcion', _style: { width: '40%' } },
        {
          key: 'ctgFuenteId',
          label: 'Fuente de financiamiento',
          _style: { width: '40%' },
        },
        {
          key: 'ctgFuenteEspecificaId',
          label: 'Fuente especifica',
          _style: { width: '40%' },
        },
        {
          key: 'ctgOrganismoFinanciadorId',
          label: 'Organismo de financiamiento',
          _style: { width: '40%' },
        },
        { key: 'neto', label: 'Sub-total', _style: { width: '40%' } },
        { key: 'retenciones', label: 'Retencion', _style: { width: '40%' } },
        { key: 'valorBruto', label: 'Valor neto', _style: { width: '40%' } },

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
      columns3: [
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        { key: 'nombre', label: 'Descripcion', _style: { width: '20%' } },
        { key: 'totalOriginal', label: 'P/Original', _style: { width: '20%' } },
        { key: 'totalVariacion', label: 'Modifica', _style: { width: '20%' } },
        { key: 'totalPagado', label: 'Modifica', _style: { width: '20%' } },
        {
          key: 'totalDevengado',
          label: 'Disponible',
          _style: { width: '20%' },
        },
        { key: 'totalPagado', label: 'Disponible', _style: { width: '20%' } },
        {
          key: 'ctgFuenteId',
          label: 'Fuente de financiamiento',
          _style: { width: '40%' },
        },
        {
          key: 'ctgFuenteEspecificaId',
          label: 'Fuente especifica',
          _style: { width: '40%' },
        },
        {
          key: 'ctgOrganismoFinanciadorId',
          label: 'Organismo de financiamiento',
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
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    changeRetenciones(e) {
      Api.getTipoRetencionById(e.target.value).then((response) => {
        this.detaRetencionDto.beneficiarioId = response.data.data.beneficiarioId
      })
    },
    addRetencion() {
      var retencion = {
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        id: 0,
        fecha: new Date(Date.now()),
        beneficiarioId: 0,
        bancoId: 0,
        fAplica: 0,
        retencion: 0,
        ctgMestProgId: '',
        cuenta: '',
        parteAplica: '',
        mAplica: 0,
        mAplicado: 0,
        orden: 0,
        estCuenta: '',
        ctgFuenteId: '',
        ctgFuenteEspecificaId: '',
        ctgOrganismoFinanciadorId: '',
        registroGastoId: 0,
      }
      this.postGastoDetalle.detaRetencionDto.push(retencion)
    },

    getEstructuraById() {
      Api.getRegistroGastoDetalleMesprog(
        this.postGastoDetalle.detalleRegistroGastoDto.estProg,
      ).then((response) => {
        this.EstructuraByClasificadores = response.data.data
        this.getEstructura()
      })
    },
    getTipoGasto() {
      Api.getTipoGastoList().then((response) => {
        this.TipoGastoList = response.data.data
      })
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    changeAuxiliar(e) {
      this.postGasto.tipoGastoId = e.target.value
    },
    clearModal1() {
      this.postGasto = {
        id: 0,
        tipoGastoId: null,
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        anioFiscal: null,
        secuencialId: '',
        numeroComprobante: 0,
        detalle: '',
        fecha: '',
        etapa: 'D',
        codBenefi: 0,
        destGasto: 0,
        bancoId: 0,
        nCheque: '',
        totalBruto: 0,
        valorNeto: 0,
        fechaResolucion: '',
        nResolucion: '',
        cantFactCXP: 0,
        totalCXP: 0,
        cantPGrupo: 0,
        totalPGrupo: 0,
        cantRetenci: 0,
        totalRetenciones: 0,
        dtoInicial: 0,
        dtoFinal: 0,
        cantDocto: 0,
        estatus: 'A',
      }
    },
    clearModal2() {
      this.postGastoDetalle = {
        detalleRegistroGastoDto: {
          id: 0,
          anioFiscalId: parseInt(localStorage.getItem('ano')),
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          secuenciaComprobante: 0,
          fecha: 0,
          bancoId: 0,
          estProg: '',
          ctgClasificadorId: '',
          ctgFuenteId: '',
          ctgFuenteEspecificaId: '',
          ctgOrganismoFinanciadorId: '',
          ctgFuncionId: '',
          valorBruto: 0,
          retenciones: 0,
          neto: 0,
        },
        detaRetencionDto: [
          {
            anioFiscalId: parseInt(localStorage.getItem('ano')),
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
            id: 0,
            fecha: new Date(Date.now()),
            beneficiarioId: 0,
            bancoId: 0,
            fAplica: 0,
            retencion: 0,
            ctgMestProgId: '',
            cuenta: '',
            parteAplica: '',
            mAplica: 0,
            mAplicado: 0,
            orden: 0,
            estCuenta: '',
            ctgFuenteId: '',
            ctgFuenteEspecificaId: '',
            ctgOrganismoFinanciadorId: '',
            registroGastoId: 0,
          },
        ],
      }
    },
    toggleDetails1(item) {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      this.lgDemo = true
      this.cabeceraId = item.id
      Api.getRegistroGastobyid(this.cabeceraId).then((response) => {
        this.postGasto.fecha = this.formatDate(response.data.data.fecha)

        this.postGasto = response.data.data
      })
    },
    getBeneficiario() {
      Api.getBeneficiarios().then((response) => {
        this.beneficiariosList = response.data.data
        this.beneficiariosList.map((beneficiario) => {
          this.beneficiariosName.push(
            `${beneficiario.id}-${beneficiario.nombre}`,
          )
        })
      })
    },
    guardarRetencion() {
      Api.postGastoDetalle(this.postGastoDetalle).then((response) => {})
    },
    selectItemEventHandler(id) {
      this.postGasto.codBenefi = id.split('-')[0]
    },
    showDetalle(item) {
      this.lgDemo1 = true
      this.id = item.id
      Api.getRegistroGastobyid(item.id).then((response) => {
        if (
          response.data.data.etapa == 'VARIACION' ||
          response.data.data.etapa == 'DEVENGADO'
        ) {
          this.isVariacion = false
        } else {
          this.isVariacion = true
        }

        this.postGastoDetalle.detalleRegistroGastoDto.bancoId =
          response.data.data.bancoId
        this.postGastoDetalle.detalleRegistroGastoDto.secuenciaComprobante =
          item.id
      })

      this.postGastoDetalle.detalleRegistroGastoDto.secuenciaComprobante =
        item.id
      Api.getRegistroGastoDetalle(item.id).then((response) => {
        this.detalleGasto = response.data.data
      })
    },
    gotToBeneficiario() {
      this.$router.push({ path: '/Ejecucion/beneficiarios' })
    },
    goToGasto() {
      this.$router.push({ path: '/Ejecucion/destinoGastos' })
    },
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }

      this.validatedCustom01 = true
    },
    postCabecera() {
      if (this.cabeceraId == null) {
        this.postGasto.bancoId = this.postGasto.bancoId.split('-')[0]

        // this.postGasto.tipoGastoId= 5,
        Api.postRegistroGasto(this.postGasto).then((response) => {
          this.show({
            content: response.data.message,
            closable: true,
            color: 'success',
          })
        })
        setTimeout(this.getCabecera, 500)
      } else {
        Api.putRegistroGasto(this.postGasto, this.cabeceraId).then(
          (response) => {
                 this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          },
        )
        setTimeout(this.getCabecera, 500)
      }
      event.preventDefault()
      event.stopPropagation()
    },
    postDetalle() {
      Api.postGastoDetalle(this.postGastoDetalle)
        .then((response) => {
          this.show({
            content: response.data.message,
            closable: true,
            color: 'success',
          })
        })
        .catch((error) => {
          this.show({
            content: error.message,
            closable: true,
            color: 'danger',
          })
        })
      setTimeout(this.getCabecera(), 500)
    },
    getCabecera() {
      Api.getRegistroGasto().then((response) => {
        this.cabeceraGasto = response.data.data
      })
    },

    seletectedItems(item) {
      this.postGastoDetalle.detalleRegistroGastoDto.ctgFuenteEspecificaId =
        item.ctgFuenteEspecificaId
      this.postGastoDetalle.detalleRegistroGastoDto.ctgFuenteId =
        item.ctgFuenteId
      this.postGastoDetalle.detalleRegistroGastoDto.ctgOrganismoFinanciadorId =
        item.ctgOrganismoFinanciadorId
      this.nombre = item.nombre
      this.postGastoDetalle.detalleRegistroGastoDto.ctgClasificadorId =
        item.ctgClasificadorId
      this.lgDemo3 = false
    },
    getEstructura() {
      ApiFormulacion.getEstruturaProgramaticaById(
        this.postGastoDetalle.detalleRegistroGastoDto.estProg,
      ).then((response) => {
        this.nombreEst = response.data.data.nombre
      })
    },
    getClasificador() {
      Api.getRegistroGastoDetalleClasificador(
        this.postGastoDetalle.ctgClasificadorId,
      ).then((response) => {
        this.postGastoDetalle.nombre = response.data.data[0].nombre
        this.postGastoDetalle.ctgFuenteId = response.data.data[0].ctgFuenteId
        this.postGastoDetalle.ctgFuenteEspecificaId =
          response.data.data[0].ctgFuenteEspecificaId
        this.postGastoDetalle.ctgOrganismoFinanciadorId =
          response.data.data[0].ctgOrganismoFinanciadorId
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
    toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },
  },
  mounted() {
    Api.getTipoRetencion().then((response) => {
      this.tipoRentencion = response.data.data
    })
    this.getCabecera()
    this.getBeneficiario()
    this.getTipoGasto()
  },
}
</script>

<style>
.top {
  margin-top: 27px;
}

.left {
  margin-left: 910px;
  margin-top: 15px;
}
</style>
