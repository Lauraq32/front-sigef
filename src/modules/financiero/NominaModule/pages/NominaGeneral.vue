<template>
    <h3 class="text-center">Nomina General</h3>

    <NominaSelectFiscalYear>
        <CButton style="font-weight: bold" color="info" @click="">Imprimir Todos</CButton>
        <CButton style="font-weight: bold" class="ml-5" color="info">Generar Nomina</CButton>
    </NominaSelectFiscalYear>
    <div class="row my-5">
        <div class="col-9">
            <div class="row">
                <div class="col-3">
                    <div class="row">
                        <div class="col-6">
                            <CCol :md="9">
                                <CFormLabel for="anio">Año</CFormLabel>
                                <CFormInput type="number" v-model="nominaGeneral.anio" id="anio" />
                                <CFormFeedback valid> Exito! </CFormFeedback>
                                <CFormFeedback invalid>
                                    Favor agregar el campo
                                </CFormFeedback>
                            </CCol>
                        </div>
                        <div class="col-6" style=" position: relative; left: -42px;">
                            <CCol :md="9">
                                <CFormLabel for="mes">Mes</CFormLabel>
                                <CFormSelect v-model="nominaGeneral.mes" id="mes">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                </CFormSelect>
                            </CCol>
                        </div>
                    </div>
                </div>
                <div class="col-3" style=" position: relative; left: -84px;">
                    <CCol :md="9">
                        <CFormLabel for="tipoContrato">Tipo de contracto</CFormLabel>
                        <CFormSelect v-model="nominaGeneral.tipoContrato" id="tipoContrato">
                            <option>Tipo de contrato 1</option>
                            <option>Tipo de contrato 2</option>
                        </CFormSelect>
                    </CCol>
                </div>
                <div class="col-3" style="position: relative; left: -175px;">
                    <CCol :md="9">
                        <CFormLabel for="formaPago">Forma de pago</CFormLabel>
                        <CFormSelect v-model="nominaGeneral.formaPago" id="formaPago">
                            <option>BANCO</option>
                            <option>CHEQUE</option>
                        </CFormSelect>
                    </CCol>
                </div>
                <div class="col-3">
                    <CButton style="font-weight: bold; position: relative; top: 31px; left: -265px;" color="info"
                        @click="() => { getNominaGeneral() }">Filtrar</CButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useAuthStore } from '@/store/AuthStore';
import { mapState } from 'pinia';
import NominaSelectFiscalYear from '../components/NominaSelectFiscalYear.vue';


export default {
    components: {
        NominaSelectFiscalYear
    },
    mounted() {
    },
    setup() {
        const authStore = useAuthStore();
        const { user, currentFiscalYearId } = authStore.authInfo;
        console.log("anio", currentFiscalYearId);
        const nominaGeneral = {
            ayuntamientoId: user.ayuntamiento.id,
            anio: currentFiscalYearId,
            mes: new Date().getMonth(),
            tipoContrato: '',
            formaPago: '',
        };
        return { nominaGeneral }
    },
    computed: {
        ...mapState(useAuthStore, ['authInfo']),
    }
}
</script>
