<template>
    <CModal size="xl" backdrop="static" :visible="showModal" @close="closeDialog()">
        <CModalHeader>
            <CModalTitle>Servicio Personales</CModalTitle>
        </CModalHeader>

        <div class=" p-2">
            <div class="row">
                <div class="col-6">
                    <div class="">
                        <h6>Estructura Programatica:</h6>
                    </div>
                    <div class="">
                        <div class="position-relative mb-4 w-100">
                            <input v-model="servicioPersonales.estructuraProgramaticaId" class="form-control padding-input"
                                placeholder="Buscar estructura programatica" />
                            <span class="position-absolute icon-input">
                                <CIcon icon="cisSearch" size="xl" @click="showMesProgDialog" />
                            </span>
                        </div>

                    </div>
                    <div class="col-6">
                        <h6>{{ nombreEstructura }}</h6>
                    </div>
                </div>
                <div class=" col-6">
                    <div class="">
                        <h6>Clasificador del Gasto:</h6>
                    </div>
                    <div class="">
                        <div class="position-relative mb-4 w-100">
                            <input v-model="servicioPersonales.clasificadorId" class="form-control padding-input"
                                placeholder="Buscar Clasificador del Gasto" />
                            <span class="position-absolute icon-input">
                                <CIcon icon="cisSearch" size="xl" @click="showClasificadorDialog" />
                            </span>
                        </div>
                    </div>
                    <div class="col-6">
                        <h6>{{ nombreEstructura }}</h6>
                    </div>
                </div>
            </div>

            <div class="">
                <div class="">
                    <h6>Programa:</h6>
                </div>
                <div class="">
                    <label class="text-right" for="">{{ programa }}</label>
                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>
            <div class="">
                <div class="">
                    <h6>Proyecto:</h6>
                </div>
                <div class="">
                    <label class="text-right" for="">{{ proyecto }}</label>

                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>
            <div class="">
                <div class="">
                    <h6>Actividad/Obra:</h6>
                </div>
                <div class="">
                    <label class="text-right" for="">{{ actividadObra }}</label>
                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>
            <div class="">
                <div class="">
                    <h6>Funci&oacute;n:</h6>
                </div>
                <div class="">
                    <label class="text-right" for="">{{ funcion }}</label>
                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>

            <div class="">
                <div class="">
                    <h6>Unidad Responsable:</h6>
                </div>
                <div class="">
                    <label class="text-right" for="">{{ unidadResponsable }}</label>
                </div>
                <div class="col-6">
                    <h6>{{ nombreEstructura }}</h6>
                </div>
            </div>

            <div class=" " style="text-align: right;">
                <CButton size="sm" color="primary" @click="showDetalleServiciosPersonalesDialog">Agregar Detalle
                </CButton>
            </div>
        </div>





        <div>
            <CSmartTable class="sticky-top" clickableRows :tableProps="{
                striped: true,
                hover: true,
            }" :tableHeadProps="{}" :activePage="1" header :items="serviciosItems" :columns="columns" columnFilter
                itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
                pagination>

                <template #mensual="{ item }">
                    <td>

                        {{ formatPrice(item.mensual) }}
                    </td>
                </template>

                <template #mensualsolicitado="{ item }">
                    <td>

                        {{ formatPrice(item.mensualsolicitado) }}
                    </td>
                </template>
                <template #AnualActual="{ item }">
                    <td>

                        {{ formatPrice(item.mensual * item.cantidad) }}
                    </td>
                </template>
                <template #AnualSolicitado="{ item }">
                    <td>

                        {{ formatPrice(item.mensualsolicitado * item.cantidadsolicitada) }}
                    </td>
                </template>
                <template #show_details="{ item, index }">

                </template>
            </CSmartTable>
        </div>
        <CModalFooter>

            <CButton type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="() => {
                closeDialog()
            }
                ">Cerrar
            </CButton>
            <div class=" ">
                <CButton color="primary" class="" @click="saveServicios">Guardar
                </CButton>
            </div>

        </CModalFooter>
    </CModal>

    <SelectClasificador :showModal="clasificadorDialog" @closeClasificador="closeDialogClasificador" />
    <SelectMestProgDialog :showModal="MestProgDialog" @closeMestProg="closeMestProgDialog" />
    <DetalleServiciosPersonales :showModal="DetalleServiciosPersonalesDialog" @saveDetalle="saveDetalle"
        @closeServiciosPersonales="closeDetalleMestProg" />
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import SelectMestProgDialog from './modal/SelectMestProgDialog.vue'
import SelectClasificador from './modal/SelectClasificador.vue'
import DetalleServiciosPersonales from './modal/ServiciosPersonalesDetalle.vue'
import Api from '../services/FormulacionServices'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import { formatPrice } from '@/utils/format'
export default {
    components: {
        CSmartTable,
        SelectMestProgDialog,
        DetalleServiciosPersonales,
        SelectClasificador
    },
    props: {

        showModal: false,
        servicioPersonalesProps: {
            estructuraProgramaticaId: null,
            clasificadorId: null,
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
        }
    },
    data: () => {

        return {

            formatPrice,
            validatedCustom01: null,
            MestProgDialog: false,
            clasificadorDialog: false,
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
                estructuraProgramaticaId: null,
                clasificadorId: null,
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
                { key: 'Categorias', label: 'Categoría' },
                { key: 'cantidad', label: 'Número de Cargos' },
                { key: 'mensual', label: 'Mensual' },
                { key: 'AnualActual', label: 'Anual' },
                { key: 'cantidadsolicitada', label: 'Número de Cargos' },
                { key: 'mensualsolicitado', label: 'Mensual' },
                { key: 'AnualSolicitado', label: 'Anual' },
                {
                    key: 'show_details',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                },
            ],
            details: [],
        }
    },
    methods: {
        ...mapActions(useToastStore, ['show']),
        cargarCategorias() {

        },
        clearForm() {
            this.programa = null
            this.proyecto = null
            this.actividadObra = null
            this.funcion = null
            this.serviciosItems = [],
                this.servicioPersonales = {
                    estructuraProgramaticaId: null,
                    clasificadorId: null,
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
                }
        },
        handleSubmitCustom01(event) {
            const form = event.currentTarget
            if (form.checkValidity() === false) {
                event.preventDefault()
                event.stopPropagation()
            }
            this.validatedCustom01 = true
        },

        closeDialog() {

            this.$emit('close');
        },



        closeDialogClasificador(data) {
            if (data?.clasifica) {
                this.servicioPersonales.clasificadorId = data.clasifica
                this.clasificadorGasto = data.clasifica
                this.clasificadorDialog = false;
                return
            }
            this.clasificadorDialog = false;

        },
        saveServicios() {
            if (this.servicioPersonales.id) {
                Api.putFpServicioPersonalById(this.servicioPersonales.id, this.servicioPersonales).then((response) => {
                }).then((response) => {
                    this.show({
                        content: 'Registro editado con exito',
                        closable: true,
                    })
                    this.clearForm()
                })
                    .catch((error) => {
                        this.show({
                            content: error.message,
                            closable: true,
                            color: 'danger',
                        })
                    })
                return;
            }
            Api.postFpServicioPersonal(this.servicioPersonales).then((response) => {

                this.$emit('postServicioPersonal');
                this.closeDialog()
            }).then((response) => {
                this.show({
                    content: 'Registro agregado con exito',
                    closable: true,
                })
                this.clearForm()
            })
                .catch((error) => {
                    this.show({
                        content: error.response.data.message,
                        closable: true,
                        color: 'danger',
                    })
                })
        },
        saveDetalle(data) {
            const keys = Object.keys(data);
            const categoriasServicios = [
                'Servicios Generales',
                'Apoyo Administrativo',
                'Técnicos',
                'Profesionales',
                'Dirección y Supervisión',
                'Cargos Típicos',
            ]
            const list = Array.from({ length: 6 }, (_, i) => {
                const term = `go${(i + 1).toString().padStart(2, '0')}`;
                const filteredKeys = keys.filter(key => key.startsWith(term));
                return filteredKeys.reduce((acc, key) => {
                    acc[key.replace(term, '').toLocaleLowerCase()] = data[key];
                    acc['Categorias'] = categoriasServicios[i]
                    acc['AnualActual'] = acc['cantidad'] * acc['mensual']
                    acc['AnualSolicitado'] = acc['cantidadsolicitada'] * acc['mensualsolicitado']
                    return acc;
                }, {
                })
            });
            list.map((item, index) => {
                index = index + 1;
                this.servicioPersonales[`go0${index}Cantidad`] = item['cantidad']
                this.servicioPersonales[`go0${index}Mensual`] = item['mensual']
                this.servicioPersonales[`go0${index}CantidadSolicitada`] = item['cantidadsolicitada']
                this.servicioPersonales[`go0${index}MensualSolicitado`] = item['mensualsolicitado']
            })
            this.serviciosItems = [...list]
        },

        showMesProgDialog() {
            this.MestProgDialog = true;
        },
        showClasificadorDialog() {
            this.clasificadorDialog = true;
        },
        showDetalleServiciosPersonalesDialog() {
            this.DetalleServiciosPersonalesDialog = true;
        },
        closeMestProgDialog(data) {
            if (data) {
                this.servicioPersonales.estructuraProgramaticaId = data.numero
                this.programa = data.programa
                this.proyecto = data.proyecto
                this.actividadObra = data.actObra
                this.funcion = data.ctgFuncionId
                this.MestProgDialog = false;
                return;
            }
            this.MestProgDialog = false;

        },
        closeDetalleMestProg() {
            this.DetalleServiciosPersonalesDialog = false;
        }
    },
    watch: {
        servicioPersonalesProps(value) {
            this.servicioPersonales = value
            this.servicioPersonales.estructuraProgramaticaId = value.estructuraProgramatica.numero
            this.servicioPersonales.clasificadorId = value.clasificador.clasifica
            this.programa = value.estructuraProgramatica.programa
            this.proyecto = value.estructuraProgramatica.proyecto
            this.actividadObra = value.estructuraProgramatica.actObra
            this.funcion = value.estructuraProgramatica.ctgFuncionId
            this.saveDetalle(value)
        }
    }
}
</script>

<style lang="scss" scoped>
.upper-case {
    text-transform: uppercase;
}

.fy-card {
    background-color: #f5f5f5;
    cursor: pointer;
    transition: all .2s ease-in-out;
}

.fy-card:hover {
    transform: translateY(-10%) scale(1.1, 1.1);
    background-color: #fff;
    z-index: 2;
}

.padding-input {
    padding-right: 2.5rem;
}

.icon-input {
    padding: 0.2rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    right: 2px;
}

.ls-2 {
    letter-spacing: 2px;
}
</style>