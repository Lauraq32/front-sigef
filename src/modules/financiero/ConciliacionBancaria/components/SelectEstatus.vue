<template>
    <CFormSelect :value="modelValue" @change="setEstatus">
        <option value="">{{ all ? 'TODOS' : 'Seleccionar'}}</option>
        <option>TRANSITO</option>
        <option>CONFIRMADO</option>
        <option>CANCELADO</option>
    </CFormSelect>
</template>

<script>
export default {
    props: {
        modelValue: String,
        all: {
            type: Boolean,
            default: true,
        }
    },
    methods: {
        setEstatus(e) {
            this.$emit('update:modelValue', e.target.value);
        }
    }
}
</script>
