<template>
  <h3 class="text-center">Registro Personal</h3>
  zxb <noframes></noframes>
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
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport"
        >Imprimir</CButton
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
    :items="registroPersonal"
    :columns="columns"
    cleaner
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    pagination
  >
    <template #status="{}">
      <td>{item.Nombre}</td>
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
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Formulación gasto</CModalTitle>
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
            <CFormLabel for="validationCustom01">Apellido</CFormLabel>
            <CFormInput
              v-model="postPersonal.Apellido"
              id="validationCustom01"
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom02">Nombre</CFormLabel>
            <CFormInput
              v-model="postPersonal.Nombre"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustomUsername">Cédula</CFormLabel>
            <CFormInput
              v-model="postPersonal.Cédula"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom03">Código</CFormLabel>
            <CFormInput
              v-model="postPersonal.Código"
              id="validationCustom03"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Programa</CFormLabel>
            <CFormInput v-model="postPersonal.Programa" id="validationCustom04">
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05"
              >Direccion o Dependencia</CFormLabel
            >
            <CFormInput
              v-model="postPersonal.Direccion"
              id="validationCustom05"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Cargo</CFormLabel>
            <CFormInput v-model="postPersonal.Cargo" id="validationCustom04">
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Fecha de ingreso</CFormLabel>
            <CFormInput
              v-model="postPersonal.FechaIngreso"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04"
              >Fecha de nacimiento</CFormLabel
            >
            <CFormInput
              v-model="postPersonal.FechaNacimiento"
              id="validationCustom04"
            ></CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Edad</CFormLabel>
            <CFormInput
              v-model="postPersonal.Edad"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Sexo</CFormLabel>
            <CFormInput
              v-model="postPersonal.Sexo"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Sueldo</CFormLabel>
            <CFormInput
              v-model="postPersonal.Sueldo"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1">Guardar</button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
//import store from '@/store'
import { useRegistroStore } from '../store/RegistroPersonal/piniaTest'
import { computed } from '@vue/reactivity'

export default {
  components: { CSmartTable },

  setup() {
    function toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    }

    const validatedCustom01 = null
    const lgDemo = false

    const postPersonal = {
      id: 34,
      Apellido: 'JIMENEZ CORDERO',
      Nombre: 'EDWING FRANCISCO',
      Cédula: '001-0004972-5',
      Código: '377',
      Programa: '16-DIR. DE CAP. Y FORM',
      Direccion: '',
      Cargo: '',
      FechaIngreso: '01/01/1999',
      FechaNacimiento: '28/10/1963',
      Edad: '58',
      Sexo: 'MASCULINO',
      Sueldo: '25,000.00 RD$',
    }

    const store = useRegistroStore()
    function submit() {
      this.addPersonal(postPersonal)
    }
    const columns = [
      { key: 'Apellido', label: 'Apellido', _style: { width: '40%' } },
      { key: 'Nombre', label: 'Nombre', _style: { width: '40%' } },
      { key: 'Cédula', label: 'Cédula', _style: { width: '40%' } },
      { key: 'Código', label: 'Código', _style: { width: '40%' } },
      { key: 'Programa', label: 'Programa', _style: { width: '40%' } },
      {
        key: 'Direccion o Dependencia',
        label: 'Direccion o Dependencia',
        _style: { width: '40%' },
      },
      { key: 'Cargo', label: 'Cargo', _style: { width: '40%' } },
      {
        key: 'Fecha de ingreso',
        label: 'Fecha de ingreso',
        _style: { width: '40%' },
      },
      {
        key: 'Fecha de nacimiento',
        label: 'Fecha de nacimiento',
        _style: { width: '40%' },
      },
      { key: 'Edad', label: 'Edad', _style: { width: '40%' } },
      { key: 'Sexo', label: 'Sexo', _style: { width: '40%' } },
      { key: 'Sueldo', label: 'Sueldo', _style: { width: '40%' } },

      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
        // _props: { color: 'primary', class: 'fw-semibold'}
      },
    ]
    const details = []
    const { registroPersonal, addPersonal, getAllPersonal, is_loading } = store

    return {
      // you can return the whole store instance to use it in the template
      store,
      CModal,
      CSmartTable,
      registroPersonal,
      addPersonal,
      getAllPersonal,
      toggleDetails,
      details,
      validatedCustom01,
      lgDemo,
      columns,
      submit,
      is_loading,
      prueba: computed(() => store.registroPersonal),
    }
  },
}
</script>
