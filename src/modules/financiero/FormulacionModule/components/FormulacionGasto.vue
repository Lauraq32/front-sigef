<template>
  <h3 class="text-center">Formulación Gastos</h3>
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
        >Ir a Formulaci&oacute;n Ingreso</CButton
      >
    </div>
    <div class="p-2">
      <label class="file-select btn" role="button">
        <CIcon :icon="cilCloudUpload" size="sm" />
        <input type="file" id="formFile" @change="onFileChangeProyectos" />
        <span class="label">Importar Proyectos</span>
      </label>
    </div>
    <div class="p-2">
      <label class="file-select btn" role="button">
        <CIcon :icon="cilCloudUpload" size="sm" />
        <input type="file" id="formFile" @change="onFileChange" />
        <span class="label">Importar Formulaci&oacute;n</span>
      </label>
    </div>
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
import { CSmartTable, CCol } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/FormulacionServices'
import axios from 'axios'
import { mapActions, mapState } from 'pinia'
import { usePrepGastoStore } from '../store/Formulacion/prepGasto'
import { mapStores } from 'pinia'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import XLSX from 'xlsx/xlsx.mjs'
import router from '@/router'
import { formatPrice } from '../../../../utils/format'
import { cilCloudUpload, cisSearch } from '@coreui/icons-pro'
import { useToastStore } from '@/store/toast'
import FormulacionGastoDialog from "../gasto/FormulacionGastoDialog";
export default {
  components: {
    CSmartTable,
    CModal,
    FormulacionGastoDialog
  },
  data: function () {
    return {
      formulacionGasto: {},
      showFormulacionDialog: false,
      cilCloudUpload,
      findClasificadorModal: false,
      clasificadorItems: [],
      cisSearch,
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
      openField: true,
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
      clasificadorColumns: [
        { key: 'clasifica', label: 'Clasificador' },
        { key: 'cControl', label: 'Control' },
        { key: 'nombre', label: 'Detalle', _style: { width: '25%' } },
        {
          key: 'tipo',
          label: 'Tipo',
          filter: false,
          sorter: false,
          _style: { width: '5%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        },
      ],
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
        // sumTotalPresupuesto: 0,
        // sumCostObra: 0,
        detallePost: [],
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
        // {
        //   key: 'denominacion',
        //   label: 'Denominacion',
        //   _style: { width: '40%' },
        // },
        { key: 'tipo', label: 'Tipo', _style: { width: '20%' } },
        {
          key: 'unidadResp',
          label: 'Unidad responsable',
          _style: { width: '40%' },
        },
        {
          key: 'totalPresupuesto',
          label: 'Presupuesto',
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
    close() {
      if (this.lgDemo) {
        return (this.lgDemo = false)
      } else if (this.lgDemo1) {
        return (this.lgDemo1 = false)
      }
    },
    ...mapActions(useToastStore, ['show']),
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
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
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
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          })
          setTimeout(this.getListarGastos, 500)
        }

        reader.readAsBinaryString(this.file)
      }
    },
    openFields() {
      this.openField = !this.openField
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
        // Api.updateFormulacionDetalle(this.idDetalle, this.detallePost)
        //   .then((response) => {
        //     Swal.fire({
        //       position: 'top-end',
        //       icon: 'success',
        //       text: 'Datos Actualizado con exito',
        //       title: 'Actualizado',
        //       showConfirmButton: false,
        //       timer: 1500,
        //     })
        //   })
        //   .catch((error) => {
        //     Swal.fire({
        //       position: 'top-end',
        //       icon: 'success',
        //       text: `${error.data.message}`,
        //       title: 'Actualizado',
        //       showConfirmButton: false,
        //       timer: 1500,
        //     })
        //   })
        this.clearForm()
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
        // this.addDetalleGasto(this.detallePost)
        console.log(this.detallePost, this.post.detallePresGastos)
        this.post.detallePresGastos = [{...this.detallePost}, ...this.post.detallePresGastos];
        console.log(this.post.detallePresGastos)
      }
      event.preventDefault()
      event.stopPropagation()
      // Api.getListarGastosById(this.detallePost.presGastoId).then((response) => {
      //   this.detallePresGastos = response.data.data.detallePresGastos
      // })
      event.preventDefault()
      event.stopPropagation()
      setTimeout(this.getDetalleGasto, 500)
    },

    getClasificador() {
      this.findClasificadorModal = true
      Api.getListarClasificadores().then((response) => {
        this.clasificadorItems = response.data.data
      })
    },
    SelectClasificador(clasificador) {
      Api.getClasificador(clasificador.clasifica).then((response) => {
        if (response.data.data.origen == 'GASTO') {
          this.detallePost.ctgClasificadorId = clasificador.clasifica
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
      })
      this.findClasificadorModal = false
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
        fechaIniciada: new Date(Date.now()),
        detallePresGastos: []
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
      Api.getTotalIngresos(
        this.$ayuntamientoId,
        this.$fiscalYearId,
      ).then((response) => {
        this.formulado.alafecha = response.data.alafecha
        this.formulado.anO_ANT = response.data.anO_ANT
        this.formulado.preS_FORM = response.data.preS_FORM
      })
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
      this.id = item.id;
      console.log(item, 'toggleDetails');
      this.formulacionGasto = {...item};
      this.showFormulacionDialog = true;
      // Api.getListarGastosById(item.id).then((response) => {
      //   console.log(response);
      //   this.post = response.data.data
      //   this.detallePost.presGastoId = item.id
      //   this.detallePost.mestProgId = item.mestProgId

      //   this.post.mestprogId = `${this.post.pnap}${this.post.programa}${this.post.proyecto}${this.post.actObra}`
      //   this.detallePresGastos = response.data.data.detallePresGastos
      //   this.sumaPresupuesto = 0
      //   this.sumaGPersonal = 0
      //   this.sumaServicio = 0
      //   this.sumaInversion = 0
      //   this.sumaEdiGenero = 0

      //   this.detallePresGastos.map((detalle) => {
      //     this.sumaPresupuesto += parseInt(detalle.totalOriginal)
      //     this.sumaGPersonal += parseInt(detalle.oriBco1)
      //     this.sumaServicio += parseInt(detalle.oriBco2)
      //     this.sumaInversion += parseInt(detalle.oriBco3)
      //     this.sumaEdiGenero += parseInt(detalle.oriBco4)
      //     this.footerItems[1].label = this.formatPrice(this.sumaPresupuesto)
      //     this.footerItems[2].label = this.formatPrice(this.sumaGPersonal)
      //     this.footerItems[3].label = this.formatPrice(this.sumaServicio)
      //     this.footerItems[4].label = this.formatPrice(this.sumaInversion)
      //     this.footerItems[5].label = this.formatPrice(this.sumaEdiGenero)
      //     this.numeroFormateado = this.formatPrice(this.numero)
      //   })
      //   this.totalItems = this.detallePresGastos.length
      //   this.footerItems[0].label = `Total Items ${this.totalItems}`
      // })

      // this.lgDemo = true
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
    onFormulacionGastoDialogClose(data) {
      if (data) {
        console.log(data);
      }

      this.formulacionGasto = {};
      this.showFormulacionDialog = false;
      console.log(data, 'onFormulacionGastoDialogClose');
    }
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
    sumOfBalance() {
      return (
        Number(this.detallePost.oriBco1 || 0) +
        Number(this.detallePost.oriBco2 || 0) +
        Number(this.detallePost.oriBco3 || 0) +
        Number(this.detallePost.oriBco4 || 0)
      )
    },
  },

  mounted() {
    this.getListarGastos()
    this.footerItem[0].label = `Total items: ${this.gastoListCount}` 
  },
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
.footerStyle {
  text-align: center;
}
</style>
