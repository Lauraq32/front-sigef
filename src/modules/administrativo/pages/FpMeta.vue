<template>
	<CContainer>
		<h1 class="mb-3 text-cente, CSmartTabler">Formulario FP-04</h1>
		<AppAccionHeader :actions="pageActions">
			<CButton
				color="secondary"
				class="mb-3"
				@click="() => (showModalFpMeta = true)"
				>Agregar Nuevo</CButton
			>
		</AppAccionHeader>
		<div class="d-flex flex-row justify-content-end align-items-end"></div>
		<div>
			<CSmartTable
				class="sticky-top"
				clickableRows
				:tableProps="{
					striped: true,
					hover: true,
				}"
				:tableHeadProps="{}"
				:activePage="1"
				header
				:items="fpMetas"
				:columns="tableColumnsFpMetas"
				itemsPerPageSelect
				:itemsPerPage="10"
				columnSorter
				:sorterValue="{ column: 'status', state: 'asc' }"
				pagination
			>
				<template #numero="{ item }">
					<td class="py-2">
						{{ item.estructuraProgramatica.numero }}
					</td>
				</template>
				<template #nombre="{ item }">
					<td class="py-2">
						{{ item.estructuraProgramatica?.nombre }}
					</td>
				</template>
				<template #show_details="{ item }">
					<td class="py-2">
						<CDropdown>
							<CDropdownToggle color="primary" variant="outline"
								>Acciones</CDropdownToggle
							>
							<CDropdownMenu>
								<CDropdownItem
									v-for="action in buttonActions"
									:key="action.label"
									@click="
										action.clickHandler &&
											action.clickHandler(item)
									"
									>{{ action.label }}
								</CDropdownItem>
							</CDropdownMenu>
						</CDropdown>
					</td>
				</template>
			</CSmartTable>
		</div>
	</CContainer>
	<FpMetaModal
		:modalFpMeta="showModalFpMeta"
		:fpMetaProps="fpMeta"
		:estructuraProps="estructura"
		@closeModalFpMeta="getCloseModalFpMeta"
		@update="getFpMetas"
	/>
</template>
<script>
	import { CContainer, CSmartTable } from '@coreui/vue-pro';
	import { mapActions } from 'pinia';
	import { useToastStore } from '@/store/toast';
	import { showReport } from '@/utils/util';
	import FpMetaModal from '../components/modal/FpMetaModal.vue';
	import AdministrativoApi from '../services/FormulacionServices';
	import AppAccionHeader from '../../../components/AppActionHeader.vue';

	export default {
		components: { CContainer, CSmartTable, FpMetaModal, AppAccionHeader },
		data: function () {
			return {
				tableColumnsFpMetas: [
					{
						key: 'descripcion',
						label: 'Descripción',
						_style: { width: '40%' },
					},
					{
						key: 'nombre',
						label: 'Unidad Responsable',
						_style: { width: '25%' },
					},
					{
						key: 'numero',
						label: 'Estructura Programática',
						_style: { width: '20%' },
					},
					{
						key: 'show_details',
						label: '',
						_style: { width: '15%' },
						filter: false,
						sorter: false,
					},
				],
				buttonActions: [
					{
						label: 'Ver Detalles',
						clickHandler: (item) => {
							this.verDetalle(item);
						},
					},
					{
						label: 'Imprimir',
						clickHandler: async (item) => {
							await this.printReportReciboIngreso(item);
						},
					},
				],
				fpMetas: [],
				fpMeta: null,
				estructura: null,
				showModalFpMeta: false,
				mestProgDialog: false,
				isFormEventTypeValidated: false,
			};
		},
		methods: {
			getCloseModalFpMeta(value) {
				this.showModalFpMeta = value;
				this.fpMeta = {
					estructuraProgramaticaId: '',
					descripcion: null,
					fpMetaDetalles: [],
				};
				this.estructura = {
					nombreEstructura: '',
					programa: '',
					ctgFuncionId: '',
					unidadRespon: '',
					actObra: '',
					proyecto: '',
				};
			},
			getFpMetas() {
				AdministrativoApi.getFpMetaAndDetalle().then(({ data }) => {
					this.fpMetas = data.data;
				});
			},
			verDetalle(value) {
				this.fpMeta = value;
				this.fpMeta.estructuraProgramaticaId =
					value.estructuraProgramatica?.numero;
				this.estructura = value.estructuraProgramatica;
				this.showModalFpMeta = true;
			},
			async printReportReciboIngreso(item) {
				try {
					await showReport({
						folderName: 'fep',
						reportName: 'Rep_FP04_Metas',
						params: [
							{
								name: 'ANO',
								value: 'fiscalYear',
							},
							{
								name: 'CAPITULO_AYTO',
								value: 'majorityId',
							},
							{
								name: 'META_ID',
								value: item?.id,
							},
						],
					});
				} catch (error) {
					this.show({
						content: error,
						closable: true,
						color: 'danger',
						class: 'text-white',
					});
				}
			},
			...mapActions(useToastStore, ['show']),
		},
		mounted() {
			this.getFpMetas();
		},
	};
</script>
