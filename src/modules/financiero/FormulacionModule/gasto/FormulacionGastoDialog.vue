<template>
    <CModal
        backdrop="static"
        :visible="isVisible"
        size="xl"
        @close="closeDialog()"
        style="width: 80%;"
    >
        <CModalHeader>
            <CModalTitle>
                Captura Estructuras Presupuesto de Gastos
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCardBody>
                <CForm ref="formulacionForm" class="row g-3 needs-validation" novalidate>
                    <CCol :md="2">
                        <CFormLabel for="formulacionGasto.pnap">PNAP</CFormLabel>
                        <input ref="name" class="form-control" :disabled="id != null ? true : false" @change="sumOfProp"
                            v-model="formulacionGasto.pnap" id="formulacionGasto.pnap" />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="2">
                        <CFormLabel for="formulacionGasto.programa">Programa</CFormLabel>
                        <CFormInput :disabled="id != null ? true : false" @change="sumOfProp" v-model="formulacionGasto.programa"
                            id="formulacionGasto.programa" required />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="2">
                        <CFormLabel for="formulacionGasto.proyecto">Proyecto</CFormLabel>
                        <CInputGroup class="has-validation">
                            <CFormInput :disabled="id != null ? true : false" @change="sumOfProp" v-model="formulacionGasto.proyecto"
                                id="formulacionGasto.proyecto" value="" aria-describedby="inputGroupPrepend" required />
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </CInputGroup>
                    </CCol>
                    <CCol :md="4">
                        <CFormLabel for="formulacionGasto.actObra">Actividad/Obra</CFormLabel>
                        <CFormInput :disabled="id != null ? true : false" @change="sumOfProp" v-model="formulacionGasto.actObra"
                            id="formulacionGasto.actObra" required />
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="3">
                        <CFormLabel for="formulacionGasto.estructuraProgramatica">Est. Programática control</CFormLabel>
                        <CFormInput disabled v-model="formulacionGasto.estructuraProgramatica" id="formulacionGasto.estructuraProgramatica">
                        </CFormInput>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="3">
                        <CFormLabel for="formulacionGasto.nombre">Denominación</CFormLabel>
                        <CFormInput v-model="formulacionGasto.nombre" id="formulacionGasto.nombre" required />
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
                            <option>DETALLE</option>
                            <option>CABECERA</option>
                        </CFormSelect>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol :md="4">
                        <CFormLabel for="formulacionGasto.costObra">No. fondo transferido</CFormLabel>
                        <CFormInput v-model="formulacionGasto.costObra" id="formulacionGasto.costObra"></CFormInput>
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
                    itemsPerPageSelect 
                    columnFilter 
                    :footer="footerItems" 
                    :itemsPerPage="10" 
                    columnSorter
                    :sorterValue="{ column: 'status', state: 'asc' }"
                    pagination
                >
                    <template #status="{ item }">
                        <td>
                            <CBadge :color="getBadgeColor(item.status)">
                                {{ item.status }}
                            </CBadge>
                        </td>
                    </template>

                    <template #totalOriginal="{ item }">
                        <td class="text-end">
                            {{ formatPrice(item.totalOriginal) }}
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
                        <td class="py-2">
                            <CButton color="primary" variant="outline" square size="sm" @click="onEditDetalle(item)">
                                Editar
                            </CButton>
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

import { formatPrice } from '@/utils/format'
import { defineProps, ref, defineEmits, watchEffect } from 'vue'
import Api from '../services/FormulacionServices'
import GastoDetalleDialog from './GastoDetalleDialog'

const emit = defineEmits(['close']);
const showDetailDialog = ref(false);
const detalle = ref({});
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
        _style: { width: '20%' },
    },
    {
        key: 'nombre',
        label: 'Denominacion',
        _style: { width: '60%' },
    },
    {
        Object: 'detallePresGastos',
        key: 'totalOriginal',
        label: 'Presupuesto',
        _style: { width: '40%' },
    },
    {
        key: 'oriBco1',
        label: 'Gastos Personal',
        _style: { width: '40%' },
    },
    { key: 'oriBco2', label: 'Servicios', _style: { width: '40%' } },
    { key: 'oriBco3', label: 'Inversion', _style: { width: '40%' } },
    {
        key: 'oriBco4',
        label: 'Educ/Genero/Salud',
        _style: { width: '40%' },
    },
    {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
    },
];

const footerItems = [
    {
        label: 'Total Items',
        _props: {
            color: '',
            colspan: 2,
            style: 'font-weight:bold; text-align:left',
        },
    },
    {
        label: 0,
        _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
    {
        label: 0,
        _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
    {
        label: 0,
        _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
    {
        label: 0,
        _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
    {
        label: 0,
        _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right ',
        },
    },
];

watchEffect(() => {
    console.log(props.formulacionGasto);
    props.formulacionGasto.estructuraProgramatica = `${props.formulacionGasto.pnap}${props.formulacionGasto.programa}${props.formulacionGasto.proyecto}${props.formulacionGasto.actObra}`;
    if (props.isVisible) {
        Api.getDetalle(props.formulacionGasto.id).then((response) => {
            console.log("bobo", response)
            props.formulacionGasto.detallePresGastos = response.data.data ?? [];

            const totalAmountPresupuesto    = props.formulacionGasto.detallePresGastos.reduce((acc, detalle) => acc + detalle.totalOriginal, 0);
            const totalAmountGPersonal      = props.formulacionGasto.detallePresGastos.reduce((acc, detalle) => acc + detalle.oriBco1, 0);
            const totalAmountServicio       = props.formulacionGasto.detallePresGastos.reduce((acc, detalle) => acc + detalle.oriBco2, 0);
            const totalAmountInversion      = props.formulacionGasto.detallePresGastos.reduce((acc, detalle) => acc + detalle.oriBco3, 0);
            const totalAmountEdiGenero      = props.formulacionGasto.detallePresGastos.reduce((acc, detalle) => acc + detalle.oriBco4, 0);
            footerItems[0].label = `Total Items ${props.formulacionGasto.detallePresGastos.length}`;
            footerItems[1].label = formatPrice(totalAmountPresupuesto);
            footerItems[2].label = formatPrice(totalAmountGPersonal);
            footerItems[3].label = formatPrice(totalAmountServicio);
            footerItems[4].label = formatPrice(totalAmountInversion);
            footerItems[5].label = formatPrice(totalAmountEdiGenero);
        });
    }
});

const getBadgeColor = (status) => {
    switch (status) {
        case 'Active':
            return 'success'
        case 'Inactive':
            return 'secondary'
        case 'Pending':
            return 'warning'
        case 'Banned':
            return 'danger'
        default:
            'primary'
    }
}

const onDetailDialogClose = (data) => {
    showDetailDialog.value = false;
    if (data) {
        const {editing, ...rest} = data;
        if (editing) {
            const index = detallesPresGasto.findIndex(x => (
                x.ctgClasificadorId === rest.ctgClasificadorId
                && x.cControl === rest.cControl
                && x.ctgFuenteId === rest.ctgFuenteId
                && x.ctgFuenteEspecificaId === rest.ctgFuenteEspecificaId
                && x.ctgOrganismoFinanciadorId === rest.ctgOrganismoFinanciadorId
            ));
            
            return (detallesPresGasto[index] = rest);
        }
        detallesPresGasto.push(rest);
    }
}
const onEditDetalle = (item) => {
    detalle.value = {...item, editing: true};
    showDetailDialog.value = true;
}

const closeDialog = (data) => {
    emit('close', data);
}

const guardarFormulacionGasto = () => { }

</script>
