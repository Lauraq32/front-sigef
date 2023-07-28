<template>
    <CModal @close="closeModalNotaCredito" backdrop="static" size="md" :visible="modalNotaCredito">
        <CModalHeader>
            <CModalTitle>Formulario de Notas de C&eacute;dito</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm">
                <div class="d-flex flex-column justify-content-center gap-2">
                    <div>
                        <label for="documentoNumero" class="font-weight-bold">Documento No.</label>
                        <CFormInput size="sm" @keypress="onlyNumber" id="documentoNumero"
                            v-model.number="notaCredito.documento" type="number" required />
                    </div>
                    <div>
                        <label for="fecha" class="font-weight-bold">Fecha</label>
                        <AppDateField class="form-control" v-model="notaCredito.fecha" id="fecha" required />
                    </div>
                    <div>
                        <label for="valor" class="font-weight-bold">Valor</label>
                        <CFormInput size="sm" @keypress="onlyNumber" id="valor" v-model.number="notaCredito.valor"
                            type="number" required />
                    </div>
                    <div>
                        <label for="concepto" class="font-weight-bold">Concepto</label>
                        <CFormInput size="sm" id="concepto" v-model="notaCredito.auxiliar" required />
                    </div>
                    <div>
                        <label for="estatus" class="font-weight-bold">Estatus</label>
                        <SelectEstatus v-model="notaCredito.estatus" :all="false" />
                    </div>
                    <div>
                        <label for="unidadMedida" class="font-weight-bold">Detalle</label>
                        <CFormTextarea rows="4" v-model="notaCredito.detalle" required></CFormTextarea>
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
            notaCredito: {},
            isFormEventTypeValidated: false,
            AppDateField,
            onlyNumber,
        }
    },
    props: {
        modalNotaCredito: Boolean,
        bancoId: Number,
        notaCreditoProp: Object
    },
    methods: {
        closeModalNotaCredito() {
            this.$emit('closeModalNotaCredito', false);
        },
        sendData() {
            this.isFormEventTypeValidated = false
            if (this.$refs.eventTypeForm.$el.checkValidity()) {
                this.$emit('saveNotaCredito', this.notaCredito);
            }
            this.isFormEventTypeValidated = true
        },
        getEstatus(value) {
            this.notaCredito.estatus = value;
        },
        ...mapActions(useToastStore, ['show']),
    },
    watch: {
        notaCreditoProp() {
            this.notaCredito = { ...this.notaCreditoProp };
        }
    }
}
</script>