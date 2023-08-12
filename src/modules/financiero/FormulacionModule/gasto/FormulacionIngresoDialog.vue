<template>
	<CModal
		backdrop="static"
		size="lg"
		:visible="isVisible"
		@close="closeDialog()"
	>
		<CModalHeader :close-button="false">
			<CModalTitle> Partida del presupuesto de ingresos </CModalTitle>
			<div class="font-weight-bold">
				A&ntilde;o <strong>{{ anioFiscal }}</strong>
			</div>
		</CModalHeader>

		<CModalBody>
			<CForm
				class="row g-3 needs-validation"
				novalidate
				:validated="formIsValidated"
				ref="formulacionForm"
			>
				<CCol :md="3">
					<CFormLabel for="validationCustom01"
						>Clasificador</CFormLabel
					>
					<div class="position-relative">
						<input
							ref="clasificatorField"
							required
							@keyup.enter.prevent="findClasificador"
							maxlength="6"
							class="form-control padding-input"
							v-model="
								formulacionIngresoInternalState.ctgClasificadorId
							"
							type="number"
							id="clasifica"
							:disabled="notAllowEdit"
						/>
						<span
							class="position-absolute icon-input"
							v-if="!notAllowEdit"
						>
							<CIcon
								icon="cisSearch"
								size="xl"
								v-on:click="
									() => (showFindClasificadorModal = true)
								"
							/>
						</span>
					</div>
					<CFormFeedback invalid>
						Favor agregar el campo
					</CFormFeedback>
				</CCol>

				<CCol :md="2">
					<CFormLabel for="validationCustom02"
						>Cta. Control</CFormLabel
					>
					<CFormInput
						disabled
						v-model="formulacionIngresoInternalState.ctaControl"
						id="validationCustom02"
						required
					/>
				</CCol>
				<CCol :md="7">
					<CFormLabel for="validationCustomUsername"
						>Detalle</CFormLabel
					>
					<CInputGroup class="has-validation">
						<CFormInput
							disabled
							v-model="formulacionIngresoInternalState.detalle"
							id="validationCustomUsername"
							value=""
							aria-describedby="inputGroupPrepend"
							required
						/>
					</CInputGroup>
				</CCol>
				<CCol :md="4">
					<CFormLabel for="validationCustom03"
						>Fuente Financiamiento</CFormLabel
					>
					<CFormInput
						id="validationCustom03"
						required
						:disabled="enabledFields.ctgFuenteId"
						v-model="formulacionIngresoInternalState.ctgFuenteId"
						type="number"
						pattern="[0-9]+"
					/>
				</CCol>
				<CCol :md="4">
					<CFormLabel for="validationCustom04"
						>Fuente Espec&iacute;fica</CFormLabel
					>
					<CFormInput
						id="validationCustom04"
						required
						:disabled="enabledFields.ctgFuenteEspecificaId"
						v-model="
							formulacionIngresoInternalState.ctgFuenteEspecificaId
						"
						type="number"
						pattern="[0-9]+"
					/>
				</CCol>
				<CCol :md="4">
					<CFormLabel for="validationCustom05"
						>Organismo Financiador</CFormLabel
					>
					<CFormInput
						id="validationCustom05"
						required
						:disabled="enabledFields.ctgOrganismoFinanciadorId"
						v-model="
							formulacionIngresoInternalState.ctgOrganismoFinanciadorId
						"
						type="number"
						pattern="[0-9]+"
					/>
				</CCol>
				<CCol :md="12">
					<CFormLabel>Instituci&oacute;n Otorgante</CFormLabel>
					<v-select
						v-model="selectedInstitucionOtorgante"
						:options="institucionesOtorgantes"
						:disabled="notAllowEdit"
					></v-select>
				</CCol>
				<hr />
				<CCol :md="4">
					<CFormLabel>A&ntilde;o Anterior</CFormLabel>
					<VueNumberFormat
						v-model:value="formulacionIngresoInternalState.anioAnt"
						type="text"
						class="form-control text-end"
						:disabled="notAllowAmount || notAllowEdit"
						:options="{
							precision: 2,
							prefix: '',
							decimal: '.',
							thousand: ',',
						}"
						ref="anoAnteriorRef"
					>
					</VueNumberFormat>
				</CCol>
				<CCol :md="4">
					<CFormLabel>A la Fecha</CFormLabel>
					<VueNumberFormat
						v-model:value="formulacionIngresoInternalState.alaFecha"
						type="text"
						class="form-control text-end"
						:disabled="notAllowAmount || notAllowEdit"
						:options="{
							precision: 2,
							prefix: '',
							decimal: '.',
							thousand: ',',
						}"
					></VueNumberFormat>
				</CCol>
				<CCol :md="4">
					<CFormLabel>Presupuesto Formulado</CFormLabel>
					<VueNumberFormat
						v-model:value="formulacionIngresoInternalState.presForm"
						type="text"
						step="any"
						class="form-control text-end"
						:disabled="notAllowAmount || notAllowEdit"
						:options="{
							precision: 2,
							prefix: '',
							decimal: '.',
							thousand: ',',
						}"
					></VueNumberFormat>
				</CCol>
			</CForm>
			<ClasificadorSelectorDialog
				:isVisible="showFindClasificadorModal"
				:filtered="
					(clasificator) =>
						clasificator.tipo === 'DETALLE' &&
						clasificator.origen === 'INGRESO' &&
						clasificator?.clasifica?.toString().match(/^(1|3)/g)
				"
				:term="formulacionIngresoInternalState.ctgClasificadorId"
				@close="selectClasificator"
			/>
		</CModalBody>

		<CModalFooter>
			<CButton
				color="secondary"
				data-bs-dismiss="modal"
				@click="closeDialog()"
			>
				{{
					hasBugetOrExecution || notAllowEdit ? 'Cerrar' : 'Cancelar'
				}}
			</CButton>
			<CButton
				v-if="
					hasBugetOrExecution ||
					!(
						formulacionIngresoInternalState.id &&
						isFiscalYearApprovedOrClose
					)
				"
				color="primary"
				@click="submitForm"
			>
				Guardar
			</CButton>
		</CModalFooter>
	</CModal>
