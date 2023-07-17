<template>
    <CModal backdrop="static" size="lg" :visible="showModal" @close="closeModal">
        <CModalHeader>
            <CModalTitle>Conceptos de Ingresos y Retenciones</CModalTitle>
        </CModalHeader>

        <CModalBody>
            <CCard>
                <CCardBody>
                    <CForm>
                        <div class="row">
                            <div class="row col-7">
                                <div class="col-4"><label for="">Ingresos:</label></div>
                                <div class="col-4">Retenciones:</div>
                                <div class="col-4">Cod. Ejec/Pres.</div>
                            </div>
                            <div class="col-5">klk</div>
                        </div>
                    </CForm>
                </CCardBody>
            </CCard>
        </CModalBody>

        <CModalFooter>
            <CButton color="secondary" @click="closeModal">Cerrar</CButton>
            <CButton color="primary">Guardar</CButton>
        </CModalFooter>
    </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CFormInput, CFormLabel } from '@coreui/vue-pro'

export default {
    name: 'ImprimirNomina',
    components: {
        CModal,
        CFormLabel,
        CFormInput,
    },
    data: function () {
        return {}
    },
    methods: {
        closeModal() {
            this.$emit('close-modal', false)
        },
    },
    props: {
        showModal: Boolean,
    },
}
</script>