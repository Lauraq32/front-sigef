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
                    <CFormInput v-model="programa" size="sm" id="validationCustom02" required />
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
                    <label class="text-right" for="">{{ funcion }}</label>
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
                    <label class="text-right" for="">{{ unidadResponsable }}</label>
                    <!-- <CFormInput size="sm" id="validationCustom02" required /> -->
                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>

        </div>

    </CCol>
    <div class="col-12 ">
        <CButton size="sm" color="primary" class="mb-3" @click="saveServicios">Guardar
        </CButton>
    </div>
    <div class="col-12 mb-3" style="text-align: right;">
        <CButton size="sm" color="primary" @click="showDetalleServiciosPersonalesDialog">Agregar Detalle
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
import Api from '../services/FormulacionServices'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
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
            programa: '',
            funcion: '',
            unidadResponsable: '',
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
                // { key: 'cantidad', label: 'Grupos ocupacionales' },
                { key: 'cantidad', label: 'Numero de Cargos' },
                { key: 'mensual', label: 'Mensual' },
                { key: 'AnualActual', label: 'Anual' },
                
                { key: 'cantidadsolicitada', label: 'Numero de Cargos' },
                { key: 'mensualsolicitado', label: 'Mensual' },
                { key: 'AnualSolicitado', label: 'Anual' },
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
        ...mapActions(useToastStore, ['show']),
        handleSubmitCustom01(event) {
            const form = event.currentTarget
            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
            }
            this.validatedCustom01 = true
        },

        saveServicios() {
            Api.postFpServicioPersonal(this.servicioPersonales).then((response) => {
                console.log(response)
            }).then((response) => {
                this.show({
                    content: response.data.message,
                    closable: true,
                    color: 'success',
                })
            })
                .catch((error) => {
                    this.show({
                        content: error.message,
                        closable: true,
                        color: 'danger',
                    })
                })
        },

        saveDetalle(data) {
            const keys = Object.keys(data);
            const list = Array.from({ length: 6 }, (_, i) => {
                const term = `go${(i + 1).toString().padStart(2, '0')}`;
                const filteredKeys = keys.filter(key => key.startsWith(term));
                return filteredKeys.reduce((acc, key) => {
                    acc[key.replace(term, '').toLocaleLowerCase()] = data[key];
                    acc['AnualActual'] = acc['cantidad'] * acc['mensual']
                    acc['AnualSolicitado'] = acc['cantidadsolicitada'] * acc['mensualsolicitado']
                    return acc;
                }, {
                    
                })
            });
            console.log(list)
            this.serviciosItems = [...list]

            this.servicioPersonales = data;
            this.servicioPersonales.funcion = this.funcion
            this.servicioPersonales.programa = this.programa
            this.servicioPersonales.unidadResponsable = this.unidadResponsable
        },

        showMesProgDialog() {
            this.MestProgDialog = true;
        },
        showDetalleServiciosPersonalesDialog() {
            this.DetalleServiciosPersonalesDialog = true;
        },
        closeMestProgDialog(data) {
            if (data) {
                this.nombreEstructura = data.nombre
                this.programa = data.programa
                this.funcion = data.ctgFuncionId
                this.unidadResponsable = data.unidadRespon
                this.actividadObra = data.actObra
                this.proyecto = data.proyecto
                this.MestProgDialog = false;
                return;
            }
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