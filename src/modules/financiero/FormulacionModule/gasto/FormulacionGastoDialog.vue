<template>
    <CModal
        backdrop="static"
        :visible="isVisible"
        size="xl"
        @close="closeDialog()"
        style="width: 85%;"
    >
        <CModalHeader>
            <CModalTitle>
                Captura Estructuras Presupuesto de Gastos
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCardBody>
                <CForm ref="formulacionForm" class="row g-3 needs-validation"  novalidate :validated="isFormValidated">
                    <CCol :md="2">
                        <CFormLabel for="formulacionGasto.pnap">PNAP</CFormLabel>
                        <CFormInput class="form-control"
                            v-model="formulacionGasto.pnap" id="formulacionGasto.pnap" required maxlength="2"
                            @keypress="onlyNumber"
                            :disabled="notActionAllow"
                        />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="2">
                        <CFormLabel for="formulacionGasto.programa">Programa</CFormLabel>
                        <CFormInput v-model="formulacionGasto.programa"
                            id="formulacionGasto.programa" required maxlength="2"
                            @keypress="onlyNumber"
                            :disabled="notActionAllow"
                        />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="2">
                        <CFormLabel for="formulacionGasto.proyecto">Proyecto</CFormLabel>
                        <CInputGroup class="has-validation">
                            <CFormInput v-model="formulacionGasto.proyecto"
                                id="formulacionGasto.proyecto" value="" aria-describedby="inputGroupPrepend" required maxlength="2"
                                @keypress="onlyNumber"
                                :disabled="notActionAllow"
                            />
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </CInputGroup>
                    </CCol>
                    <CCol :md="4">
                        <CFormLabel for="formulacionGasto.actObra">Actividad/Obra</CFormLabel>
                        <CFormInput v-model="formulacionGasto.actObra"
                            id="formulacionGasto.actObra" required maxlength="4"
                            @keypress="onlyNumber"
                            :disabled="notActionAllow"
                        />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="3">
                        <CFormLabel for="formulacionGasto.mestprogId">Est. Programática control</CFormLabel>
                        <CFormInput disabled v-model="formulacionGasto.estControl" id="formulacionGasto.mestprogId">
                        </CFormInput>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="3">
                        <CFormLabel for="formulacionGasto.nombre">Denominación</CFormLabel>
                        <CFormInput v-model="formulacionGasto.nombre" id="formulacionGasto.nombre"
                            :disabled="notActionAllow"
                        />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="4">
                        <CFormLabel for="formulacionGasto.unidadResp">Unidad responsable</CFormLabel>
                        <CFormInput v-model="formulacionGasto.unidadResp" id="formulacionGasto.unidadResp"
                            :disabled="notActionAllow"
                        />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="4">
                        <CFormLabel for="formulacionGasto.tipo">Tipo</CFormLabel>
                        <CFormSelect
                            v-model="formulacionGasto.tipo" id="formulacionGasto.tipo"
                            :disabled="notActionAllow"
                        >
                            <option value="DETALLE">DETALLE</option>
                            <option value="CABECERA">CABECERA</option>
                        </CFormSelect>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="4">
                        <CFormLabel for="formulacionGasto.costObra">No. fondo transferido</CFormLabel>
                        <VueNumberFormat
                            v-model:value="formulacionGasto.costObra"
                            type="text"
                            class="form-control"
                            id="formulacionGasto.costObra"
                            :options="{
                                precision: 0,
                                prefix: '',
                                decimal: '',
                                thousand: '',
                            }"
                            :disabled="notActionAllow"
                        />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-info btn-block mt-1"
                            @click="() => showDetailDialog = true"
                            v-if="!notActionAllow"
                        >
                            Adicionar Detalle
                        </button>
                    </div>
                </CForm>
                <CSmartTable
                    clickableRows
                    :tableProps="{
                        striped: true,
                        hover: true,
                    }" 
                    :ableHeadProps="{}"
                    :activePage="1" 
                    header 
                    :items="formulacionGasto.detallePresGastos" 
                    :columns="columns"
                    columnFilter 
                    :footer="footerItems"
                    columnSorter
                    :sorterValue="{ column: 'ctgClasificadorId', state: 'asc' }"
                    pagination
                    :itemsPerPage="5"
                    :no-items-label="''"
                >
                    <template #totalOriginal="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.totalOriginal || 0) }}
                        </td>
                    </template>

                    <template #presupuestoBco1="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.presupuestoBco1) }}
                        </td>
                    </template>

                    <template #presupuestoBco2="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.presupuestoBco2) }}
                        </td>
                    </template>

                    <template #presupuestoBco3="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.presupuestoBco3) }}
                        </td>
                    </template>

                    <template #presupuestoBco4="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.presupuestoBco4) }}
                        </td>
                    </template>

                    <template #finOrigin="{item}">
                        <td>
                            {{ item.ctgFuenteId }}/{{ item.ctgFuenteEspecificaId }}/{{ item.ctgOrganismoFinanciadorId }}
                        </td>
                    </template>

                    <template #show_details="{ item }">
                        <td>
                            <div class="d-flex">
                                <CButton class="text-primary" square size="sm" @click="onEditDetalle(item)">
                                    <CIcon icon="cilPencil" size="sm"/>
                                </CButton>
                                <CButton class="me-1 text-danger" square size="sm" @click="onDeleteDetalle(item)">
                                    <CIcon icon="cilTrash" size="sm"/>
                                </CButton>
                            </div>
                        </td>
                    </template>
                </CSmartTable>
            </CCardBody>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" data-bs-dismiss="modal" @click="closeDialog()">
                {{ isFiscalYearApprovedOrClose ? 'Cerrar' : 'Cancelar' }}
            </CButton>
            <CButton
                v-if="!notActionAllow"
                color="primary"
                @click="guardarFormulacionGasto"
            >
                Guardar
            </CButton>
        </CModalFooter>
    </CModal>

    <GastoDetalleDialog 
        :isVisible="showDetailDialog"
        :isFiscalYearApprovedOrClose="isFiscalYearApprovedOrClose"
        @close="onDetailDialogClose"
        :detalle="detalle"
    />
