<template>
  <CModal
    size="lg"
    :visible="showModal"
    @close="$emit('onClose')"
    novalidate
    :validated="formIsValid" >

    <CModalHeader>
      <CModalTitle>Agregar Departamentos</CModalTitle>
    </CModalHeader>

    <CModalBody>
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate :validated="formIsValid" @submit="hanldeSubmitForm">

          <CRow>
            <CCol :md="4">
              <CFormLabel for="validationCustom01">Codigo SASP</CFormLabel>
              <CFormInput required type="Number"
                          v-model="newDepartment.saspId"
                          feedbackInvalid="Inserte Codigo SASP"
                          id="invalidSasp"> </CFormInput>
            </CCol>
          </CRow>

          <div>
            <CFormLabel for="validationCustomUsername">Nombre Depto. ó Nómina</CFormLabel>
            <CFormInput required id="validationCustom04" v-model="newDepartment.nombre"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>

          <CRow>
            <CCol :md="4">
              <CFormLabel for="validationCustomUsername">Programa</CFormLabel>
              <CFormSelect required id="validationCustom04" v-model="newDepartment.programaDivisionId">
                <option v-for="programa in programas" :value="programa.id" :key="programa.id">
                  {{ programa.nombre }}
                </option>
              </CFormSelect>
            </CCol>

            <CCol :md="4">
              <CFormLabel for="validationCustomUsername">Grupo Nomina</CFormLabel>
              <CFormSelect required id="validationCustom04" v-model="newDepartment.grupoNominaId">
                <option v-for="grupo in gruposNomina" :value="grupo.id" :key="grupo.id">
                  {{ grupo.nombre }}
                </option>
              </CFormSelect>
            </CCol>
          </CRow>

          <div>
            <CFormLabel for="validationCustomUsername">Cuenta de banco</CFormLabel>
            <CFormSelect required id="validationCustom04" v-model="newDepartment.cuentaBancoId">
              <option v-for="cuenta in cuentasBanco" :value="cuenta.id" :key="cuenta.id">
                {{ `${cuenta.nombreCuenta} - ${cuenta.numeroCuenta}` }}
              </option>
            </CFormSelect>
          </div>
          <div>
            <CFormLabel for="validationCustomUsername">Estructura</CFormLabel>
            <CFormSelect required id="validationCustom04" v-model="newDepartment.estructura">
              <option v-for="estructura in estructurasProgramaticas" :value="estructura.id" :key="estructura.id">
                {{ estructura.nombre }}
              </option>
            </CFormSelect>
          </div>

          <div v-if="isNomina">
            <CRow>

              <CCol :md="4">
                <CFormLabel for="validationCustomUsername">Clasificador</CFormLabel>
                <CFormSelect required id="validationCustom04" v-model="newDepartment.ctgClasificadorId" @update:modelValue="handleClasificadorChange"
                  :options="clasificadores">

                </CFormSelect>
              </CCol>

              <CCol :md="4">
                <CFormLabel for="validationCustomUsername">Fuente Financiamineto</CFormLabel>
                <CFormInput required id="validationCustom04" v-model="newDepartment.ctgFuenteId"></CFormInput>
              </CCol>
            </CRow>

            <CRow>
              <CCol :md="4">
                <CFormLabel for="validationCustomUsername">Fuente Especifica</CFormLabel>
                <CFormInput required id="validationCustom04" v-model="newDepartment.ctgFuenteEspecificaId"></CFormInput>
              </CCol>

              <CCol :md="4">
                <CFormLabel for="validationCustomUsername">Organismo Financiero</CFormLabel>
                <CFormInput required id="validationCustom04" v-model="newDepartment.ctgOrganismoFinanciadorId">
                </CFormInput>
              </CCol>

            </CRow>


            <div>
              <h5>Regalias</h5>

              <CRow>
                <CCol :md="3">
                  <CFormLabel for="validationCustomUsername">Casificador</CFormLabel>
                  <CFormInput required
                              v-model="newDepartment.ctgClasificadorRegaliaId"
                              feedbackInvalid="You must agree before submitting."
                              id="invalidClasificador"></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel for="validationCustomUsername">Fuente Financiamineto</CFormLabel>
                  <CFormInput required id="validationCustom04" v-model="newDepartment.ctgFuenteRegaliaId"></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel for="validationCustomUsername">Fuente Especifica</CFormLabel>
                  <CFormInput required id="validationCustom04" v-model="newDepartment.ctgFuenteEspecificaRegaliaId"></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel for="validationCustomUsername">Org. Fin</CFormLabel>
                  <CFormInput required id="validationCustom04" v-model="newDepartment.ctgOrganismoFinanciadorRegaliaId">
                  </CFormInput>
                </CCol>

              </CRow>
            </div>
          </div>

          <div class="modal-footer">
            <button @click="$emit('onClose')" type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
              Guardar
            </button>
          </div>

        </CForm>
      </CCardBody>
    </CModalBody>

  </CModal>
