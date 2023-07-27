<template>
    <CModal :visible="showModalFechaIngreso" @close="closeModal">
        <CModalHeader>
            <CModalTitle>Reactivar</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm class="row g-3 needs-validation" novalidate :validated="reactivarValidated" ref="formRef">
                <div>
                    <CFormLabel for="emergenciaNombre">Cuando reingresará el empleado?</CFormLabel>
                    <AppDateField required :disabled="isNomina" class="form-control" v-model="fechaReingreso" />
                </div>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CForm>
        </CModalBody>

        <CModalFooter>
            <CButton color="secondary" data-bs-dismiss="modal" @click="closeModal">Cerrar</CButton>
            <CButton color="info" @click="sendFechaForActivar">Guardar</CButton>
        </CModalFooter>
    </CModal>
</template>


<script>
import { formatFechaIso } from '@/utils/format'
import AppDateField from '@/components/AppDateField.vue'
export default {
    name: 'agregarFechaIngreso',
    components: {
        AppDateField
    },
    props: {
        showModalFechaIngreso: Boolean,
    },

    data: () => {
        return {
            formatFechaIso,
            reactivarValidated: false,
            fechaReingreso: new Date()
        }
    },

    methods: {
        closeModal() {
            this.$emit('close-modal', false)
        },

        sendFechaForActivar() {
            this.reactivarValidated = false
            if (this.$refs.formRef.$el.checkValidity()) {
                this.$emit('activar-empleado', this.formatFechaIso(this.fechaReingreso))
                return
            }
            this.reactivarValidated = true
            this.closeModal()
        }

    }
}

</script>