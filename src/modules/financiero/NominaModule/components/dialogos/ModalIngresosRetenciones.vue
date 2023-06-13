<template>
  <CModal
    backdrop="static"
    size="lg"
    :visible="showModal"
    @close="closeModalIngresosRetencion"
  >
    <CModalHeader>
      <CModalTitle>Conceptos de Ingresos y Retenciones</CModalTitle>
    </CModalHeader>

    <CModalBody>
      <CCardBody>
        <CForm>
          <div class="row">
            <div class="col-7">
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
                    Retenciones
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
                    Ingresos
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="retenciones-tab"
                  :visible="tabPaneActiveKey === 1"
                >
                  <CSmartTable
                    clickableRows
                    :tableProps="{
                      striped: true,
                      hover: true,
                    }"
                    :tableHeadProps="{}"
                    :activePage="1"
                    header
                    :items="dataConfiguracionNomina"
                    :columns="tableConfiguracionNominaRetencion"
                    :sorterValue="{ column: 'status', state: 'asc' }"
                    pagination
                  >
                    <template #nombre="{ item }">
                      <td>
                        <CFormInput
                          :disabled="item.categoriaRetencion == 'LEY'"
                          v-model="item.nombre"
                        />
                      </td>
                    </template>

                    <template #codigoEjecucionPresupuestoGasto="{ item }">
                      <td>
                        <CFormInput
                          v-model="item.codigoEjecucionPresupuestoGasto"
                        />
                      </td>
                    </template>

                    <template #show_details="{ item }">
                      <td class="py-1">
                        <CButton
                          v-if="item.categoriaRetencion !== 'LEY'"
                          class="mt-1"
                          variant="outline"
                          square
                          size="sm"
                          @click="deleteConfiguracionNominaApi(item)"
                        >
                          <CIcon style="color: red" icon="cilTrash" size="lg" />
                        </CButton>
                      </td>
                    </template>
                  </CSmartTable>

                  <CButton
                    class="mb-3"
                    color="primary"
                    @click="showAgregarIngresosRetencion = true"
                    >Agregar</CButton
                  >
                </CTabPane>
                <CTabPane
                  role="tabpanel"
                  aria-labelledby="ingresos-tab"
                  :visible="tabPaneActiveKey === 2"
                >
                  <CSmartTable
                    clickableRows
                    :tableProps="{
                      striped: true,
                      hover: true,
                    }"
                    :tableHeadProps="{}"
                    :activePage="1"
                    header
                    :items="dataConfiguracionNominaIngresos"
                    :columns="tableConfiguracionNominaIngresos"
                    :sorterValue="{ column: 'status', state: 'asc' }"
                    pagination
                  >
                    <template #nombre="{ item }">
                      <td>
                        <CFormInput v-model="item.nombre" />
                      </td>
                    </template>

                    <template #show_details="{ item }">
                      <td class="py-1">
                        <CButton
                          class="mt-1"
                          variant="outline"
                          square
                          size="sm"
                          @click="deleteConfiguracionNominaApi(item)"
                        >
                          <CIcon style="color: red" icon="cilTrash" size="lg" />
                        </CButton>
                      </td>
                    </template>
                  </CSmartTable>

                  <CButton
                    class="mb-3"
                    color="primary"
                    @click="showAgregarIngresos = true"
                    >Agregar</CButton
                  >
                </CTabPane>
              </CTabContent>

              <h6><u>Nota</u></h6>

              <p>
                Debe crear el concepto de la retencion en el modulo de ejecucion
                presupuestaria <br />
                y luego, poner el codigo asignado en la casilla correspondiente
              </p>
            </div>

            <div class="col-5 border border-bottom-dark p-2">
              <div class="row mt-3">
                <div class="col-9">
                  <CFormLabel for="sueldoMensual" class="col-form-label"
                    >% Retencion ARS. (Empleado)</CFormLabel
                  >
                </div>
                <div class="col-3">
                  <CFormInput id="sueldoMensual" />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-9">
                  <CFormLabel for="sueldoMensual" class="col-form-label"
                    >% Retencion ARS. Patrono</CFormLabel
                  >
                </div>
                <div class="col-3">
                  <CFormInput id="sueldoMensual" />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-9">
                  <CFormLabel for="sueldoMensual" class="col-form-label"
                    >% Fondo Pension (Empleado)</CFormLabel
                  >
                </div>
                <div class="col-3">
                  <CFormInput id="sueldoMensual" />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-9">
                  <CFormLabel for="sueldoMensual" class="col-form-label"
                    >% Fondo Pension Patrono</CFormLabel
                  >
                </div>
                <div class="col-3">
                  <CFormInput id="sueldoMensual" />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-7">
                  <CFormLabel for="sueldoMensual" class="col-form-label"
                    >Total Sueldo:</CFormLabel
                  >
                </div>
                <div class="col-5">
                  <CFormInput id="sueldoMensual" />
                </div>

                <p>El tope de sueldo es obligatorio para el calculo de AFP.</p>
              </div>

              <div class="row mb-2 mt-1">
                <div class="col-9">
                  <CFormLabel for="sueldoMensual" class="col-form-label"
                    >% Riesgo Laboral. Patrono</CFormLabel
                  >
                </div>
                <div class="col-3">
                  <CFormInput id="sueldoMensual" />
                </div>
              </div>
              <div class="border box-tall">
                <p class="mt-2">
                  Segun la ley, las retenciones a los empleados, no deben pasar
                  de un
                  <CFormInput
                    v-model="sinNombrePorAhora"
                    class="input-style"
                    type="text"
                  />
                  establecido de su sueldo bruto.
                  <br />
                  <br />
                  En caso de que las retenciones sobrepasen este pocentaje,
                  restar la diferencia de la siguiente retencion.
                  <CFormInput
                    v-model="sinNombrePorAhora1"
                    class="input-style"
                    type="text"
                  />
                  <br />
                  <br />
                  si es = cero (0), rebajar de:
                  <CFormInput class="input-style" type="number" />
                </p>
              </div>
            </div>
          </div>
        </CForm>

        <AddDialogRetencion
          :showModal="showAgregarIngresosRetencion"
          :payload="postIngresoRetencion"
          @close-modal="closeModal"
          @addRetencion="addRetencion"
        />

        <AddDialogIngresos
          :showModal="showAgregarIngresos"
          :payload="postIngresoRetencion"
          @close-modal="closeModal"
          @addIngreso="addIngreso"
        />
      </CCardBody>
    </CModalBody>

    <CModalFooter>
      <CButton color="secondary" @click="closeModalIngresosRetencion"
        >Cerrar</CButton
      >
      <CButton color="primary" @click="postConfiguracionNominaApi"
        >Guardar</CButton
      >
    </CModalFooter>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CFormInput, CFormLabel, CSmartTable } from '@coreui/vue-pro'
