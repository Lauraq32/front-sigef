<template>
  <h3 class="text-center">Departamentos</h3>
  <hr />
  <div>
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            xlDemo = true
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
    :items="departamento"
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

    <template #programaDivision="{ item }">
      <td>
        {{ item.programaDivision.nombre }}
      </td>
    </template>

    <template #grupoN="{ item }">
      <td>
        {{ item.grupoNominaId.id }}
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
          @click="deleteItem(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Eliminar' }}
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
    size="lg"
    :visible="xlDemo"
    @close="
      () => {
        xlDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Clasificadores</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="3">
            <CFormLabel for="validationCustom04"
              >Nombre dpto. o nómina</CFormLabel
            >
            <CFormInput
              v-model="postDepartamento.nombre"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom02"> Código SASP</CFormLabel>
            <CFormInput id="validationCustom02" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Programa</CFormLabel>
            <CFormSelect
              v-model="postDepartamento.programaDivisionId"
              id="validationCustom05"
            >
              <option>Programa 1</option>
              <option>Programa 2</option>
              <option>Programa 3</option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="3">
            <CFormLabel for="validationCustom05">Grupo nomina</CFormLabel>
            <CFormInput id="validationCustom05" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05"> grupos de nóminas</CFormLabel>
            <CFormSelect
              v-model="postDepartamento.grupoNominaId"
              id="validationCustom05"
            >
              <option>Cuenta De Banco 1</option>
              <option>Cuenta De Banco 2</option>
              <option>Cuenta De Banco 3</option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Estructura prog.</CFormLabel>
            <CFormInput
              v-model="postDepartamento.estructur"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Clasificador</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">
              Clasificadores a utilizar:</CFormLabel
            >
            <CFormSelect id="validationCustom05">
              <option>211101 - Sueldos fijos</option>
              <option>211201 - Sueldos Personal contratado y/o Igualado</option>
              <option>211202 - Sueldos de personal nominal</option>
              <option>
                211204 - Sueldos al personal por servicios especiales
              </option>
              <option>211206 - Jornales</option>
              <option>241201 - Ayuda y donaciones a personas</option>
              <option>
                241202 - Ayudas y donac. ocas. a hogares y personas
              </option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <hr />
          <CCol :md="4">
            <CFormLabel for="validationCustom01">Clasif. de regalía</CFormLabel>
            <CFormInput id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom01">Fuente fin.</CFormLabel>
            <CFormInput id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom01">F/Especcif.</CFormLabel>
            <CFormInput id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom01">Org. Fin</CFormLabel>
            <CFormInput id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">
              Inactivo. (No salen en Rep. Alfabeticos, código, ni por forma de
              pago)</CFormLabel
            >
            <CFormSelect id="validationCustom05">
              <option>INACTIVO</option>
            </CFormSelect>
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
            <button
              v-on:click="submitForm"
              type="button"
              class="btn btn-primary"
            >
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { useRegistroStore } from '../store/Nomina/Departamento'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Api from '../services/NominaServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      programaDivision: [{}],
      empleado: [],
      grupoN: [{}],
      postDepartamento: {
        id: 0,
        programaDivisionId: 1,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        grupoNominaId: 1,
        nombre: null,
        saspI: 0,
        cuentaBancoId: 1,
        estructur: null,
        ctgClasificadorId: 111101,
        ctgOrganismoFinanciadorId: 111101,
        ctgClasificadorRegaliaId: 111101,
        ctgOrganismoFinanciadorRegaliaId: 102,
        fuenteEspecifica: null,
        fuenteRegalia: null,
        fuenteEspecificaRegalia: 9996,
        empleado: null,
      },

      validatedCustom01: null,
      xlDemo: false,
      columns: [
        { key: 'id', label: 'Código', _style: { width: '40%' } },
        {
          key: 'nombre',
          label: 'Departamento',
          _style: { width: '40%' },
        },
        {
          key: 'programaDivision',
          label: 'ProgramaDivision',
          _style: { width: '40%' },
        },
        {
          key: 'grupoNominaId',
          label: 'Grupo de nomina',
          _style: { width: '40%' },
        },
        {
          key: 'estructura',
          label: 'Estructura Prog.',
          _style: { width: '40%' },
        },
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        { key: '', label: 'Inactivo', _style: { width: '40%' } },
        { key: 'saspId', label: 'Cta. SASP', _style: { width: '40%' } },
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

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['departamento']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getDepartamentos', 'addDepartamento']),

    close() {
      this.lgDemo = false
    },

    submitForm() {
      if (this.id != null) {
        Api.putDepartamento(this.id, this.postDepartamento).then((response) => {
          console.log(response.data)
          this.lgDemo = false
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })
          setTimeout(this.getArea, 500)
          this.postDepartamento = {
            id: 0,
            programaDivisionId: 0,
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
            grupoNominaId: 0,
            nombre: null,
            saspI: 0,
            cuentaBancoId: 0,
            estructur: null,
            ctgClasificadorId: null,
            ctgOrganismoFinanciadorId: null,
            ctgClasificadorRegaliaId: null,
            ctgOrganismoFinanciadorRegaliaId: null,
            fuenteEspecifica: null,
            fuenteRegalia: null,
            fuenteEspecificaRegalia: null,
            variacion: 0,
          }
        })
        setTimeout(this.getDepartamentos, 500)
      } else {
        setTimeout(this.getDepartamentos, 500)
        this.addDepartamento(this.postDepartamento)
        //const form = event.currentTarget
        this.lgDemo = true
        setTimeout(this.getDepartamentos, 500)
        ;(this.postDepartamento = {
          id: 0,
          programaDivisionId: 0,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          grupoNominaId: 0,
          nombre: null,
          saspI: 0,
          cuentaBancoId: 0,
          estructur: null,
          ctgClasificadorId: null,
          ctgOrganismoFinanciadorId: null,
          ctgClasificadorRegaliaId: null,
          ctgOrganismoFinanciadorRegaliaId: null,
          fuenteEspecifica: null,
          fuenteRegalia: null,
          fuenteEspecificaRegalia: null,
          variacion: 0,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getDepartamentos, 500)
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
      // this.details.push(item._id)
      console.log(item)
      if (item.departamento !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.xlDemo = true
      console.log(item.id)
      Api.getDepartamentoById(item.id).then((response) => {
        this.postDepartamento = response.data.data
        console.log(response)
        this.id = item.id
        //this.postIngreso = response.data.data
      })
    },
  },
  mounted() {
    this.getDepartamentos()

    Api.getEmpleado().then((response) => {
      this.empleado = response.data.data
    })

    Api.getGrupoNomina().then((response) => {
      this.grupoN = response.data.data
    })

    Api.getProgramaDivision().then((response) => {
      this.programaDivision = response.data.data
    })
  },
}
</script>
