<template>
    <CModal @close="closeModalFpMeta" size="xl" :visible="modalFpMeta">
        <CModalHeader>
            <CModalTitle>Agregar Fp Metas</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm">
                <div class="col-12">
                    <CButton size="sm" color="primary" class="mb-3" @click="() => mestProgDialog = true">Buscar
                        Estructura
                    </CButton>
                </div>
                <div class="row">
                    <p><strong>Estructura Programatica: </strong> {{ fpMeta.estructuraProgramaticaId }}</p>
                    <div class="row">
                        <p><strong>Programa: </strong> {{ estructura.programa }}</p>
                    </div>
                    <div class="row">
                        <p><strong>Proyecto: </strong> {{ estructura.proyecto }}</p>
                    </div>
                    <div class="row">
                        <p><strong>Actividad/obra: </strong> {{ estructura.actObra }}</p>
                    </div>
                    <div class="row">
                        <p><strong>Funcion: </strong> {{ estructura.ctgFuncionId }}</p>
                    </div>
                    <div class="row">
                        <p><strong>Unidad Responsable: </strong> {{ estructura.unidadRespon }}</p>
                    </div>
                </div>
                <h6 class="my-2">Descripci&oacute;n</h6>
                <CFormTextarea rows="4" v-model="fpMeta.descripcion" required></CFormTextarea>
                <div class="col-12 border-bottom my-3 d-flex justify-content-between">
                    <CButton size="sm" color="primary" class="mb-3" @click="() => showModalFpMetaDetalle = true">Agregar
                        Detalle
                    </CButton>
                    <CButton size="sm" color="success" class="mb-3" @click="sendData">Guardar todo
                    </CButton>
                </div>
                <div>
                    <CSmartTable class="sticky-top" clickableRows :tableProps="{
                        striped: true,
                        hover: true,
                    }" :tableHeadProps="{}" :activePage="1" header :items="fpMeta.fpMetaDetalles"
                        :columns="tableColumnsFpMetaDetalles" itemsPerPageSelect :itemsPerPage="10" columnSorter
                        :sorterValue="{ column: 'status', state: 'asc' }" pagination>
                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CButton color="danger" variant="outline" square size="sm"
                                    @click="removeAFpMetaDetalle(item)">
                                    X
                                </CButton>
                            </td>
                        </template>
                    </CSmartTable>
                </div>
            </CForm>
            <FpMetaDetalleModal :modalFpMetaDetalle="showModalFpMetaDetalle"
                @closeModalFpMetaDetalle="closeFpMetaDetalleModal" @getFpMetaDetalles="addDetalleToFpMetaDetalle" />
            <SelectMestProgDialog :showModal="mestProgDialog" @close="closeMestProgDialog" />
        </CModalBody>
        <CModalFooter>
        </CModalFooter>
    </CModal>
</template>
<script>
import { CModal, CForm } from '@coreui/vue';
import { CContainer, CFormTextarea, CSmartTable } from '@coreui/vue-pro';
import FpMetaDetalleModal from "./FpMetaDetalleModal.vue"
import SelectMestProgDialog from "./SelectMestProgDialog.vue"
import { mapState, mapActions } from 'pinia';
import { useToastStore } from '@/store/toast';
import { useAuthStore } from '@/store/AuthStore';
import AdministrativoApi from "../../services/FormulacionServices";

