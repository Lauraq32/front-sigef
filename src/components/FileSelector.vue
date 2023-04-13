<template>
    <label
        :id="`upload-button-${key}`"
        class="file-select"
        :class="{withBackground: 'with-background btn'}"
        role="button"
    >
        <CIcon :icon="icon" size="sm" />
        <input type="file" :id="`upload-form-file-${key}`" @change="onFileChange" />
        <span class="label">
            {{ title }}
        </span>
    </label>
</template>
<script>
import { CIcon } from '@coreui/icons-vue'

export default {
    emits: ['fileSelected'],
    props: {
        title: {
            type: String,
            default: 'Archivo',
        },
        key: {
            type: String,
            required: true,
            default: 'inputKey',
        },
        icon: {
            type: String,
            default: 'cilCloudUpload',
        },
        withBackground: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        onFileChange(event) {
            this.$emit('fileSelected', event);
        },
    },
}
</script>
<style scoped>
.file-select {
    display: flex;
    overflow: hidden;
    position: relative;
    align-items: center;
    cursor: pointer;
}
.with-background {
    background-color: #375b80;
    color: white;
}

.file-select > .label {
    margin-left: 0.15rem;
    cursor: pointer;
}

.file-select>input[type='file'] {
    visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
