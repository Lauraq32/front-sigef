<template>
    <CModal @close="closeModalGenerarNomina" size="xl" :visible="modalGenerarNomina">
        <CModalHeader>
            <CModalTitle>Generar N&oacute;mina</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CRow>
                <CCol xs="7" class="d-flex flex-column gap-3">
                    <div class="d-flex gap-1">
                        <label class="form-label col-auto col-form-label fw-bolder" for="programa">Programa:</label>
                        <v-select required id="programa" class="w-100" v-model="selectedProgramasDivision"
                            :options="programasDivision" @change="getDepartamentos($event)"></v-select>
                    </div>
                    <div class="d-flex gap-1">
                        <label class="form-label col-auto col-form-label fw-bolder" for="departamento">Departamento:</label>
                        <v-select required id="departamento" class="w-100" v-model="selectedDepartamentos"
                            :options="departamentos"></v-select>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="form-label col-auto col-form-label">PNAP: {{ selectedDepartamentoInfo?.estructura?.pnap
                        }}</span>
                        <span class="form-label col-auto col-form-label">C&oacute;digo del Departamento: {{
                            selectedDepartamentoInfo.code }}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="form-label col-auto col-form-label">Programa: {{
                            selectedDepartamentoInfo?.estructura?.programa }}</span>
                        <span class="form-label col-auto col-form-label">Sub-Programa: {{
                            selectedDepartamentoInfo?.estructura?.programa }}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="form-label col-auto col-form-label">Proyecto: {{
                            selectedDepartamentoInfo?.estructura?.proyecto }}</span>
                        <span class="form-label col-auto col-form-label">Actividad/obra: {{
                            selectedDepartamentoInfo?.estructura?.actObra }}</span>
                    </div>
                    <div>
                        <span class="form-label col-auto col-form-label">Clasificador: {{
                            selectedDepartamentoInfo?.clasificador?.id }}</span>
                    </div>
                    <div class="d-flex gap-1">
                        <span class="form-label col-auto col-form-label">Desc. Clasificador: {{
                            selectedDepartamentoInfo?.clasificador?.descripcion }}</span>
                    </div>
                    <div class="d-flex gap-1">
                        <label class="form-label col-auto col-form-label fw-bolder" for="descClasificador">Fecha de la
                            n&oacute;mina:</label>
                        <CFormInput type="date" v-model="fechaNomina" />
                    </div>
                    <div class="d-flex gap-1">
                        <label class="form-label col-auto col-form-label fw-bolder" for="formaPago">Forma de Pago:</label>
                        <CFormSelect id="formaPago" v-model="generateNomina.formaPago">
                            <option selected value="">Selecciona</option>
                            <option>EFECTIVO</option>
                            <option>BANCO</option>
                            <option>CHEQUE</option>
                        </CFormSelect>
                    </div>
                    <div class="d-flex gap-3">
                        <CFormCheck label="Nomina Regal&iacute;a?" v-model="generateNomina.isRegalia" />
                        <CFormCheck label="Permitir Duplicada en Nomina?" v-model="generateNomina.allowsDuplicate" />
                    </div>
                    <div class="d-flex flex-column gap-1">
                        <label class="form-label col-auto col-form-label fw-bolder" for="nota">Nota (Encabezado
                            N&oacute;mina)</label>
                        <CFormTextarea id="nota" v-model="generateNomina.nota" />
                    </div>
                </CCol>
                <CCol xs="5" class="border p-2">
                    <CNav variant="tabs" role="tablist">
                        <CNavItem>
                            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 1"
                                @click="() => { tabPaneActiveKey = 1 }">
                                Retenciones
                            </CNavLink>
                        </CNavItem>
                        <CNavItem>
                            <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 2"
                                @click="() => { tabPaneActiveKey = 2 }">
                                Ingresos
                            </CNavLink>
                        </CNavItem>
                    </CNav>
                    <CTabContent>
                        <CTabPane role="tabpanel" aria-labelledby="retenciones-tab" :visible="tabPaneActiveKey === 1">
                            <CSmartTable clickableRows :tableProps="{
                                striped: true,
                                hover: true,
                            }" :tableHeadProps="{}" :activePage="1" header :items="this.generateNomina.configuracion.retenciones"
                                :columns="tableConfiguracionNominaRetencion"
                                :sorterValue="{ column: 'status', state: 'asc' }" pagination>
                                <template #nombre="{ item }">
                                    <td>
                                        <CFormInput v-on:keypress="onlyLetter" :disabled="true" v-model="item.nombre" />
                                    </td>
                                </template>
                                <template #codigoEjecucionPresupuestoGasto="{ item }">
                                    <td>
                                        <CFormInput v-on:keypress="onlyLetter"
                                            v-model="item.codigoEjecucionPresupuestoGasto" />
                                    </td>
                                </template>
                                <template #check="{ item }">
                                    <td>
                                        <CFormCheck @change="changeValueCheckById(item.id)" v-model="item.check" />
                                    </td>
                                </template>
                            </CSmartTable>
                            <CFormCheck label="Nomina con Retenciones?" v-model="generateNomina.calcularRetenciones"
                                @change="changeAllValuesCheck(!generateNomina.calcularRetenciones)" />
                        </CTabPane>
                        <CTabPane role="tabpanel" aria-labelledby="ingresos-tab" :visible="tabPaneActiveKey === 2">
                            <CSmartTable clickableRows :tableProps="{
                                striped: true,
                                hover: true,

                            }" :tableHeadProps="{}" :activePage="1" header :items="this.generateNomina.configuracion.ingresos"
                                :columns="tableConfiguracionNominaIngreso"
                                :sorterValue="{ column: 'status', state: 'asc' }" pagination>
                                <template #nombre="{ item }">
                                    <td>
                                        <CFormInput v-on:keypress="onlyLetter" v-model="item.nombre" :disabled="true" />
                                    </td>
                                </template>
                            </CSmartTable>
                        </CTabPane>
                    </CTabContent>
                </CCol>
            </CRow>
        </CModalBody>
        <CModalFooter class="d-flex flex-column justify-content-start align-items-start">
            <div class="d-flex gap-3 align-items-center">
                <CButton color="info" @click="createNomina">
                    <CIcon icon="cilNotes" size="md" /> Generar N&oacute;mina
                </CButton>
                <CFormCheck label="(Todas x Tipo de Pago)" />
            </div>
            <div class="d-flex gap-2">
                <CButton color="light" class="shadow-sm border">
                    <CIcon icon="cilPrint" size="md" /> Imprimir N&oacute;mina
                </CButton>
                <CButton color="light" class="shadow-sm border">
                    <CIcon icon="cilPrint" size="md" /> Emp. con descuentos Mayor a % del sueldo,
                    seg&uacute;n ley
                </CButton>
            </div>
        </CModalFooter>
    </CModal>
