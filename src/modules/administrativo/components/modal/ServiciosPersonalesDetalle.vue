<template>
    <CModal size="xl" backdrop="static" :visible="showModal" @close="closeDialog()">
        <CModalHeader>
            <CModalTitle>
                Detalle Servicios
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01"
                @submit="handleSubmitCustom01">
                <CCol :md="12">
                    <div class="row border-bottom mb-3">
                        <div class="col-2"></div>
                        <div class="col-2">
                            <h5>Actual</h5>
                        </div>
                        <div class="col-2"></div>
                        <div class="col-2">
                            <h5>Solicitado</h5>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-2">
                                    <h6 class="align-middle mt-4 ">Servicios Generales</h6>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go01Cantidad" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go01Mensual" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go01CantidadSolicitada" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go01MensualSolicitado" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="row">
                                <div class="col-2">



                                    <h6 class="align-middle mt-4 ">Apoyo Administrativo</h6>


                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go02Cantidad" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go02Mensual" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go02CantidadSolicitada" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go02MensualSolicitado" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="row">
                                <div class="col-2">
                                    <h6 class="align-middle mt-4 ">Tecnicos</h6>

                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go03Cantidad" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go03Mensual" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go03CantidadSolicitada" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go03MensualSolicitado" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="row">
                                <div class="col-2">



                                    <h6 class="align-middle mt-4 ">Profesionales</h6>


                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go04Cantidad" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go04Mensual" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go04CantidadSolicitada" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go04MensualSolicitado" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                            </div>
                        </div>


                        <div class="col-12">
                            <div class="row">
                                <div class="col-2">


                                    <h6 class="align-middle mt-4 ">Direccion y Supervision</h6>


                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go05Cantidad" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go05Mensual" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go05CantidadSolicitada" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go05MensualSolicitado" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-2">


                                    <h6 class="align-middle mt-4 ">Direccion y Supervision</h6>


                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go05Cantidad" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go05Mensual" size="sm" id="validationCustom02"
                                        required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Numero de Cargos</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go05CantidadSolicitada" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                                <div class="col-2">
                                    <CFormLabel for="validationCustom01">Mensual</CFormLabel>
                                    <CFormInput v-model="detalleServicio.go05MensualSolicitado" size="sm"
                                        id="validationCustom02" required />
                                    <CFormFeedback valid> Exito! </CFormFeedback>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </div>
                            </div>
                        </div>
                    </div>


                </CCol>

            </CForm>

        </CModalBody>
        <CModalFooter>
            <div class="col-12 mb-3" style="text-align: right;">
                <CButton color="primary" @click="saveDetalle">
                    Guardar</CButton>
            </div>
        </CModalFooter>
    </CModal>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
export default {
    components: {
        CSmartTable,
    },
    props: {
        showModal: false
    },
    data: () => {
        return {
            detalleServicio: {
                go01Cantidad: 0,
                go01Mensual: 0,
                go01CantidadSolicitada: 0,
                go01MensualSolicitado: 0,
                go02Cantidad: 0,
                go02Mensual: 0,
                go02CantidadSolicitada: 0,
                go02MensualSolicitado: 0,
                go03Cantidad: 0,
                go03Mensual: 0,
                go03CantidadSolicitada: 0,
                go03MensualSolicitado: 0,
                go04Cantidad: 0,
                go04Mensual: 0,
                go04CantidadSolicitada: 0,
                go04MensualSolicitado: 0,
                go05Cantidad: 0,
                go05Mensual: 0,
                go05CantidadSolicitada: 0,
                go05MensualSolicitado: 0,
                go06Cantidad: 0,
                go06Mensual: 0,
                go06CantidadSolicitada: 0,
                go06MensualSolicitado: 0
            },
            columns: [
                { key: 'nombre', label: 'Grupos ocupacionales' },
                { key: 'nombre', label: 'Numero de Cargos' },
                { key: 'nombre', label: 'Mensual' },
                { key: 'nombre', label: 'Anual' },
                { key: 'nombre', label: 'Numero de Cargos' },
                { key: 'nombre', label: 'Mensual' },
                { key: 'nombre', label: 'Anual' },
                {
                    key: 'show_details',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                    // _props: { color: 'primary', class: 'fw-semibold'}
                },
            ],
            details: [],
        }
    },
    methods: {
        closeDialog(data) {
            this.$emit('close', data);

        },

        saveDetalle() {
            this.$emit('saveDetalle', this.detalleServicio)
            this.closeDialog();
        },

        convertArray() {

        }

    },
    mounted() {

        this.convertArray();

    },

}

</script>

<style lang="scss" scoped></style>