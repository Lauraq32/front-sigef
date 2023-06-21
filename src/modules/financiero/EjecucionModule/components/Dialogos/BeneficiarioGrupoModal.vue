<template>
    <CModal size="lg" :visible="lgDemo" @close="() => {
        lgDemo = false
    }
        ">
        <CModalHeader>
            <CModalTitle>Beneficiario</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCardBody>
                <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01"
                    @submit="handleSubmitCustom01">
                    <CCol :md="3">
                        <CFormLabel for="validationCustom05">Grupo de pago</CFormLabel>
                        <CFormSelect id="validationCustom05">
                            <option>OPCION 1</option>
                            <option>OPCION 2</option>
                            <option>OPCION 3</option>
                        </CFormSelect>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="3">
                        <CFormLabel for="validationCustom05">Beneficiario</CFormLabel>
                        <CFormSelect id="validationCustom05">
                            <option>OPCION 1</option>
                            <option>OPCION 2</option>
                            <option>OPCION 3</option>
                        </CFormSelect>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="3">
                        <CFormLabel for="validationCustom04">Cargo beneficiaro</CFormLabel>
                        <CFormInput id="validationCustom04"> </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="3">
                        <CFormLabel for="validationCustom04"> Valor del pago</CFormLabel>
                        <CFormInput id="validationCustom04"> </CFormInput>
                        <CFormFeedback valid> Exito! </CFormFeedback>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
                            Guardar
                        </button>
                    </div>
                </CForm>
            </CCardBody>
        </CModalBody>
    </CModal>
</template>

<script>
import { CModal } from '@coreui/vue';

export default {
    name: 'BeneficiarioGrupoModal',
    components: {
        CModal,
    },
    emits: ['post-Beneficiariogrupo', 'close-modal'],
    data: function () {
        return {
            grupoFormValidated: false,
            postBeneficiarioGrupo: {
                grupoCompensacionId: 0,
                beneficiarioId: 0,
                cargoBeneficiario: "string",
                monto: 0

            },
            isLowerSelectedInitDate: false,
            fechaHataValidation: false,
        }
    },

    methods: {
        saveBeneficiarioGrupo() {
            this.grupoFormValidated = false
            if (this.$refs.formRef.$el.checkValidity() ) {
                this.$emit('post-Beneficiariogrupo', { ...this.postBeneficiarioGrupo })
                this.clearForm()
                return
            }
            this.grupoFormValidated = true
        },

        clearForm() {
            this.id = null
            this.grupoFormValidated = false
            this.isLowerSelectedInitDate = false,
                this.postBeneficiarioGrupo = {
                    grupoCompensacionId: 0,
                    beneficiarioId: 0,
                    cargoBeneficiario: "string",
                    monto: 0
                }
        },

        closeModalGrupo() {
            this.$emit('close-modal', false)
            this.clearForm()
        },
    },

    watch: {
        groupBeneficiaryToUpdate(newGroup) {
            if (newGroup) {
                this.postBeneficiarioGrupo = { ...this.groupBeneficiaryToUpdate };
            }
        },
    },

    props: {
        grupoModal: Boolean,
        groupBeneficiaryToUpdate: null,
    },
}
</script>
  