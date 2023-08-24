<template>
	<CCard class="on-top mb-4">
		<CCardBody class="d-flex justify-content-between align-items-center">
			<div class="d-inline-flex gap-3 align-items-center">
				<section class="d-flex gap-1" v-if="showFiscalYearList">
					<label
						class="form-label col-auto col-form-label"
						for="fiscalYearSelect"
						>A&ntilde;o Fiscal</label
					>
					<CFormSelect
						id="fiscalYearSelect"
						v-model="selectedFiscalYear"
						@change="setFiscalYear"
						aria-label="Selecionar año fiscal"
						:options="fiscalYearList"
					>
					</CFormSelect>
					<div class="form-label col-auto col-form-label">
						<CBadge
							class="d-block mt-1"
							:color="determineColor(text)"
							v-for="text of selectedFiscalYearInfo"
							:key="text"
							>{{ text }}</CBadge
						>
					</div>
				</section>
				<div>
					<slot name="left-options"></slot>
				</div>
			</div>
			<div class="d-flex gap-3 align-items-center">
				<slot></slot>
				<CDropdown
					variant="btn-group"
					v-if="actions.length"
					class="z-3"
					key="btn_actions"
				>
					<CDropdownToggle color="light">Acciones</CDropdownToggle>
					<CDropdownMenu>
						<CDropdownItem
							v-for="(action, index) in actions"
							:key="`${index}-item`"
							href="javascript:void(0)"
						>
							<FileSelector
								v-if="action.type === 'upload'"
								:title="action.label"
								:key="index"
								:icon="action.icon"
								@fileSelected="
									catchFileSelection(
										$event,
										action.accionHandler,
									)
								"
							/>
							<span
								class="d-inline-block w-100"
								v-else
								@click="action.accionHandler"
							>
								<CIcon
									v-if="action.icon"
									:icon="action.icon"
									size="sm"
								/>
								{{ action.label }}
							</span>
						</CDropdownItem>
					</CDropdownMenu>
				</CDropdown>
			</div>
		</CCardBody>
	</CCard>
</template>
<script>
	import { mapActions, mapStores, mapState } from 'pinia';
	import { useAuthStore } from '@/store/AuthStore';
	import FileSelector from '@/components/FileSelector.vue';

	export default {
		name: 'AppAccionHeader',
		components: {
			FileSelector,
		},

		props: {
			actions: {
				type: Array,
				default: () => [],
			},
			showFiscalYearList: {
				type: Boolean,
				default: () => true,
			},
		},

		data: function () {
			return {
				selectedFiscalYear: '',
			};
		},

		computed: {
			...mapStores(useAuthStore),
			...mapState(useAuthStore, ['authInfo']),
			fiscalYearList() {
				return this.authInfo.fiscalListYears
					.map((yearFiscal) => {
						return {
							label: `(${yearFiscal.id}) - ${yearFiscal.anio}`,
							value: yearFiscal.id,
							info: yearFiscal,
						};
					})
					.sort(
						(first, second) => second.info.anio - first.info.anio,
					);
			},
			selectedFiscalYearInfo() {
				const fy = this.fiscalYearList.find(
					(fy) => fy.value === Number(this.selectedFiscalYear),
				);
				if (fy) {
					return [
						fy.info.estatus,
						fy.info.esAprobado ? 'Aprobado' : null,
					].filter(Boolean);
				}

				return [];
			},
		},
		methods: {
			...mapActions(useAuthStore, ['changeFiscalYear']),

			setFiscalYear({ target: { value } }) {
				this.changeFiscalYear(Number(value));
				this.$router.go();
			},
			catchFileSelection(event, callback) {
				callback(event);
			},
			determineColor(badgeText) {
				if (/cerrado|aprobado/i.test(badgeText)) {
					return 'danger';
				}
				if (/actual/i.test(badgeText)) {
					return 'success';
				}

				return 'dark';
			},
		},
		mounted() {
			this.selectedFiscalYear = `${this.authInfo.currentFiscalYearId}`;
		},
	};
</script>
<style>
	.on-top {
		z-index: 1028;
	}
</style>
