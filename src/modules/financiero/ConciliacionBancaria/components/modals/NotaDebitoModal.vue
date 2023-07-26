<template>
    <CModal @close="closeModalNotaDebito" backdrop="static"  size="md" :visible="modalNotaDebito">
        <CModalHeader>
            <CModalTitle>Formulario de Notas de D&eacute;bito</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm">
                <div class="d-flex flex-column justify-content-center gap-2">
                    <div>
                        <label for="documentoNumero" class="font-weight-bold">Documento No.</label>
                        <CFormInput size="sm" @keypress="onlyNumber" id="documentoNumero" v-model.number="notaDebito.documento" type="number" required />
                    </div>
                    <div>
                        <label for="fecha" class="font-weight-bold">Fecha</label>
                        <AppDateField v-model="notaDebito.fecha" id="fecha" required />
                    </div>
                    <div>
                        <label for="valor" class="font-weight-bold">Valor</label>
                        <CFormInput size="sm" @keypress="onlyNumber" id="valor" v-model.number="notaDebito.valor" type="number" required/>
                    </div>
                    <div>
                        <label for="concepto" class="font-weight-bold">Concepto</label>
                        <CFormInput size="sm" id="concepto" v-model="notaDebito.auxiliar" required/>
                    </div>
                    <div>
                        <label for="estatus" class="font-weight-bold">Estatus</label>
                        <CFormSelect id="estatus" v-model="notaDebito.estatus">
                            <option>TRANSITO</option>
                            <option>CONFIRMADO</option>
                            <option>CANCELADO</option>
                        </CFormSelect>
                    </div>
                    <div>
                        <label for="unidadMedida" class="font-weight-bold">Detalle</label>
                        <CFormTextarea rows="4" v-model="notaDebito.detalle" required></CFormTextarea>
                    </div>
                </div>
            </CForm>
        </CModalBody>
        <CModalFooter class="d-flex flex-row justify-content-end align-items-end">
            <CButton size="sm" color="primary" class="mb-3" @click="sendData">Agregar</CButton>
        </CModalFooter>
    </CModal>
</template>
<script>
import { onlyNumber } from '@/utils/validator';
import { CModal, CForm } from '@coreui/vue';
import { CFormInput } from '@coreui/vue-pro';
import AppDateField from "@/components/AppDateField.vue"

export default {
    components: { CModal, CForm, CFormInput, AppDateField },
    data: function() {
        return {
            notaDebito: {
                documento: "",
                fecha: "",
                auxiliar: "",
                valor: "",
                estatus: "TRANSITO",
                detalle: ""
            },
            isFormEventTypeValidated: false,
            AppDateField,
            onlyNumber
        }
    },
    props: {
        modalNotaDebito: Boolean,
    },
    methods: {
        closeModalNotaDebito() {
            this.$emit('closeModalNotaDebito', false);
            this.cleanForm();
        },
        sendData() {
            this.isFormEventTypeValidated = false
            if (this.$refs.eventTypeForm.$el.checkValidity()) {
                this.createNotaDebito();
            }
            this.isFormEventTypeValidated = true
        },
        createNotaDebito(){
            console.log(this.notaDebito);
            this.cleanForm();
        },
        cleanForm() {
            this.notaDebito = {
                documento: "",
                fecha: "",
                auxiliar: "",
                valor: "",
                estatus: "TRANSITO",
                detalle: ""
            }
        }
    }
}
</script>