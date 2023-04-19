<template>
  <h3 class="text-center mb-4">Formulaci&oacute;n Ingreso</h3>

  <AppAccionHeader
    :actions="pageActions"
  >
    <CButton color="info" @click="openModal">Agregar</CButton>
    <CButton color="secondary" @click="goToGasto">Ir a Formulaci&oacute;n Gasto</CButton>
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
    key="ingreso.id" 
    :items="ingresos"
    :columns="columns" 
    itemsPerPageSelect 
    columnFilter 
    :itemsPerPage="10"
    :items-per-page-label="'Artículos por página:'"
    :items-per-page-options="[10, 20, 50, 100, 150]" 
    columnSorter 
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #ctgFuenteEspecificaId="{ item }">
      <td class="text-center">
        {{ item.ctgFuenteEspecificaId }}
      </td>
    </template>

    <template #ctgFuenteId="{ item }">
      <td class="text-center">
        {{ item.ctgFuenteId }}
      </td>
    </template>

    <template #ctgOrganismoFinanciadorId="{ item }">
      <td class="text-center">
        {{ item.ctgOrganismoFinanciadorId }}
      </td>
    </template>

    <template #instOtorga="{ item }">
      <td class="text-center">
        {{ item.instOtorga }}
      </td>
    </template>
    <template #alaFecha="{ item }">
      <td class="text-end">
        {{ formatPrice(item.alaFecha) }}
      </td>
    </template>
    <template #anioAnt="{ item }">
      <td class="text-end">
        {{ formatPrice(item.anioAnt) }}
      </td>
    </template>

    <template #presForm="{ item }">
      <td class="text-end">
        {{ formatPrice(item.presForm) }}
      </td>
    </template>

    <template #show_details="{ item }">
      <td class="py-2">
        <div class="d-flex justify-content-around">
          <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="editFormulacion(item)">
            {{ (isFiscalYearApprovedOrClose || hasBugetOrExecution(item)) ? 'Detalle' : 'Editar' }}
          </CButton>
          <CButton
            v-if="!isFiscalYearApprovedOrClose"
            class="mt-1"
            color="danger"
            variant="outline"
            square size="sm"
            @click="deleteItem(item)"
          >
            Eliminar
          </CButton>
        </div>
      </td>
    </template>
  </CSmartTable>

  <FormulacionIngresoDialog
    :isVisible="showPartidaPresupuestodeIngresoDialog"
    :formulacionIngreso="postIngreso"
    :isFiscalYearApprovedOrClose="isFiscalYearApprovedOrClose"
    :institucionesOtorgante="institucionesOtorgante"
    @close="onCloseFormulacionDialog"
  />

</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import Api from '../services/FormulacionServices'
import { mapActions, mapStores, mapState } from 'pinia'
import XLSX from 'xlsx/xlsx.mjs'
import { CIcon } from '@coreui/icons-vue'
import { useToastStore } from '@/store/toast'
import { useAuthStore } from '@/store/AuthStore'
import router from '@/router'
import { formatPrice } from '../../../../utils/format';
import FormulacionIngresoDialog from "../gasto/FormulacionIngresoDialog.vue";
import AppAccionHeader from "../../../../components/AppActionHeader.vue";

