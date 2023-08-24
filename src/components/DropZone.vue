<template>
	<div
		@dragenter.prevent="toggleActive"
		@dragleave.prevent="toggleActive"
		@dragover.prevent
		@drop.prevent="drop"
		:class="{ 'active-dropzone': active }"
		class="dropzone"
	>
		<span>Arrastrar y Soltar Archivo</span>
		<span>O</span>
		<label for="dropzoneFile">Seleccionar Archivo</label>
		<input
			type="file"
			id="dropzoneFile"
			class="dropzoneFile"
			required
			@change="drop"
		/>
	</div>
</template>

<script>
	import { ref, watchEffect } from 'vue';
	export default {
		name: 'DropZone',
		emits: ['fileSelected'],
		props: {
			disableDrop: Boolean,
		},
		setup(props, context) {
			const active = ref(false);
			const toggleActive = () => {
				active.value = !active.value;
			};
			const drop = (e) => {
				active.value = true;
				context.emit(
					'fileSelected',
					e.dataTransfer?.files?.[0] ?? e.target?.files?.[0],
				);
			};
			watchEffect(() => {
				if (!props.disableDrop) {
					active.value = false;
				}
			});
			return { active, toggleActive, drop };
		},
	};
</script>

<style scoped>
	.dropzone {
		width: 400px;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		row-gap: 16px;
		border: 2px dashed #375b80;
		background-color: #fff;
		transition: 0.3s ease all;
	}

	.dropzone > label {
		padding: 8px 12px;
		color: #fff;
		border-radius: 5px;
		cursor: pointer;
		background-color: #375b80;
		transition: 0.3s ease all;
	}

	.dropzone > input {
		display: none;
	}

	.active-dropzone {
		color: #fff;
		border-color: #fff;
		background-color: #375b80;
	}

	.active-dropzone > label {
		background-color: #fff;
		color: #375b80;
	}
</style>
