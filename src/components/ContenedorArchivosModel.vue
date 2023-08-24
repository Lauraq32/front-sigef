<template>
	<div>
		<CModal
			backdrop="static"
			size="lg"
			:visible="showModal"
			@close="closeModal()"
		>
			<CModalHeader>
				<CModalTitle
					>Captura de Im&aacute;genes Asociadas al
					Documento</CModalTitle
				>
			</CModalHeader>
			<CModalBody>
				<div class="d-flex justify-content-end">
					<CButton
						type="button"
						color="info"
						class="btn btn-primary"
						@click="
							() => {
								showModalSaveDocument = true;
							}
						"
					>
						Agregar Documento</CButton
					>
				</div>
				<CSmartTable
					clickableRows
					:tableProps="{
						striped: true,
						hover: true,
					}"
					:tableHeadProps="{}"
					:activePage="1"
					:footer="footerItem"
					header
					:items="documentos"
					:columns="columns"
					tableFilter
					:itemsPerPage="7"
					table-filter-label="Filtrar:"
					table-filter-placeholder="Nombre, fecha, tipo de imagen"
					columnSorter
					:sorterValue="{ column: 'status', state: 'asc' }"
					pagination
				>
					<template #createdAt="{ item }">
						<td class="py-2">
							{{ formatDate(item.createdAt) }}
						</td>
					</template>
					<template #show_details="{ item }">
						<td class="py-2">
							<CButton
								color="primary"
								variant="outline"
								square
								size="sm"
								@click="seeImage(item.id)"
							>
								Ver
							</CButton>
						</td>
					</template>
				</CSmartTable>
			</CModalBody>
			<CModalFooter>
				<CButton color="secondary" @click="closeModal()"
					>Cerrar</CButton
				>
			</CModalFooter>
		</CModal>
		<CModal
			backdrop="static"
			size="lg"
			:visible="showModalSaveDocument"
			@close="closeModalSaveDocument"
		>
			<CModalHeader>
				<CModalTitle>Agregar Documento</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CForm
					class="flex flex-column"
					novalidate
					:validated="isFormEventTypeValidated"
					ref="eventTypeForm"
				>
					<div class="mb-2">
						<CFormInput
							v-model="fileName"
							type="text"
							label="Nombre"
							required
						/>
						<div class="my-2">
							<CFormLabel>Tipo de Documento</CFormLabel>
							<CFormSelect v-model="typeDocument" required>
								<option
									v-for="opt in optionsSelect"
									:value="opt"
									:key="opt"
								>
									{{ opt }}
								</option>
							</CFormSelect>
						</div>
						<CFormTextarea
							v-model="fileDescription"
							label="Descripci&oacute;n"
						/>
					</div>
					<div class="d-flex justify-content-center">
						<DropZone
							@fileSelected="selectedFile"
							:disableDrop="!!dropzoneFile"
						/>
					</div>
				</CForm>
			</CModalBody>
			<CModalFooter>
				<CButton color="secondary" @click="closeModalSaveDocument"
					>Cerrar</CButton
				>
				<CButton color="info" @click="sendData">Guardar</CButton>
			</CModalFooter>
		</CModal>
	</div>
</template>

