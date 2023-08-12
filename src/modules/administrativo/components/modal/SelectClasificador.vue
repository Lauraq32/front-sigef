<template>
	<CModal
		size="lg"
		backdrop="static"
		:visible="showModal"
		@close="closeDialog()"
	>
		<CModalHeader>
			<CModalTitle> Clasificador del Gasto </CModalTitle>
		</CModalHeader>
		<CModalBody>
			<CSmartTable
				clickableRows
				:tableProps="{
					striped: true,
					hover: true,
				}"
				:tableHeadProps="{}"
				:activePage="1"
				header
				:items="calsificadorList"
				:columns="columns"
				columnFilter
				itemsPerPageSelect
				:itemsPerPage="5"
				columnSorter
				:sorterValue="{ column: 'status', state: 'asc' }"
				pagination
			>
				<template #status="{ item }">
					<td>
						<CBadge :color="getBadge(item.status)">{{
							item.status
						}}</CBadge>
					</td>
				</template>
				<template #show_details="{ item }">
					<td class="py-2">
						<div class="d-flex justify-content-around">
							<CButton
								class="mt-1"
								color="primary"
								variant="outline"
								square
								size="sm"
								@click="closeDialog(item)"
							>
								Seleccionar</CButton
							>
						</div>
					</td>
				</template>
			</CSmartTable>
		</CModalBody>
	</CModal>
</template>

<script>
	import { CSmartTable } from '@coreui/vue-pro';
	import Api from '../../services/FormulacionServices';
	export default {
		components: {
			CSmartTable,
		},
		props: {
			showModal: {
				type: Boolean,
				default: () => false,
			},
		},
		data: () => {
			return {
				calsificadorList: [],
				columns: [
					{ key: 'clasifica', label: 'Clasificador' },
					{ key: 'nombre', label: 'Nombre' },
					{
						key: 'ctgFuenteEspecificaId',
						label: 'Fuente Especifica',
					},
					{
						key: 'ctgOrganismoFinanciadorId',
						label: 'Organismo Financiador',
					},
					{
						key: 'show_details',
						label: '',
						_style: { width: '1%' },
						filter: false,
						sorter: false,
						// _props: { color: 'primary', class: 'fw-semibold'}
					},
				],
				details: [],
			};
		},
		methods: {
			closeDialog(data) {
				if (data) {
					this.$emit('closeClasificador', data);
					return;
				}
				this.$emit('closeClasificador');
			},
			getClasificadores() {
				Api.getClasificadorGasto().then((response) => {
					this.calsificadorList = response.data.data;
				});
			},
		},
		mounted() {
			this.getClasificadores();
		},
	};
</script>

<style lang="scss" scoped></style>
