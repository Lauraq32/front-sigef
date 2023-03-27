<template>
      
  <h3 class="text-center">Departamentos</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            openModal()
          }
        "
        >Agregar</CButton
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
    :items="departamento"
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
    size="md"
    :visible="xlDemo"
    @close="
      () => {
        xlDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Departamento</CModalTitle>

      <div class="col-4">
        <CCol :md="5">
          <CFormLabel
            style="position: relative; top: 26px; left: 171px"
            for="validationCustom02"
            >Id_Ayun</CFormLabel
          >
          <input
            style="position: relative; left: 242px; top: -13px; width: 41px"
            disabled
            type="text"
            class="form-control"
            id="exampleInputEmail1"
          />

          <CFormFeedback valid> Exito! </CFormFeedback>
          <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
        </CCol>
      </div>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom02"> Código</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="7">
                <CFormInput
                  disabled
                  style="position: relative; left: -39px"
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom02"> Código SASP</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="7">
                <CFormInput
                  style="position: relative; left: -39px"
                  id="validationCustom02"
                  required
                />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom02"> Nombre</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="4">
                <input
                  ref="name"
                  style="position: relative; left: -39px; width: 268px"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom05">Programa</CFormLabel>
            </div>
            <div class="col-6">
              <CCol>
                <CFormSelect
                  style="position: relative; left: -39px; width: 268px"
                  id="validationCustom05"
                  v-on:change="changeDepartamento($event)"
                >
                  <option
                    v-for="programa in this.programaDivision"
                    :key="programa.id"
                    :value="programa.id"
                  >
                    {{ programa.nombre }}
                  </option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom05">Grupo nomina</CFormLabel>
            </div>
            <div class="col-6">
              <CCol>
                <CFormSelect
                  style="position: relative; left: -39px; width: 268px"
                  id="validationCustom05"
                >
                  <option
                    v-for="grupo in this.grupoN"
                    :key="grupo.id"
                    :value="grupo.id"
                  >
                    {{ grupo.nombre }}
                  </option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom05">Cuenta de banco</CFormLabel>
            </div>
            <div class="col-6">
              <CCol>
                <CFormSelect
                  style="position: relative; left: -39px; width: 268px"
                  id="validationCustom05"
                >
                  <option
                    v-for="cuenta in this.CuentaB"
                    :key="cuenta.id"
                    :value="cuenta.id"
                  >
                    {{ cuenta.nombreCuenta }}
                  </option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom01"
                >Estructura Programatica</CFormLabel
              >
            </div>
            <div class="col-6">
              <CCol :md="9">
                <input
                  style="position: relative; left: -39px"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                />
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="9">
                <input
                  style="position: relative; left: -39px"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                />
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom01">Fuente</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="9">
                <input
                  style="position: relative; left: -39px"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                />
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom01">Fte. Especifica</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="9">
                <input
                  style="position: relative; left: -39px"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                />
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom01">Org. Financiador</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="9">
                <input
                  style="position: relative; left: -39px"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                />
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom01">Clasif. Regalia</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="9">
                <input
                  style="position: relative; left: -39px"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                />
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom01">Fuente</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="9">
                <input
                  style="position: relative; left: -39px"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                />
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom01">Fte. Especifica</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="9">
                <input
                  style="position: relative; left: -39px"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                />
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom01">Org. Financiador</CFormLabel>
            </div>
            <div class="col-6">
              <CCol :md="9">
                <input
                  style="position: relative; left: -39px"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                />
              </CCol>
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
 
import { useToastStore } from '@/store/toast'
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
      CuentaB: [{}],
      postDepartamento: {
        programaDivisionId: 1,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        grupoNominaId: 4,
        nombre: null,
        saspId: 0,
        cuentaBancoId: 1,
        estructura: '1',
        ctgClasificadorId: '111101',
        ctgOrganismoFinanciadorId: '1',
        ctgClasificadorRegaliaId: '1',
        ctgOrganismoFinanciadorRegaliaId: '1',
        ctgFuenteId: '70',
        ctgFuenteEspecificaId: '0332',
        ctgFuenteRegaliaId: '70',
        ctgFuenteEspecificaRegaliaId: '0352',
      },

      estructuras: null,

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
      details: [],
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['departamento']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getDepartamentos', 'addDepartamento']),
    ...mapActions(useToastStore, ['show']),

    close() {
      this.lgDemo = false
    },

    focusInput() {
      this.$refs.name.focus()
    },

    unaVez() {
      this.focusInput()
    },

    openModal() {
      this.xlDemo = true
      setTimeout(this.unaVez, 200)
    },

    submitForm() {
      if (this.id != null) {
        Api.putDepartamento(this.id, this.postDepartamento).then((response) => {
          this.lgDemo = false
          this.show({
            content: response.data.message,
            closable: true,
            color: 'success',
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
            estructura: null,
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
        Api.postDepartamento(this.postDepartamento)
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
        setTimeout(this.getDepartamentos, 500)
        ;(this.postDepartamento = {
          id: 0,
          programaDivisionId: 0,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          grupoNominaId: 0,
          nombre: null,
          saspI: 0,
          cuentaBancoId: 0,
          estructura: null,
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

    changeDepartamento(e) {
      this.departamentosId = e.target.value
      //this.postGenerarNomina.DepartamentoId =
      Api.getProgramaDivisionbyid(e.target.value).then((response) => {
        this.clasificador = response.data.data.ctgClasificadorId
        this.programid1 = response.data.data.programaDivisionId
        this.postDepartamento.estructura = response.data.data.estructura
      })
    },

    klk() {
      Api.getProgramaDivisionbyid(this.programaDivision[0].id).then(
        (response) => {
          this.clasificador = response.data.data.ctgClasificadorId
          this.programid1 = response.data.data.programaDivisionId
          this.estructuras = response.data.data.estructura
        },
      )
    },
    toggleDetails(item) {
      if (item.departamento !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.xlDemo = true

      Api.getDepartamentoById(item.id).then((response) => {
        this.postDepartamento = response.data.data

        this.id = item.id
      })
    },
  },
  mounted() {
    this.getDepartamentos()

    Api.getEmpleado().then((response) => {
      this.empleado = response.data.data
    })

    Api.getProgramaDivision().then((response) => {
      this.programaDivision = response.data.data
    })

    Api.getProgramaDivision().then((response) => {
      this.programaDivision = response.data.data
      this.postDepartamento.programaDivisionId = this.programaDivision[0].id

      Api.getProgramaDivisionbyid(this.programaDivision[0].id).then(
        (response) => {
          this.clasificador = response.data.data.ctgClasificadorId
          this.programid1 = response.data.data.programaDivisionId
          this.postDepartamento.estructura = response.data.data.estructura
        },
      )
    })

    Api.getGrupoNomina().then((response) => {
      this.grupoN = response.data.data
      this.postDepartamento.grupoNominaId = this.grupoN[0].id
    })

    Api.getAllCuentaBanco().then((response) => {
      this.CuentaB = response.data.data
      this.postDepartamento.cuentaBancoId = this.CuentaB[0].id
    })

    Api.getProgramaDivision().then((response) => {
      this.programaDivision = response.data.data
      this.postEmpleado.programaDivisionId = this.programaDivision[0].id

      Api.getDepartamentoByProgramaId(this.programaDivision[0].id).then(
        (response) => {
          this.departamentos = response.data.data
          this.postEmpleado.departamentoId = this.departamentos[0].id
        },
      )
    })
  },
}
</script>
