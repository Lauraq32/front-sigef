<template>
    <CCardTitle class="mx-5 pb-4 d-flex justify-content-center">
        <h5>Escala de Sueldos para C&aacute;lculo del Impuesto Sobre la Renta</h5>
    </CCardTitle>

    <CForm>
        <div class="container">
            <div class="d-flex justify-content-center">
                <div>
                    <div class="row">
                        <div class="col-md-5">
                            <CFormLabel for="excento">Excento Hasta:</CFormLabel>
                            <CFormInput v-model="factorDivision.MontoSueldoExcentoISR" v-on:keypress="onlyNumber"
                                id="excento" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                            <CFormLabel for="FactorDivision.montoSueldoEscala1">Sueldo Escala 1:</CFormLabel>
                            <CFormInput v-on:keypress="onlyNumber" v-model="factorDivision.MontoSueldoEscala1"
                                id="postFactorDivision.montoSueldoEscala1" />
                        </div>

                        <div class="input-group col-2">
                            <span class="input-group-text" id="basic-addon1">%</span>
                            <CFormInput v-on:keypress="onlyNumber" v-model="factorDivision.PorcentajeISREscala1"
                                class="form-control" />
                        </div>

                        <div class="col-5">
                            <CFormLabel for="excento">Valor Fijo</CFormLabel>
                            <CFormInput disabled
                                :value="(factorDivision.MontoSueldoEscala1 * factorDivision.PorcentajeISREscala1) / 100"
                                v-on:keypress="onlyNumber" id="excento" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-5">
                            <CFormLabel for="postFactorDivision.montoSueldoEscala2">Sueldo Escala 2:</CFormLabel>
                            <CFormInput v-on:keypress="onlyNumber" v-model="factorDivision.MontoSueldoEscala2"
                                id="postFactorDivision.montoSueldoEscala2" />
                        </div>
                        <div class="input-group col-2">
                            <span class="input-group-text" id="basic-addon1">%</span>
                            <CFormInput v-on:keypress="onlyNumber" v-model="factorDivision.PorcentajeISREscala2"
                                class="form-control" />
                        </div>
                        <div class="col-5 input-position">
                            <CFormInput disabled
                                :value="(factorDivision.MontoSueldoEscala2 * factorDivision.PorcentajeISREscala2) / 100"
                                v-on:keypress="onlyNumber" id="excento" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-5">
                            <CFormLabel for="postFactorDivision.montoSueldoEscala3">Sueldo Escala 3:</CFormLabel>
                            <CFormInput v-on:keypress="onlyNumber" v-model="factorDivision.MontoSueldoEscala3"
                                id="postFactorDivision.montoSueldoEscala3" />
                        </div>
                        <div class="input-group col-2">
                            <span class="input-group-text" id="basic-addon1">%</span>
                            <CFormInput v-on:keypress="onlyNumber" v-model="factorDivision.PorcentajeISREscala3"
                                class="form-control" />
                        </div>
                        <div class="col-5 input-position">
                            <CFormInput disabled
                                :value="(factorDivision.MontoSueldoEscala3 * factorDivision.PorcentajeISREscala3) / 100"
                                v-on:keypress="onlyNumber" id="excento" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-5">
                            <CFormLabel for="postFactorDivision.montoSueldoEscala4">Sueldo Escala 4:</CFormLabel>
                            <CFormInput v-on:keypress="onlyNumber" v-model="factorDivision.MontoSueldoEscala4"
                                id="postFactorDivision.montoSueldoEscala4" />
                        </div>
                        <div class="input-group col-2">
                            <span class="input-group-text" id="basic-addon1">%</span>
                            <CFormInput v-on:keypress="onlyNumber" v-model="factorDivision.PorcentajeISREscala4"
                                class="form-control" />
                        </div>
                        <div class="col-5 input-position">
                            <CFormInput disabled
                                :value="(factorDivision.MontoSueldoEscala4 * factorDivision.PorcentajeISREscala4) / 100"
                                v-on:keypress="onlyNumber" id="excento" />
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-6">
                            <CFormLabel for="excento">Retenci&oacute;n AFP</CFormLabel>
                            <CFormInput v-model="factorDivision.PorcentajeRetencionAFP" v-on:keypress="onlyNumber"
                                id="excento" />
                        </div>
                        <div class="col-6">
                            <CFormLabel for="excento">Hasta el sueldo</CFormLabel>
                            <CFormInput v-model="factorDivision.MontoMinRetencionAFP" v-on:keypress="onlyNumber"
                                id="excento" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <CFormLabel for="excento">Retenci&oacute;n ARS</CFormLabel>
                            <CFormInput v-model="factorDivision.PorcentajeRetencionARS" v-on:keypress="onlyNumber"
                                id="excento" />
                        </div>
                        <div class="col-6">
                            <CFormLabel for="excento">Hasta el sueldo</CFormLabel>
                            <CFormInput v-model="factorDivision.MontoMinRetencionARS" v-on:keypress="onlyNumber"
                                id="excento" />
                        </div>
                    </div>

                    <div class="row fw-bold my-5 mx-3 p-2">
                        <div class="col-7">
                            <div class="row mt-3">
                                <div class="col-auto">
                                    <CFormLabel for="sueldoMensual" class="col-form-label">Sueldo Mensual:</CFormLabel>
                                </div>
                                <div class="col-auto">
                                    <CurrencyInput class="form-control text-end" required id="presupuestoBco1"
                                        v-model="sueldoCalculo" :options="{
                                            locale: 'en-US',
                                            currency: 'USD',
                                            precision: 2,
                                            currencyDisplay: 'hidden',
                                        }" />
                                </div>
                            </div>

                            <div class="mt-3">
                                <span>Sueldo Quincenal: {{ formatPrice(sueldoCalculo / 2) }}</span>
                            </div>
                            <div class="mt-3">
                                <span>Sueldo Anual: {{ formatPrice(sueldoCalculo * 12) }}</span>
                            </div>
                            <div class="mt-3">
                                <CFormLabel for="excento">AFP Anual:</CFormLabel>
                            </div>
                            <div class="mt-3">
                                <CFormLabel for="excento">AFP Mensual:</CFormLabel>
                            </div>
                            <div class="mt-3">
                                <CFormLabel for="excento">ARS Anual:</CFormLabel>
                            </div>
                            <div class="mt-3">
                                <CFormLabel for="excento">ARS Mensual:</CFormLabel>
                            </div>
                        </div>
                        <div class="col-5">
                            <div class="mt-3">
                                <CFormLabel for="excento">Sueldo - AFP - ARS:</CFormLabel>
                            </div>
                            <div class="mt-3">
                                <CFormLabel for="excento">ISR Anual:</CFormLabel>
                            </div>
                            <div class="mt-3">
                                <CFormLabel for="excento">IRS Mensual:</CFormLabel>
                            </div>
                            <div class="mt-3">
                                <CFormLabel for="excento">IRS Quincenal:</CFormLabel>
                            </div>
                        </div>
                        <div class="mt-3 w-100 d-flex justify-content-end">
                            <div>
                                <CButton color="info" @click="guardarFactorDivision">Guardar</CButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </CForm>
