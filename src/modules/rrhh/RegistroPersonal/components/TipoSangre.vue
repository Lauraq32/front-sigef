<template>
	<h3 class="text-center mb-4">Tipo de Sangre</h3>

	<div class="table-headers mb-4">
		<CButton color="secondary">Imprimir</CButton>
	</div>
	<CSmartTable
		class="sticky-top"
		clickableRows
		:tableProps="{
			striped: true,
			hover: true,
		}"
		:tableHeadProps="{}"
		:activePage="1"
		footer="footerItem"
		header
		:items="sangres"
		:columns="columns"
		columnFilter
		columnSorter
		:sorterValue="{ column: 'nombre', state: 'asc' }"
	>
	</CSmartTable>
</template>

<script>
	import { CSmartTable } from '@coreui/vue-pro';
	import Api from '../services/RegistroPersonalServices';

	export default {
		components: {
			CSmartTable,
		},
		data: () => {
			return {
				sangres: [],
				columns: [
					{
						key: 'nombre',
						label: 'Tipo de Sangre',
						_style: { width: '40%' },
					},
				],
			};
		},
		methods: {
			getAllSangre() {
				Api.tipoSangreList().then((response) => {
					this.sangres = response.data.data;
				});
			},
		},
		mounted() {
			this.getAllSangre();
		},
	};
</script>