export default {
    data: function () {
        return {
            tableColumnsFpMetaDetalles: [
                { key: "descripcion", label: "Descripción", _style: { width: "35%" } },
                { key: "unidadMedida", label: "Unidad Medida", _style: { width: "20%" } },
                { key: "estimadoAnioActual", label: "Estimado Año Actual", _style: { width: "20%" } },
                { key: "programadoAnioSiguiente", label: "Programado Año Siguiente", _style: { width: "20%" } },
                { key: 'show_details', label: '', _style: { width: '5s%' }, filter: false, sorter: false }
            ],
            showModalFpMetaDetalle: false,
            mestProgDialog: false,
            isFormEventTypeValidated: false,
            fpMeta: {
                estructuraProgramaticaId: '',
                descripcion: null,
                fpMetaDetalles: []
            },
            estructura: {
                nombreEstructura: "",
                programa: "",
                ctgFuncionId: "",
                unidadRespon: "",
                actObra: "",
                proyecto: "",
            }
        };
    },
    props: {
        modalFpMeta: Boolean,
        fpMetaProps: {
            estructuraProgramaticaId: '',
            descripcion: null,
            fpMetaDetalles: []
        },
        estructuraProps: {
            nombreEstructura: "",
            programa: "",
            ctgFuncionId: "",
            unidadRespon: "",
            actObra: "",
            proyecto: "",
        },
    },
    components: { CContainer, CFormTextarea, CSmartTable, CForm, CModal, FpMetaDetalleModal, SelectMestProgDialog, },
    methods: {
        closeModalFpMeta() {
            this.$emit('closeModalFpMeta', false);
        },
        closeMestProgDialog(data) {
            if (data) {
                this.fpMeta.estructuraProgramaticaId = data.numero;
                this.estructura.nombreEstructura = data.nombre;
                this.estructura.programa = data.programa;
                this.estructura.ctgFuncionId = data.ctgFuncionId;
                this.estructura.unidadRespon = data.unidadRespon;
                this.estructura.actObra = data.actObra;
                this.estructura.proyecto = data.proyecto;
                this.mestProgDialog = false;
                return;
            }
            this.mestProgDialog = false;
        },
        closeFpMetaDetalleModal(value) {
            this.showModalFpMetaDetalle = value;
        },
        addDetalleToFpMetaDetalle(value) {
            this.fpMeta.fpMetaDetalles = [...this.fpMeta.fpMetaDetalles, value];
        },
        removeAFpMetaDetalle(value) {
            if (value.id) {
                AdministrativoApi.deleteFpMetaDetalle(value.id).then(() => {
                    this.fpMeta.fpMetaDetalles = this.fpMeta.fpMetaDetalles.filter((fpMetaDetalle) => fpMetaDetalle.id !== value.id);
                }).catch(({ data }) => {
                    this.show({
                        content: data.message,
                        closable: true,
                        color: 'success'
                    });
                });
            } else {
                this.fpMeta.fpMetaDetalles = this.fpMeta.fpMetaDetalles.filter((fpMetaDetalle) => fpMetaDetalle.id !== value.id);
            }
        },
        saveFpMeta() {
            if (!this.fpMeta.id) {
                AdministrativoApi.createFpMetaAndDetalle(this.fpMeta).then(({ data }) => {
                    this.show({
                        content: data.message || "Registro guardado",
                        closable: true,
                        color: 'success'
                    });
                    this.$emit('update');
                }).catch(({response}) => {
                    debugger;
                    this.show({
                        content: response.data.message,
                        closable: true,
                        color: 'danger'
                    });
                });
                return;
            }
            AdministrativoApi.editFpMetaAndDetalle(this.fpMeta.id, this.fpMeta).then(({ data }) => {
                this.clearFrom();
                this.show({
                    content: data.message || "Registro guardado",
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
            return;
        },
        sendData() {
            this.isFormEventTypeValidated = false;
            if (this.$refs.eventTypeForm.$el.checkValidity()) {
                this.saveFpMeta();
            }
            this.isFormEventTypeValidated = true;
            return;
        },
        clearFrom() {
            this.fpMeta = {
                estructuraProgramaticaId: '',
                descripcion: null,
                fpMetaDetalles: []
            };
            this.estructura = {
                nombreEstructura: "",
                programa: "",
                ctgFuncionId: "",
                unidadRespon: "",
                actObra: "",
                proyecto: "",
            };
        },
        ...mapActions(useToastStore, ['show']),
    },
    computed: {
        ...mapState(useAuthStore, ['authInfo']),
    },
    watch: {
        fpMetaProps() {
            this.fpMeta = this.fpMetaProps;
        },
        estructuraProps() {
            this.estructura = this.estructuraProps;
        }
    },
}
</script>