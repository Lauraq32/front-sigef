<template>
	<CModal
		@close="() => closeFiltro()"
		:visible="showFiltro"
		backdrop="static"
	>
		<CModalHeader>
			<CModalTitle>Filtro</CModalTitle>
		</CModalHeader>
		<CModalBody>
			<div class="m-2">
				<CFormLabel>Cuenta Banco</CFormLabel>
				<CFormSelect
					v-model="filtroValue.CuentaBanco"
					@change="filtrarElementos"
				>
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
			<div class="m-2">
				<CFormLabel>Etapa</CFormLabel>
				<CFormSelect
					v-model="filtroValue.etapa"
					@change="filtrarElementos"
				>
					<option value="">Todas las etapas</option>
					<option value="Devengado">Devengado</option>
					<option value="Pagado">Pagado</option>
					<option value="Variacion">Variaci&oacute;n</option>
				</CFormSelect>
			</div>
			<div class="m-2">
				<CFormLabel>Fecha Desde</CFormLabel>
				<AppDateField
					class="form-control"
					v-model="filtroValue.FechaDesde"
				/>
			</div>
			<div class="m-2">
				<CFormLabel>Fecha Hasta</CFormLabel>
				<AppDateField
					class="form-control"
					v-model="filtroValue.FechaHasta"
				/>
			</div>
		</CModalBody>

		<CModalFooter>
			<CButton @click="() => closeFiltro()" class="btn btn-secondary">
				Cancelar
			</CButton>
			<CButton @click="closeFiltro" color="info"> Filtrar </CButton>
		</CModalFooter>
	</CModal>
</template>

<script>
	import AppDateField from '@/components/AppDateField.vue';
	import CuentaService from '@/modules/rrhh/RegistroPersonal/services/DeparmentServices';
	import { fiscalYearInfo } from '@/utils/logged-info';

	export default {
		name: 'filtroRegistroGasto',

		components: {
			AppDateField,
		},

		data: () => {
			return {
				fiscalYearInfo,
				cuentasBanco: [],
				filtroValue: {
					CuentaBanco: null,
					etapa: null,
					FechaDesde: Date.now(),
					FechaHasta: null,
				},
			};
		},

		methods: {
			getServiciosRequeridos() {
				this.filtroValue.FechaHasta = new Date(
					`${this.fiscalYearInfo().anio}-01-01`,
				);
				CuentaService.getCuentasDeBancos().then((response) => {
					this.cuentasBanco = response.data.data;
				});
			},

			closeFiltro(event) {
				if (!event) {
					this.$emit('close');
					return;
				}
				const result = Object.keys(this.filtroValue).reduce(
					(acc, key) => {
						if (this.filtroValue[key]) {
							acc[key] =
								key === 'estatus'
									? this.filtroValue[key] === 'activo'
									: this.filtroValue[key];
						}
						return acc;
					},
					{},
				);
				this.$emit('close', result);
				this.clearModal();
			},

			clearModal() {
				this.filtroValue = {
					etapa: null,
					detalle: null,
					FechaDesde: null,
					FechaHasta: 'activo',
				};
			},
		},

		mounted() {
			this.getServiciosRequeridos();
		},

		props: {
			showFiltro: Boolean,
		},
	};
</script>
