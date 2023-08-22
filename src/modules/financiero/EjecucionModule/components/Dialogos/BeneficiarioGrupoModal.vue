<template>
	<CModal
		size="sm"
		:visible="beneficiarioxGrupoModal"
		@close="closeModalGrupo"
		backdrop="static"
	>
		<CModalHeader>
			<CModalTitle>Beneficiario por Grupo</CModalTitle>
		</CModalHeader>
		<CModalBody>
			<CCardBody>
				<CForm
					class="needs-validation"
					novalidate
					:validated="grupoFormValidated"
					ref="formRef"
				>
					<CCol>
						<CFormLabel for="validationCustom05"
							>Grupo de Pago</CFormLabel
						>
						<v-select
							name="grupoCompensacionData"
							v-model="selectGrupoCompensancion"
							:options="grupoCompensacionList"
							required
						></v-select>
						<CFormFeedback
							invalid
							:style="{
								display:
									!postBeneficiarioGrupo.grupoCompensacionId &&
									validateField
										? 'flex'
										: 'none',
							}"
						>
							Favor agregar el campo
						</CFormFeedback>
					</CCol>
					<CCol>
						<CFormLabel for="validationCustom05"
							>Beneficiario</CFormLabel
						>
						<v-select
							v-model="selectBeneficiario"
							required
							:options="beneficiarioList"
						></v-select>
						<CFormFeedback
							invalid
							:style="{
								display:
									!postBeneficiarioGrupo.beneficiarioId &&
									validateField
										? 'flex'
										: 'none',
							}"
						>
							Favor agregar el campo
						</CFormFeedback>
					</CCol>
					<CCol>
						<CFormLabel for="validationCustom04"
							>Cargo Beneficiaro</CFormLabel
						>
						<CFormInput
							id="validationCustom04"
							@keypress="onlyLetter"
							required
							v-model="postBeneficiarioGrupo.cargoBeneficiario"
						>
						</CFormInput>
						<CFormFeedback invalid>
							Favor agregar el campo
						</CFormFeedback>
					</CCol>
					<CCol>
						<CFormLabel for="validationCustom04">
							Valor del Pago</CFormLabel
						>
						<CurrencyInput
							class="form-control text-end"
							@keypress="onlyNumber"
							required
							id="presupuestoBco1"
							v-model="postBeneficiarioGrupo.monto"
							:options="{
								locale: 'en-US',
								currency: 'USD',
								precision: 2,
								currencyDisplay: 'hidden',
							}"
						/>
						<CFormFeedback invalid>
							Favor agregar el campo
						</CFormFeedback>
					</CCol>
					<CModalFooter>
						<CButton
							class="btn btn-secondary"
							@click="closeModalGrupo"
						>
							Close
						</CButton>
						<CButton
							class="btn btn-info btn-block mt-1"
							v-on:click="saveBeneficiarioGrupo"
						>
							Guardar
						</CButton>
					</CModalFooter>
				</CForm>
			</CCardBody>
		</CModalBody>
	</CModal>
</template>

<script>
	import { CModal } from '@coreui/vue';
	import Api from '../../services/EjecucionServices';
	import { onlyLetter, onlyNumber } from '@/utils/validator';
	import { formatPrice } from '../../../../../utils/format';
	import CurrencyInput from '@/utils/CurrencyInput.vue';

	export default {
		name: 'BeneficiarioGrupoModal',
		components: {
			CModal,
			CurrencyInput,
		},
		emits: ['post-Beneficiariogrupo', 'close-modal'],
		data: function () {
			return {
				onlyLetter,
				onlyNumber,
				formatPrice,
				grupoFormValidated: false,
				validateField: false,
				grupoCompensacionList: [],
				beneficiarioList: [],
				postBeneficiarioGrupo: {
					grupoCompensacionId: 0,
					beneficiarioId: 0,
					cargoBeneficiario: null,
					monto: 0,
				},
				isLowerSelectedInitDate: false,
				fechaHataValidation: false,
			};
		},

		computed: {
			selectBeneficiario: {
				get() {
					console.log(
						this.beneficiarioList.find(
							(x) =>
								x.code ==
								this.postBeneficiarioGrupo.beneficiarioId,
						),
						this.postBeneficiarioGrupo.beneficiarioId,
					);
					return this.beneficiarioList.find(
						(x) =>
							x.elem.rncCedPas ==
								this.postBeneficiarioGrupo.beneficiarioId ||
							x.code == this.postBeneficiarioGrupo.beneficiarioId,
					);
				},
				set(util) {
					this.postBeneficiarioGrupo.beneficiarioId = Number(
						util?.code,
					);
				},
			},
			selectGrupoCompensancion: {
				get() {
					return this.grupoCompensacionList.find(
						(x) =>
							x.code ==
							this.postBeneficiarioGrupo.grupoCompensacionId,
					);
				},
				set(util) {
					this.postBeneficiarioGrupo.grupoCompensacionId = Number(
						util?.code,
					);
				},
			},
		},

		methods: {
			saveBeneficiarioGrupo() {
				this.grupoFormValidated = false;
				if (
					this.$refs.formRef.$el.checkValidity() &&
					this.postBeneficiarioGrupo.grupoCompensacionId
				) {
					this.$emit('post-Beneficiariogrupo', {
						...this.postBeneficiarioGrupo,
						beneficiarioId: Number(this.selectBeneficiario.code),
					});
					this.clearForm();
					return;
				}
				this.grupoFormValidated = true;
				this.validateField = true;
			},

			clearForm() {
				this.id = null;
				this.grupoFormValidated = false;
				(this.isLowerSelectedInitDate = false),
					(this.postBeneficiarioGrupo = {
						grupoCompensacionId: 0,
						beneficiarioId: 0,
						cargoBeneficiario: null,
						monto: 0,
					});
				this.validateField = false;
			},

			closeModalGrupo() {
				this.$emit('close-modal', false);
				this.clearForm();
			},

			getAllCompensacion() {
				Api.getGrupoCompensacionList().then(({ data: { data } }) => {
					this.grupoCompensacionList = data.map((elem) => ({
						code: elem.id,
						label: `${elem.id}-${elem.descripcion}`,
					}));
				});
			},

			getAllBeneficiarios() {
				Api.getBeneficiarios().then(({ data: { data } }) => {
					this.beneficiarioList = data.map((elem) => ({
						code: elem.id,
						label: `${elem.id}-${elem.nombre}`,
						elem,
					}));
				});
			},
		},

		mounted() {
			this.getAllCompensacion();
			this.getAllBeneficiarios();
			this.$refs.formRef?.$el?.checkValidity();
		},

		watch: {
			beneficiarioGroupToUpdate(newGroup) {
				if (newGroup) {
					this.postBeneficiarioGrupo = {
						...newGroup,
						grupoCompensacionId: newGroup.grupoCompensacion?.id,
						beneficiarioId: newGroup.beneficiario?.id,
					};
				}
			},
		},

		props: {
			beneficiarioxGrupoModal: Boolean,
			beneficiarioGroupToUpdate: null,
		},
	};
</script>
