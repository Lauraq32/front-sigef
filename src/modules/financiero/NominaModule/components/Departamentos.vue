<template>
  <h3 class="text-center">Departamentos</h3>
  <hr />
  <div>
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
          <!-- <div class="row"> -->
          <!-- <div class="row">
              <div class="col-6">
                <CCol :md="6">
                  <CFormLabel for="validationCustom02">Codigo</CFormLabel>
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
              <div class="col-4" style="position: relative; left: -38px">
                <CCol :md="5">
                  <CFormLabel for="validationCustom02"
                    >Id_Ayuntamiento</CFormLabel
                  >
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                  />

                  <CFormFeedback valid> Exito! </CFormFeedback>
                  <CFormFeedback invalid>
                    Favor agregar el campo
                  </CFormFeedback>
                </CCol>
              </div>
            </div>
          </div> -->

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
                  v-model="postDepartamento.nombre"
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
                  v-model="postDepartamento.programaDivisionId"
                  id="validationCustom05"
                >
                  <option>Programa 1</option>
                  <option>Programa 2</option>
                  <option>Programa 3</option>
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
                  v-model="postDepartamento.grupoNominaId"
                  id="validationCustom05"
                >
                  <option>Cuenta De Banco 1</option>
                  <option>Cuenta De Banco 2</option>
                  <option>Cuenta De Banco 3</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-6">
              <CFormLabel for="validationCustom01">Cuenta de banco</CFormLabel>
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

    focusInput() {
      console.log('kaka')
      this.$refs.name.focus()
    },

    unaVez() {
      // if (!this.runOnce) {
      this.focusInput()
      // this.runOnce = true
      // }
    },

    openModal() {
      this.xlDemo = true
      setTimeout(this.unaVez, 200)
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
