<template>
    <CContainer>
        <h1 class="mb-3 text-cente, CSmartTabler">Formulario FP-04</h1>
        <CCol :md="12" class="mb-3">
            <CForm novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm">
                <div class="row mb-3">
                    <div class="col-12 border-bottom mb-3">
                        <CButton size="sm" color="primary" class="mb-3" @click="() => mestProgDialog = true">Buscar
                            Estructura
                        </CButton>
                    </div>
                    <div class="row border-bottom">
                        <div class="col-2">
                            <h6>Programa:</h6>
                        </div>
                        <div class="col-2">
                            <CFormInput size="sm" id="validationCustom02" v-model="fpMeta.programa" required />
                        </div>
                        <div class="col-6">
                            <h6></h6>
                        </div>
                    </div>
                    <div class="row border-bottom">
                        <div class="col-2">
                            <h6>Sub-programa:</h6>
                        </div>
                        <div class="col-2">
                            <label class="text-right" for="">{{ estructura.subPrograma }}</label>
                        </div>
                        <div class="col-6">
                            <h6></h6>
                        </div>
                    </div>
                    <div class="row border-bottom">
                        <div class="col-2">
                            <h6>Proyecto:</h6>
                        </div>
                        <div class="col-2">
                            <label class="text-right" for="">{{ estructura.proyecto }}</label>
                        </div>
                        <div class="col-6">
                            <h6></h6>
                        </div>
                    </div>
                    <div class="row border-bottom">
                        <div class="col-2">
                            <h6>Actividad/obra:</h6>
                        </div>
                        <div class="col-2">
                            <label class="text-right" for="">{{ estructura.actividadObra }}</label>
                        </div>
                        <div class="col-6">
                            <h6></h6>
                        </div>
                    </div>
                    <div class="row border-bottom">
                        <div class="col-2">
                            <h6>Funcion:</h6>
                        </div>
                        <div class="col-2">
                            <label class="text-right" for="">{{ estructura.funcion }}</label>
                        </div>
                        <div class="col-6">
                            <h6></h6>
                        </div>
                    </div>
                    <div class="row border-bottom">
                        <div class="col-2">
                            <h6>Clasificador del Gasto:</h6>
                        </div>
                        <div class="col-2">
                            <label class="text-right" for="">{{ estructura.clasificadorGasto }}</label>
                        </div>
                        <div class="col-6">
                            <h6></h6>
                        </div>
                    </div>
                    <div class="row border-bottom">
                        <div class="col-2">
                            <h6>Unidad Responsable:</h6>
                        </div>
                        <div class="col-2">
                            <label class="text-right" for="">{{ estructura.unidadResponsable }}</label>
                            <div class="col-6">
                                <h6></h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h6>Descripci&oacute;n</h6>
                    <CFormTextarea rows="4" v-model="fpMeta.descripcion" required></CFormTextarea>
                </div>
            </CForm>
        </CCol>
        <div class="col-12 border-bottom mb-3 d-flex justify-content-between">
            <CButton size="sm" color="primary" class="mb-3" @click="() => showModalFpMetaDetalle = true">Agregar Detalle
            </CButton>
            <CButton size="sm" color="success" class="mb-3" @click="sendData">Guardar todo
            </CButton>
        </div>
        <div>
            <CSmartTable class="sticky-top" clickableRows :tableProps="{
                striped: true,
                hover: true,
            }" :tableHeadProps="{}" :activePage="1" header :items="fpMeta.fpMetaDetalles" :columns="tableColumnsFpMeta"
                itemsPerPageSelect :itemsPerPage="10" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
                pagination>
                <template #show_details="{ item }">
                    <td class="py-2">
                        <CButton color="danger" variant="outline" square size="sm" @click="removeAFpMetaDetalle(item)">
                            X
                        </CButton>
                    </td>
                </template>
            </CSmartTable>
        </div>
    </CContainer>
    <SelectMestProgDialog :showModal="mestProgDialog" @close="closeMestProgDialog" />
    <FpMetaDetalleModal :modalFpMetaDetalle="showModalFpMetaDetalle" @closeModalFpMetaDetalle="getCloseFpMetaDetalleModal"
        @getFpMetaDetalles="addDetalleToFpMetaDetalle" />
