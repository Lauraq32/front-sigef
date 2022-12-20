<template>
  <h3 class="text-center">Tipo de retenciones</h3>
  <hr />
  <div>
    <div class="d-inline p-2">
      <CButton color="info" @click="
        () => {
          lgDemo = true
        }
      ">Agregar</CButton>
    </div>
  </div>
  <hr />
  <CSmartTable clickableRows :tableProps="{
    striped: false,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" footer header :items="TipoRetenciones" :columns="columns" columnFilter
    tableFilter cleaner itemsPerPageSelect :itemsPerPage="5" columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }" pagination>
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails(item, index)">
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
  <CModal size="md" :visible="lgDemo" @close="
    () => {
      lgDemo = false
    }
  ">
    <CModalHeader>
      <CModalTitle>Tipo de retenciones</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01"
          @submit="handleSubmitCustom01">
          <CCol :md="12">
            <CFormLabel for="validationCustom02">Beneficiario</CFormLabel>
            <CFormSelect v-model="postTipoRetenciones.beneficiarioId" id="validationCustom02">
              <option v-for="benef in this.beneficiario" :key="benef.id" :value="benef.id">
                {{ benef.nombre }}
              </option>

            </CFormSelect>
            <CFormFeedback invalid>
              Favor agregar el campo
            </CFormFeedback>
          </CCol>
          <div class="row">
            <CCol :md="6">
              <CFormLabel for="validationCustom03">Tipo retención</CFormLabel>
              <CFormSelect v-model="postTipoRetenciones.tipo" id="validationCustom03">
                <option>PROCESO</option>
                <option>INFORMATIVO</option>
              </CFormSelect>
              <CFormFeedback invalid>
                Favor agregar el campo
              </CFormFeedback>
            </CCol>
            <CCol :md="6">
              <CFormLabel for="validationCustom04">Operación</CFormLabel>
              <CFormSelect v-model="postTipoRetenciones.operacion" id="validationCustom04">
                <option>MULTIPLICAR</option>
                <option>DIVIDIR</option>
                <option>N/A</option>
              </CFormSelect>
              <CFormFeedback invalid>
                Favor agregar el campo
              </CFormFeedback>
            </CCol>


          </div>
          <div class="row">
            <CCol :md="5">
              <CFormLabel for="validationCustom06">Valor o % de retención:</CFormLabel>
              <CFormInput v-model="postTipoRetenciones.porciento" id="validationCustom06" />

              <CFormFeedback valid> Exito! </CFormFeedback>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CCol>


            <!-- <CCol :md="6" style="margin-top: 37px;">
              <CFormCheck v-model="postTipoRetenciones.calculada" id="flexCheckDefault"  label="Valor calculado" />
            </CCol> -->
            <div style="margin-top: 37px;" class="form-check">
            <label class="form-check-label" for="flexCheckDefault">
              Valor calculado
            </label>
            <input
              class="form-check-input"
              type="checkbox"
              v-model="postTipoRetenciones.calculada"
              id="flexCheckDefault"
            />
          </div>
          </div>
          <CCol :md="12">
            <CFormLabel for="validationCustom05">Afecta el 815:</CFormLabel>
            <CFormCheck v-model="postTipoRetenciones.mAfecta" inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1"
              label="Restando" />
            <CFormCheck v-model="postTipoRetenciones.mAfecta" inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2" 
              label="Sumando" />

            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
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
import { useRegistroStore } from '../store/Ejecucion/TipoRetencion'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Api from '../services/EjecucionServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      beneficiario: [{}],
      postTipoRetenciones: {
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        id: 0,
        detalle: "asdsad",
        calculada: true,
        porciento: 2,
        tipo: null,
        beneficiarioId: 1,
        operacion: "sdasdnull",
        mAfecta: "sdasddas"
      },

      columns: [
        { key: 'Año Fiscal', label: 'Código', _style: { width: '40%' } },
        { key: 'Desde', label: 'Detalle', _style: { width: '40%' } },
        { key: 'Hasta', label: 'Tipo retención', _style: { width: '40%' } },
        { key: 'Estatus', label: 'Operación', _style: { width: '40%' } },
        { key: 'Año Fiscal', label: 'Valor o % a retener', _style: { width: '40%' } },
        { key: 'Desde', label: 'Calculada', _style: { width: '40%' } },
        { key: 'Hasta', label: 'Modo afecta', _style: { width: '40%' } },
        { key: 'Estatus', label: 'Beneficiario', _style: { width: '40%' } },
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
    ...mapState(useRegistroStore, ['TipoRetenciones', 'beneficiarios']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getTipoRetenciones', 'addTipoRetencion', 'getBeneficiarios']),

    toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
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
      if (this.id) {
        Api.putTipoRetenciones(this.id, this.postTipoRetenciones).then((response) => {
          console.log(response.data)
          this.lgDemo = false
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          this.getTipoRetenciones()
          this.postTipoRetenciones = {
            id: 0,
            nombre: null,
            variacion: 0,
            ayuntamientoId: 0,
            ayuntamiento: {
              id: 0,
              secuencial: 0,
              codigo: null,
              descripcion: null,
            },
          }
        })
        this.getAnioFiscal()
      } else {
        this.addTipoRetencion(this.postTipoRetenciones)
        //const form = event.currentTarget
        this.lgDemo = true
        this.getTipoRetenciones()
          ; (this.postTipoRetenciones = {
            postTipoRetenciones: {
              ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
              id: 0,
              detalle: null,
              calculada: true,
              porciento: 2,
              tipo: null,
              beneficiarioId: 1,
              operacion: null,
              mAfecta: null
            },
          }),
            (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        this.getTipoRetenciones()
      }
    },
  },

  mounted() {
    this.getTipoRetenciones()
    Api.getBeneficiarios().then((response) => {
     
      this.beneficiario = response.data.data
    })

  },
}
</script>

<!-- <script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
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
        { key: 'Año Fiscal', label: 'Año Fiscal', _style: { width: '40%' } },
        { key: 'Desde', label: 'Desde', _style: { width: '40%' } },
        { key: 'Hasta', label: 'Hasta', _style: { width: '40%' } },
        { key: 'Estatus', label: 'Estatus', _style: { width: '40%' } },
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
  mounted() {
    this.$store.dispatch('Formulacion/getProyectos')
  },
}
</script> -->
