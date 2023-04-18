<template>
  <h3 class="text-center  mb-4">Formulaci&oacute;n Gastos</h3>
  
  <AppAccionHeader
    :actions="pageActions"
  >
    <CButton color="info" @click="setNuevoFormulacionGasto">{{ isFiscalYearApprovedOrClose ? 'Habilitar' : 'Agregar' }}</CButton>
    <CButton color="secondary" @click="goToIngreso">Ir a Formulaci&oacute;n Ingreso</CButton>
  </AppAccionHeader>

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
    :items-per-page-label="'Artículos por página:'"
  >
    <template #totalPresupuesto="{ item }">
      <td class="text-end">
        {{ formatPrice(item.totalPresupuesto) }}
      </td>
    </template>
    <template #unidadResp="{ item }">
      <td class="text-end">
        {{ item.unidadResp == null ? '' : item.unidadResp }}
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
        >Editar
        </CButton>
      </td>
    </template>
  </CSmartTable>

  <FormulacionGastoDialog
    :isVisible="showFormulacionDialog"
    :formulacionGasto="formulacionGasto"
    @close="onFormulacionGastoDialogClose"
  />

</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/FormulacionServices'
import { mapActions, mapState } from 'pinia'
import { usePrepGastoStore } from '../store/Formulacion/prepGasto'
import { mapStores } from 'pinia'
import XLSX from 'xlsx/xlsx.mjs'
import router from '@/router'
import { formatPrice } from '../../../../utils/format'
import { useToastStore } from '@/store/toast'
import FormulacionGastoDialog from "../gasto/FormulacionGastoDialog";
import AppAccionHeader from "../../../../components/AppActionHeader.vue";

