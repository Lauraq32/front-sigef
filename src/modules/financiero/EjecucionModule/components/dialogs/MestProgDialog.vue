<template>
	<CModal
		size="lg"
		backdrop="static"
		:visible="showModal"
		@close="closeDialog()"
	>
		<CModalHeader>
			<CModalTitle> Estructura Programática </CModalTitle>
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
				:items="mestProgList"
				:columns="columns"
				columnFilter
				itemsPerPageSelect
				:itemsPerPage="5"
				columnSorter
				:sorterValue="{ column: 'numero', state: 'asc' }"
				pagination
			>
				<template #status="{ item }">
					<td>
						<CBadge :color="getBadge(item.status)">{{
							item.status
						}}</CBadge>
					</td>
				</template>
				<template #organismoFinanciadorId="{ item }">
					<td>
						{{
							`${item.fuenteId}/${item.organismoFinanciadorId}/${item.fuenteEspecificaId}`
						}}
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
	import Api from '../../services/EjecucionServices';
	export default {
		components: {
			CSmartTable,
		},
		props: {
			showModal: Boolean,
		},
		data: () => {
			return {
				mestProgList: [],
				columns: [
					{ key: 'mestProgId', label: 'Estructura Programática' },
					{ key: 'nombre', label: 'Nombre' },
					{ key: 'organismoFinanciadorId', label: 'O/Fin' },
					{ key: 'pnap', label: 'Pnap' },
					{ key: 'programa', label: 'Programa' },
					{ key: 'proyecto', label: 'Proyecto' },
					{
						key: 'show_details',
						label: '',
						_style: { width: '1%' },
						filter: false,
						sorter: false,
					},
				],
				details: [],
			};
		},
		methods: {
			closeDialog(data) {
				this.$emit('closeMestProg', data);
			},
			getMestProg() {
				Api.getMestProgBadgered().then((response) => {
					this.mestProgList = response.data.data;
				});
			},
		},
		mounted() {
			this.getMestProg();
		},
	};
</script>

<style lang="scss" scoped></style>
