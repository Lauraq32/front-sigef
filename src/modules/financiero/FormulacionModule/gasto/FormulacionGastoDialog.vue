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
                        <CFormInput class="form-control" :disabled="formulacionGasto.id ? true : false"
                            v-model="formulacionGasto.pnap" id="formulacionGasto.pnap" required maxlength="2"
                            @keypress="onlyNumber"
                        />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="2">
                        <CFormLabel for="formulacionGasto.programa">Programa</CFormLabel>
                        <CFormInput :disabled="formulacionGasto.id ? true : false" v-model="formulacionGasto.programa"
                            id="formulacionGasto.programa" required maxlength="2"
                            @keypress="onlyNumber"
                        />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="2">
                        <CFormLabel for="formulacionGasto.proyecto">Proyecto</CFormLabel>
                        <CInputGroup class="has-validation">
                            <CFormInput :disabled="formulacionGasto.id ? true : false" v-model="formulacionGasto.proyecto"
                                id="formulacionGasto.proyecto" value="" aria-describedby="inputGroupPrepend" required maxlength="2"
                            @keypress="onlyNumber"
                        />
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </CInputGroup>
                    </CCol>
                    <CCol :md="4">
                        <CFormLabel for="formulacionGasto.actObra">Actividad/Obra</CFormLabel>
                        <CFormInput :disabled="formulacionGasto.id ? true : false" v-model="formulacionGasto.actObra"
                            id="formulacionGasto.actObra" required maxlength="4"
                            @keypress="onlyNumber"
                        />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="3">
                        <CFormLabel for="formulacionGasto.mestprogId">Est. Programática control</CFormLabel>
                        <CFormInput disabled v-model="formulacionGasto.estructuraProgramaticaControl" id="formulacionGasto.mestprogId">
                        </CFormInput>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="3">
                        <CFormLabel for="formulacionGasto.nombre">Denominación</CFormLabel>
                        <CFormInput v-model="formulacionGasto.nombre" id="formulacionGasto.nombre" />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="4">
                        <CFormLabel for="formulacionGasto.unidadResp">Unidad responsable</CFormLabel>
                        <CFormInput v-model="formulacionGasto.unidadResp" id="formulacionGasto.unidadResp">
                        </CFormInput>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="4">
                        <CFormLabel for="formulacionGasto.tipo">Tipo</CFormLabel>
                        <CFormSelect v-model="formulacionGasto.tipo" id="formulacionGasto.tipo">
                            <option value="DETALLE">DETALLE</option>
                            <option value="CABECERA">CABECERA</option>
                        </CFormSelect>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="4">
                        <CFormLabel for="formulacionGasto.costObra">No. fondo transferido</CFormLabel>
                        <VueNumberFormat v-model:value="formulacionGasto.costObra" type="text" class="form-control" id="formulacionGasto.costObra"
                        :options="{
                            precision: 0,
                            prefix: '',
                            decimal: '',
                            thousand: '',
                        }"/>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info btn-block mt-1" @click="() => showDetailDialog = true">
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
                    :sorterValue="{ column: 'status', state: 'asc' }"
                    pagination
                >
                    <template #totalOriginal="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.totalOriginal || 0) }}
                        </td>
                    </template>

                    <template #oriBco1="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.oriBco1) }}
                        </td>
                    </template>

                    <template #oriBco2="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.oriBco2) }}
                        </td>
                    </template>

                    <template #oriBco3="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.oriBco3) }}
                        </td>
                    </template>

                    <template #oriBco4="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.oriBco4) }}
                        </td>
                    </template>

                    <template #show_details="{ item }">
                        <td>
                            <div>
                                <CButton class="m-1" color="danger" square size="sm" @click="onDeleteDetalle(item)">
                                    <CIcon icon="cilTrash" size="sm"/>
                                </CButton>
                                <CButton class="m-1" color="warning" square size="sm" @click="onEditDetalle(item)">
                                    <CIcon icon="cilPencil" size="sm"/>
                                </CButton>
                            </div>
                        </td>
                    </template>
                </CSmartTable>
            </CCardBody>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" data-bs-dismiss="modal" @click="closeDialog()">Cancelar</CButton>
            <CButton color="primary" @click="guardarFormulacionGasto">Guardar</CButton>
        </CModalFooter>
    </CModal>

    <GastoDetalleDialog 
        :isVisible="showDetailDialog"
        @close="onDetailDialogClose"
        :detalle="detalle"
    />
</template>
<script setup>
import { CSmartTable, CCol } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'

import { formatPrice } from '@/utils/format';
import { onlyNumber } from '@/utils/validator';
import { ref, watchEffect, nextTick } from 'vue'
import Api from '../services/FormulacionServices'
import GastoDetalleDialog from './GastoDetalleDialog'
import { getAyuntamientoId, getFiscalYearId } from '@/utils/logged-info'
import CIcon from '@coreui/icons-vue';
import Swal from 'sweetalert2';

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
    oriBco1: 0,
    estimadoBco1: 0,
    presupuestoBco1: 0,
    variacionBco1: 0,
    totalDevengadoBco1: 0,
    disponiblePagadoBco1: 0,
    totalPagadoBco1: 0,
    oriBco2: 0,
    estimadoBco2: 0,
    presupuestoBco2: 0,
    variacionBco2: 0,
    totalDevengadoBco2: 0,
    disponiblePagadoBco2: 0,
    totalPagadoBco2: 0,
    oriBco3: 0,
    estimadoBco3: 0,
    presupuestoBco3: 0,
    variacionBco3: 0,
    totalDevengadoBco3: 0,
    disponiblePagadoBco3: 0,
    totalPagadoBco3: 0,
    oriBco4: 0,
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
    isVisible: Boolean
});

