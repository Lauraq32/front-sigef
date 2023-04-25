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
            <CCol :md="6">
              <CFormLabel for="validationCustomUsername">Programa</CFormLabel>
              <CFormSelect required id="validationCustom04" v-model="newDepartment.programaDivisionId">
                <option>Selecionar Programa</option>
                <option v-for="programa in programas" :value="programa.id" :key="programa.id">
                  {{ programa.nombre }}
                </option>
              </CFormSelect>
            </CCol>

            <CCol :md="6">
              <CFormLabel for="validationCustomUsername">Grupo Nomina</CFormLabel>
              <CFormSelect required id="validationCustom04" v-model="newDepartment.grupoNominaId">
                <option>Selecionar Grupo Nomina</option>
                <option v-for="grupo in gruposNomina" :value="grupo.id" :key="grupo.id">
                  {{ grupo.nombre }}
                </option>
              </CFormSelect>
            </CCol>
          </CRow>

          <div>
            <CFormLabel for="validationCustomUsername">Cuenta de banco</CFormLabel>
            <CFormSelect required id="validationCustom04" v-model="newDepartment.cuentaBancoId" :options="['Seleccione Cuenta', ...cuentasBanco]">
              <option :key="0">Selecionar Cuenta de banco</option>
            </CFormSelect>
          </div>
          <div>
            <CFormLabel for="validationCustomUsername">Estructura</CFormLabel>
            <CFormSelect required id="validationCustom04" v-model="newDepartment.estructura">
              <option v-for="estructura in estructurasProgramaticas" :value="estructura.numero" :key="estructura.id">
                {{ estructura.nombre }}
              </option>
            </CFormSelect>
          </div>

          <div v-if="isNomina">
            <CRow>

              <CCol :md="4">
                <CFormLabel for="validationCustomUsername">Clasificador</CFormLabel>
                <CFormSelect required id="validationCustom04" v-model="newDepartment.ctgClasificadorId" @update:modelValue="handleClasificadorChange"
                  :options="['Seleccione Clasificador', ...clasificadores]">

                </CFormSelect>
              </CCol>

              <!-- <CCol>
                <CFormLabel>Clasificador</CFormLabel>
                <ClasificadorSelectorDialog
                :isVisible="showclasificardorSelector"
                :filtered="(clasificator) => (clasificator.tipo ==='DETALLE' && clasificator.origen === 'INGRESO' && clasificator?.clasifica?.toString().match(/^(1|3)/g))"
                :term="newDepartment.ctgClasificadorId"
                @close="selectClasificator" />
              </CCol> -->

              <CCol :md="4">
                <CFormLabel for="validationCustomUsername">Fuente Financiamineto</CFormLabel>
                <CFormInput  id="validationCustom04" v-model="newDepartment.ctgFuenteId"></CFormInput>
              </CCol>
            </CRow>

            <CRow>
              <CCol :md="4">
                <CFormLabel for="validationCustomUsername">Fuente Especifica</CFormLabel>
                <CFormInput  id="validationCustom04" v-model="newDepartment.ctgFuenteEspecificaId"></CFormInput>
              </CCol>

              <CCol :md="4">
                <CFormLabel for="validationCustomUsername">Organismo Financiero</CFormLabel>
                <CFormInput  id="validationCustom04" v-model="newDepartment.ctgOrganismoFinanciadorId">
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
                  <CFormInput  id="validationCustom04" v-model="newDepartment.ctgFuenteRegaliaId"></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel for="validationCustomUsername">Fuente Especifica</CFormLabel>
                  <CFormInput  id="validationCustom04" v-model="newDepartment.ctgFuenteEspecificaRegaliaId"></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel for="validationCustomUsername">Org. Fin</CFormLabel>
                  <CFormInput  id="validationCustom04" v-model="newDepartment.ctgOrganismoFinanciadorRegaliaId">
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
import { CCol, CFormLabel, CRow } from '@coreui/vue-pro'
import httpClient from '@/Api/http-common'
import departmentService from '@/modules/rrhh/RegistroPersonal/services/DeparmentServices'
import ClasificadorSelectorDialog from '@/modules/financiero/FormulacionModule/components/ClasificadorSelectorDialog.vue'

export default {
  components: {
    CModal,
    CRow,
    CCol,
    CFormLabel
},
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    isNomina: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      showclasificardorSelector: false,
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

    selectClasificator(clasificador){
      console.log(clasificador)
    },

    hanldeSubmitForm(event) {

      console.log(this.newDepartment)
      const form = event.currentTarget;
      this.formIsValid = false;

      if (form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()

        departmentService.createDepartment(this.newDepartment).then((response) => {
          if(response.status === 200){
            console.log(response.data)
          }

          console.log(response.data)
        }).catch((error) => console.log(error))

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
    departmentService.getProgramasDivision().then((response) => this.programas = response.data.data),
    departmentService.getGruposNomina().then((response) => this.gruposNomina = response.data.data)
    departmentService.getCuentasDeBancos().then((response) => this.cuentasBanco = response.data.data.map((cuenta) => {
      return {
        label: `${cuenta.nombreCuenta} - ${cuenta.numeroCuenta}`,
        value: cuenta.bancoId,
      }
    }))
    departmentService.getEstructurasProgramaticas().then((response) => this.estructurasProgramaticas = response.data.data)
    departmentService.getClasificadores().then((response) => {
        this.clasificadores = response.data.data.filter(clasificator => clasificator.tipo === 'DETALLE' && clasificator.origen === 'INGRESO' && clasificator?.clasifica?.toString().match(/^(1|3)/g)
        ).map((item) => {
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