</template>
<script setup>
import { CSmartTable, CCol } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'

import { formatPrice } from '@/utils/format';
import { onlyNumber } from '@/utils/validator';
import { ref, watchEffect, nextTick, computed } from 'vue'
import Api from '../services/FormulacionServices'
import GastoDetalleDialog from './GastoDetalleDialog'
import { getAyuntamientoId, getFiscalYearId } from '@/utils/logged-info'
import CIcon from '@coreui/icons-vue';
import Swal from 'sweetalert2';
import {useToastStore} from '@/store/toast';

const emit = defineEmits(['close']);
const newDetailData = {
    id: 0,
    presGastoId: 0,
    ayuntamientoId: getAyuntamientoId(),
    anioFiscalId: getFiscalYearId(),
    mestprogId: '',
    ctgClasificadorId: '',
    cControl: '',
    auxiliar: '',
    ctgFuenteId: '',
    ctgFuenteEspecificaId: '',
    ctgOrganismoFinanciadorId: '',
    oriFondos: 0,
    ctgFuncionId: '1',
    nombre: '',
    tipo: '',
    TIPO_GASTO1: '11',
    TIPO_GASTO2: '12',
    TIPO_GASTO3: '21',
    TIPO_GASTO4: '13',
    tipoGasto: '',
    presupuestoBco1: 0,
    estimadoBco1: 0,
    presupuestoBco1: 0,
    variacionBco1: 0,
    totalDevengadoBco1: 0,
    disponiblePagadoBco1: 0,
    totalPagadoBco1: 0,
    presupuestoBco2: 0,
    estimadoBco2: 0,
    presupuestoBco2: 0,
    variacionBco2: 0,
    totalDevengadoBco2: 0,
    disponiblePagadoBco2: 0,
    totalPagadoBco2: 0,
    presupuestoBco3: 0,
    estimadoBco3: 0,
    presupuestoBco3: 0,
    variacionBco3: 0,
    totalDevengadoBco3: 0,
    disponiblePagadoBco3: 0,
    totalPagadoBco3: 0,
    presupuestoBco4: 0,
    estimadoBco4: 0,
    presupuestoBco4: 0,
    variacionBco4: 0,
    totalDevengadoBco4: 0,
    disponiblePagadoBco4: 0,
    totalPagadoBco4: 0,
    totalOriginal: 0,
    totalCompromiso: 0,
    totalDevengado: 0,
    totalPagado: 0,
    totalVariacion: 0,
    sumTotalOriginal: 0,
    sumTotalCompromiso: 0,
    sumTotalDevengado: 0,
    sumTotalPagado: 0,
    sumTotalVariacion: 0,
};
const showDetailDialog = ref(false);
const isFormValidated = ref();
const detalle = ref({ ...newDetailData });
const formulacionForm = ref();
const props = defineProps({
    formulacionGasto: {
        required: true,
        type: Object,
        default: {},
    },
    isVisible: Boolean,
    isFiscalYearApprovedOrClose: Boolean,
});
const toastStore = useToastStore()

