<template>
    <h3 class="text-center">N&oacute;mina General</h3>
    <NominaSelectFiscalYear @sendDataFilter="filterByDate">
        <CButton style="font-weight: bold" color="info" @click="">Imprimir Todos</CButton>
        <CButton style="font-weight: bold" class="ml-5" color="info" @click ="() => showModal = true">Generar N&oacute;mina</CButton>
    </NominaSelectFiscalYear>
    <div>
        <CSmartTable class="sticky-top" clickableRows :tableProps="{
            striped: true,
            hover: true,

        }" :tableHeadProps="{}" :activePage="1" header :items="dataNominaGeneral" :columns="tableNominaGeneral"
            columnFilter itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
            pagination>
            <template #posicion="{ item }">
                <td>
                    {{ item.posicion.nombre }}
                </td>
            </template>
            <template #departamento="{ item }">
                <td>
                    {{ item.departamento.nombre }}
                </td>
            </template>
            <template #programaDivision="{ item }">
                <td>
                    {{ item.departamento.programaDivision.nombre }}
                </td>
            </template>
            <template #fecha="{ item }">
                <td>
                    {{ formatDate(item.fecha) }}
                </td>
            </template>
        </CSmartTable>
    </div>
    <ModalGenerarNomina :modalGenerarNomina="showModal" @changeValueModal="getCloseModalValue"></ModalGenerarNomina>
</template>
<script>
import { useAuthStore } from '@/store/AuthStore';
import { CSmartTable } from '@coreui/vue-pro'
import { mapState } from 'pinia';
import NominaSelectFiscalYear from '../components/NominaSelectFiscalYear.vue';
import ModalGenerarNomina from '../components/dialogos/ModalGenerarNomina.vue';
import ApiNomina from '../services/NominaServices'


export default {
    components: {
        CSmartTable,
        NominaSelectFiscalYear,
        ModalGenerarNomina
    },
    mounted() {
        this.filterByDate({});
    },
    setup() {
    },
    computed: {
        ...mapState(useAuthStore, ['authInfo']),
    },
    methods: {
        filterByDate(value) {
            ApiNomina.getNominasGeneral(value).then((response) => {
                this.dataNominaGeneral = response.data.data;
                console.log(response.data.data);
            })
        },
        getCloseModalValue(value) {
            this.showModal = value;
        },
    },
    data: function () {
        return {
            showModal: false,
            dataNominaGeneral: [],
            tableNominaGeneral: [
                {
                    key: 'fecha',
                    label: 'Fecha',
                    _style: { width: '8%' }
                },
                {
                    key: 'programaDivision',
                    label: 'Programa División',
                    _style: { width: '12%' },
                },

                {
                    key: 'departamento',
                    label: 'Departamento',
                    _style: { width: '10%' },
                },
                {
                    key: 'estProgram',
                    label: 'Est/Program',
                    _style: { width: '10%' },
                },
                {
                    key: 'clasificador',
                    label: 'Clasificador',
                    _style: { width: '10%' },
                },

                {
                    key: 'cantidadEmpleados',
                    label: 'Cantidad Empleados',
                    _style: { width: '13%' },
                },
                {
                    key: 'totalAPagar',
                    label: 'T/Pagar',
                    _style: { width: '7%' },
                },

                {
                    key: 'formaPago',
                    label: 'F/Pago',
                    _style: { width: '10%' },
                },
                {
                    key: 'comprobante',
                    label: 'Comprobante',
                    _style: { width: '10%' }
                },
                {
                    key: 'show_details',
                    label: '',
                    _style: { width: '10%' },
                    sorter: false,
                },
            ]
        }
    }
}
</script>
