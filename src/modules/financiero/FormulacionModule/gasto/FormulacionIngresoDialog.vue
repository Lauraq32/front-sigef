<template>
    <CModal backdrop="static" size="lg" :visible="isVisible" @close="closeDialog()">
        <CModalHeader :close-button="false">
            <CModalTitle>
                Partida del presupuesto de ingresos
            </CModalTitle>
            <div class="font-weight-bold">
                A&ntilde;o No. <strong>{{ anioFiscal }}</strong>
            </div>
        </CModalHeader>

        <CModalBody>
            <CForm class="row g-3 needs-validation" novalidate :validated="formIsValidated" ref="formulacionForm">
                <CCol :md="3">
                    <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
                    <div class="position-relative">
                        <input ref="clasificatorField" required @keyup.enter.prevent="findClasificador" maxlength="6"
                            class="form-control padding-input" v-model="formulacionIngreso.ctgClasificadorId" type="number"
                            id="clasifica" />
                        <span class="position-absolute icon-input">
                            <CIcon icon="cisSearch" size="xl" v-on:click="() => (showFindClasificadorModal = true)" />
                        </span>
                    </div>
                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                </CCol>

                <CCol :md="2">
                    <CFormLabel for="validationCustom02">Cta. Control</CFormLabel>
                    <CFormInput disabled v-model="formulacionIngreso.ctaControl" id="validationCustom02" required />
                </CCol>
                <CCol :md="7">
                    <CFormLabel for="validationCustomUsername">Detalle</CFormLabel>
                    <CInputGroup class="has-validation">
                        <CFormInput disabled v-model="formulacionIngreso.detalle" id="validationCustomUsername" value=""
                            aria-describedby="inputGroupPrepend" required />
                    </CInputGroup>
                </CCol>
                <CCol :md="3">
                    <CFormLabel for="validationCustom03">Fuente Financiamiento</CFormLabel>
                    <CFormInput
                        id="validationCustom03" required
                        :disabled="enabledFields.ctgFuenteId"
                        v-model="formulacionIngreso.ctgFuenteId"
                        type="number"
                        pattern="[0-9]+"
                    />
                </CCol>
                <CCol :md="3">
                    <CFormLabel for="validationCustom04">Fuente Espec&iacute;fica</CFormLabel>
                    <CFormInput
                        id="validationCustom04" required
                        :disabled="enabledFields.ctgFuenteEspecificaId"
                        v-model="formulacionIngreso.ctgFuenteEspecificaId"
                        type="number"
                        pattern="[0-9]+"
                    />
                </CCol>
                <CCol :md="3">
                    <CFormLabel for="validationCustom05">Organismo Financiador</CFormLabel>
                    <CFormInput
                        id="validationCustom05" required
                        :disabled="enabledFields.ctgOrganismoFinanciadorId"
                        v-model="formulacionIngreso.ctgOrganismoFinanciadorId"
                        type="number"
                        pattern="[0-9]+"
                    />
                </CCol>
                <CCol :md="3">
                    <CFormLabel>Instituci&oacute;n Otorgante</CFormLabel>
                    <CFormInput v-model="formulacionIngreso.instOtorga" type="number" step="any">
                    </CFormInput>
                </CCol>
                <hr />
                <CCol :md="4">
                    <CFormLabel>A&ntilde;o Anterior</CFormLabel>
                    <VueNumberFormat v-model:value="formulacionIngreso.anioAnt" type="text" class="form-control text-end"
                        :options="{
                            precision: 2,
                            prefix: '',
                            decimal: '.',
                            thousand: ',',
                        }" ref="anoAnteriorRef">
                    </VueNumberFormat>
                </CCol>
                <CCol :md="4">
                    <CFormLabel>A la Fecha</CFormLabel>
                    <VueNumberFormat v-model:value="formulacionIngreso.alaFecha" type="text" class="form-control text-end"
                        :options="{
                            precision: 2,
                            prefix: '',
                            decimal: '.',
                            thousand: ',',
                        }"></VueNumberFormat>
                </CCol>
                <CCol :md="4">
                    <CFormLabel>Presupuesto Formulado</CFormLabel>
                    <VueNumberFormat v-model:value="formulacionIngreso.presForm" type="text" step="any"
                        class="form-control text-end" :options="{
                            precision: 2,
                            prefix: '',
                            decimal: '.',
                            thousand: ',',
                        }"></VueNumberFormat>
                </CCol>
            </CForm>
        </CModalBody>

        <CModalFooter>
            <CButton color="secondary" data-bs-dismiss="modal" @click="closeDialog()">Cancelar</CButton>
            <CButton :disabled="formulacionIngreso.ingresos !== 0 || formulacionIngreso.variacion !== 0" color="primary"
                @click="submitForm">Guardar</CButton>
        </CModalFooter>
    </CModal>

    <ClasificadorSelectorDialog :isVisible="showFindClasificadorModal" :filtered="
        (clasificator) =>
        (clasificator.tipo ===
            'DETALLE' && clasificator.origen === 'INGRESO' && clasificator?.clasifica?.toString().match(/^(1|3)/g))
    " :term="formulacionIngreso.ctgClasificadorId" @close="selectClasificator" />