<script>
	import { ref } from 'vue';
	import {
		CModal,
		CModalHeader,
		CModalTitle,
		CModalBody,
		CModalFooter,
	} from '@coreui/vue';
	import ApiFile from '../modules/rrhh/RegistroPersonal/services/Files';
	import { CSmartTable, CButton, CForm } from '@coreui/vue-pro';
	import DropZone from '@/components/DropZone.vue';
	import { formatDate } from '@/utils/format';
	import { useToastStore } from '@/store/toast';
	import { mapActions } from 'pinia';

	export default {
		components: {
			CModal,
			CSmartTable,
			CModalHeader,
			CModalTitle,
			CModalBody,
			CButton,
			DropZone,
			CForm,
			CModalFooter,
		},
		data: function () {
			return {
				filedata: {},
				fullscreenDemo: false,
				visible: false,
				showModalSaveDocument: false,
				documentos: [],
				typeDocument: '',
				fileName: '',
				fileDescription: '',
				footerItem: [
					{
						label: 'Total Items',
						_props: {
							colspan: 4,
							style: 'font-weight:bold;',
						},
					},
				],
				isFormEventTypeValidated: false,
				optionsSelect: [
					'Documento Personal',
					'Certificado',
					'Documento de Estudio',
					'Contrato',
					'Otros',
				],
				columns: [
					{
						key: 'name',
						label: 'Nombre',
						_style: { width: '55%' },
					},
					{
						key: 'createdAt',
						label: 'Fecha',
						sorter: false,
						_style: { width: '20%' },
					},
					{
						key: 'contentType',
						label: 'Tipo',
						_style: { width: '20%' },
					},
					{
						key: 'show_details',
						label: '',
						_style: { width: '5%' },
						filter: false,
						sorter: false,
					},
				],
				formatDate,
			};
		},
		methods: {
			...mapActions(useToastStore, ['show']),
			closeModal() {
				this.$emit('closeModal', false);
			},
			closeModalSaveDocument() {
				this.showModalSaveDocument = false;
				this.clearForm();
			},
			sendData() {
				this.isFormEventTypeValidated = false;
				if (this.$refs.eventTypeForm.$el.checkValidity()) {
					return this.postDocumentos();
				}
				this.isFormEventTypeValidated = true;

				if (!this.dropzoneFile) {
					this.show({
						content:
							'Para guardar un registro, debe tener un documento asociado',
						closable: true,
						color: 'danger',
						class: 'text-white',
					});
				}
			},
			postDocumentos() {
				if (this.tagKeyName && this.tagValueName && this.dropzoneFile) {
					const formData = new FormData();
					formData.append(this.tagKeyName, this.tagValueName);
					formData.append('fileCustomName', this.fileName);
					formData.append(
						'fileCustomDescription',
						this.fileDescription,
					);
					formData.append('fileCustomtype', this.typeDocument);
					formData.append('file', this.dropzoneFile);
					ApiFile.saveFile(formData)
						.then(() => {
							this.getFilesByRelationKey(
								this.tagKeyName,
								this.tagValueName,
							);
							this.show({
								content: 'Imagen guardada correctamente',
								closable: true,
							});
							this.clearForm();
						})
						.catch((e) => {
							this.show({
								content: e.response.data,
								closable: true,
								color: 'danger',
								class: 'text-white',
							});
						});
				}

				if (!this.dropzoneFile) {
					this.show({
						content:
							'Para guardar un registro, debe tener un documento asociado',
						closable: true,
						color: 'danger',
						class: 'text-white',
					});
				}
			},
			clearForm() {
				this.fileName = '';
				this.fileDescription = '';
				this.dropzoneFile = null;
			},
			toggle(index) {
				this.documentos[index].visible =
					!this.documentos[index].visible;
			},
			getFilesByRelationKey(key, id) {
				ApiFile.getFiles({
					tag: { [key]: id },
				}).then((response) => {
					this.documentos = response.data.data?.filter(
						(image) =>
							!image.fileTags.find(
								(tag) =>
									`${tag.key}-${tag.value}` ===
									'profileImage-1',
							),
					);
					this.footerItem[0].label = `Total Items ${this.documentos.length}`;
				});
			},
			seeImage(id) {
				ApiFile.getFileById(id)
					.then((response) => {
						window.open(response, '_blank');
					})
					.catch(() => {
						this.show({
							content: 'No se pudo leer el documento',
							closable: true,
							color: 'danger',
							class: 'text-white',
						});
					});
			},
		},
		setup() {
			let dropzoneFile = ref('');
			const selectedFile = (file) => {
				dropzoneFile.value = file;
			};
			return { dropzoneFile, selectedFile };
		},
		watch: {
			showModal() {
				if (this.showModal && this.tagValueName && this.tagKeyName) {
					this.getFilesByRelationKey(
						this.tagKeyName,
						this.tagValueName,
					);
				}
			},
		},
		props: {
			showModal: Boolean,
			tagKeyName: String,
			tagValueName: {
				type: Number,
				default: () => 0,
			},
		},
	};
</script>
<style scoped>
	.file-select > .select-button {
		padding: 0.5rem;

		line-height: 1.5;
		color: white;
		background-color: #375b80;

		border-radius: 0.3rem;
		cursor: pointer;
		text-align: center;
	}

	.file-select > input[type='file'] {
		display: none;
	}
</style>
