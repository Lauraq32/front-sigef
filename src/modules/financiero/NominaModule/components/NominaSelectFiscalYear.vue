<template>
    <CCard class="on-top mb-4">
        <CCardBody class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-3">
                <div class="d-flex flex-column align-items-center" v-if="showFiscalYearList">
                    <label class="form-label col-auto col-form-label" for="fiscalYearSelect">A&ntilde;o Fiscal</label>
                    <CFormSelect id="fiscalYearSelect" @change="setFiscalYear($event)"
                        aria-label="Selecionar año fiscal" :options="fiscalYearList">
                    </CFormSelect>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <label class="form-label col-auto col-form-label" for="Mes">Mes</label>
                    <CFormSelect v-model.number="nominaGeneral.mes" id="mes">
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
                </div>
                <div class="d-flex flex-column align-items-center">
                    <label class="form-label col-auto col-form-label" for="tipoContrato">Tipo de contracto</label>
                    <CFormSelect v-model="nominaGeneral.tipoContrato" id="tipoContrato">
                        <option selected value="">--Selecciona--</option>
                        <option>Fijo</option>
                        <option>Temporal</option>
                    </CFormSelect>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <label class="form-label col-auto col-form-label" for="formaPago">Forma de pago</label>
                    <CFormSelect v-model="nominaGeneral.formaPago" id="formaPago">
                        <option selected value="">--Selecciona--</option>
                        <option>BANCO</option>
                        <option>CHEQUE</option>
                    </CFormSelect>
                </div>
                <div class="d-flex align-items-end">
                    <CButton color="info" @click="() => $emit('sendDataFilter', nominaGeneral)">Filtrar</CButton>
                </div>
            </div>
            <div class="d-flex gap-3 align-items-center">
                <slot></slot>

                <CDropdown variant="btn-group" v-if="actions.length" class="z-3">
                    <CDropdownToggle color="light">Acciones</CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem v-for="(action, index) in actions" :key="index" href="javascript:void(0)">
                            <FileSelector v-if="action.type === 'upload'" :title="action.label" :key="index"
                                :icon="action.icon" @fileSelected="catchFileSelection($event, action.accionHandler)" />
                            <span class="d-inline-block w-100" v-else @click="action.accionHandler">
                                <CIcon v-if="action.icon" :icon="action.icon" size="sm" />
                                {{ action.label }}
                            </span>
                        </CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </div>
        </CCardBody>
    </CCard>
</template>
<script>
import { mapActions, mapStores, mapState } from 'pinia';
import { useAuthStore } from '@/store/AuthStore';
import FileSelector from '@/components/FileSelector.vue';

export default {
    name: 'NominaSelectFiscalYear',
    components: {
        FileSelector,
    },
    props: {
        actions: {
            type: Array,
            default: []
        },
        showFiscalYearList: {
            type: Boolean,
            default: true
        },
    },
    emits: ["sendDataFilter"],
    computed: {
        ...mapStores(useAuthStore),
        ...mapState(useAuthStore, ['authInfo']),
        fiscalYearList() {
            return this.authInfo.fiscalListYears.map((yearFiscal) => {
                return {
                    label: `(${yearFiscal.id}) - ${yearFiscal.anio}`,
                    value: yearFiscal.id,
                    info: yearFiscal,
                }
            })
                .sort((first, second) => second.info.anio - first.info.anio)
        },
    },
    methods: {
        ...mapActions(useAuthStore, ['changeFiscalYear']),

        setFiscalYear({ target: { value } }) {
            this.changeFiscalYear(Number(value));
        },
        catchFileSelection(event, callback) {
            callback(event);
        },
    },
    mounted() {
        this.selectedFiscalYear = `${this.authInfo.currentFiscalYearId}`;
    },
    setup() {
        const nominaGeneral = {
            mes: new Date().getMonth() + 1,
            tipoContrato: '',
            formaPago: '',
        };
        return { nominaGeneral }
    },
}
</script>
<style>
.on-top {
    z-index: 1028;
}
</style>