</template>

<script>
import { CFormInput, CFormLabel } from '@coreui/vue-pro'
import { onlyNumber } from '@/utils/validator'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import ApiNomina from '../services/NominaServices'
import { formatPrice } from '@/utils/format';
import CurrencyInput from '@/utils/CurrencyInput.vue'
export default {
    name: 'ConfiguracionRentaAndFactorDivision',
    components: {
        CFormLabel,
        CFormInput,
        CurrencyInput,
    },

    data: function () {
        return {
            onlyNumber,
            formatPrice,
            sueldoCalculo: 0,
            factorDivision: {
                MontoSueldoEscala1: 0,
                PorcentajeISREscala1: 0,
                MontoSueldoEscala2: 0,
                PorcentajeISREscala2: 0,
                MontoSueldoEscala3: 0,
                PorcentajeISREscala3: 0,
                MontoSueldoEscala4: 0,
                PorcentajeISREscala4: 0,
                PorcentajeRetencionAFP: 0,
                PorcentajeRetencionARS: 0,
                MontoMinRetencionAFP: 0,
                MontoMinRetencionARS: 0,
                MontoSueldoExcentoISR: 0,
            },
        }
    },

    methods: {
        ...mapActions(useToastStore, ['show']),
        guardarFactorDivision() {
            ApiNomina.postFactorDivision(this.factorDivision).then((response) => {
                this.show({
                    content: response.data,
                    closable: true,
                })
                setTimeout(this.getConfiguracionPorcentajes, 500)
            })
        },
        getConfiguracionPorcentajes() {
            ApiNomina.calculosPorcentage().then((response) => {
                this.factorDivision = response.data.data
            })
        },
    },

    mounted() {
        this.getConfiguracionPorcentajes()
    },

    props: {},
}
</script>
<style>
.input-group {
    width: inherit;
    width: 16%;
    height: 25%;
    margin-top: 33px;
}

.input-position {
    margin-top: 33px;
}
</style>
