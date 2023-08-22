<template>
	<CModal
		@close="closeModalFpMetaDetalle"
		backdrop="static"
		size="md"
		:visible="modalFpMetaDetalle"
	>
		<CModalHeader>
			<CModalTitle>Agregar Fp Metas Detalle</CModalTitle>
		</CModalHeader>
		<CModalBody>
			<CForm
				novalidate
				:validated="isFormEventTypeValidated"
				ref="eventTypeForm"
			>
				<div class="d-flex flex-column justify-content-center gap-2">
					<div>
						<label for="estimadoAnioActual" class="font-weight-bold"
							>Estimado A&ntilde;o Actual</label
						>
						<CFormInput
							size="sm"
							@keypress="onlyNumber"
							id="estimadoAnioActual"
							v-model.number="fpMetaDetalle.estimadoAnioActual"
							type="number"
							required
						/>
					</div>
					<div>
						<label
							for="programadoAnioSiguiente"
							class="font-weight-bold"
							>Programado A&ntilde;o Siguiente</label
						>
						<CFormInput
							size="sm"
							id="programadoAnioSiguiente"
							@keypress="onlyNumber"
							v-model.number="
								fpMetaDetalle.programadoAnioSiguiente
							"
							type="number"
							required
						/>
					</div>
					<div>
						<label for="unidadMedida" class="font-weight-bold"
							>Unidad Medida</label
						>
						<CFormInput
							size="sm"
							id="unidadMedida"
							v-model="fpMetaDetalle.unidadMedida"
							required
						/>
					</div>
					<div>
						<label for="unidadMedida" class="font-weight-bold"
							>Descripci&oacute;n</label
						>
						<CFormTextarea
							rows="4"
							v-model="fpMetaDetalle.descripcion"
							required
						></CFormTextarea>
					</div>
				</div>
			</CForm>
		</CModalBody>
		<CModalFooter
			class="d-flex flex-row justify-content-end align-items-end"
		>
			<CButton size="sm" color="primary" class="mb-3" @click="sendData"
				>Agregar</CButton
			>
		</CModalFooter>
	</CModal>
</template>
<script>
	import { onlyNumber } from '@/utils/validator';
	import { CModal, CForm } from '@coreui/vue';
	import { CFormInput } from '@coreui/vue-pro';

	export default {
		data: function () {
			return {
				fpMetaDetalle: {
					descripcion: null,
					unidadMedida: null,
					estimadoAnioActual: null,
					programadoAnioSiguiente: null,
				},
				isFormEventTypeValidated: false,
				onlyNumber,
			};
		},
		components: { CModal, CFormInput, CForm },
		props: {
			modalFpMetaDetalle: Boolean,
		},
		methods: {
			closeModalFpMetaDetalle() {
				this.$emit('closeModalFpMetaDetalle', false);
				this.clearForm();
			},
			getFpMetaDetalles() {
				this.$emit('getFpMetaDetalles', this.fpMetaDetalle);
				this.clearForm();
			},
			clearForm() {
				this.fpMetaDetalle = {
					descripcion: null,
					unidadMedida: null,
					estimadoAnioActual: null,
					programadoAnioSiguiente: null,
				};
			},
			sendData() {
				this.isFormEventTypeValidated = false;
				if (this.$refs.eventTypeForm.$el.checkValidity()) {
					this.getFpMetaDetalles();
				}
				this.isFormEventTypeValidated = true;
			},
		},
	};
</script>
=
