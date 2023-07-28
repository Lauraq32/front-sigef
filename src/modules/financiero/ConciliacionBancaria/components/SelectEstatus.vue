<template>
    <CFormSelect :value="modelValue" @change="setEstatus">
        <option value="">TODOS</option>
        <option>TRANSITO</option>
        <option>CONFIRMADO</option>
        <option>CANCELADO</option>
    </CFormSelect>
</template>

<script>
export default {
    props: {
        modelValue: String
    },
    methods: {
        setEstatus(e) {
            this.$emit('update:modelValue', e.target.value);
        }
    }
}
</script>
