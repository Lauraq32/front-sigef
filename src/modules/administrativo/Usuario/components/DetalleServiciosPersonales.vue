<template>
    <CCol :md="12">
        <div class="row mb-3">
            <div class="col-12 border-bottom mb-3">
                <CButton size="sm" color="primary" class="mb-3" @click="showMesProgDialog">Buscar Estructura</CButton>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Programa:</h6>
                </div>
                <div class="col-2">
                    <CFormInput size="sm" id="validationCustom02" required />
                </div>
                <div class="col-6">
                    <h6>Normas, Politicas y Administracion Municipal</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Sub-programa:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">00</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>Normas, Politicas y Administracion Municipal</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Proyecto:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">00</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>Normas, Politicas y Administracion Municipal</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Actividad/obra:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">00</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>Normas, Politicas y Administracion Municipal</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Funcion:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">00</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>Normas, Politicas y Administracion Municipal</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Clasificador del Gasto:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">00</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>Normas, Politicas y Administracion Municipal</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Unidad Responsable:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right"  for="">00</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>Normas, Politicas y Administracion Municipal</h6>
                </div>
            </div>

        </div>

    </CCol>



    <div>
        <CSmartTable class="sticky-top" clickableRows :tableProps="{
            striped: true,
            hover: true,
        }" :tableHeadProps="{}" :activePage="1" header :items="[]" :columns="columns" columnFilter itemsPerPageSelect
            :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
            <template #status="{ item }">
                <td>
                    <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
                </td>
            </template>
            <template #show_details="{ item, index }">

            </template>
        </CSmartTable>
    </div>
    <SelectMestProgDialog :showModal="MestProgDialog" @close="closeMestProgDialog"/>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import SelectMestProgDialog from './modal/SelectMestProgDialog.vue'
export default {
    components: {
        CSmartTable,
        SelectMestProgDialog
    },
    data: () => {
        return {
            validatedCustom01: null,
            MestProgDialog: false,
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
        handleSubmitCustom01(event) {
            const form = event.currentTarget
            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
            }
            this.validatedCustom01 = true
        },

        showMesProgDialog() {
            this.MestProgDialog = true;
        },
        closeMestProgDialog(data){
            console.log(data)
            this.MestProgDialog = false;
        }
        
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped></style>