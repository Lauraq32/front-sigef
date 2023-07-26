<template>
    <CCard>
        <CCardBody class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-3">
                <div class="d-flex flex-row gap-1 align-items-center">
                    <label class="form-label col-auto col-form-label" for="cuentaBanco">Cuenta Banco:</label>
                    <CFormSelect id="cuentaBanco" v-model="creditoDebitoDate.cuenta">
                    </CFormSelect>
                </div>
                <div class="d-flex flex-row gap-1 align-items-center">
                    <label class="form-label col-auto col-form-label" for="cuentaNumero">Nota de {{ textBanco }}
                        No.:</label>
                    <CFormInput size="sm" @keypress="onlyNumber" id="cuentaNumero"
                        v-model.number="creditoDebitoDate.numeroCuenta" required />
                </div>
            </div>
            <div class="d-flex gap-3 align-items-center">
                <div class="d-flex flex-row gap-1 align-items-center">
                    <label class="form-label col-auto col-form-label" for="fechaDesde">Fecha Desde:</label>
                    <AppDateField v-model="creditoDebitoDate.fechaDesde" id="fechaDesde" />
                </div>
                <div class="d-flex flex-row gap-1 align-items-center">
                    <label class="form-label col-auto col-form-label" for="fechaHasta">Fecha Hasta:</label>
                    <AppDateField v-model="creditoDebitoDate.fechaHasta" id="fechaHasta" />
                </div>
                <div class="d-flex align-items-center">
                    <CButton size="sm" color="ghost" @click="sendData">
                        <CIcon icon="cisSearch" size="lg" />
                    </CButton>
                </div>
            </div>
        </CCardBody>
    </CCard>
</template>
<script>
import { CFormInput } from '@coreui/vue-pro';
import { CIcon } from '@coreui/icons-vue'
import { onlyNumber } from '@/utils/validator';
import AppDateField from "@/components/AppDateField.vue"

export default {
    name: "CreditoDebitoHeader",
    props: {
        textBanco: {
            type: String
        },
    },
    components: { CFormInput, AppDateField },
    data: function () {
        return {
            creditoDebitoDate: {
                cuenta: 0,
                numeroCuenta: 0,
                fechaDesde: "",
                fechaHasta: ""
            },
            onlyNumber
        }
    },
    methods: {
        sendData() {
            this.$emit('sendDataFilter', this.creditoDebitoDate);
        }
    }
}
</script>