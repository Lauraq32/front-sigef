<template>
  <CForm>
    <div class="container">
      <div class="d-flex justify-content-center">
        <div class="row w-75 h-75">
          <div class="col-6">
            <div class="row">
              <div class="col-9">
                <CNav variant="tabs" role="tablist">
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 1" @click="() => {
                      tabPaneActiveKey = 1
                    }
                      ">
                      Retenciones
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 2" @click="() => {
                      tabPaneActiveKey = 2
                    }
                      ">
                      Ingresos
                    </CNavLink>
                  </CNavItem>
                </CNav>
              </div>

              <div class="col-3">
                <CButton v-show="tabPaneActiveKey == 1" class="mb-3" color="info"
                  @click="showAgregarIngresosRetencion = true">
                  Agregar</CButton>
                <CButton v-show="tabPaneActiveKey == 2" class="mb-3" color="info" @click="showAgregarIngresos = true">
                  Agregar</CButton>
              </div>
            </div>


            <CTabContent>
              <CTabPane role="tabpanel" aria-labelledby="retenciones-tab" :visible="tabPaneActiveKey === 1">
                <CSmartTable clickableRows :tableProps="{
                  striped: true,
                  hover: true,
                }
                  " :tableHeadProps="{}" :activePage="1" header :items="dataConfiguracionNomina"
                  :columns="tableConfiguracionNominaRetencion" :sorterValue="{ column: 'status', state: 'asc' }"
                  pagination>
                  <template #nombre="{ item }">
                    <td>
                      <CFormInput v-on:keypress="onlyLetter" :disabled="item.categoriaRetencion == 'LEY'"
                        v-model="item.nombre" />
                    </td>
                  </template>

                  <template #codigoEjecucionPresupuestoGasto="{ item }">
                    <td>
                      <CFormInput v-on:keypress="onlyNumber" v-model="item.codigoEjecucionPresupuestoGasto" />
                    </td>
                  </template>

                  <template #show_details="{ item }">
                    <td class="py-1">
                      <CButton v-if="item.categoriaRetencion !== 'LEY'" class="mt-1" variant="outline" square size="sm"
                        @click="deleteConfiguracionNominaApi(item)">
                        <CIcon style="color: red" icon="cilTrash" size="lg" />
                      </CButton>
                    </td>
                  </template>
                </CSmartTable>


              </CTabPane>
              <CTabPane role="tabpanel" aria-labelledby="ingresos-tab" :visible="tabPaneActiveKey === 2">
                <CSmartTable clickableRows :tableProps="{
                  striped: true,
                  hover: true,
                }
                  " :tableHeadProps="{}" :activePage="1" header :items="dataConfiguracionNominaIngresos"
                  :columns="tableConfiguracionNominaIngresos" :sorterValue="{ column: 'status', state: 'asc' }"
                  pagination>
                  <template #nombre="{ item }">
                    <td>
                      <CFormInput v-on:keypress="onlyLetter" v-model="item.nombre" />
                    </td>
                  </template>

                  <template #show_details="{ item }">
                    <td class="py-1">
                      <CButton v-if="item.categoriaRetencion !== 'LEY'" class="mt-1" variant="outline" square size="sm"
                        @click="deleteIngreso(item)">
                        <CIcon style="color: red" icon="cilTrash" size="lg" />
                      </CButton>
                    </td>
                  </template>
                </CSmartTable>


              </CTabPane>
            </CTabContent>

            <h6><u>Nota</u></h6>

            <p>
              Debe crear el concepto de la retenci&oacute;n en el modulo de ejecuci&oacute;n
              presupuestaria <br />
              y luego, poner el c&oacute;digo asignado en la casilla correspondiente
            </p>
          </div>

          <div class="col-6 border  p-2">
            <div class="row mt-3">
              <div class="col-9">
                <CFormLabel for="sueldoMensual" class="col-form-label">% Retenci&oacute;n ARS. (Empleado)</CFormLabel>
              </div>
              <div class="col-3">
                <CFormInput class="text-end" v-on:keypress="onlyNumber"
                  v-model="calculosPorcentajes.PorcentajeARSEmpleado" id="sueldoMensual" />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-9">
                <CFormLabel for="sueldoMensual" class="col-form-label">% Retenci&oacute;n ARS. Patrono</CFormLabel>
              </div>
              <div class="col-3">
                <CFormInput class="text-end" v-on:keypress="onlyNumber"
                  v-model="calculosPorcentajes.PorcentajeARSEmpleador" id="sueldoMensual" />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-9">
                <CFormLabel for="sueldoMensual" class="col-form-label text-end">% Fondo Pensi&oacute;n (Empleado)
                </CFormLabel>
              </div>
              <div class="col-3">
                <CFormInput class="text-end" v-on:keypress="onlyNumber"
                  v-model="calculosPorcentajes.PorcentajeAFPEmpleado" id="sueldoMensual" />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-9">
                <CFormLabel for="sueldoMensual" class="col-form-label">% Fondo Pensi&oacute;n Patrono</CFormLabel>
              </div>
              <div class="col-3">
                <CFormInput class="text-end" v-on:keypress="onlyNumber"
                  v-model="calculosPorcentajes.PorcentajeAFPEmpleador" id="sueldoMensual" />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-7">
                <CFormLabel for="sueldoMensual" class="col-form-label text-end">Tope Sueldo:</CFormLabel>
              </div>
              <div class="col-5">
                <CFormInput class="text-end" v-on:keypress="onlyNumber" v-model="calculosPorcentajes.SueldoTopeAFP"
                  id="sueldoMensual" />
              </div>

              <p>El tope de sueldo es obligatorio para el c&aacute;lculo de AFP.</p>
            </div>

            <div class="row mb-2 mt-1">
              <div class="col-9">
                <CFormLabel for="sueldoMensual" class="col-form-label text-end">% Riesgo Laboral. Patrono</CFormLabel>
              </div>
              <div class="col-3">
                <CFormInput class="text-end" v-on:keypress="onlyNumber"
                  v-model="calculosPorcentajes.PorcentajeRiesgoLaboral" id="sueldoMensual" />
              </div>
            </div>
            <div class="border box-tall">
              <p class="mt-2 mx-2">
                Seg&uacute;n la ley, las retenciones a los empleados, no deben pasar
                de un
                <CFormInput v-on:keypress="onlyNumber" v-model="calculosPorcentajes.PorcentajeMaximoRetencionEmpleado"
                  class="input-style text-end" />
                establecido de su sueldo bruto.
                <br />
                <br />
                En caso de que las retenciones sobrepasen este pocentaje,
                restar la diferencia de la siguiente retenci&oacute;n.
                <CFormInput v-on:keypress="onlyNumber" v-model="calculosPorcentajes.RetencionIdParaRestarExcedente"
                  class="input-style text-center" />
                <br />
                <br />
                si es = cero (0), rebajar de:
                <CFormInput v-on:keypress="onlyNumber" v-model="calculosPorcentajes.RetencionIdParaRestarExcedente"
                  class="input-style text-center" type="number" />
              </p>
            </div>
            <div class="mt-3 d-flex justify-content-end">
              <div>
                <CButton color="info" @click="">Guardar</CButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CForm>



  <AddDialogRetencion :showModal="showAgregarIngresosRetencion" :payload="postIngresoRetencion" @close-modal="closeModal"
    @addRetencion="postRetenciones" />

  <AddDialogIngresos :showModal="showAgregarIngresos" :payload="postIngresoRetencion" @close-modal="closeModal"
    @addIngreso="postIngresos" />
