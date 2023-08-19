<template>
    <div class="card p-3">
        <CRow>
            <CCol sm="12">
                <h1>Cheques de Nómina</h1>
            </CCol>
        </CRow>
        <hr>
        <CRow>
            <CCol sm="4">
                <CButton color="primary">Cambiar Cuenta</CButton>
            </CCol>
            <CCol sm="8" class="selectContainer">
                <label for="">Mes</label>
                <select>
                    <option v-for="mes in meses" :key="mes.id" :value="mes.id">{{ mes.nombre }}</option>
                </select>
                <label for="">Año</label>
                <select>
                    <option v-for="year in getYears()" :key="year" :value="year">{{ year }}</option>
                </select>
            </CCol>
        </CRow>
         <hr>
         <CRow>
            <CCol sm="12">
                <CSmartTable
                    :tableProps="{
                        striped: true,
                        hover: true,
                    }"
                    :columns="fields"
                    :items="items"
                    columnFilter
                    clickableRows
                    columnSorter
                    pagination
                    :itemsPerPage="5">
                    <template #programa_codigo={item}>
                        <td>
                            {{ item.programa.codigo }}
                        </td>
                         <td>
                            {{ item.programa.nombre }}
                        </td>
                    </template>
                    <template #departamento_codigo={item}>
                        <td>
                            {{ item.departamento.codigo }}
                        </td>
                        <td>
                            {{ item.departamento.nombre }}
                        </td>
                    </template>
                </CSmartTable>
            </CCol>
            <CCol sm="12">
                <CButton color="primary">Consultar Cheques Nomina Seleccionada</CButton>
            </CCol>
         </CRow>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { CSmartTable } from '@coreui/vue-pro'
import {api} from '@/services/api'

const year = ref({});
const month = ref({});

const fields = ref([
    {key: 'fecha', label: 'Fecha'},
    {group:"Programa", 
        children: [
        {key: 'programa_codigo', label: 'Codigo'},
        {key: 'programa.nombre', label: 'Nombre'},
        ]
    },
    {group:"Departamento", 
        children: [
        {key: 'departamento_codigo', label: 'codigo'},
        {key: 'nombre', label: 'Nombre'},
        ]
    },
    {key: 'fechaCheque', label: 'Fecha Cheque'},
    {key: 'cantidadCheques', label: 'Cantidad Cheques'},
    {group:"Secuenciales", 
        children: [
        {key: 'inicial', label: 'Inicial'},
        {key: 'final', label: 'Final'},
        ]
    },
])

const items = ref([
    { fecha: '01/01/2021', programa:{codigo: '123', nombre: 'Juan Perez'}, departamento:{codigo: '123456', nombre: 'Juan Perez'}, fechaCheque: '01/01/2021', cantidadCheques: 9, secuenciales:{inicial: 2, final: 4} },
    {fecha: '01/01/2021', programa:{codigo: '123456', nombre: 'Juan Perez'}, departamento:{codigo: '123456', nombre: 'Juan Perez'}, fechaCheque: '01/01/2021', cantidadCheques: 9, secuenciales:{inicial: 2, final: 4} },
    ///give me more data with the same structure
    {fecha: '01/01/2021', programa:{codigo: '123456', nombre: 'Juan Perez'}, departamento:{codigo: '123456', nombre: 'Juan Perez'}, fechaCheque: '01/01/2021', cantidadCheques: 9, secuenciales:{inicial: 2, final: 4} },
]);

const meses = ref([
    { id: 1, nombre: 'Enero' },
    { id: 2, nombre: 'Febrero' },
    { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' },
    { id: 5, nombre: 'Mayo' },
    { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' },
    { id: 8, nombre: 'Agosto' },
    { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' },
    { id: 11, nombre: 'Noviembre' },
    { id: 12, nombre: 'Diciembre' },
]);
//create computed that calculates 5 year range
const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        years.push(i);
    }
    return years;
};

onMounted(() => {
    
});

</script>

<style scoped>
.selectContainer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    font-size: large;
}
h1{
    font-weight: bold;
    text-align: center;
}
</style>