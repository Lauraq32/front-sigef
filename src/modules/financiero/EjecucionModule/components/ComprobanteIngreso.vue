<!-- <template>
  <h3 class="text-center">Comprobantes de ingresos</h3>
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
      <CModalTitle>Comprobantes de ingresos</CModalTitle>
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
            <CFormLabel for="validationCustom01">#Comp.</CFormLabel>
            <CFormInput id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom02">Fecha</CFormLabel>
            <CFormInput type="date" id="validationCustom02" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Etapa</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="validationCustom04">Contribuyente</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom04">Recibo</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <hr />
          <CCol :md="11">
            <CFormLabel for="validationCustom04">Detalle</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <hr />

          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Anunc. y Carteles</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Certific. vida y cost.</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Arrend. Terrenos</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Certific. animales</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Transferencia 60%</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Transferencia 40%</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <hr />
          <CCol :md="3">
            <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
            <CFormInput id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="8">
            <CFormLabel for="validationCustom02">Descripción</CFormLabel>
            <CFormInput id="validationCustom02" disabled />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Valor</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4" class="mt-5">
            <CButton
              style="font-weight: bold"
              color="outline-primary"
              @click="IngresoReport"
              >+Adicionar</CButton
            >
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
          :items="ComprobanteIngresos"
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
           Borre el index de aquí
          <template #show_details="{ item }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails1()"
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
      </CCardBody>
    </CModalBody>
  </CModal>
</template> -->