const notActionAllow = computed(() => props.isFiscalYearApprovedOrClose && Boolean(props.formulacionGasto.id));
let columns = [];
const controllerColumn =  {
    key: 'show_details',
    label: '',
    _style: { width: '5%' },
    filter: false,
    sorter: false,
};
const columnsTemplate = [
    {
        key: 'ctgClasificadorId',
        label: 'Clasificador',
        _style: { width: '10%' },
    },
    {
        key: 'nombre',
        label: 'Denominación',
        _style: { width: '20%' },
    },
    {
        key: 'finOrigin',
        label: 'O/Fin',
        _style: { width: '5%' },
    },
    {
        Object: 'detallePresGastos',
        key: 'totalOriginal',
        label: 'Presupuesto',
        _style: { width: '12%' },
    },
    {
        key: 'presupuestoBco1',
        label: 'Gastos Personal',
        _style: { width: '12%' },
    },
    { key: 'presupuestoBco2', label: 'Servicios', _style: { width: '12%' } },
    { key: 'presupuestoBco3', label: 'Inversión', _style: { width: '12%' } },
    {
        key: 'presupuestoBco4',
        label: 'Educ Género/Salud',
        _style: { width: '12%' },
    },
];

const footerItems = ref([
    {
        label: '',
        _props: {
            colspan: 2,
            style: 'font-weight:bold; text-align:left',
        },
    },
    {
        label: '',
        _props: {
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
    {
        label: '',
        _props: {
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
    {
        label: '',
        _props: {
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
    {
        label: '',
        _props: {
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
    {
        label: '',
        _props: {
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
    {
        label: '',
        _props: {
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
]);

watchEffect(() => {
    props.formulacionGasto.mestprogId = `${props.formulacionGasto.pnap ?? ''}${props.formulacionGasto.programa ?? ''}${
        props.formulacionGasto.proyecto ?? ''}${props.formulacionGasto.actObra ?? ''}`;
    props.formulacionGasto.estControl = `${props.formulacionGasto.pnap ?? ''}${props.formulacionGasto.programa ?? ''}${
            props.formulacionGasto.proyecto ?? ''}`;
    props.formulacionGasto.estControl = 
        props.formulacionGasto.estControl ? `${props.formulacionGasto.estControl}0000` : '';

    if (props.isVisible && props.formulacionGasto.id) {
        Api.getDetalle(props.formulacionGasto.id).then((response) => {
            props.formulacionGasto.detallePresGastos = response.data.data ?? [];
            calculateTotals(props.formulacionGasto.detallePresGastos);
        });
    }
    // Load Estructura programatica de control
    if (props.isVisible && props.formulacionGasto.mestprogId && props.formulacionGasto.mestprogId.length >= 10) {
        Api.getEstruturaProgramaticaById(props.formulacionGasto.mestprogId)
        .then((response) => {
            props.formulacionGasto.nombre = response.data?.data?.nombre ?? props.formulacionGasto.nombre;
            props.formulacionGasto.unidadResp = response.data?.data?.unidadRespon ?? props.formulacionGasto.unidadResp;
            props.formulacionGasto.estControl = response.data?.data?.ccontrol ?? props.formulacionGasto.estControl;
        });
    }

    if (props.isVisible && props.isFiscalYearApprovedOrClose && Boolean(props.formulacionGasto.id)) {
        columns = [ ...columnsTemplate ];
    } else {
        columns = [ ...columnsTemplate, controllerColumn ];
    }
});

const onDetailDialogClose = (data) => {
    if (data) {
        const {index, editing, ...rest} = data;
        rest.tipo = props.formulacionGasto.tipo;
        rest.mestprogId = props.formulacionGasto.mestprogId;

        if (editing) {
            props.formulacionGasto.detallePresGastos[index] = rest;
            showDetailDialog.value = false
        } else {
            const found = props.formulacionGasto.detallePresGastos.findIndex(x => (
                Number(x.ctgClasificadorId) === Number(rest.ctgClasificadorId)
                && Number(x.ctgFuenteId) === Number(rest.ctgFuenteId)
                && Number(x.ctgFuenteEspecificaId) === Number(rest.ctgFuenteEspecificaId)
                && Number(x.ctgOrganismoFinanciadorId) === Number(rest.ctgOrganismoFinanciadorId)
            ));

            if (found >= 0) {
                return toastStore.show({
                    content: `Ya el clasificador ${rest.ctgClasificadorId} existe con el mismo origen de financiamiento`,
                    time: 10_000,
                    color: 'danger',
                    class: 'text-white',
                    closable: true
                });
            }
            props.formulacionGasto.detallePresGastos.push(rest);
        }
        props.formulacionGasto.detallePresGastos = [...props.formulacionGasto.detallePresGastos];
    }
    setTimeout(() => {
        nextTick().then(() => {
            calculateTotals(props.formulacionGasto.detallePresGastos);
            detalle.value = { ...newDetailData };
            !data && (showDetailDialog.value = false);
        })
        .catch(console.error);
    }, 200);
}

const onEditDetalle = (item) => {
    const index = props.formulacionGasto.detallePresGastos.findIndex(x => (
        Number(x.ctgClasificadorId) === Number(item.ctgClasificadorId)
        && Number(x.ctgFuenteId) === Number(item.ctgFuenteId)
        && Number(x.ctgFuenteEspecificaId) === Number(item.ctgFuenteEspecificaId)
        && Number(x.ctgOrganismoFinanciadorId) === Number(item.ctgOrganismoFinanciadorId)
    ));
    detalle.value = {...item, editing: true, index};
    showDetailDialog.value = true;
}

const onDeleteDetalle = (item) => {
    Swal.fire({
        denyButtonText: 'No',
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: 'Estás seguro que deseas eliminar este registro?',
        text: 'No podrás revertirlo',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
        if (result.isConfirmed) {
            props.formulacionGasto.detallePresGastos =  props.formulacionGasto.detallePresGastos.filter(x => !(
                Number(x.ctgClasificadorId) === Number(item.ctgClasificadorId)
                && Number(x.ctgFuenteId) === Number(item.ctgFuenteId)
                && Number(x.ctgFuenteEspecificaId) === Number(item.ctgFuenteEspecificaId)
                && Number(x.ctgOrganismoFinanciadorId) === Number(item.ctgOrganismoFinanciadorId)
            ));
            calculateTotals(props.formulacionGasto.detallePresGastos);
        }
    });
}

const closeDialog = (data) => {
    emit('close', data);
    isFormValidated.value = false;
    calculateTotals([]);
}

const guardarFormulacionGasto = () => {
    isFormValidated.value = false;
    if (formulacionForm.value?.$el.checkValidity()) {
        props.formulacionGasto.ayuntamientoId = getAyuntamientoId();
        props.formulacionGasto.anioFiscalId = getFiscalYearId();

        closeDialog(props.formulacionGasto);
    } else {
        isFormValidated.value = true;
    }
}

function calculateTotals(detalles) {
    const totalAmountPresupuesto    = detalles.reduce((acc, detail) => acc + (detail.totalOriginal ?? 0), 0);
    const totalAmountGPersonal      = detalles.reduce((acc, detail) => acc + detail.presupuestoBco1, 0);
    const totalAmountServicio       = detalles.reduce((acc, detail) => acc + detail.presupuestoBco2, 0);
    const totalAmountInversion      = detalles.reduce((acc, detail) => acc + detail.presupuestoBco3, 0);
    const totalAmountEduGenero      = detalles.reduce((acc, detail) => acc + detail.presupuestoBco4, 0);

    footerItems.value[0].label = `Total Items ${detalles.length}`;
    footerItems.value[2].label = formatPrice(totalAmountPresupuesto);
    footerItems.value[3].label = formatPrice(totalAmountGPersonal);
    footerItems.value[4].label = formatPrice(totalAmountServicio);
    footerItems.value[5].label = formatPrice(totalAmountInversion);
    footerItems.value[6].label = formatPrice(totalAmountEduGenero);
}

</script>
