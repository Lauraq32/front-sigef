<template>
	<h3 class="text-center mb-3">Inventario de &Uacute;tiles</h3>

	<div class="table-headers">
		<div class="d-inline p-2">
			<CButton
				color="info"
				@click="
					() => {
						showInventario = true;
					}
				"
				>Agregar</CButton
			>
		</div>
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
		:items="inventario"
		:columns="columns"
		columnFilter
		itemsPerPageSelect
		:itemsPerPage="5"
		columnSorter
		:sorterValue="{ column: 'descripcion', state: 'asc' }"
		pagination
		no-items-label="No hay útiles registrados"
	>
		<template #cantidad="{ item }">
			<td class="text-end">
				{{ formatNumber(item.cantidad) }}
			</td>
		</template>

		<template #show_details="{ item }">
			<td>
				<CButton
					color="info"
					variant="outline"
					@click="
						() => {
							inventarioSeleccionado = item;
							showInventario = true;
						}
					"
				>
					Editar
				</CButton>
			</td>
		</template>
	</CSmartTable>

	<InventarioDialog
		:inventario="inventarioSeleccionado"
		:showModal="showInventario"
		@closeModal="closeModal"
		@saveInventario="saveInventario"
	/>
</template>
<script>
	import { CSmartTable } from '@coreui/vue-pro';
	import Api from '../services/RegistroPersonalServices';
	import InventarioDialog from './Dialogos/InventarioDialog.vue';
	import { useToastStore } from '@/store/toast';
	import { mapActions } from 'pinia';
	import { formatNumber } from '@/utils/format';

	export default {
		components: {
			CSmartTable,
			InventarioDialog,
		},
		data: () => {
			return {
				formatNumber,
				inventario: [],
				inventarioSeleccionado: {
					descripcion: null,
					tipo: 'deducible',
					cantidad: 1,
				},
				showInventario: false,

				columns: [
					{
						key: 'descripcion',
						label: 'Descripción',
						_style: { width: '60%' },
					},
					{ key: 'tipo', label: 'Tipo', _style: { width: '20%' } },
					{
						key: 'cantidad',
						label: 'Existencia',
						_style: { width: '15%' },
					},
					{
						key: 'show_details',
						label: '',
						_style: { width: '5%' },
						filter: false,
						sorter: false,
					},
				],
				footerItem: [
					{
						label: 'Total Items',
						_props: {
							colspan: 3,
							style: 'font-weight:bold;',
						},
					},
				],
			};
		},

		methods: {
			...mapActions(useToastStore, ['show']),
			getInventario() {
				Api.getAllInventario().then((response) => {
					this.inventario = response.data.data;
				});
			},

			closeModal(close) {
				this.showInventario = close;
				this.inventarioSeleccionado = {
					descripcion: null,
					tipo: 'deducible',
					cantidad: 1,
				};
			},

			saveInventario(payload) {
				if (payload.id) {
					return void Api.putInventario(payload.id, payload)
						.then(() => {
							setTimeout(this.getInventario, 500);
							this.show({
								content: 'Registro modificado',
								closable: true,
								time: 3000,
							});
							this.closeModal(false);
						})
						.catch((error) => {
							this.show({
								content: error.data,
								closable: true,
								color: 'danger',
								class: 'text-white',
							});
						});
				}

				Api.postInventario(payload)
					.then(() => {
						setTimeout(this.getInventario, 500);
						this.show({
							content: 'Registro agregado',
							closable: true,
							time: 3000,
						});
					})
					.catch((error) => {
						this.show({
							content: error.data,
							closable: true,
							color: 'danger',
							class: 'text-white',
						});
					});
			},
		},
		mounted() {
			this.getInventario();
		},
	};
</script>
