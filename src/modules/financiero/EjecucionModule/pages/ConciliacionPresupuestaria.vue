<template>
    <h1 class="text-center">Consulta Conciliaci&oacute;n Ingresos y Gasto por Or&iacute;gen del Financiamiento</h1>
    <CContainer>
        <div class="pb-3">
            <label class="form-label col-auto col-form-label fw-bolder" for="programa">Mes Ejecutado:</label>
            <CFormSelect id="formaPago" @change="getConciliacionPresupuestaria">
                <template v-for="mesData of meses">
                    <option :value="mesData.id">{{ mesData.nombre }}</option>
                </template>
            </CFormSelect>
        </div>
        <CSmartTable class="sticky-top" clickableRows :tableProps="{
            striped: true,
            hover: true,
        }" :tableHeadProps="{}" :activePage="1" header :items="conciliacionPresupuestaria"
            :columns="tableConciliacionPresupuestaria" itemsPerPageSelect :itemsPerPage="10" pagination :footer="footerTableConciliacionPresupuestaria">
            <template #presupuestoIngreso="{ item }">
                <td>
                    {{ formatPrice(item.presupuestoIngreso) }}
                </td>
            </template>
            <template #presupuestoGasto="{ item }">
                <td>
                    {{ formatPrice(item.presupuestoGasto) }}
                </td>
            </template>
            <template #diferenciaPresupuesto="{ item }">
                <td>
                    {{ formatPrice(item.diferenciaPresupuesto) }}
                </td>
            </template>
            <template #ejecutadoIngreso="{ item }">
                <td>
                    {{ formatPrice(item.ejecutadoIngreso) }}
                </td>
            </template>
            <template #ejecutadoGasto="{ item }">
                <td>
                    {{ formatPrice(item.ejecutadoGasto) }}
                </td>
            </template>
            <template #diferenciaEjecutado="{ item }">
                <td>
                    {{ formatPrice(item.diferenciaEjecutado) }}
                </td>
            </template>
        </CSmartTable>
    </CContainer>
</template>

<script>
import { CSmartTable, CContainer } from '@coreui/vue-pro'
import EjecucionServices from '../services/EjecucionServices';
import { formatPrice } from '@/utils/format';

export default {
    components: { CSmartTable, CContainer },
    data: function () {
        return {
            meses: [
                { id: 0, nombre: "Todos" },
                { id: 1, nombre: "Enero" },
                { id: 2, nombre: "Febrero" },
                { id: 3, nombre: "Marzo" },
                { id: 4, nombre: "Abril" },
                { id: 5, nombre: "Mayo" },
                { id: 6, nombre: "Junio" },
                { id: 7, nombre: "Julio" },
                { id: 8, nombre: "Agosto" },
                { id: 9, nombre: "Septiembre" },
                { id: 10, nombre: "Octubre" },
                { id: 11, nombre: "Noviembre" },
                { id: 12, nombre: "Diciembre" },
            ],
            conciliacionPresupuestaria: [],
            footerTableConciliacionPresupuestaria: [
                {
                    label: 'Totales',
                    _props: {
                        color: '',
                        colspan: 3,
                        style: 'font-weight:bold;',
                    },
                },
                {
                    label: '',
                    _props: {
                        color: '',
                        colspan: 1,
                        style: 'font-weight:bold;',
                    },
                },
                {
                    label: '',
                    _props: {
                        color: '',
                        colspan: 2,
                        style: 'font-weight:bold;',
                    },
                },
                {
                    label: '',
                    _props: {
                        color: '',
                        colspan: 1,
                        style: 'font-weight:bold;',
                    },
                },
                {
                    label: '',
                    _props: {
                        color: '',
                        colspan: 2,
                        style: 'font-weight:bold;',
                    },
                },
            ],
            tableConciliacionPresupuestaria: [
                {
                    key: 'fuente',
                    label: 'Fte/Financ.',
                    _style: { width: '4%' }
                },
                {
                    key: 'fuenteEspecifica',
                    label: 'Fte/Especif.',
                    _style: { width: '6%' }
                },
                {
                    key: 'organismoFinanciador',
                    label: 'Org/Fin.',
                    _style: { width: '4%' }
                },
                {
                    key: 'presupuestoIngreso',
                    label: 'Presupuesto Ingreso',
                    _style: { width: '12%' }
                },
                {
                    key: 'presupuestoGasto',
                    label: 'Presupuesto Gastos',
                    _style: { width: '10%' }
                },
                {
                    key: 'diferenciaPresupuesto',
                    label: 'Ingreso - Gastos ',
                    _style: { width: '8%' }
                },
                {
                    key: 'ejecutadoIngreso',
                    label: 'Ejecutado Ingreso',
                    _style: { width: '12%' }
                },
                {
                    key: 'ejecutadoGasto',
                    label: 'Ejecutado Gastos',
                    _style: { width: '9%' }
                },
                {
                    key: 'diferenciaEjecutado',
                    label: 'Ingreso - Gastos ',
                    _style: { width: '9%' }
                },
            ]
        }
    },
    methods: {
        getConciliacionPresupuestaria(event) {
            EjecucionServices.getConciliacionPresupuestariaByMes(event?.target?.value || 0).then(({ data: { data } }) => {
                this.conciliacionPresupuestaria = data.map(e => ({ ...e, diferenciaPresupuesto: (e.presupuestoIngreso - e.presupuestoGasto).toFixed(2), diferenciaEjecutado: (e.ejecutadoIngreso - e.ejecutadoGasto).toFixed(2) }));
                this.footerTableConciliacionPresupuestaria[1].label = formatPrice(this.conciliacionPresupuestaria.reduce((acc, {presupuestoIngreso}) => acc += presupuestoIngreso , 0));
                this.footerTableConciliacionPresupuestaria[2].label = formatPrice(this.conciliacionPresupuestaria.reduce((acc, {presupuestoGasto}) => acc += presupuestoGasto , 0));
                this.footerTableConciliacionPresupuestaria[3].label = formatPrice(this.conciliacionPresupuestaria.reduce((acc, {ejecutadoIngreso}) => acc += ejecutadoIngreso , 0));
                this.footerTableConciliacionPresupuestaria[4].label = formatPrice(this.conciliacionPresupuestaria.reduce((acc, {ejecutadoGasto}) => acc += ejecutadoGasto , 0));
            })
        },
        formatPrice
    },
    mounted() {
        this.getConciliacionPresupuestaria();
    }
}
</script>