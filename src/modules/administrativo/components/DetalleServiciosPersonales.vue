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
                    <CFormInput v-model="servicioPersonales.programa" size="sm" id="validationCustom02" required />
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
                    <label class="text-right" for="">{{servicioPersonales.funcion}}</label>
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
                    <label class="text-right" for="">{{servicioPersonales.unidadResponsable}}</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>Normas, Politicas y Administracion Municipal</h6>
                </div>
            </div>

        </div>

    </CCol>

    <div class="col-12 border-bottom mb-3">
        <CButton size="sm" color="primary" class="mb-3" @click="showDetalleServiciosPersonalesDialog">Agregar Detalle
        </CButton>
    </div>

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

    <SelectMestProgDialog :showModal="MestProgDialog" @close="closeMestProgDialog" />
    <DetalleServiciosPersonales :showModal="DetalleServiciosPersonalesDialog" />
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import SelectMestProgDialog from './modal/SelectMestProgDialog.vue'
import DetalleServiciosPersonales from './modal/ServiciosPersonalesDetalle.vue'
export default {
    components: {
        CSmartTable,
        SelectMestProgDialog,
        DetalleServiciosPersonales
    },
    data: () => {
        return {
            validatedCustom01: null,
            MestProgDialog: false,
            DetalleServiciosPersonalesDialog: false,
            servicioPersonales: {
                programa: '',
                funcion: '',
                unidadResponsable: '',
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
        showDetalleServiciosPersonalesDialog() {
            this.DetalleServiciosPersonalesDialog = true;
        },
        closeMestProgDialog(data) {
            console.log(data.programa)
            this.servicioPersonales.programa = data.programa
            this.servicioPersonales.ctgFuncionId = data.ctgFuncionId
            this.servicioPersonales.unidadRespon = data.unidadRespon
            this.MestProgDialog = false;
        }

    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped></style>