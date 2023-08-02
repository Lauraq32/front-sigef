<template>
    <CRow>
        <CCol sm="12">
            <h1>Cheques de Nómina</h1>
        </CCol>
    </CRow>
    <CRow>
        <CCol sm="4">
            <CButton color="primary">Nuevo</CButton>
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
</template>

<script setup>
import { ref } from 'vue'

const year = ref({});
const month = ref({});

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