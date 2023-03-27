<template>
      
  <h3 class="text-center">ActivoFijo</h3>
  <hr />
  <div class="table-headers">
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

      <CButton
        color="info"
        class="m-1"
        @click="
          () => {
            lgDemo1 = true
          }
        "
        >Depreciacion</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    
    header
    :items="activo"
    :columns="columns"
    columnFilter
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
      <CModalTitle>ActivoFijos</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <div class="row mt-2">
            <div class="col-6">
              <CCol class="mt-2" :md="5">
                <CFormLabel for="validationCustom02">Fecha Compra</CFormLabel>
                <CFormInput
                  type="date"
                  v-model="postActivo.fechaCompra"
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol class="mt-2" :md="10">
                <CFormLabel for="validationCustom02">Descripcion</CFormLabel>
                <CFormInput
                  v-model="postActivo.descripcion"
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol class="mt-2" :md="10">
                <CFormLabel for="validationCustom02">Detalle</CFormLabel>
                <CFormInput
                  style="height: 120px"
                  v-model="postActivo.detalle"
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol class="mt-2" :md="7">
                <CFormLabel for="validationCustom02">Marca</CFormLabel>
                <CFormSelect
                  v-model="postActivo.marcaId"
                  id="validationCustom05"
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </CFormSelect>
              </CCol>
              <CCol class="mt-2" :md="10">
                <CFormLabel for="validationCustom02">Modelo</CFormLabel>
                <CFormSelect
                  v-model="postActivo.modeloId"
                  id="validationCustom05"
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </CFormSelect>
              </CCol>

              <CCol class="mt-2" :md="10">
                <CFormLabel for="validationCustom02">Serie</CFormLabel>
                <CFormInput
                  v-model="postActivo.serie"
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol class="mt-2" :md="10">
                <CFormLabel for="validationCustom05">Suplidor</CFormLabel>
                <CFormSelect
                  v-model="postActivo.suplidor"
                  id="validationCustom05"
                >
                  <option>S</option>
                  <option>N</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <div class="row mt-2">
                <div class="col-5 mt-2">
                  <CCol :md="11">
                    <CFormLabel for="validationCustom05">Factura</CFormLabel>
                    <CFormInput
                      v-model="postActivo.factura"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
                <div class="col-7"></div>
              </div>
            </div>
            <div class="col-6 mt-2">
              <CCol :md="11">
                <CFormLabel for="validationCustom02">Area Ubicacion</CFormLabel>
                <CFormSelect
                  v-model="postActivo.areaId"
                  id="validationCustom05"
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <CCol class="mt-2" :md="11">
                <CFormLabel for="validationCustom02">Categoria</CFormLabel>
                <CFormSelect
                  v-model="postActivo.categoriaId"
                  id="validationCustom05"
                >
                  <option>Activo</option>
                  <option>Inactivo</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>

              <div class="row mt-2">
                <div class="col-6">
                  <CCol :md="10">
                    <CFormLabel for="validationCustom02">Vida util</CFormLabel>
                    <CFormInput
                      v-model="postActivo.vidaUtil"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
                <div class="col-6">
                  <CCol :md="10">
                    <CFormLabel for="validationCustom02"
                      >% Deprec. Anual</CFormLabel
                    >
                    <CFormInput
                      v-model="postActivo.depreciacionAcumuladaAnual"
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
              <div class="row mt-2">
                <div class="col-6">
                  <CCol :md="10">
                    <CFormLabel for="validationCustom02"
                      >Inicio Depreciaion</CFormLabel
                    >
                    <CFormInput
                      type="date"
                      v-model="postActivo.fechaInicioDepreciacion"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
                <div class="col-6">
                  <CCol :md="10">
                    <CFormLabel for="validationCustom02"
                      >Fecha Vencimiento</CFormLabel
                    >
                    <CFormInput
                      type="date"
                      v-model="postActivo.fechaVencimiento"
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

              <div class="row mt-2">
                <div class="col-6">
                  <CCol :md="10">
                    <CFormLabel for="validationCustom02"
                      >Costo Adquisicion</CFormLabel
                    >
                    <CFormInput
                      v-model="postActivo.costoAdquisicion"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
                <div class="col-6">
                  <CCol :md="10">
                    <CFormLabel for="validationCustom02"
                      >Valor en Libro</CFormLabel
                    >
                    <CFormInput
                      v-model="postActivo.valorEnLibro"
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
              <div class="row mt-2">
                <div class="col-6">
                  <CCol :md="10">
                    <CFormLabel for="validationCustom02"
                      >Deprec. Año</CFormLabel
                    >
                    <CFormInput
                      v-model="postActivo.depreciacionAcumuladaAnual"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
                <div class="col-6">
                  <CCol :md="10">
                    <CFormLabel for="validationCustom02"
                      >Deprec. Acum</CFormLabel
                    >
                    <CFormInput
                      v-model="postActivo.depreciacionAcumulada"
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
              <div class="form-check mt-3">
                <label class="form-check-label" for="flexCheckDefault">
                  Lleva mantenimiento?
                </label>
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="postActivo.llevaMantenimiento"
                  id="flexCheckDefault"
                />
              </div>
              <CCol mt-4 :md="6">
                <CFormLabel for="validationCustom02"
                  >Tipo de Mantenimiento</CFormLabel
                >
                <CFormInput
                  v-model="postActivo.tipoMantenimiento"
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <div class="row mt-4">
                <div class="col-6">
                  <CCol :md="10">
                    <CFormLabel for="validationCustom02"
                      >Fecha Mantenimiento</CFormLabel
                    >
                    <CFormInput
                      type="date"
                      v-model="postActivo.fechaInicioMantenimiento"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
                <div class="col-6">
                  <CCol :md="10">
                    <CFormLabel for="validationCustom02"
                      >Fecha Proximo Mantenimiento</CFormLabel
                    >
                    <CFormInput
                      type="date"
                      v-model="postActivo.fechaProximoMantenimiento"
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
            <button class="btn btn-info btn-block mt-1" v-on:click="submitForm">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>

  <CModal
    size="lg"
    :visible="lgDemo1"
    @close="
      () => {
        lgDemo1 = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Depreciacion</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="4">
            <CFormLabel for="validationCustom02">Fecha</CFormLabel>
            <CFormInput id="validationCustom02" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              v-on:click="close"
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="submitForm">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/ActivoFijo/activo'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
 
import { useToastStore } from '@/store/toast'
import Api from '../services/ActivoFijoServices'

export default {
  components: {
    CSmartTable,
    CModal,
      
  },

  data: () => {
    return {
      postDespreciacion: {
        ayuntamientoId: parseInt(JSON.parse(localStorage.getItem('usuario',)).user.ayuntamiento.id),
        fecha: null,
      },

      postActivo: {
        id: 0,
        ayuntamientoId: parseInt(JSON.parse(localStorage.getItem('usuario',)).user.ayuntamiento.id),
        codigo: null,
        descripcion: null,
        detalle: null,
        porcientoDepreciacionAnual: 0,
        vidaUtil: 0,
        montoMensual: 0,
        areaId: 1,
        categoriaId: 1,
        depreciacionAcumuladaAnual: 0,
        suplidor: null,
        factura: 0,
        fechaCompra: new Date(Date.now()),
        fechaInicioDepreciacion: new Date(Date.now()),
        fechaVencimiento: new Date(Date.now()),
        marcaId: 1,
        modeloId: 1,
        serie: null,
        costoAdquisicion: 0,
        depreciacionAcumulada: 0,
        valorEnLibro: 0,
        estatus: true,
        fechaVerificacion: new Date(Date.now()),
        llevaMantenimiento: 'S',
        tipoMantenimiento: 'S',
        fechaInicioMantenimiento: new Date(Date.now()),
        fechaProximoMantenimiento: new Date(Date.now()),
      },
      columns: [
        { key: 'id', label: 'Código', _style: { width: '40%' } },
        { key: 'descripcion', label: 'Descripcion', _style: { width: '40%' } },
        { key: 'detalle', label: 'Detalle', _style: { width: '40%' } },
        {
          key: 'marcaId',
          label: 'Marca',
          _style: { width: '40%' },
        },
        {
          key: 'fechaCompra',
          label: 'F.Adquisicion',
          _style: { width: '40%' },
        },
        {
          key: 'costoAdquisicion',
          label: 'Costo de Adquisicion',
          _style: { width: '40%' },
        },
        {
          key: 'valorEnLibro',
          label: 'Valor En Libro',
          _style: { width: '40%' },
        },
        {
          key: 'areaId',
          label: 'Area Ubicacion',
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

      validatedCustom01: null,
      lgDemo: false,
      lgDemo1: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['activo']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getActivo', 'addActivo']),
    ...mapActions(useToastStore, ['show']),

    toggleDetails(item) {
      if (item.activo !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true

      Api.getActivoByID(item.id).then((response) => {
        this.postActivo = response.data.data

        this.id = item.id
      })
    },

    toggleDetails1() {
      this.lgDemo1 = true
    },

    close() {
      this.lgDemo = false
      this.lgDemo1 = false
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

    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },

    submitForm1() {
      Api.postDepreciacion()
    },

    submitForm() {
      if (this.id) {
        Api.putActivo(this.id, this.postActivo).then((response) => {
          this.lgDemo = false
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
          setTimeout(this.getActivo, 500)
          this.postActivo = {
            id: 0,
            ayuntamientoId: parseInt(JSON.parse(localStorage.getItem('usuario',)).user.ayuntamiento.id),
            codigo: null,
            descripcion: null,
            detalle: null,
            porcientoDepreciacionAnual: 0,
            vidaUtil: 0,
            montoMensual: 0,
            depreciacionAcumuladaAnual: 0,
            suplidor: null,
            factura: 0,
            fechaCompra: new Date(Date.now()),
            fechaInicioDepreciacion: new Date(Date.now()),
            fechaVencimiento: new Date(Date.now()),
            serie: null,
            costoAdquisicion: 0,
            depreciacionAcumulada: 0,
            valorEnLibro: 0,
            estatus: true,
            fechaVerificacion: new Date(Date.now()),
            llevaMantenimiento: null,
            tipoMantenimiento: null,
            fechaInicioMantenimiento: new Date(Date.now()),
            fechaProximoMantenimiento: new Date(Date.now()),
            variacion: 0,
          }
        })
        setTimeout(this.getActivo, 500)
      } else {
        Api.postActivo(this.postActivo)
          .then((response) => {
                 this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          })
           .catch((error) => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })

        this.lgDemo = true
        setTimeout(this.getActivo, 500)
        ;(this.postActivo = {
          id: 0,
          ayuntamientoId: parseInt(JSON.parse(localStorage.getItem('usuario',)).user.ayuntamiento.id),
          codigo: null,
          descripcion: null,
          detalle: null,
          porcientoDepreciacionAnual: 0,
          vidaUtil: 0,
          montoMensual: 0,
          depreciacionAcumuladaAnual: 0,
          suplidor: null,
          factura: 0,
          fechaCompra: new Date(Date.now()),
          fechaInicioDepreciacion: new Date(Date.now()),
          fechaVencimiento: new Date(Date.now()),
          serie: null,
          costoAdquisicion: 0,
          depreciacionAcumulada: 0,
          valorEnLibro: 0,
          estatus: true,
          fechaVerificacion: new Date(Date.now()),
          llevaMantenimiento: null,
          tipoMantenimiento: null,
          fechaInicioMantenimiento: new Date(Date.now()),
          fechaProximoMantenimiento: new Date(Date.now()),
          variacion: 0,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getActivo, 500)
      }
    },
  },

  mounted() {
    this.getActivo()
    Api.getDepreciacion()
  },
}
</script>

<!-- <template>
  <h3 class="text-center">Fuentes Financiamiento</h3>
  <hr />
  <div>
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport"
        >Imprimir</CButton
      >
    </div>
  </div>
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
    :items="{}"
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
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'

export default {
  components: {
    CSmartTable,
  },
  data: () => {
    return {
      columns: [
        { key: 'id', label: 'ID', _style: { width: '40%' } },
        { key: 'codigo', label: 'Código', _style: { width: '40%' } },
        {
          key: 'fuente',
          label: 'Fuente',
          filter: false,
          sorter: false,
          _style: { width: '20%' },
        },
        { key: 'fondo', label: 'Fondo', _style: { width: '20%' } },
        { key: 'origen', label: 'Origne', _style: { width: '20%' } },
        {
          key: 'denominacion',
          label: 'Denominación',
          _style: { width: '40%' },
        },
        { key: 'grupo', label: 'Grupo', _style: { width: '40%' } },
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
    }
  },
  methods: {
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
    IngresoReport() {
      window
        .open(
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fReporte_FP%2fRep_Fuente_Especifica&rs:Command=Render`,
          '_blank',
        )
        .focus()
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
    this.$store.dispatch('Formulacion/getListarFuentesFinanciamiento')
  },
}
</script> -->
