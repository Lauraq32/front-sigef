<template>
    <CModal :visible="showModalFechaIngreso" @close="closeModal">
        <h3>Cuando ingresará el empleado?</h3>
        <AppDateField :disabled="isNomina" class="form-control" v-model="postEmpleado.fechaReingreso" />
        <CModalFooter>
            <CButton color="secondary" data-bs-dismiss="modal" @click="closeModal">Cerrar</CButton>
            <CButton color="info" @click="showModalFechaIngreso = false">Guardar</CButton>
        </CModalFooter>
    </CModal>
</template>


<script>
export default {
    name: 'agregarFechaIngreso',
    props: {
        showModalFechaIngreso: Boolean,
    },

    methods: {
        closeModal() {
            this.$emit('close-modal', false)
        }
    }
}

</script>