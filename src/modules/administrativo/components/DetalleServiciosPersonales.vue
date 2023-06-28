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
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Sub-programa:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">{{ subPrograma }}</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Proyecto:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">{{ proyecto }}</label>

                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Actividad/obra:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">{{ actividadObra }}</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Funcion:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">{{ servicioPersonales.funcion }}</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Clasificador del Gasto:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">{{ clasificadorGasto }}</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>
            <div class="row border-bottom">
                <div class="col-2">
                    <h6>Unidad Responsable:</h6>
                </div>
                <div class="col-2">
                    <label class="text-right" for="">{{ servicioPersonales.unidadResponsable }}</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
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
        }" :tableHeadProps="{}" :activePage="1" header :items="serviciosItems" :columns="columns" columnFilter
            itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
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
    <DetalleServiciosPersonales :showModal="DetalleServiciosPersonalesDialog" @saveDetalle="saveDetalle"
        @close="closeDetalleMestProg" />
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
            nombreEstructura: '',
            subPrograma: '',
            proyecto: '',
            actividadObra: '',
            clasificadorGasto: '',
            servicioData: {
                goCantidad: 0,
                goMensual: 0,
                goCantidadSolicitada: 0,
                goMensualSolicitado: 0,
            },
            serviciosItems: [],
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
                { key: 'goCantidad', label: 'Grupos ocupacionales' },
                { key: 'goCantidadSolicitada', label: 'Numero de Cargos' },
                { key: 'goMensual', label: 'Mensual' },
                { key: 'goMensualSolicitado', label: 'Anual' },
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

        saveDetalle(data) {

            const keys = Object.keys(data);


            keys.map((key, index) => {
                const value = data[key];
                if (key[3] == 1) {
                    console.log(value)
                    let servicioData = {
                        goCantidad: 0,
                        goMensual: 0,
                        goCantidadSolicitada: 0,
                        goMensualSolicitado: 0,
                    }
                    servicioData.goCantidad = value
                    servicioData.goMensual = value
                    servicioData.goCantidadSolicitada = value
                    servicioData.goMensualSolicitado = value
                    this.serviciosItems = [servicioData, this.serviciosItems]
                }

                

            });

            //this.servicioPersonales = [...data]
        },

        showMesProgDialog() {
            this.MestProgDialog = true;
        },
        showDetalleServiciosPersonalesDialog() {
            this.DetalleServiciosPersonalesDialog = true;
        },
        closeMestProgDialog(data) {
            this.nombreEstructura = data.nombre
            this.servicioPersonales.programa = data.programa
            this.servicioPersonales.funcion = data.ctgFuncionId
            this.servicioPersonales.unidadResponsable = data.unidadRespon
            this.actividadObra = data.actObra
            this.proyecto = data.proyecto
            this.MestProgDialog = false;
        },
        closeDetalleMestProg() {
            this.DetalleServiciosPersonalesDialog = false;
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped></style>