<template>
  <CModal
    backdrop="static"
    size="lg"
    :visible="showModal"
    @close="$emit('close')"
    novalidate
    :validated="formIsValid"
  >
    <CModalHeader>
      <CModalTitle>Formulario Captura Departamento</CModalTitle>
    </CModalHeader>

    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="formIsValid"
          @submit.prevent="hanldeSubmitForm"
        >
          <CContainer>
            <CRow>
              <CCol :md="4">
                <CFormLabel for="validationCustom01"
                  >C&oacute;digo SASP</CFormLabel
                >
                <CFormInput
                  required
                  type="Number"
                  oninput="this.value = this.valueAsNumber"
                  v-model="newDepartment.saspId"
                  feedbackInvalid="Inserte Codigo SASP"
                  id="invalidSasp"
                >
                </CFormInput>
              </CCol>
            </CRow>
          </CContainer>

          <div>
            <CFormLabel>Nombre Depto. &oacute; N&oacute;mina</CFormLabel>
            <CFormInput required v-model="newDepartment.nombre"> </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </div>

          <CContainer>
            <CRow>
              <CCol :md="6">
                <CFormLabel>Programa</CFormLabel>
                <CFormSelect
                  required
                  :modelValue="`${newDepartment.programaDivisionId}`"
                  @update:modelValue="handleProgramaChange"
                >
                  <option :value="'0'">Selecionar Programa</option>
                  <option
                    v-for="programa in programas"
                    :value="`${programa.id}`"
                    :key="programa.id"
                  >
                    {{ programa.nombre }}
                  </option>
                </CFormSelect>
              </CCol>

              <CCol :md="6">
                <CFormLabel>Grupo N&oacute;mina</CFormLabel>
                <CFormSelect required v-model="newDepartment.grupoNominaId">
                  <option value="0">Selecionar Grupo N&oacute;mina</option>
                  <option
                    v-for="grupo in gruposNomina"
                    :value="`${grupo.id}`"
                    :key="grupo.id"
                  >
                    {{ grupo.nombre }}
                  </option>
                </CFormSelect>
              </CCol>
            </CRow>
          </CContainer>
          <div>
            <CFormLabel>Cuenta de Banco</CFormLabel>
            <CFormSelect required v-model="newDepartment.cuentaBancoId">
              <option :key="0">Selecionar Cuenta de banco</option>
              <option
                v-for="cuenta in cuentasBanco"
                :value="`${cuenta.bancoId}`"
                :key="cuenta.bancoId"
              >
                {{ cuenta.nombreCuenta }}
              </option>
            </CFormSelect>
          </div>
          <div>
            <CFormLabel>Estructura</CFormLabel>
            <CFormInput required v-model="newDepartment.estructura" disabled>
            </CFormInput>
          </div>

          <section v-if="isNomina" class="mt-4">
            <CContainer>
              <CRow>
                <CCol :md="3">
                  <CFormLabel>Clasificador</CFormLabel>
                  <CFormSelect
                    required
                    v-model="newDepartment.ctgClasificadorId"
                    @change="handleClasificadorChange"
                    :options="[
                      {
                        label: 'Seleccione Clasificador',
                        value: '0',
                        item: {},
                      },
                      ...clasificadoresFiltrados,
                    ]"
                  >
                  </CFormSelect>
                </CCol>
                <CCol :md="3">
                  <CFormLabel>Fuente Financiamineto</CFormLabel>
                  <CFormInput
                    v-model="newDepartment.ctgFuenteId"
                    required
                    maxlength="2"
                    @keypress="onlyNumber"
                  ></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel>Fuente Espec&iacute;fica</CFormLabel>
                  <CFormInput
                    v-model="newDepartment.ctgFuenteEspecificaId"
                    required
                    maxlength="4"
                    @keypress="onlyNumber"
                  ></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel>Organismo Financiero</CFormLabel>
                  <CFormInput
                    v-model="newDepartment.ctgOrganismoFinanciadorId"
                    required
                    maxlength="4"
                    @keypress="onlyNumber">
                  </CFormInput>
                </CCol>

                <CCol :md="12" v-if="paymentClasificatorMessage" class="mt-2">
                  <CAlert color="danger">{{ paymentClasificatorMessage }}</CAlert>
                </CCol>
              </CRow>
            </CContainer>

            <CContainer class="mt-4">
              <h5>Regal&iacute;as</h5>

              <CRow>
                <CCol :md="3">
                  <CFormLabel>Clasificador</CFormLabel>
                    <CFormInput
                      v-model="newDepartment.ctgClasificadorRegaliaId"
                      feedbackInvalid="Seleccione un clasificador ."
                      id="invalidClasificador"
                      maxlength="6"
                      @keypress="onlyNumber"
                    ></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel>Fuente Financiamineto</CFormLabel>
                  <CFormInput
                    v-model="newDepartment.ctgFuenteRegaliaId"
                    maxlength="2"
                    @keypress="onlyNumber"
                  ></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel>Fuente Espec&iacute;fica</CFormLabel>
                  <CFormInput
                    v-model="newDepartment.ctgFuenteEspecificaRegaliaId"
                    maxlength="4"
                    @keypress="onlyNumber"
                  ></CFormInput>
                </CCol>

                <CCol :md="3">
                  <CFormLabel> Organismo Financiero</CFormLabel>
                  <CFormInput
                    v-model="newDepartment.ctgOrganismoFinanciadorRegaliaId"
                    maxlength="4"
                    @keypress="onlyNumber"
                  >
                  </CFormInput>
                </CCol>

                <CCol :md="12" v-if="regaliaClasificatorMessage" class="mt-2">
                  <CAlert color="danger">{{ regaliaClasificatorMessage }}</CAlert>
                </CCol>
              </CRow>
            </CContainer>
          </section>
          <div class="modal-footer">
            <button
              @click="$emit('close')"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button class="btn btn-info btn-block mt-1">
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
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import { onlyNumber } from '@/utils/validator';