import ApiNomina from '../../services/NominaServices'
import { getConfiguracionNomina } from '@/utils/format'
import AddDialogRetencion from './ModalAgregarIngresosRetencion.vue'
import AddDialogIngresos from './ModalAgregarIngresos.vue'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'

export default {
  name: 'IngresosAndRetenciones',
  components: {
    AddDialogIngresos,
    AddDialogRetencion,
    CModal,
    CFormLabel,
    CFormInput,
    CSmartTable,
  },

  data: function () {
    return {
      showAgregarIngresosRetencion: false,
      clonedArray: [],
      showAgregarIngresos: false,
      sinNombrePorAhora: '60%',
      sinNombrePorAhora1: 5,
      tabPaneActiveKey: 1,
      dataConfiguracionNomina: [],
      dataConfiguracionNominaIngresos: [],
      prueba: [],
      postIngresoRetencion: {
        retencion: {
          tipo: 'Institucional',
          esPorcentage: true,
          monto: 0,
          tipoRetencionId: 1,
          categoriaRetencion: 'Institucional',
          nombre: null,
          codigoEjecucionPresupuestoGasto: 0,
        },
        tipoIngreso: {
          nombre: null,
          esNovedad: true,
        },
      },
      getConfiguracionNomina,

      tableConfiguracionNominaRetencion: [
        {
          key: 'nombre',
          label: 'Retenciones',
          _style: { width: '30%' },
        },
        {
          key: 'codigoEjecucionPresupuestoGasto',
          label: 'Cod. en Ejec/Pres',
          _style: { width: '20%' },
        },

        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],

      tableConfiguracionNominaIngresos: [
        {
          key: 'nombre',
          label: 'Nombre',
          _style: { width: '30%' },
        },

        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModalIngresosRetencion() {
      this.$emit('close-modal', false)
    },

    closeModal() {
      this.showAgregarIngresosRetencion = false
      this.showAgregarIngresos = false
    },

    addRetencion(payload) {
      this.dataConfiguracionNomina = [...this.dataConfiguracionNomina, payload]
      this.show({
        content: 'Registro añadido correctamente',
        closable: true,
      })
    },

    addIngreso(payload) {
      this.dataConfiguracionNominaIngresos = [
        ...this.dataConfiguracionNominaIngresos,
        payload,
      ]
    },

    postConfiguracionNominaApi() {
      ApiNomina.postConfiguracionNomina(this.postIngresoRetencion).then(() => {
        this.clearModal()
        setTimeout(this.getConfiguracionNominaApi, 500)
        this.show({
          content: 'Registro añadido correctamente',
          closable: true,
        })
      })
    },

    ordenarDatosTabla() {
      this.dataConfiguracionNomina = this.dataConfiguracionNomina.slice()
      const order = { ARS: 1, AFP: 2, IRS: 3 }
      this.dataConfiguracionNomina.sort((a, b) => {
        const orderA = order[a.nombre] || Infinity
        const orderB = order[b.nombre] || Infinity

        if (orderA !== orderB) {
          return orderA - orderB
        }
      })

      return this.dataConfiguracionNomina
    },

    getConfiguracionNominaApi() {
      ApiNomina.getConfiguracionNomina().then((response) => {
        this.dataConfiguracionNomina = response.data.data.retencion
        this.dataConfiguracionNominaIngresos = response.data.data.tipoIngreso
        this.ordenarDatosTabla()
      })
    },

    deleteConfiguracionNominaApi(item) {
      ApiNomina.deleteConfiguracionNomina(item).then((response) => {})
    },

    clearModal() {
      this.postIngresoRetencion = {
        retencion: {
          tipo: 'Institucional',
          esPorcentage: false,
          monto: 0,
          tipoRetencionId: 1,
          categoriaRetencion: 'Institucional',
          nombre: null,
          codigoEjecucionPresupuestoGasto: 0,
        },
        tipoIngreso: {
          nombre: null,
          esNovedad: true,
        },
      }
    },
  },

  props: {
    showModal: Boolean,
  },

  mounted() {
    this.getConfiguracionNominaApi()
  },
}
</script>

<style>
.input-style {
  width: 60px;
  display: inline;
}

.box-tall {
  margin-top: 36px;
}
</style>
