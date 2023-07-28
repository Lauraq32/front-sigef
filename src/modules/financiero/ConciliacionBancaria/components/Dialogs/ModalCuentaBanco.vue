<template>
    <CModal :visible="showModal" @close="closeModal">
        <CModalHeader>
            <CModalTitle>Cuentas de banco</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm class="needs-validation" novalidate :validated="validatedCustom01" @submit="handleSubmitCustom01">
                <h5 class="mb-3">Banco</h5>
                <CCol>
                    <div class="row g-3 align-items-center ">
                        <div class="col-4">
                            <CFormLabel for="validationCustom04">Catalgo</CFormLabel>
                        </div>
                        <div class="col-8">
                            <CFormInput v-model="data.contabilidadGubernamentalNumero" class="col-6"
                                id="validationCustom04"> </CFormInput>
                            <CFormFeedback valid> Exito! </CFormFeedback>
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </div>
                    </div>
                </CCol>
                <CCol class="mt-3">
                    <div class="row g-3 align-items-center">
                        <div class="col-4">
                            <CFormLabel for="validationCustom04">Banco</CFormLabel>
                        </div>
                        <div class="col-8">
                            <div class="col-8">
                                <CFormInput v-model="data.direccion" id="validationCustom03" required />
                                <CFormFeedback valid> Exito! </CFormFeedback>
                                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                            </div>
                        </div>
                    </div>
                </CCol>
                <CCol class="mt-3">
                    <div class="row g-3 align-items-center">
                        <div class="col-4">
                            <CFormLabel for="validationCustom03">Numero Cta:</CFormLabel>
                        </div>
                        <div class="col-8">
                            <CFormInput v-model="data.numeroCuenta" id="validationCustom03" required />
                            <CFormFeedback valid> Exito! </CFormFeedback>
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </div>
                    </div>
                </CCol>
                <CCol class="mt-3">
                    <div class="row g-3 align-items-center">
                        <div class="col-4">
                            <CFormLabel for="validationCustom03">Direccion</CFormLabel>
                        </div>
                        <div class="col-8">
                            <CFormInput v-model="data.direccion" id="validationCustom03" required />
                            <CFormFeedback valid> Exito! </CFormFeedback>
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </div>
                    </div>
                </CCol>
                <h5 class="mb-3 mt-3">Dpto de Contabilidad</h5>
                <CCol class="mt-3">
                    <div class="row g-3 align-items-center">
                        <div class="col-4">
                            <CFormLabel for="validationCustom02">Nombre de Cuenta</CFormLabel>
                        </div>
                        <div class="col-8">
                            <CFormInput v-model="data.nombreCuenta" id="validationCustom02" required />
                            <CFormFeedback valid> Exito! </CFormFeedback>
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </div>
                    </div>
                </CCol>
                <CCol class="mt-3">
                    <div class="row g-3 align-items-center">
                        <div class="col-4">
                            <CFormLabel for="validationCustom02">RNC</CFormLabel>
                        </div>
                        <div class="col-8">
                            <CFormInput v-model="data.rnc" id="validationCustom02" required />
                            <CFormFeedback valid> Exito! </CFormFeedback>
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </div>
                    </div>
                </CCol>
                <CCol class="mt-3">
                    <div class="row g-3 align-items-center">
                        <div class="col-4">
                            <CFormLabel for="validationCustom05">Imprime Modelo</CFormLabel>
                        </div>
                        <div class="col-8">
                            <CFormSelect id="validationCustom05">
                                <option>1er. Modelo</option>
                                <option>2do. Modelo</option>
                                <option>3er. Modelo</option>
                                <option>4to. Modelo</option>
                            </CFormSelect>
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </div>
                    </div>
                </CCol>
                <CCol class="mt-3">
                    <div class="row g-3 align-items-center">
                        <div class="col-4">
                            <CFormLabel for="validationCustom05">Fecha Ultimo Corte</CFormLabel>
                        </div>
                        <div class="col-8">
                            <CFormInput v-model="data.fechaFinConciliacion" type="date" id="validationCustom05" required />
                        </div>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </div>
                </CCol>
                <CCol class="mt-3">
                    <div class="row g-3 align-items-center">
                        <div class="col-4">
                            <CFormLabel for="validationCustom05">Balance según el banco</CFormLabel>
                        </div>
                        <div class="col-8">
                            <CFormInput id="validationCustom05" required />
                        </div>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </div>
                </CCol>
                <CCol class="mt-3">
                    <div class="row g-3 align-items-center">
                        <div class="col-4">
                            <CFormLabel for="validationCustom05">Balance según el libro</CFormLabel>
                        </div>
                        <div class="col-8">
                            <CFormInput v-model="data.balanceBanco" id="validationCustom05" required />
                        </div>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </div>
                </CCol>
                <CCol class="mt-3 mb-3">
                    <div class="row g-3 align-items-center">
                        <div class="col-4">
                            <CFormLabel for="validationCustom05">Ultimo Numero Fisico</CFormLabel>
                        </div>
                        <div class="col-8">
                            <CFormInput v-model="data.ultimoNumeroFisico" id="validationCustom05" required />
                        </div>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </div>
                </CCol>
                <CModalFooter>
                    <CButton color="secondary" data-bs-dismiss="modal" @click="() => closeModal()">Cerrar</CButton>
                    <CButton type="button" color="info" @click="sendData"> Guardar </CButton>
                </CModalFooter>
            </CForm>
        </CModalBody>
    </CModal>
</template>

<script setup>
import { reactive, onMounted, watch } from 'vue'

const props = defineProps({
    showModal: Boolean,
})

const emit = defineEmits(['closeModal', 'sendData']);

const data = reactive({
    bancoId: 0,
    numeroCuenta: null,
    nombreCuenta: null,
    contabilidadGubernamentalNumero: null,
    modeloCheque: 0,
    detalle: null,
    direccion: null,
    rnc: 0,
    fechaFinConciliacion: new Date(),
    balanceBanco: 0,
    ultimoNumeroFisico: 0
})

const closeModal = () => {
    emit('closeModal', false)
}

const sendData = () => {
    emit('sendData', data)
}


onMounted(() => { })

watch(
    () => props.someProp,
    (newValue, oldValue) => { },
)
</script>