</template>

<script>
import { CModal } from '@coreui/vue'
import { CFormInput, CFormLabel, CSmartTable } from '@coreui/vue-pro'
import ApiNomina from '../services/NominaServices'
import { getConfiguracionNomina } from '@/utils/format'
import AddDialogRetencion from '../components/dialogos/ModalAgregarIngresosRetencion.vue'
import AddDialogIngresos from '../components/dialogos/ModalAgregarIngresos.vue'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import { onlyLetter, onlyNumber } from '@/utils/validator'

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
      onlyLetter,
      onlyNumber,
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
      calculosPorcentajes: {
        porcentajeARSEmpleado: 0,
        porcentajeARSEmpleador: 0,
        porcentajeAFPEmpleado: 0,
        porcentajeAFPEmpleador: 0,
        sueldoTopeAFP: 0,
        porcentajeRiesgoLaboral: 0,
        porcentajeMaximoRetencionEmpleado: 0,
        retencionIdParaRestarExcedente: 0,
        retencionIdParaRestarExcedente2: 0,
        montoSueldoExcentoISR: 0,
        montoSueldoEscala1: 0,
        porcentajeISREscala1: 0,
        montoSueldoEscala2: 0,
        porcentajeISREscala2: 0,
        montoSueldoEscala3: 0,
        porcentajeISREscala3: 0,
        montoSueldoEscala4: 0,
        porcentajeISREscala4: 0,
      },

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
      this.clearModal()
    },

    postRetenciones(payload) {
      this.dataConfiguracionNomina = [...this.dataConfiguracionNomina, payload]
      ApiNomina.putConfiguracionNomina({
        retencion: this.dataConfiguracionNomina,
        tipoIngreso: this.dataConfiguracionNominaIngresos,
      }).then(() => {
        this.clearModal()
        setTimeout(this.getConfiguracionNominaApi, 500)
        this.show({
          content: 'Registro añadido correctamente',
          closable: true,
        })
        this.showAgregarIngresosRetencion = false
      })
    },

    postIngresos(payload) {
      this.dataConfiguracionNominaIngresos = [
        ...this.dataConfiguracionNominaIngresos,
        payload,
      ]
      ApiNomina.putConfiguracionNomina({
        retencion: this.dataConfiguracionNomina,
        tipoIngreso: this.dataConfiguracionNominaIngresos,
      }).then(() => {
        this.clearModal()
        setTimeout(this.getConfiguracionNominaApi, 500)
        this.show({
          content: 'Registro añadido correctamente',
          closable: true,
        })
        this.showAgregarIngresos = false
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
      this.$swal({
        title: 'Estás seguro de realizar esta acción? ',
        text: 'No podrás revertirlo',
        icon: 'Confirmación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          ApiNomina.deleteConfiguracionNomina({
            retencionIds: [item.id],
            tipoIngresoIds: [],
          }).then((response) => {
            setTimeout(this.getConfiguracionNominaApi, 500)
          })
        }
      })
    },

    deleteIngreso(item) {
      this.$swal({
        title: 'Estás seguro de realizar esta acción? ',
        text: 'No podrás revertirlo',
        icon: 'Confirmación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          ApiNomina.deleteConfiguracionNomina({
            retencionIds: [],
            tipoIngresoIds: [item.id],
          }).then((response) => {
            setTimeout(this.getConfiguracionNominaApi, 500)
          })
        }
      })
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

    getConfiguracionPorcentajes() {
      ApiNomina.calculosPorcentage().then((response) => {
        this.calculosPorcentajes = response.data.data
      })
    }
  },

  props: {
    showModal: Boolean,
  },

  mounted() {
    this.getConfiguracionNominaApi()
    this.getConfiguracionPorcentajes()
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