</template>
<script setup>
	import { CModal } from '@coreui/vue';
	import { reactive, ref, computed, watchEffect, watch } from 'vue';
	import ClasificadorSelectorDialog from '../components/ClasificadorSelectorDialog.vue';
	import { fiscalYearInfo } from '@/utils/logged-info';

	const emit = defineEmits(['close']);
	const props = defineProps({
		formulacionIngreso: {
			required: true,
			type: Object,
			default: () => ({}),
		},
		isVisible: Boolean,
		isFiscalYearApprovedOrClose: Boolean,
		institucionesOtorgantes: {
			require: true,
			type: Array,
			default: () => [],
		},
	});
	const selectedInstitucionOtorgante = ref({});
	const formulacionIngresoInternalState = ref({});
	const fiscalYearData = fiscalYearInfo();
	const anioFiscal = ref(fiscalYearData.anio);
	const formIsValidated = ref(null);
	const formulacionForm = ref(null);
	const showFindClasificadorModal = ref(false);
	const clasificatorField = ref(null);
	const enabledFields = reactive({
		ctgFuenteId: false,
		ctgFuenteEspecificaId: false,
		ctgOrganismoFinanciadorId: false,
	});
	const hasBugetOrExecution = computed(
		() =>
			formulacionIngresoInternalState.value.ingresos !== 0 ||
			formulacionIngresoInternalState.value.variacion !== 0,
	);
	const notAllowEdit = computed(
		() =>
			(hasBugetOrExecution.value || props.isFiscalYearApprovedOrClose) &&
			Boolean(formulacionIngresoInternalState.value.id),
	);
	const notAllowAmount = computed(
		() =>
			props.isFiscalYearApprovedOrClose &&
			!formulacionIngresoInternalState.value.id,
	);

	const closeDialog = (data) => {
		emit('close', data);
		enabledFields.ctgFuenteId = false;
		enabledFields.ctgFuenteEspecificaId = false;
		enabledFields.ctgOrganismoFinanciadorId = false;
		formIsValidated.value = false;
		selectedInstitucionOtorgante.value = {};
		formulacionIngresoInternalState.value.instOtorga = '0000';
	};

	const submitForm = () => {
		formIsValidated.value = false;
		if (formulacionForm.value?.$el.checkValidity()) {
			return closeDialog({
				...formulacionIngresoInternalState.value,
				anioAnt: Number(formulacionIngresoInternalState.value.anioAnt),
				alaFecha: Number(
					formulacionIngresoInternalState.value.alaFecha,
				),
				presForm: Number(
					formulacionIngresoInternalState.value.presForm,
				),
				ctaControl:
					formulacionIngresoInternalState.value.ctaControl ??
					formulacionIngresoInternalState.value.ctgClasificadorId
						.toString()
						.substring(
							0,
							formulacionIngresoInternalState.value.length - 2,
						),
				ctgFuenteEspecificaId:
					formulacionIngresoInternalState.value.ctgFuenteEspecificaId,
				ctgFuenteId: formulacionIngresoInternalState.value.ctgFuenteId,
				ctgOrganismoFinanciadorId:
					formulacionIngresoInternalState.value
						.ctgOrganismoFinanciadorId,
				instOtorga: selectedInstitucionOtorgante.value.code,
			});
		}

		formIsValidated.value = true;
	};

	const selectClasificator = (clasificador) => {
		if (clasificador) {
			formulacionIngresoInternalState.value.ctgClasificadorId =
				clasificador.clasifica;
			formulacionIngresoInternalState.value.ctaControl =
				clasificador.cControl;
			formulacionIngresoInternalState.value.detalle = clasificador.nombre;
			formulacionIngresoInternalState.value.ctgFuenteId =
				clasificador.ctgFuenteId ||
				formulacionIngresoInternalState.value.ctgFuenteId;
			formulacionIngresoInternalState.value.ctgFuenteEspecificaId =
				clasificador.ctgFuenteEspecificaId ||
				formulacionIngresoInternalState.value.ctgFuenteEspecificaId;
			formulacionIngresoInternalState.value.ctgOrganismoFinanciadorId =
				clasificador.ctgOrganismoFinanciadorId ||
				formulacionIngresoInternalState.value.ctgOrganismoFinanciadorId;

			validateInputctgFuente(clasificador);
			validateInputctgFuenteEspecificaId(clasificador);
			validateInputctgOrganismoFinanciadorId(clasificador);
		}
		showFindClasificadorModal.value = false;
	};

	const findClasificador = () => {
		if (clasificatorField.value.value.length !== 6) {
			showFindClasificadorModal.value = true;
		}
	};

	const validateInputctgFuente = (clasificatorSelected) => {
		if (formulacionIngresoInternalState.value.ctgFuenteId == '') {
			enabledFields.ctgFuenteId = false;
		}
		if (
			(formulacionIngresoInternalState.value.ctgFuenteId !== '' ||
				formulacionIngresoInternalState.value.ctgFuenteId.length >
					30) &&
			clasificatorSelected.ctgFuenteId !== ''
		) {
			enabledFields.ctgFuenteId = true;
		}
	};

	const validateInputctgFuenteEspecificaId = (clasificatorSelected) => {
		if (formulacionIngresoInternalState.value.ctgFuenteEspecificaId == '') {
			enabledFields.ctgFuenteEspecificaId = false;
		}
		if (
			(formulacionIngresoInternalState.value.ctgFuenteEspecificaId !==
				'' ||
				formulacionIngresoInternalState.value.ctgFuenteEspecificaId
					.length > 30) &&
			clasificatorSelected.ctgFuenteEspecificaId !== ''
		) {
			enabledFields.ctgFuenteEspecificaId = true;
		}
	};

	const validateInputctgOrganismoFinanciadorId = (clasificatorSelected) => {
		if (
			formulacionIngresoInternalState.value.ctgOrganismoFinanciadorId ==
			''
		) {
			enabledFields.ctgOrganismoFinanciadorId = false;
		}
		if (
			(formulacionIngresoInternalState.value.ctgOrganismoFinanciadorId !==
				'' ||
				formulacionIngresoInternalState.value.ctgOrganismoFinanciadorId
					.length > 30) &&
			clasificatorSelected.ctgOrganismoFinanciadorId !== ''
		) {
			enabledFields.ctgOrganismoFinanciadorId = true;
		}
	};

	watchEffect(() => {
		if (
			props.institucionesOtorgantes &&
			!Number(selectedInstitucionOtorgante.value?.code)
		) {
			selectedInstitucionOtorgante.value =
				props.institucionesOtorgantes.find(
					(io) =>
						io.code ===
						formulacionIngresoInternalState.value.instOtorga,
				) ?? {};
		}
		if (props.isVisible && clasificatorField.value) {
			clasificatorField.value.focus();
		}
	});

	watch(
		() => props.formulacionIngreso,
		() => {
			formulacionIngresoInternalState.value = {
				...(props.formulacionIngreso ?? {}),
			};
		},
	);
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
