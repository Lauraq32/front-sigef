<template>
    <CModal size="sm" :visible="grupoModal" @close="closeModalGrupo" backdrop="static">

        <CModalHeader>
            <CModalTitle>Grupos de Pago</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCardBody>
                <CForm class="needs-validation" novalidate :validated="grupoFormValidated" ref="formRef">
                    <CCol>
                        <CFormLabel for="postGrupo.descripcion">Descripci&oacute;n</CFormLabel>
                        <CFormInput id="postGrupo.descripcion" v-model="postGrupo.descripcion" required />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol>
                        <CFormLabel for="postGrupo.fechaInicio">Fecha Inicio</CFormLabel>
                        <CFormInput type="date" id="postGrupo.fechaInicio" v-model="fechaInicio" required />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol>
                        <CFormLabel for="postGrupo.fechaFin">Fecha Fin</CFormLabel>
                        <CFormInput type="date" id="postGrupo.fechaFin" v-model="fechaFin" @change="validarFechaHasta"
                            required />
                        <CFormFeedback invalid :style="{ display: fechaHataValidation ? 'flex' : 'none' }">
                            La fecha no puede ser menor a la fecha inicio
                        </CFormFeedback>
                    </CCol>
                </CForm>
            </CCardBody>
        </CModalBody>
        <CModalFooter>
            <CButton type="button" color="secondary" data-bs-dismiss="modal" @click="closeModalGrupo">Cerrar
            </CButton>
            <CButton type="button" color="primary" v-on:click="saveGrupo">
                Guardar
            </CButton>
        </CModalFooter>
    </CModal>
</template>
<script>
import { CModal } from '@coreui/vue';

export default {
    name: 'CargosModal',
    components: {
        CModal,
    },
    emits: ['post-grupo', 'close-modal'],
    data: function () {
        return {
            grupoFormValidated: false,
            postGrupo: {
                descripcion: "",
                fechaInicio: new Date(),
                fechaFin: new Date()

            },
            isLowerSelectedInitDate: false,
            fechaHataValidation: false,
        }
    },

    computed: {
        fechaInicio: {
            get() {
                let date = this.postGrupo.fechaInicio
                if (
                    this.postGrupo.fechaInicio !== null &&
                    this.postGrupo.fechaInicio?.toString() !== 'Invalid Date'
                ) {
                    if (typeof this.postGrupo.fechaInicio === 'string') {
                        date =
                            typeof date === 'string'
                                ? new Date(this.postGrupo.fechaInicio)
                                : date
                        return date.toISOString().split('T')[0]
                    }
                }
                return date?.toISOString()?.split('T')?.[0]
            },
            set(value) {
                this.postGrupo.fechaInicio = new Date(`${value}T00:00:00`)
            },
        },

        fechaFin: {
            get() {
                let date = this.postGrupo.fechaFin
                if (
                    this.postGrupo.fechaFin !== null &&
                    this.postGrupo.fechaFin?.toString() !== 'Invalid Date'
                ) {
                    if (typeof this.postGrupo.fechaFin === 'string') {
                        date = new Date(this.postGrupo.fechaFin)
                        return date.toISOString().split('T')[0]
                    }
                }
                return date?.toISOString()?.split('T')?.[0]
            },
            set(value) {
                return (this.postGrupo.fechaFin = new Date(
                    `${value}T00:00:00`,
                ))
            },
        },
    },

    methods: {
        saveGrupo() {
            this.grupoFormValidated = false
            if (this.$refs.formRef.$el.checkValidity() && !this.fechaHataValidation) {
                this.$emit('post-grupo', { ...this.postGrupo })
                this.clearForm()
                this.fechaHataValidation = false
                return
            }
            this.grupoFormValidated = true
        },

        validarFechaHasta() {
            const fechaInicial = new Date(`${this.fechaInicio}T00:00:00`).getTime()
            const fechaFinal = new Date(`${this.fechaFin}T00:00:00`).getTime()
            this.fechaHataValidation = fechaFinal < fechaInicial
        },

        clearForm() {
            this.id = null
            this.grupoFormValidated = false
            this.isLowerSelectedInitDate = false,
                this.postGrupo = {
                    descripcion: "",
                    fechaInicio: new Date(),
                    fechaFin: new Date()
                }
        },

        closeModalGrupo() {
            this.$emit('close-modal', false)
            this.clearForm()
        },
    },

    watch: {
        groupToUpdate(newGroup) {
            if (newGroup) {
                this.postGrupo = { ...this.groupToUpdate };
            }
        },
    },

    props: {
        grupoModal: Boolean,
        groupToUpdate: null,
    },
}
</script>
  