</template>
<script>
import { CContainer, CFormTextarea, CSmartTable, CForm } from '@coreui/vue-pro';
import { mapState, mapActions } from 'pinia';
import { useToastStore } from '@/store/toast';
import { useAuthStore } from '@/store/AuthStore';
import AdministrativoApi from "../services/FormulacionServices";
import FpMetaDetalleModal from '../components/modal/FpMetaDetalleModal.vue';
import SelectMestProgDialog from '../components/modal/SelectMestProgDialog.vue';

export default {
    data: function () {
        return {
            tableColumnsFpMeta: [
                { key: "descripcion", label: "Descripción", _style: { width: "35%" } },
                { key: "unidadMedida", label: "Unidad Medida", _style: { width: "20%" } },
                { key: "estimadoAnioActual", label: "Estimado Año Actual", _style: { width: "20%" } },
                { key: "programadoAnioSiguiente", label: "Programado Año Siguiente", _style: { width: "20%" } },
                { key: 'show_details', label: '', _style: { width: '5s%' }, filter: false, sorter: false }
            ],
            fpMeta: {
                programa: null,
                descripcion: null,
                fpMetaDetalles: []
            },
            estructura: {
                nombreEstructura: '',
                subPrograma: '',
                proyecto: '',
                actividadObra: '',
                clasificadorGasto: '',
                funcion: '',
                unidadResponsable: ""
            },
            showModalFpMetaDetalle: false,
            mestProgDialog: false,
            isFormEventTypeValidated: false
        };
    },
    components: { CContainer, CFormTextarea, CSmartTable, FpMetaDetalleModal, SelectMestProgDialog },
    methods: {
        getCloseFpMetaDetalleModal(value) {
            this.showModalFpMetaDetalle = value;
        },
        addDetalleToFpMetaDetalle(value) {
            this.fpMeta.fpMetaDetalles = [...this.fpMeta.fpMetaDetalles, value];
        },
        removeAFpMetaDetalle(value) {
            if (value.id) {
                AdministrativoApi.deleteFpMetaDetalle(value.id).then(() => { });
            }
            this.fpMeta.fpMetaDetalles.splice(this.fpMeta.fpMetaDetalles.indexOf(value), 1);
        },
        saveFpMeta() {
            if (!this.fpMeta.id) {
                AdministrativoApi.createFpMetaAndDetalle(this.fpMeta).then(({ data }) => {
                    this.show({
                        content: data.message,
                        closable: true,
                        color: 'success'
                    });
                }).catch(({ data }) => {
                    this.show({
                        content: data.message,
                        closable: true,
                        color: 'danger'
                    });
                });
                return;
            }
            AdministrativoApi.editFpMetaAndDetalle(this.fpMeta.id, this.fpMeta).then(({ data }) => {
                this.show({
                    content: data.message,
                    closable: true,
                    color: 'success'
                });
            }).catch(({ response }) => {
                this.show({
                    content: response.data.message,
                    closable: true,
                    color: 'danger'
                });
            });
        },
        closeMestProgDialog(data) {
            if (data) {
                this.estructura.nombreEstructura = data.nombre
                this.fpMeta.programa = data.programa
                this.estructura.funcion = data.ctgFuncionId
                this.estructura.unidadResponsable = data.unidadRespon
                this.estructura.actividadObra = data.actObra
                this.estructura.proyecto = data.proyecto
                this.mestProgDialog = false;
                return;
            }
            this.mestProgDialog = false;

        },
        getFpMeta() {
            AdministrativoApi.getFpMetaAndDetalle().then(({ data }) => {
                var info = data.data;
                if (info) {
                    this.fpMeta.programa = info.programa;
                    this.fpMeta.descripcion = info.descripcion;
                    this.fpMeta.id = info.id;
                    this.fpMeta.fpMetaDetalles = info.fpMetaDetalles;
                    return;
                }
            })
        },
        sendData() {
            this.isFormEventTypeValidated = false
            if (this.$refs.eventTypeForm.$el.checkValidity()) {
                this.saveFpMeta();
            }
            this.isFormEventTypeValidated = true
        },
        ...mapActions(useToastStore, ['show']),
    },
    computed: {
        ...mapState(useAuthStore, ['authInfo']),
    },
    mounted() {
        this.getFpMeta();
    }
}
</script>