</template>
<script>
import { useAuthStore } from '@/store/AuthStore';
import { CModal } from '@coreui/vue';
import { CFormInput, CModalFooter, CRow, CSmartTable } from '@coreui/vue-pro';
import vSelect from 'vue-select';
import { mapState, mapActions } from 'pinia';
import ApiNomina from '../../services/NominaServices';
import { estructura, getConfiguracionNomina } from '@/utils/format';
import CIcon from '@coreui/icons-vue';
import { useToastStore } from '@/store/toast';

export default {
    name: 'ModalGenerarNomina',
    components: {
        CModal,
        CModalFooter,
        CRow,
        CFormInput,
        vSelect,
        CSmartTable,
        CIcon
    },
    props: {
        modalGenerarNomina: Boolean,
    },
    methods: {
        closeModalGenerarNomina() {
            this.$emit('changeValueModal', false);
            this.clearAllData();
        },
        getProgramasDivision() {
            ApiNomina.getProgramaDivision().then((response) => {
                this.programasDivision = response.data.data.map((elem) => ({
                    code: elem.id,
                    label: `(${elem.id}) ${elem.nombre}`,
                }));
                this.programasDivision.unshift({
                    code: 0,
                    label: 'Seleccionar',
                });
            });
        },
        getDepartamentos(ProgramaDivisionId) {
            ApiNomina.getDepartamento({ ProgramaDivisionId }).then((response) => {
                this.departamentos = response.data.data.map((elem) => ({
                    code: elem.id,
                    label: `(${elem.id}) ${elem.nombre}`,
                    clasificador: {
                        id: elem.clasificador.id,
                        descripcion: elem.clasificador.descripcion
                    },
                    estructura: elem.estructura,
                }));
                this.departamentos.unshift({
                    code: 0,
                    label: 'Seleccionar',
                    clasificador: {
                        id: '',
                        descripcion: ''
                    },
                    estructura: ''
                });
            });
        },
        createNomina() {
            this.generateNomina.departamentoId = this.selectedDepartamentos;
            if (this.generateNomina.departamentoId === 0) {
            }
            this.generateNomina.fecha = this.fechaNomina;
            this.generateNomina.configuracion.retenciones = this.generateNomina.configuracion.retenciones.filter((e) => e.check)
            console.log(this.generateNomina);
            // ApiNomina.createNomina(this.generateNomina).then((_) => {
            //     this.clearAllData();
            //     this.show({
            //         content: 'La nomina ha sido generada',
            //         closable: true,
            //         color: 'success'
            //     });
            // }).catch((e) => {
            //     const { message } = e.response.data;
            //     this.show({
            //         content: message,
            //         closable: true,
            //         color: 'danger'
            //     });
            // })
        },
        clearAllData() {
            this.fechaNomina = null;
            this.selectedProgramasDivisionId = 0;
            this.departamentos = [{
                code: 0,
                label: 'Seleccionar',
                clasificador: {
                    id: '',
                    descripcion: ''
                },
                estructura: ''
            }];
            this.selectedDepartamentos = 0;
            this.selectedDepartamentoInfo = {};
            this.generateNomina = {
                fecha: '',
                tipoContrato: '',
                programaDivision: '',
                departamentoId: 0,
                formaPago: '',
                isRegalia: false,
                allowsDuplicate: false,
                calcularRetenciones: true,
                nota: '',
                configuracion: {}
            };
        },
        getConfiguracionNominaApi() {
            ApiNomina.getConfiguracionNomina().then((response) => {
                this.generateNomina.configuracion.retenciones = response.data.data.retencion.map((e) => ({ ...e, check: true }));
                this.generateNomina.configuracion.ingresos = response.data.data.tipoIngreso;
            })
        },
        changeAllValuesCheck(check) {
            this.generateNomina.configuracion.retenciones = this.generateNomina.configuracion.retenciones.map((e) => ({ ...e, check }));
        },
        changeValueCheckById(id) {
            const retencion = this.generateNomina.configuracion.retenciones.find((e) => e.id === id);
            retencion.check = !retencion.check;
        },
        ...mapActions(useToastStore, ['show']),
    },
    computed: {
        fechaNomina: {
            get() {
                if (this.fechaNomina !== null && this.fechaNomina?.toString() !== 'Invalid Date') {
                    let date = this.fechaNomina
                    if (typeof this.fechaNomina === 'string') {
                        date = new Date(this.fechaNomina)
                        return date.toISOString().split('T')[0]
                    }
                }
            },
            set(value) {
                return (this.fechaNomina = new Date(
                    `${value}T00:00:00`,
                ))
            },
        },
        selectedProgramasDivision: {
            get() {
                return this.programasDivision.find((x) => x.code == this.selectedProgramasDivisionId)
            },
            set(util) {
                this.selectedProgramasDivisionId = Number(util.code)
                this.getDepartamentos(this.selectedProgramasDivisionId)
            },
        },
        selectedDepartamentos: {
            get() {
                return this.departamentos.find((x) => x.code == this.selectedDepartamentos)
            },
            set(util) {
                this.selectedDepartamentos = Number(util.code)
                this.selectedDepartamentoInfo = this.departamentos.find((x) => x.code == this.selectedDepartamentos);
                this.selectedDepartamentoInfo.estructura = this.estructura(this.selectedDepartamentoInfo.estructura);
            },
        },
        ...mapState(useAuthStore, ['authInfo'])
    },
    data: function () {
        return {
            fechaNomina: null,
            tabPaneActiveKey: 1,
            programasDivision: [{
                code: 0,
                label: 'Seleccionar'
            }],
            selectedProgramasDivisionId: 0,
            departamentos: [{
                code: 0,
                label: 'Seleccionar',
                clasificador: {
                    id: '',
                    descripcion: ''
                },
                estructura: ''
            }],
            selectedDepartamentos: 0,
            selectedDepartamentoInfo: {},
            generateNomina: {
                fecha: '',
                tipoContrato: '',
                programaDivision: '',
                departamentoId: 0,
                formaPago: '',
                isRegalia: false,
                allowsDuplicate: false,
                calcularRetenciones: true,
                nota: '',
                configuracion: {
                    retenciones: [],
                    ingresos: []
                }
            },
            tableConfiguracionNominaRetencion: [
                {
                    key: 'check',
                    label: '',
                    _style: { width: '5%' }
                }, {
                    key: 'nombre',
                    label: 'Retenciones',
                    _style: { width: '80%' },
                },
                {
                    key: 'codigoEjecucionPresupuestoGasto',
                    label: 'Cod. en Ejec/Pres',
                    _style: { width: '15%' },
                },
            ],
            tableConfiguracionNominaIngreso: [
                {
                    key: 'nombre',
                    label: 'Nombre',
                    _style: { width: '95%' },
                }
            ],
            estructura,
            getConfiguracionNomina
        }
    },
    mounted() {
        this.getProgramasDivision();
        this.getConfiguracionNominaApi();
    }
}
</script>