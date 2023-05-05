<template>
  <CModal
    size="lg"
    :visible="showModal"
    @close="$emit('onClose')"
    novalidate
    :validated="formIsValid" >

    <CModalHeader>
      <CModalTitle>{{this.modalTitle ?? "Agregar Departamento"}}</CModalTitle>
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
            <CFormLabel >Nombre Depto. ó Nómina</CFormLabel>
            <CFormInput required  v-model="newDepartment.nombre"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>

          <CRow>
            <CCol :md="6">
              <CFormLabel >Programa</CFormLabel>
              <CFormSelect required  v-model="newDepartment.programaDivisionId">
                <option>Selecionar Programa</option>
                <option v-for="programa in programas" :value="programa.id" :key="programa.id">
                  {{ programa.nombre }}
                </option>
              </CFormSelect>
            </CCol>

            <CCol :md="6">
              <CFormLabel >Grupo Nómina</CFormLabel>
              <CFormSelect required  v-model="newDepartment.grupoNominaId">
                <option>Selecionar Grupo Nómina</option>
                <option v-for="grupo in gruposNomina" :value="grupo.id" :key="grupo.id">
                  {{ grupo.nombre }}
                </option>
              </CFormSelect>
            </CCol>
          </CRow>

          <div>
            <CFormLabel >Cuenta de banco</CFormLabel>
            <CFormSelect required  v-model="newDepartment.cuentaBancoId">
              <option :key="0">Selecionar Cuenta de banco</option>
                <option v-for="cuenta in cuentasBanco" :value="cuenta.bancoId" :key="cuenta.bancoId">
                  {{ cuenta.nombreCuenta }}
                </option>
            </CFormSelect>
          </div>
          <div>
            <CFormLabel >Estructura</CFormLabel>
            <CFormSelect required  v-model="newDepartment.estructura">
              <option v-for="estructura in estructurasProgramaticas" :value="estructura.numero" :key="estructura.id">
                {{ estructura.nombre }}
              </option>
            </CFormSelect>
          </div>

          <div v-if="isNomina">
            <CRow>

              <CCol :md="4">
                <CFormLabel >Clasificador</CFormLabel>
                <CFormSelect required  v-model="newDepartment.clasificadorId" @update:modelValue="handleClasificadorChange"
                  :options="['Seleccione Clasificador', ...clasificadores]">

                </CFormSelect>
              </CCol>
              <CCol :md="4">
                <CFormLabel >Fuente Financiamineto</CFormLabel>
                <CFormInput   v-model="newDepartment.fuenteId"></CFormInput>
              </CCol>
            </CRow>

            <CRow>
              <CCol :md="4">
                <CFormLabel >Fuente Específica</CFormLabel>
                <CFormInput   v-model="newDepartment.fuenteEspecificaId"></CFormInput>
              </CCol>

              <CCol :md="4">
                <CFormLabel >Organismo Financiero</CFormLabel>
                <CFormInput   v-model="newDepartment.organismoFinanciadorId">
                </CFormInput>
              </CCol>

            </CRow>


            <div>
              <h5>Regalias</h5>

              <CRow>
                <CCol :md="3">
                  <CFormLabel >Casificador</CFormLabel>
                  <CFormInput required
                              v-model="newDepartment.clasificadorRegaliaId"
                              feedbackInvalid="Seleccione un clasificador ."
                              id="invalidClasificador"></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel >Fuente Financiamineto</CFormLabel>
                  <CFormInput   v-model="newDepartment.fuenteRegaliaId"></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel >Fuente Específica</CFormLabel>
                  <CFormInput   v-model="newDepartment.fuenteEspecificaRegaliaId"></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel >Org. Fin</CFormLabel>
                  <CFormInput   v-model="newDepartment.organismoFinanciadorRegaliaId">
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
import departmentService from '@/modules/rrhh/RegistroPersonal/services/DeparmentServices'

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
    },
    departamento: {
      type: Object,
      default: null
    },
    modalTitle: {
      type: Text,
      default: null
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
        clasificadorId: "",
        organismoFinanciadorId: "",
        clasificadorRegaliaId: "",
        organismoFinanciadorRegaliaId: "",
        fuenteId: "",
        fuenteEspecificaId: "",
        fuenteRegaliaId: "",
        fuenteEspecificaRegaliaId: ""
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
        this.$emit('OnSubmit', this.newDepartment)

      }else{
        this.formIsValid = true
      }
    },


    handleClasificadorChange(clasificadorId) {
      const selected = this.clasificadores.find(x => x.value === clasificadorId);

      this.newDepartment.fuenteId = selected.item.ctgFuenteId;
      this.newDepartment.fuenteEspecificaId = selected.item.ctgFuenteEspecificaId;
      this.newDepartment.organismoFinanciadorId = selected.item.ctgOrganismoFinanciadorId;


      this.newDepartment.clasificadorRegaliaId = selected.item.clasifica;
      this.newDepartment.fuenteRegaliaId = selected.item.ctgFuenteId;
      this.newDepartment.fuenteEspecificaRegaliaId = selected.item.ctgFuenteEspecificaId;
      this.newDepartment.organismoFinanciadorRegaliaId = selected.item.ctgOrganismoFinanciadorId;
    }
  },
  mounted() {
    departmentService.getProgramasDivision().then((response) => this.programas = response.data.data),
    departmentService.getGruposNomina().then((response) => this.gruposNomina = response.data.data)
    departmentService.getCuentasDeBancos().then((response) => this.cuentasBanco = response.data.data)
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
  },
  watch:{
    departamento(){
      if(this.departamento){
          this.newDepartment = {
          id: this.departamento?.id,
          programaDivisionId: this.departamento.programaDivision?.id,
          grupoNominaId: this.departamento.grupoNomina?.id,
          nombre: this.departamento.nombre,
          saspId: this.departamento.saspId,
          cuentaBancoId: +this.departamento.cuentaBanco?.id,
          estructura: this.departamento.estructura,
          clasificadorId: this.departamento.clasificador?.id,
          organismoFinanciadorId: this.departamento.organismoFinanciador?.id,
          clasificadorRegaliaId: this.departamento.clasificadorRegalia?.id,
          organismoFinanciadorRegaliaId: this.departamento.organismoFinanciadorRegalia?.id,
          fuenteId: this.departamento.fuente?.id,
          fuenteEspecificaId: this.departamento.fuenteEspecifica?.id,
          fuenteRegaliaId: this.departamento.fuenteRegalia?.id,
          fuenteEspecificaRegaliaId: this.departamento.fuenteEspecificaRegalia?.id
        }
      }
    }
  }

}
</script>
