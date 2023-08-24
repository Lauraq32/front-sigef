<template>
	<CModal
		:visible="showMovimientoModal"
		backdrop="static"
		style="width: 25%"
		@close="
			() => {
				closeModal();
			}
		"
	>
		<CModalHeader>
			<CModalTitle>Asignaci&oacute;n de &Uacute;til laboral</CModalTitle>
		</CModalHeader>
		<CModalBody>
			<CCardBody>
				<CForm
					class="row g-3 needs-validation flex-column"
					novalidate
					:validated="movimientoFormValidated"
					ref="formRef"
				>
					<CCol>
						<CFormLabel for="validationCustom01"
							>Útil Laboral</CFormLabel
						>
						<v-select
							v-model="selectedUtil"
							placeholder="Seleccionar"
							:options="inventarioList"
						>
							<template #option="{ label, cantidad }">
								<div class="d-flex justify-content-between p-1">
									<span> {{ label }} </span>
									<span>
										{{ `${formatNumber(cantidad)}` }}
									</span>
								</div>
							</template>
							></v-select
						>
						<CFormFeedback
							invalid
							:style="{
								display: !isFormValidatedInputUtil
									? 'none'
									: 'flex',
							}"
						>
							Favor agregar el campo
						</CFormFeedback>
					</CCol>

					<CCol>
						<CFormLabel for="validationCustom04"
							>Cantidad</CFormLabel
						>
						<VueNumberFormat
							required
							id="validationCustom04"
							v-model:value="newEvent.cantidad"
							class="form-control"
							:options="{
								precision: 0,
								prefix: '',
								decimal: '',
								thousand: '',
							}"
						>
						</VueNumberFormat>
						<CFormFeedback invalid>
							Favor agregar el campo
						</CFormFeedback>
					</CCol>
				</CForm>
			</CCardBody>
		</CModalBody>
		<CModalFooter>
			<CButton
				color="secondary"
				data-bs-dismiss="modal"
				@click="closeModal"
			>
				Cerrar
			</CButton>
			<CButton color="primary" @click="saveMovimientoInventario">
				Guardar
			</CButton>
		</CModalFooter>
	</CModal>
</template>
<script>
	import { CModalFooter } from '@coreui/vue-pro';
	import { CModal } from '@coreui/vue';
	import { formatNumber } from '@/utils/format';

	export default {
		name: 'MovimientoInventarioModal',
		components: {
			CModal,
			CModalFooter,
		},
		emits: ['close-modal', 'save'],
		data: function () {
			return {
				formatNumber,
				movimientoFormValidated: false,
				isFormValidatedInputUtil: false,
				newEvent: {},
			};
		},

		methods: {
			closeModal() {
				this.$emit('close-modal');
			},
			saveMovimientoInventario() {
				this.movimientoFormValidated = false;
				this.isFormValidatedInputUtil = !!Number(
					this.newEvent.inventarioId,
				);
				if (
					this.$refs.formRef.$el.checkValidity() &&
					this.isFormValidatedInputUtil
				) {
					this.$emit('save', { ...this.newEvent });
					this.clearForm();
					return;
				}
				this.movimientoFormValidated = true;
				this.isFormValidatedInputUtil = true;
			},
			clearForm() {
				this.isFormValidatedInputUtil = false;
			},
		},
		computed: {
			selectedUtil: {
				get() {
					return this.inventarioList.find(
						(x) => x.code == this.newEvent.inventarioId,
					);
				},
				set(util) {
					this.newEvent.inventarioId =
						(util && Number(util.code)) || '';
					this.newEvent.inventario = (util && util.item) || {};
				},
			},
		},
		watch: {
			showMovimientoModal(value) {
				if (!value) {
					this.clearForm();
				}
			},
			postEvento(newValue) {
				this.newEvent = { ...(newValue ?? {}) };
			},
		},

		props: {
			showMovimientoModal: Boolean,
			inventarioList: Array,
			postEvento: Object,
		},
	};
</script>