export default {
  components: {
    CSmartTable,
    CIcon,
    FormulacionIngresoDialog,
    AppAccionHeader
},
  data: function () {
    return {
      ingresos: [],
      institucionesOtorgante: [],
      postIngreso: {
        anioFiscalId: this.$fiscalYearId,
        ayuntamientoId: this.$ayuntamientoId,
        ctgClasificadorId: '',
        instOtorga: '0000',
        ctaControl: '',
        detalle: '',
        anioAnt: 0,
        ctgFuenteId: '',
        ctgFuenteEspecificaId: '',
        ctgOrganismoFinanciadorId: '',
        anioAnt: 0,
        alaFecha: 0,
        presForm: 0,
        variacion: 0,
        ingresos: 0,
        variacionResumen: 0,
      },
      showPartidaPresupuestodeIngresoDialog: false,
      footerItem: [
        {
          label: 'Total presupuesto',
          _props: {
            
            colspan: 6,
            style: 'font-weight:bold',
          },
        },
        {
          label: '0.00',
          _props: {
            
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
        {
          label: '0.00',
          _props: {
            
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
        {
          label: '0.00',
          _props: {
            
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
      ],
      columns: [
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '10%' },
        },
        {
          key: 'detalle',
          label: 'Descripción',
          sorter: false,
          _style: { width: '35%' },
        },
        {
          key: 'ctgFuenteId',
          label: 'F/Finan',
          _style: { width: '5%' },
        },
        {
          key: 'ctgFuenteEspecificaId',
          label: 'F/Espec',
          _style: { width: '5%' },
        },
        {
          key: 'ctgOrganismoFinanciadorId',
          label: 'Org/Finan',
          _style: { width: '5%' },
        },
        {
          key: 'instOtorga',
          label: 'Inst/Otorgante',
          filter: false,
          _style: { width: '5%' },
        },
        {
          key: 'anioAnt',
          label: 'Año Anterior',
          filter: false,
          _style: { width: '10%' },
        },
        {
          key: 'alaFecha',
          label: 'A la Fecha',
          filter: false,
          _style: { width: '10%' },
        },
        {
          key: 'presForm',
          label: 'Pre/Formulado',

          filter: false,
          _style: { width: '10%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '5%' },
          filter: false,
          sorter: false,
        },
      ],
      formatPrice
    }
  },
  inject: ['LoginInfo'],
  methods: {
    ...mapActions(useToastStore, ['show']),
    downloadFile() {
      Api.downloadIngreso(this.$ayuntamientoId, this.$fiscalYearId)
      .then((response) => {
        const fileURL = window.URL.createObjectURL(new Blob([response.data ?? response]));
        const fURL = document.createElement('a');
        const id =  `${this.$loggedInfo.user.ayuntamiento.codigo}-${new Date().toISOString()}`;

        fURL.href = fileURL;
        fURL.id = id;
        fURL.setAttribute(
          'download',
          `FI-${id}.csv`,
        );
        document.body.appendChild(fURL);

        fURL.click();
      })
      .catch(this.handlerHttpError.bind(this))
    },

    openModal() {
      this.showPartidaPresupuestodeIngresoDialog = true;
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
          const presIngrsoMasivo = [];
          data.map((item) => {
            presIngrsoMasivo.push({
              anioFiscalId:  this.authInfo.currentFiscalYearId,
              ayuntamientoId: this.authInfo.user.ayuntamiento.id,
              ctgClasificadorId: `${Object.values(item)[2]}${Object.values(item)[3]
                }${Object.values(item)[4]}${Object.values(item)[5]
                }${Object.values(item)[6].toString().padStart(2, 0)}`,
              instOtorga: Object.values(item)[10],
              control: '',
              detalle: Api.getClasificador(
                `${Object.values(item)[2]}${Object.values(item)[3]}${Object.values(item)[4]
                }${Object.values(item)[5]}${Object.values(item)[6]
                  .toString()
                  .padStart(2, 0)}`,
              ).then((response) => {
                response.data.data.nombre
              })[0],
              ctgFuenteId: Object.values(item)[7],
              ctgFuenteEspecificaId: Object.values(item)[8],
              ctgOrganismoFinanciadorId: Object.values(item)[9],
              anioAnt: 0,
              alaFecha: Object.values(item)[13],
              presForm: Object.values(item)[12],
              variacion: 0,
              ingresos: 0,
              variacionResumen: 0,
            })
          })
          Api.postCargaMasiva(presIngrsoMasivo).then(() => {
            this.show({
              content: 'Datos agregados con exito',
              closable: true,
            });
            this.loadData();
          })
          .catch(this.handlerHttpError.bind(this));
        }

        reader.readAsBinaryString(this.file)
      }
      setTimeout(this.getListarIngresos, 1000)
      setTimeout(this.getTotales, 1000)
    },
    goToGasto() {
      router.push({ name: 'Formulacion Gasto' })
    },
    getTotales() {
      Api.getTotalIngresos(
        this.authInfo.currentFiscalYearId,
        this.authInfo.user.ayuntamiento.id,
      ).then((response) => {
        this.footerItem[1].label = this.formatPrice(response.data.data.anioAnt)
        this.footerItem[2].label = this.formatPrice(response.data.data.alaFecha)
        this.footerItem[3].label = this.formatPrice(response.data.data.presForm)
      })
    },

    cleanModalData() {
      this.postIngreso = {
        anioFiscalId: this.authInfo.user.ayuntamiento.id,
        ayuntamientoId: this.authInfo.currentFiscalYearId,
        ctgClasificadorId: null,
        instOtorga: '0000',
        ctaControl: '',
        detalle: '',
        anioAnt: 0,
        ctgFuenteId: '',
        ctgFuenteEspecificaId: '',
        ctgOrganismoFinanciadorId: '',
        alaFecha: 0,
        presForm: 0,
        variacion: 0,
        ingresos: 0,
        variacionResumen: 0,
      };
    },

    onCloseFormulacionDialog(data) {
      if (data) {
        return this.submitForm(data);
      }

      this.cleanModalData();
      this.showPartidaPresupuestodeIngresoDialog = false;
    },

    submitForm(inputData) {
      let accion = null;
      if (inputData.id) {
        accion = Api.editPresIngreso(inputData.id, inputData).then((response) => {
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          });
          this.loadData();
          this.cleanModalData();
          this.showPartidaPresupuestodeIngresoDialog = false;

          return response;
        });
      } else {
        accion = Api.postFormulacionIngreso(inputData)
          .then((response) => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            });
            
            this.loadData();
            setTimeout(() => this.cleanModalData(), 500);

            return response;
          });
      }
      accion.catch(this.handlerHttpError.bind(this));
    },

    editFormulacion(item) {
      this.showPartidaPresupuestodeIngresoDialog = true
      this.postIngreso = { ...item };
      this.postIngreso.ctaControl = item.control;
    },

    IngresoReport() {
      window
        .open(
          `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Ingresos_Formulacion&rs:Command=Render&CAPITULO_AYTO=${this.$ayuntamientoId}&ANO=2022`,
          '_blank',
        )
        .focus()
    },
    deleteItem(item) {
      this.$swal({
        title: 'Estás seguro que quieres eliminar este registro?',
        text: 'No podrás revertirlo',
        icon: 'Confirmación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          Api.deleteIngreso(item.id)
          .then(() => {
            this.show({
              content: 'Eliminado correctamente',
              closable: true,
            })
            
            this.loadData();
          })
          .catch(this.handlerHttpError.bind(this));
        }
      })
    },
    loadData(time = 500) {
      setTimeout(() => {
        Api.getAllFormulacionIngreso(this.authInfo.currentFiscalYearId, this.authInfo.user.ayuntamiento.id)
        .then((response) => {
          this.ingresos = response.data.data;
          return this.getTotales()
        });
      }, time);
    },
    handlerHttpError(error) {
      this.show({
        content: error.response.data,
        closable: true,
        color: 'danger',
        class: 'text-white',
      });
    },
    hasBugetOrExecution(item) {
      let sumUp = 0;

      for (let i = 1; i < 13; i++) {
        sumUp += item[`variacion${i.toString().padStart(2, '0')}`];
        sumUp += item[`ingreso${i.toString().padStart(2, '0')}`];
      }
      sumUp += item.variacion + item.ingreso;

      return sumUp > 0;
    },
    getInstitucionOtorgante() {
      Api.getListarInsOtorgante().then(({data: { data }}) => {
        this.institucionesOtorgante = data.map(elem => ({
            code: elem.code,
            label: elem.detail
          })
        );
      })
    },
  },
  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ['authInfo']),
    isFiscalYearApprovedOrClose() {
      return this.LoginInfo.isFiscalYearCloseOrApproved;
    },
    pageActions() {
      const actions = [
        {
          label: 'Imprimir',
          accionHandler: this.IngresoReport.bind(this),
          icon: 'cilPrint'
        },
        {
          label: 'Descargar',
          accionHandler: this.downloadFile.bind(this),
          icon: 'cilCloudDownload'
        }
      ];

      if (!this.isFiscalYearApprovedOrClose) {
        actions.push({
          label: 'Importar Ingresos',
          accionHandler: this.onFileChange.bind(this),
          type: 'upload'
        });
      }

      return actions;
    }
  },

  mounted() {
    this.loadData(0);
    this.getInstitucionOtorgante();
  },
}
</script>