export default {
  components: {
    CSmartTable,
    CModal,
    FormulacionGastoDialog,
    AppAccionHeader
  },
  data: function () {
    return {
      formulacionGasto: {},
      showFormulacionDialog: false,
      formatPrice,

      columns: [
        { key: 'pnap', label: 'Pnap', _style: { width: '7%' } },
        { key: 'programa', label: 'Programa', _style: { width: '7%' } },
        { key: 'proyecto', label: 'Proyecto', _style: { width: '10%' } },
        { key: 'actObra', label: 'Act/Obra', _style: { width: '7%' } },
        { key: 'estControl', label: 'Control', _style: { width: '8%' } },
        { key: 'nombre', label: 'Denominación', _style: { width: '25%' } },
        { key: 'tipo', label: 'Tipo', _style: { width: '8%' } },
        {
          key: 'unidadResp',
          label: 'Unidad Responsable',
          _style: { width: '15%' },
        },
        {
          key: 'totalPresupuesto',
          label: 'Presupuesto',
          _style: { width: '10%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            colspan: 8,
            style: 'font-weight:bold;',
          },
        },
        {
          label: '',
          _props: {
            colspan: 1,
            style: 'font-weight:bold;text-align:right',
          },
        },
        {
          label: '',
          _props: {
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },
      ],
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    ...mapActions(usePrepGastoStore, [
      'getListarGastos',
      'addGasto',
      'updatePresGasto',
    ]),
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
          const data = XLSX.utils.sheet_to_json(ws);
          const proyectosList = [];
          let pnap = '00';
          let programa = '00';
          data.map((item) => {
            if (Object.values(item)[2] < 90) {
              pnap = '00'
              programa = Object.values(item)[2].toString().padStart(2, 0)
            } else if (Object.values(item)[2] > 90) {
              pnap = Object.values(item)[2]
              programa = '00'
            }

            proyectosList.push({
              AyuntamientoId: this.$ayuntamientoId,
              AnioFiscalId: this.$fiscalYearId,
              MestProgId: `0011${Object.values(item)[4]
                .toString()
                .padStart(2, 0)}${Object.values(item)[5]
                .toString()
                .padStart(4, 0)}`,

              PNAP: pnap,
              Programa: programa,
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

          if (proyectosList.length) {
            Api.postCargaMasivaCabecera(proyectosList).then((response) => {
              this.show({
                content: 'Registro añadido correctamente',
                closable: true,
                time: 15_000
              });
              this.loadData();
            })
          } else {
            this.show({
                content: 'No se encontraron registros',
                closable: true,
                color: 'danger',
                class: 'text-white',
                time: 15_000
            });
          }
        }

        reader.readAsBinaryString(this.file)
      }
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
          const data = XLSX.utils.sheet_to_json(ws);
          const pregastoMasivo = [];
          data.map((item) => {
            if (Object.values(item)[2] < 90) {
              this.pnap = '00'
              this.programa = Object.values(item)[2].toString().padStart(2, 0)
            } else if (Object.values(item)[2] > 90) {
              this.pnap = Object.values(item)[2]
              this.programa = '00'
            }

            pregastoMasivo.push({
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
          pregastoMasivo.map((item) => {
            Api.getEstruturaProgramaticaById(item.mestProgId).then(
              (response) => {
                item.nombre = response.data.data.nombre
              },
            )
          })

          if (pregastoMasivo.length) {
            Api.postCargaMasivaDetalle(pregastoMasivo).then(() => {
              this.show({
                content: 'Registro añadido correctamente',
                closable: true,
              })
            })
            this.loadData();
          } else {
            this.show({
                content: 'No se encontraron registros',
                closable: true,
                color: 'danger',
                class: 'text-white',
                time: 15_000
            });
          }
        }

        reader.readAsBinaryString(this.file)
      }
    },
    guardarFormulacionGasto(data) {
      if (data.presGastoDto.id) {
        return Api.updateFormulacion(data.presGastoDto.id, data)
      }
      return this.addGasto(data);
    },
    IngresoReport() {
      window.open(
        `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Gastos_Formulacion_FP08&rs:Command=Render&ANO=${this.$fiscalYearId}&CAPITULO_AYTO=${this.$ayuntamientoId}&FONDO=P`,
        '_blank',
      );
    },

    cargarEstructuras() {
      Api.cargarEstructuras()
      .then(() => {
        this.loadData();
        this.show({
            content: "Cargar realizada correctamente",
            time: 15_000
        });
      })
      .catch(error => {
        this.show({
            content: error.response.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
        });
      });
    },

    toggleDetails(item) {
      this.formulacionGasto = {...item};
      this.showFormulacionDialog = true;
    },
    onFormulacionGastoDialogClose(data) {
      if (data) {
        const { detallePresGastos, ...rest } = data;
        rest.totalPresupuesto = detallePresGastos.reduce((acc, detalle) => acc + detalle.totalOriginal, 0);
        this.guardarFormulacionGasto({
          detallePresGastoDtos: detallePresGastos,
          presGastoDto: rest 
        })
        .then((response) => {
            this.show({
                content: response.data.message,
                closable: true,
            });
            this.formulacionGasto = {};
            this.showFormulacionDialog = false;
            
            this.loadData();
          })
          .catch((error) => {
            this.show({
                content: error.response.data,
                closable: true,
                color: 'danger',
                class: 'text-white',
            });
          })
      } else {
        this.formulacionGasto = {};
        this.showFormulacionDialog = false;
      }
    },
    setNuevoFormulacionGasto() {
      this.formulacionGasto = {
        clasifica: '',
        ayuntamientoId: this.$ayuntamientoId,
        anioFiscalId: this.$fiscalYearId,
        mestprogId: '',
        costObra: 0,
        pnap: '',
        nombre: '',
        programa: '',
        proyecto: '',
        actObra: '',
        estControl: '',
        unidadResp: '',
        tipo: 'DETALLE',
        totalPresupuesto: 0,
        actControl: '',
        pppm: 'n',
        modContatro: 'n',
        asignadoA: 0,
        asignadoA: 0,
        fecha: (new Date()).toISOString(),
        detallePresGastos: [],
      };
      this.showFormulacionDialog = true;
    },
    loadData() {
      setTimeout(() => {
        this.getListarGastos();
      }, 200);
    }
  },

  computed: {
    ...mapStores(usePrepGastoStore),
    ...mapState(usePrepGastoStore, [
      'prepGastoList',
      'gastoListCount',
      'totalBugetAmount',
    ]),
    isFiscalYearApprovedOrClose() {
      return this.LoginInfo.isFiscalYearCloseOrApproved;
    },
    pageActions() {
      const actions = [
        {
          label: 'Imprimir',
          accionHandler: this.IngresoReport.bind(this),
          icon: 'cilPrint'
        }
      ];

      if (!this.isFiscalYearApprovedOrClose) {
        actions.push(...[
          {
            label: 'Cargar Estructuras',
            accionHandler: this.cargarEstructuras.bind(this),
            icon: 'cilLayers'
          },
          {
            label: 'Importar Proyectos',
            accionHandler: this.onFileChangeProyectos.bind(this),
            type: 'upload'
          },
          {
            label: 'Importar Formulaci&oacute;n',
            accionHandler: this.onFileChange.bind(this),
            type: 'upload'
          }
        ]);
      }

      return actions;
    }
  },
  inject: ['LoginInfo'],
  mounted() {
    this.loadData();
  },
  watch: {
    prepGastoList() {
      setTimeout(() => {
        this.footerItem[0].label = `Total items: ${this.gastoListCount}`;
        this.footerItem[1].label = this.formatPrice(this.totalBugetAmount);
      }, 200);
    }
  }
}
</script>
<style scoped>
.file-select {
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: center;
  background-color: #375b80;
  color: white;
}

.file-select > .label {
  margin-left: 0.1rem;
}

.file-select > input[type='file'] {
  visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