</template>
<script>
import { CModal } from '@coreui/vue'
import { CCol, CRow } from '@coreui/vue-pro'
import httpClient from '@/Api/http-common'

export default {
  components: {
    CModal,
    CRow,
    CCol
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    isNomina: {
      type: Boolean,
      default: true
    }
  },

  data: () => {
    return {
      formIsValid: null,
      programas: [],
      gruposNomina: [],
      cuentasBanco: [],
      estructurasProgramaticas: [],
      clasificadores: [],
      clasificadorSeleccionado: {},
      clasificadorRegalia: {},

      newDepartment: {
        id: 0,
        programaDivisionId: 0,
        ayuntamientoId: 0,
        grupoNominaId: 0,
        nombre: "",
        saspId: 0,
        cuentaBancoId: 0,
        estructura: "",
        ctgClasificadorId: "",
        ctgOrganismoFinanciadorId: "",
        ctgClasificadorRegaliaId: "",
        ctgOrganismoFinanciadorRegaliaId: "",
        ctgFuenteId: "",
        ctgFuenteEspecificaId: "",
        ctgFuenteRegaliaId: "",
        ctgFuenteEspecificaRegaliaId: ""
      }
    }
  },

  methods: {


    hanldeSubmitForm(event) {

      const form = event.currentTarget;
      this.formIsValid = false;
      if (form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        httpClient.post("departamentos", this.newDepartment)
      }else{
        this.formIsValid = true

      }

      // this.$emit('onClose')
    },


    handleClasificadorChange(clasificadorId) {
      const selected = this.clasificadores.find(x => x.value === clasificadorId);

      this.newDepartment.ctgFuenteId = selected.item.ctgFuenteId;
      this.newDepartment.ctgFuenteEspecificaId = selected.item.ctgFuenteEspecificaId;
      this.newDepartment.ctgOrganismoFinanciadorId = selected.item.ctgOrganismoFinanciadorId;


      this.newDepartment.ctgClasificadorRegaliaId = selected.item.clasifica;
      this.newDepartment.ctgFuenteRegaliaId = selected.item.ctgFuenteId;
      this.newDepartment.ctgFuenteEspecificaRegaliaId = selected.item.ctgFuenteEspecificaId;
      this.newDepartment.ctgOrganismoFinanciadorRegaliaId = selected.item.ctgOrganismoFinanciadorId;
    }
  },
  mounted() {
    httpClient.get("/programas-division").then((response) => this.programas = response.data.data),
      httpClient.get("/grupoNomina").then((response) => this.gruposNomina = response.data.data)
    httpClient.get("/ConciliacionCuentaBanco/1").then((response) => this.cuentasBanco = response.data.data)
    httpClient.get("/CtgMestProg").then((response) => this.estructurasProgramaticas = response.data.data)
    httpClient.get("/CtgClasificador").then((response) => {
      this.clasificadores = response.data.data.map((item) => {
        return {
          label: item.nombre,
          value: item.clasifica,
          item
        }
      });
    })
  }

}
</script>
