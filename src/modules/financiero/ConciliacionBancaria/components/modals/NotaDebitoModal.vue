<template>
    <CModal @close="closeModalNotaDebito" backdrop="static" size="md" :visible="modalNotaDebito">
        <CModalHeader>
            <CModalTitle>Formulario de Notas de D&eacute;bito</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm">
                <div class="d-flex flex-column justify-content-center gap-2">
                    <div>
                        <label for="documentoNumero" class="font-weight-bold">Documento No.</label>
                        <CFormInput size="sm" @keypress="onlyNumber" id="documentoNumero"
                            v-model.number="notaDebito.documento" type="number" required />
                    </div>
                    <div>
                        <label for="fecha" class="font-weight-bold">Fecha</label>
                        <AppDateField class="form-control" v-model="notaDebito.fecha" id="fecha" required />
                    </div>
                    <div>
                        <label for="valor" class="font-weight-bold">Valor</label>
                        <CFormInput size="sm" @keypress="onlyNumber" id="valor" v-model.number="notaDebito.valor"
                            type="number" required />
                    </div>
                    <div>
                        <label for="concepto" class="font-weight-bold">Concepto</label>
                        <CFormInput size="sm" id="concepto" v-model="notaDebito.auxiliar" required />
                    </div>
                    <div>
                        <label for="estatus" class="font-weight-bold">Estatus</label>
                        <SelectEstatus v-model="notaDebito.estatus" :all="false" />
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
import { mapActions } from 'pinia';
import { useToastStore } from '@/store/toast';
import AppDateField from "@/components/AppDateField.vue";
import SelectEstatus from "../SelectEstatus.vue"

export default {
    components: { CModal, CForm, CFormInput, AppDateField, SelectEstatus },
    data: function () {
        return {
            notaDebito: {},
            isFormEventTypeValidated: false,
            AppDateField,
            onlyNumber,
        }
    },
    props: {
        modalNotaDebito: Boolean,
        bancoId: Number,
        notaDebitoProp: Object
    },
    methods: {
        closeModalNotaDebito() {
            this.$emit('closeModalNotaDebito', false);
        },
        sendData() {
            this.isFormEventTypeValidated = false
            if (this.$refs.eventTypeForm.$el.checkValidity()) {
                this.$emit('saveNotaDebito', this.notaDebito);
            }
            this.isFormEventTypeValidated = true
        },
        getEstatus(value) {
            this.notaDebito.estatus = value;
        },
        ...mapActions(useToastStore, ['show']),
    },
    watch: {
        notaDebitoProp() {
            this.notaDebito = { ...this.notaDebitoProp };
        }
    }
}
</script>