</template>
<script setup>
import { CModal } from '@coreui/vue'
import { reactive, ref } from 'vue';
import ClasificadorSelectorDialog from '../components/ClasificadorSelectorDialog.vue';
import { getFiscalYearId } from '@/utils/logged-info';

const emit = defineEmits(['close'])
const props = defineProps({
    formulacionIngreso: {
        required: true,
        type: Object,
        default: {},
    },
    isVisible: Boolean,
});
const anioFiscal = ref(getFiscalYearId());
const formIsValidated = ref(null);
const formulacionForm = ref(null);
const showFindClasificadorModal = ref(false);
const clasificatorField = ref(null);
const enabledFields = reactive({
    ctgFuenteId: false,
    ctgFuenteEspecificaId: false,
    ctgOrganismoFinanciadorId: false
});


const closeDialog = (data) => {
    emit('close', data);
    enabledFields.ctgFuenteId = false;
    enabledFields.ctgFuenteEspecificaId = false;
    enabledFields.ctgOrganismoFinanciadorId = false;
    formIsValidated.value = false;
}

const submitForm = () => {
    formIsValidated.value = false;
    if (formulacionForm.value?.$el.checkValidity()) {
        return closeDialog({
            ...props.formulacionIngreso,
            anioAnt: Number(props.formulacionIngreso.anioAnt),
            alaFecha: Number(props.formulacionIngreso.alaFecha),
            presForm: Number(props.formulacionIngreso.presForm),
            ctaControl:
                props.formulacionIngreso.ctaControl ??
                props.formulacionIngreso.ctgClasificadorId.toString().substring(0, props.formulacionIngreso.length - 2)
            ,
            ctgFuenteEspecificaId: props.formulacionIngreso.ctgFuenteEspecificaId,
            ctgFuenteId: props.formulacionIngreso.ctgFuenteId,
            ctgOrganismoFinanciadorId: props.formulacionIngreso.ctgOrganismoFinanciadorId,
        });
    }

    formIsValidated.value = true;
}

const selectClasificator = (clasificador) => {
    if (clasificador) {
        props.formulacionIngreso.ctgClasificadorId = clasificador.clasifica
        props.formulacionIngreso.ctaControl = clasificador.cControl;
        props.formulacionIngreso.detalle = clasificador.nombre;
        props.formulacionIngreso.ctgFuenteId = clasificador.ctgFuenteId || props.formulacionIngreso.ctgFuenteId;
        props.formulacionIngreso.ctgFuenteEspecificaId = clasificador.ctgFuenteEspecificaId || props.formulacionIngreso.ctgFuenteEspecificaId;
        props.formulacionIngreso.ctgOrganismoFinanciadorId = clasificador.ctgOrganismoFinanciadorId || props.formulacionIngreso.ctgOrganismoFinanciadorId;

        validateInputctgFuente(clasificador);
        validateInputctgFuenteEspecificaId(clasificador);
        validateInputctgOrganismoFinanciadorId(clasificador);
    }
    showFindClasificadorModal.value = false;
}

const findClasificador = () => {
    if (clasificatorField.value.value.length !== 6) {
        showFindClasificadorModal.value = true;
    }
}

const validateInputctgFuente = (clasificatorSelected) => {
    if (props.formulacionIngreso.ctgFuenteId == '') {
        enabledFields.ctgFuenteId = false;
    }
    if (
        (props.formulacionIngreso.ctgFuenteId !== '' ||
        props.formulacionIngreso.ctgFuenteId.length > 30) &&
        clasificatorSelected.ctgFuenteId !== ''
    ) {
        enabledFields.ctgFuenteId = true
    }
}

const validateInputctgFuenteEspecificaId = (clasificatorSelected) => {
    if (props.formulacionIngreso.ctgFuenteEspecificaId == '') {
        enabledFields.ctgFuenteEspecificaId = false
    }
    if (
        (props.formulacionIngreso.ctgFuenteEspecificaId !== '' ||
        props.formulacionIngreso.ctgFuenteEspecificaId.length > 30) &&
        clasificatorSelected.ctgFuenteEspecificaId !== ''
    ) {
        enabledFields.ctgFuenteEspecificaId = true
    }
}

const validateInputctgOrganismoFinanciadorId = (clasificatorSelected) => {
    if (props.formulacionIngreso.ctgOrganismoFinanciadorId == '') {
        enabledFields.ctgOrganismoFinanciadorId = false
    }
    if (
        (props.formulacionIngreso.ctgOrganismoFinanciadorId !== '' ||
        props.formulacionIngreso.ctgOrganismoFinanciadorId.length > 30) &&
        clasificatorSelected.ctgOrganismoFinanciadorId !== ''
    ) {
        enabledFields.ctgOrganismoFinanciadorId = true
    }
}  
</script>
<style scoped>
.padding-input {
    padding-right: 2.5rem;
}

.icon-input {
    padding: 0.2rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    right: 2px;
}
</style>