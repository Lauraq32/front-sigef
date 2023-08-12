<template>
	<h3 class="text-center mb-4">Concepto del Gasto</h3>

	<div class="table-headers">
		<div class="d-inline p-2">
			<CButton class="text-right" color="info" @click="openGastoModal"
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
		key="ingreso.id"
		:items="cenceptoGastos"
		:columns="columns"
		itemsPerPageSelect
		columnFilter
		:itemsPerPage="10"
		:items-per-page-label="'Artículos por página:'"
		:items-per-page-options="[10, 20, 50, 100, 150]"
		columnSorter
		:sorterValue="{ column: 'descripcion', state: 'asc' }"
		pagination
	>
		<template #show_details="{ item }">
			<td>
				<div class="d-flex gap-1">
					<CButton
						color="primary"
						variant="outline"
						size="sm"
						@click="setConceptoGastoAndShowModal(item)"
					>
						<CIcon icon="cilPencil" size="xl" />
					</CButton>
					<CButton
						color="danger"
						variant="ghost"
						size="sm"
						@click="deleteConceptoGasto(item.id)"
					>
						<CIcon icon="cilTrash" size="xl" />
					</CButton>
				</div>
			</td>
		</template>
	</CSmartTable>

	<ConceptoGastoModal
		:showModal="showConceptoGastoModal"
		@closeModal="closeModal"
		:conceptoGastoItem="conceptoGastoItem"
		@post-conceptoGasto="submitConceptoGasto"
	/>
</template>
<script>
	import { CSmartTable } from '@coreui/vue-pro';
	import Api from '../services/EjecucionServices';
	import { mapActions, mapStores, mapState } from 'pinia';
	import { CIcon } from '@coreui/icons-vue';
	import { useToastStore } from '@/store/toast';
	import { useAuthStore } from '@/store/AuthStore';
	import { formatPrice } from '../../../../utils/format';
	import ConceptoGastoModal from './Dialogos/ConceptoGastoModal.vue';
	import Swal from 'sweetalert2/dist/sweetalert2.js';

	export default {
		components: {
			CSmartTable,
			CIcon,
			ConceptoGastoModal,
		},
		data: function () {
			return {
				conceptoGastoItem: null,
				cenceptoGastos: [],
				showConceptoGastoModal: false,
				footerItem: [
					{
						label: 'Total Items',
						_props: {
							color: '',
							colspan: 3,
							style: 'font-weight:bold;',
						},
					},
				],
				columns: [
					{ key: 'id', label: 'Id', _style: { width: '10%' } },
					{ key: 'descripcion', label: 'Descripción' },
					{
						key: 'show_details',
						label: '',
						_style: { width: '10%' },
						filter: false,
						sorter: false,
					},
				],
				formatPrice,
			};
		},
		methods: {
			...mapActions(useToastStore, ['show']),

			openGastoModal() {
				this.showConceptoGastoModal = true;
			},

			submitConceptoGasto(payload) {
				if (!payload.id) {
					Api.postConceptoGasto(payload)
						.then((response) => {
							this.show({
								content: response.data.message,
								closable: true,
							});
							setTimeout(this.getConceptoGasto(), 200);
							this.conceptoGastoItem = {};
						})
						.catch((error) => {
							this.show({
								content: error.response.data,
								closable: true,
								color: 'danger',
								class: 'text-white',
							});
						});
					return;
				}
				Api.putConceptoGasto(payload.id, payload)
					.then((response) => {
						this.show({
							content: response.data.message,
							closable: true,
						});
						setTimeout(this.getConceptoGasto(), 200);
						this.closeModal();
					})
					.catch((error) => {
						this.show({
							content: error.response.data,
							closable: true,
							color: 'danger',
							class: 'text-white',
						});
					});
			},

			getConceptoGasto() {
				Api.getConceptoGasto().then((response) => {
					this.cenceptoGastos = response.data.data;
					this.footerItem[0].label = `Total items: ${response.data.data.length}`;
				});
			},

			closeModal() {
				this.showConceptoGastoModal = false;
				this.conceptoGastoItem = {};
			},

			setConceptoGastoAndShowModal(item) {
				this.conceptoGastoItem = { ...item };
				this.showConceptoGastoModal = true;
			},

			deleteConceptoGasto(id) {
				Swal.fire({
					position: 'center',
					icon: 'warning',
					title: `Estás usted seguro que quieres eliminar el concepto?`,
					showConfirmButton: true,
					confirmButtonText: 'Si',
					cancelButtonText: 'No',
					showCancelButton: true,
					allowEscapeKey: false,
					allowOutsideClick: false,
				}).then((answer) => {
					if (answer.isConfirmed) {
						Api.deleteConceptoGasto(id)
							.then((response) => {
								this.show({
									content: response.data.message,
									closable: true,
								});
								setTimeout(this.getConceptoGasto(), 200);
							})
							.catch((error) => {
								this.show({
									content: error.response.data,
									closable: true,
									color: 'danger',
									class: 'text-white',
								});
							});
					}
				});
			},
		},

		computed: {
			...mapStores(useAuthStore),
			...mapState(useAuthStore, ['authInfo']),
		},

		mounted() {
			this.getConceptoGasto();
		},
	};
</script>
