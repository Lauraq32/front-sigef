<template>
	<h3 class="text-center mb-4">Profesiones</h3>
	<div class="table-headers mb-4 gap-1">
		<CButton
			color="info"
			@click="
				() => {
					newProfesionesModal = true;
				}
			"
			>Agregar</CButton
		>
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
		:footer="footerItem"
		header
		:items="profesiones"
		:columns="columns"
		columnFilter
		itemsPerPageSelect
		:itemsPerPage="5"
		:sorterValue="{ column: 'name', state: 'asc' }"
		pagination
	>
		<template #show_details="{ item }">
			<td class="py-2">
				<CButton
					class="mt-1"
					color="primary"
					variant="outline"
					square
					size="sm"
					@click="editProfesion(item)"
					>Editar</CButton
				>
			</td>
		</template>
	</CSmartTable>
	<ProfesionesDialogs
		:newProfesionesModal="newProfesionesModal"
		@close-modal="closeModal"
		@post-profesiones="saveProfesion"
		:profesionId="profesionId"
	/>
</template>
<script>
	import { CSmartTable } from '@coreui/vue-pro';
	import { mapActions } from 'pinia';
	import Api from '../services/RegistroPersonalServices';
	import ProfesionesDialogs from './Dialogos/ProfesionesModal.vue';
	import { useToastStore } from '@/store/toast';
	export default {
		components: {
			CSmartTable,
			ProfesionesDialogs,
		},
		data: () => {
			return {
				profesionId: null,
				validatedCustom01: null,
				profesiones: [],
				newProfesionesModal: false,
				columns: [
					{
						key: 'name',
						label: 'Profesión',
						_style: { width: '40%' },
					},
					{
						key: 'show_details',
						label: '',
						_style: { width: '1%' },
						filter: false,
						sorter: false,
					},
				],
				footerItem: [
					{
						label: 'Total Items',
						_props: {
							colspan: 2,
							style: 'font-weight:bold;',
						},
					},
				],
			};
		},
		watch: {
			profesion() {
				this.getAllProfesiones();
			},
		},
		methods: {
			...mapActions(useToastStore, ['show']),
			closeModal() {
				this.newProfesionesModal = false;
			},
			editProfesion(item) {
				this.profesionId = item.id;
				this.newProfesionesModal = true;
			},
			saveProfesion(payload) {
				if (this.profesionId != null) {
					Api.updateProfesion(this.profesionId, payload)
						.then(() => {
							this.show({
								content: 'Registro actualizado correctamente',
								closable: true,
								life: 7_500,
							});
							setTimeout(() => this.getAllProfesiones(), 200);
						})
						.catch((error) => {
							return this.show({
								content: error.response.data,
								closable: true,
								color: 'danger',
							});
						});
				} else {
					Api.addProfesion(payload)
						.then(() => {
							this.show({
								content: 'Registro añadido correctamente',
								closable: true,
								life: 7_500,
							});
							setTimeout(() => this.getAllProfesiones(), 200);
						})
						.catch((error) => {
							return this.show({
								content: error.response.data,
								closable: true,
								color: 'danger',
							});
						});
				}
			},
			getAllProfesiones() {
				Api.getProfesion().then((response) => {
					this.profesiones = response.data.data;
					this.footerItem[0] = `Total Items ${response.data.data.length}`;
				});
			},
		},
		mounted() {
			this.getAllProfesiones();
		},
	};
</script>