export default {
  components: {
    CModal,
    CRow,
    CCol,
    CFormLabel,
  },
  emits: ['close', 'submit'],
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    isNomina: {
      type: Boolean,
      default: false,
    },
    departamento: {
      type: Object,
      default: null,
    },
    modalTitle: {
      type: Text,
      default: null,
    },
  },

  data: () => {
    return {
      onlyNumber,
      paymentClasificatorMessage: "",
      regaliaClasificatorMessage: "",
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
        nombre: '',
        saspId: 0,
        cuentaBancoId: 0,
        estructura: '',
        ctgClasificadorId: '',
        ctgOrganismoFinanciadorId: '',
        ctgClasificadorRegaliaId: '',
        ctgOrganismoFinanciadorRegaliaId: '',
        ctgFuenteId: '',
        ctgFuenteEspecificaId: '',
        ctgFuenteRegaliaId: '',
        ctgFuenteEspecificaRegaliaId: '',
      },
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    hanldeSubmitForm(event) {
      const form = event.currentTarget
      this.formIsValid = false

      if (form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        this.$emit('submit', this.newDepartment)
      } else {
        this.formIsValid = true
      }
    },

    handleProgramaChange(idPrograma) {
      this.newDepartment.programaDivisionId = Number(idPrograma);
      const programa = this.programas.find((x) => x.id === this.newDepartment.programaDivisionId )

      if (programa) {
        this.newDepartment.estructura = programa.estructura
      }
    },
    handleClasificadorChange({target}) {
      const selected = this.clasificadoresFiltrados[target.selectedIndex - 1];
      if (selected) {
        this.newDepartment.ctgFuenteId = selected.item?.ctgFuenteId
        this.newDepartment.ctgFuenteEspecificaId = selected.item?.ctgFuenteEspecificaId;
        this.newDepartment.ctgOrganismoFinanciadorId = selected.item?.ctgOrganismoFinanciadorId;
      }
    },
  },
  mounted() {
    const clasificadoresPermitidos = [
      '211101',
      '211201',
      '211202',
      '211204',
      '211206',
      '241201',
      '241202',
    ]

    departmentService
      .getEstructurasProgramaticas()
      .then((response) => (this.estructurasProgramaticas = response.data.data))
    departmentService
      .getProgramasDivision()
      .then((response) => (this.programas = response.data.data))
    departmentService
      .getGruposNomina()
      .then((response) => (this.gruposNomina = response.data.data))
    departmentService
      .getCuentasDeBancos()
      .then((response) => (this.cuentasBanco = response.data.data))
    departmentService.getClasificadores().then((response) => {
      const clasificadores = response.data?.data
        ?.filter((clasificator => clasificator?.clasifica?.toString().match(/^(2)/g)))
        ?.filter((x) => clasificadoresPermitidos.includes(x.clasifica));

      const uniqueClasificadores = clasificadores.reduce((obj, item) => {
        obj[ `${item.clasifica}-${item.origen}-(${item.ctgFuenteId}/${item.ctgFuenteEspecificaId}/${item.ctgOrganismoFinanciadorId})`] = item;
        return obj;
      }, {});

      this.clasificadores = Object.values(uniqueClasificadores);
    })
  },
  computed: {
    validPaymentStructureInfo() {
      return ([
        this.newDepartment.estructura?.length > 1,
        this.newDepartment.ctgClasificadorId?.length > 5,
        this.newDepartment.ctgFuenteId?.length > 1,
        this.newDepartment.ctgFuenteEspecificaId?.length > 3,
        this.newDepartment.ctgOrganismoFinanciadorId?.length > 2
      ].reduce((a, b) => a && b,  true));
    },
    validChristmasPaymentStructureInfo() {
      return ([
        this.newDepartment.estructura?.length > 1,
        this.newDepartment.ctgClasificadorRegaliaId?.length > 5,
        this.newDepartment.ctgFuenteEspecificaId?.length > 1,
        this.newDepartment.ctgFuenteEspecificaRegaliaId?.length > 3,
        this.newDepartment.ctgOrganismoFinanciadorRegaliaId?.length > 2
      ].reduce((a, b) => a && b,  true));
    },
    clasificadoresFiltrados() {
      return this.clasificadores
        .filter((x) => x.origen === this.newDepartment.estructura)
        .map((item) => {
          return {
            label: `${item.clasifica} - ${item.nombre} (${item.ctgFuenteId}/${item.ctgFuenteEspecificaId}/${item.ctgOrganismoFinanciadorId})`,
            value: item.clasifica,
            item,
          }
        });
    }
  },
  watch: {
    validPaymentStructureInfo(newValue) {
      if (newValue) {
        departmentService
            .validarEstructuraPresupuestada(
              this.newDepartment.estructura,
              this.newDepartment.ctgClasificadorId,
              this.newDepartment.ctgFuenteId,
              this.newDepartment.ctgFuenteEspecificaId,
              this.newDepartment.ctgOrganismoFinanciadorId,
            )
            .then(() => {
              this.paymentClasificatorMessage = "";
            })
            .catch((error) => {
              this.paymentClasificatorMessage = error.response.data.message;
            })
      }
    },

    validChristmasPaymentStructureInfo(newValue) {
      if (newValue) {
        departmentService
            .validarEstructuraPresupuestada(
              this.newDepartment.estructura,
              this.newDepartment.ctgClasificadorRegaliaId,
              this.newDepartment.ctgFuenteRegaliaId,
              this.newDepartment.ctgFuenteEspecificaRegaliaId,
              this.newDepartment.ctgOrganismoFinanciadorRegaliaId,
            )
            .then(() => {
              this.regaliaClasificatorMessage = "";
            })
            .catch((error) => {
              this.regaliaClasificatorMessage = error.response.data.message;
            })
      }
    },

    departamento() {
      if (this.departamento) {
        this.newDepartment = {
          id: this.departamento?.id,
          programaDivisionId: this.departamento.programaDivision?.id,
          grupoNominaId: this.departamento.grupoNomina?.id,
          nombre: this.departamento.nombre,
          saspId: this.departamento.saspId,
          cuentaBancoId: +this.departamento.cuentaBanco?.id,
          estructura: this.departamento.estructura,
          ctgClasificadorId: this.departamento.clasificador?.id,
          ctgOrganismoFinanciadorId: this.departamento.organismoFinanciador?.id,
          ctgClasificadorRegaliaId: this.departamento.clasificadorRegalia?.id,
          ctgOrganismoFinanciadorRegaliaId:
            this.departamento.organismoFinanciadorRegalia?.id,
          ctgFuenteId: this.departamento.fuente?.id,
          ctgFuenteEspecificaId: this.departamento.fuenteEspecifica?.id,
          ctgFuenteRegaliaId: this.departamento.fuenteRegalia?.id,
          ctgFuenteEspecificaRegaliaId:
          this.departamento.fuenteEspecificaRegalia?.id,
          status : this.departamento.status
        }
      }
    },
  },
}
</script>
<style>
.icon-input {
    padding: 0.2rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    right: 2px;
}
</style>