<template>
  <h3 class="text-center">Comprobante de Ingreso</h3>
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
    :items="RegistroIngresos"
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
      <td class="py-1">
        <CButton
          class="mt-1"
          color="danger"
          variant="outline"
          square
          size="sm"
          @click="deleteSec(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Eliminar' }}
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
      <CModalTitle>Comprobantes de ingresos</CModalTitle>
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
            <CFormLabel for="validationCustom01">#Comp.</CFormLabel>
            <CFormInput id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom02">Fecha</CFormLabel>
            <CFormInput type="date" id="validationCustom02" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Etapa</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="validationCustom04">Contribuyente</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom04">Recibo</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <hr />
          <CCol :md="11">
            <CFormLabel for="validationCustom04">Detalle</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <hr />

          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Anunc. y Carteles</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Certific. vida y cost.</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Arrend. Terrenos</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Certific. animales</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Transferencia 60%</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Transferencia 40%</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <hr />
          <CCol :md="3">
            <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
            <CFormInput id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="8">
            <CFormLabel for="validationCustom02">Descripción</CFormLabel>
            <CFormInput id="validationCustom02" disabled />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Valor</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4" class="mt-5">
            <CButton
              style="font-weight: bold"
              color="outline-primary"
              @click="IngresoReport"
              >+Adicionar</CButton
            >
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
          :items="ComprobanteIngresos"
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
          Borre el index de aquí
          <template #show_details="{ item }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails1()"
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
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/Ejecucion/registroIngreso'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
// import Api from '../services/NominaServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      // postSectores: {
      //   id: 0,
      //   nombre: null,
      //   ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
      //   ayuntamiento: {
      //     id: 0,
      //     secuencial: 0,
      //     codigo: null,
      //     descripcion: null,
      //   },
      // },

      columns: [
        {
          key: 'Clasificador',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        {
          key: 'Descripcion',
          label: 'Descripción',
          _style: { width: '40%' },
        },
        {
          key: 'Fuentes de financiamiento',
          label: 'Fuentes de financiamiento',
          _style: { width: '40%' },
        },
        {
          key: 'Fuente especifica',
          label: 'Fuente específica',
          _style: { width: '40%' },
        },
        {
          key: 'Organismo de financiamiento',
          label: 'Organismo de financiamiento',
          _style: { width: '40%' },
        },
        {
          key: 'Presupuesto formulado',
          label: 'Presupuesto formulado',
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

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['RegistroIngresos']),
  },

  methods: {
    ...mapActions(useRegistroStore, [
      'getRegistroIngreso',
      'addRegistroIngreso',
    ]),

    toggleDetails(item) {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      console.log(item)
      if (item.sectores !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      }
      // else {
      //   this.formuladoValue = false
      // }
      // this.edit = true
      // this.lgDemo = true
      // console.log(item.id)
      // Api.getSectorbyid(item.id).then((response) => {
      //   this.postSectores = response.data.data
      //   console.log(response)
      //   this.id = item.id
      //   //this.postIngreso = response.data.data
      // })
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

    submitForm() {
      // if (this.id) {
      //   Api.putSector(this.id, this.postSectores).then((response) => {
      //     console.log(response.data)
      //     this.lgDemo = false
      //     this.$swal({
      //       position: 'top-end',
      //       icon: 'success',
      //       title: response.data.message,
      //       showConfirmButton: false,
      //       timer: 1500,
      //     })
      //     this.getSectore()
      //     this.postSectores = {
      //       id: 0,
      //       nombre: null,
      //       variacion: 0,
      //       ayuntamientoId: 0,
      //       ayuntamiento: {
      //         id: 0,
      //         secuencial: 0,
      //         codigo: null,
      //         descripcion: null,
      //       },
      //     }
      //   })
      //   this.getSectore()
      // } else {
      //   this.addSectores(this.postSectores)
      //   //const form = event.currentTarget
      //   this.lgDemo = true
      //   this.getSectore()
      //   ;(this.postSectores = {
      //     id: 0,
      //     nombre: null,
      //     ayuntamientoId: 0,
      //     ayuntamiento: {
      //       id: 0,
      //       secuencial: 0,
      //       codigo: null,
      //       descripcion: null,
      //     },
      //   }),
      //     (this.validatedCustom01 = false)
      //   event.preventDefault()
      //   event.stopPropagation()
      //   this.getSectore()
      // }
    },

    // deleteSec(item) {
    //   Api.deleteSector(item.id)
    //     .then((response) => {
    //       this.$swal({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: response.data.message,
    //         showConfirmButton: false,
    //         timer: 1500,
    //       })
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       this.$swal({
    //         position: 'top-end',
    //         icon: 'error',
    //         title: error.message,
    //         showConfirmButton: false,
    //         timer: 1500,
    //       })
    //     })
    // },
  },

  mounted() {
    this.getRegistroIngreso()
  },
}
</script>

<!-- <script>
// import { useRegistroStore } from '../store/Ejecucion/ejecucionIngresos'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
// import { mapStores } from 'pinia'
// import { mapState } from 'pinia'
// import { mapActions } from 'pinia'
// import Api from '../services/NominaServices'
export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      validatedCustom01: null,
      lgDemo: false,
      columns: [
        {
          key: 'Clasificador',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        { key: 'Detalle', label: 'Detalle', _style: { width: '40%' } },
        {
          key: 'Desc. Resumida',
          label: 'Desc. Resumida',
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
      columns2: [
        {
          key: 'Clasificador',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        {
          key: 'Descripcion',
          label: 'Descripción',
          _style: { width: '40%' },
        },
        {
          key: 'Fuentes de financiamiento',
          label: 'Fuentes de financiamiento',
          _style: { width: '40%' },
        },
        {
          key: 'Fuente especifica',
          label: 'Fuente específica',
          _style: { width: '40%' },
        },
        {
          key: 'Organismo de financiamiento',
          label: 'Organismo de financiamiento',
          _style: { width: '40%' },
        },
        {
          key: 'Presupuesto formulado',
          label: 'Presupuesto formulado',
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
    }
  },
  methods: {
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
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
  // computed: {
  //   ...mapState('EjecucionModule', ['ComprobanteIngresos']),
  // },
  // mounted() {
  //   this.$store.dispatch('Formulacion/getProyectos')
  // },
}
</script> -->