const columns = [
    {
        key: 'ctgClasificadorId',
        label: 'Clasificador',
        _style: { width: '10%' },
    },
    {
        key: 'nombre',
        label: 'Denominacion',
        _style: { width: '25%' },
    },
    {
        Object: 'detallePresGastos',
        key: 'totalOriginal',
        label: 'Presupuesto',
        _style: { width: '12%' },
    },
    {
        key: 'oriBco1',
        label: 'Gastos Personal',
        _style: { width: '12%' },
    },
    { key: 'oriBco2', label: 'Servicios', _style: { width: '12%' } },
    { key: 'oriBco3', label: 'Inversion', _style: { width: '12%' } },
    {
        key: 'oriBco4',
        label: 'Educ/Genero/Salud',
        _style: { width: '12%' },
    },
    {
        key: 'show_details',
        label: '',
        _style: { width: '5%' },
        filter: false,
        sorter: false,
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
]);

watchEffect(() => {
    props.formulacionGasto.mestprogId = `${props.formulacionGasto.pnap ?? ''}${props.formulacionGasto.programa ?? ''}${
        props.formulacionGasto.proyecto ?? ''}${props.formulacionGasto.actObra ?? ''}`;

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
            props.formulacionGasto.nombre = response.data?.data?.nombre ?? '';
            props.formulacionGasto.unidadResp = response.data?.data?.unidadRespon ?? '';
            props.formulacionGasto.estructuraProgramaticaControl = response.data?.data?.ccontrol ?? '';
        });
    }
});

const onDetailDialogClose = (data) => {
    if (data) {
        const {editing, ...rest} = data;
        if (editing) {
            const index = props.formulacionGasto.detallePresGastos.findIndex(x => (
                x.ctgClasificadorId === rest.ctgClasificadorId
                && x.cControl === rest.cControl
                && x.ctgFuenteId === rest.ctgFuenteId
                && x.ctgFuenteEspecificaId === rest.ctgFuenteEspecificaId
                && x.ctgOrganismoFinanciadorId === rest.ctgOrganismoFinanciadorId
            ));
            
            props.formulacionGasto.detallePresGastos[index] = rest;
        } else {
            props.formulacionGasto.detallePresGastos.push(rest);
        }
        props.formulacionGasto.detallePresGastos = [...props.formulacionGasto.detallePresGastos];
    }
    setTimeout(() => {
        nextTick().then(() => {
            calculateTotals(props.formulacionGasto.detallePresGastos);
            detalle.value = { ...newDetailData };
            showDetailDialog.value = false;
        })
        .catch(console.error);
    }, 200);;
}

const onEditDetalle = (item) => {
    detalle.value = {...item, editing: true};
    showDetailDialog.value = true;
}

const onDeleteDetalle = (item) => {
    Swal.fire({
        title: 'Realmente quieres borrar este registro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
        allowEscapeKey: false,
        allowOutsideClick: false
    }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {
            const index = props.formulacionGasto.detallePresGastos.findIndex(x => (
                x.ctgClasificadorId === item.ctgClasificadorId
                && x.cControl === item.cControl
                && x.ctgFuenteId === item.ctgFuenteId
                && x.ctgFuenteEspecificaId === item.ctgFuenteEspecificaId
                && x.ctgOrganismoFinanciadorId === item.ctgOrganismoFinanciadorId
            ));

            props.formulacionGasto.detallePresGastos.splice(index, 1);
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
        closeDialog(props.formulacionGasto);
    } else {
        isFormValidated.value = true;
    }
}

function calculateTotals(detalles) {
    const totalAmountPresupuesto    = detalles.reduce((acc, detail) => acc + (detail.totalOriginal ?? 0), 0);
    const totalAmountGPersonal      = detalles.reduce((acc, detail) => acc + detail.oriBco1, 0);
    const totalAmountServicio       = detalles.reduce((acc, detail) => acc + detail.oriBco2, 0);
    const totalAmountInversion      = detalles.reduce((acc, detail) => acc + detail.oriBco3, 0);
    const totalAmountEdiGenero      = detalles.reduce((acc, detail) => acc + detail.oriBco4, 0);

    footerItems.value[0].label = `Total Items ${detalles.length}`;
    footerItems.value[1].label = formatPrice(totalAmountPresupuesto);
    footerItems.value[2].label = formatPrice(totalAmountGPersonal);
    footerItems.value[3].label = formatPrice(totalAmountServicio);
    footerItems.value[4].label = formatPrice(totalAmountInversion);
    footerItems.value[5].label = formatPrice(totalAmountEdiGenero);
}

</script>
