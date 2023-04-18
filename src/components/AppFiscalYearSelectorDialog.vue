<template>
     <CModal
        backdrop="static"
        :keyboard="false"
        alignment="center"
        :visible="isVisible"
        :size="fiscalYearList.length < 5 ? 'lg' : 'xl'"
    >
        <CModalHeader :close-button="false">
            <CModalTitle>
                Selecciona el a&ntilde;o fiscal deseado
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <header class="d-flex justify-content-center">
                <div class="position-relative mb-4 w-50">
                    <input
                        @input="filterFiscalYearByAnioIdStatus"
                        class="form-control padding-input"
                        placeholder="Filtrar por Id, año, estatus, si es aprobrado"
                    />
                    <span class="position-absolute icon-input">
                        <CIcon icon="cisSearch" size="xl" />
                    </span>
                </div>
            </header>
            <div v-if="fiscalYearListToShow.length === 0"
                class="container-fluid d-flex flex-wrap justify-content-center">
                <span class="h4">Sin resultados</span>
            </div>
            <div v-else
                class="container-fluid d-flex flex-wrap justify-content-center">
                <section
                    v-for="fiscarYear of fiscalYearListToShow"
                    :key="fiscarYear.id"
                    class="fy-card d-flex flex-column m-2 border border-primary shadow-sm p-3 position-relative"
                    @click="closeDialog(fiscarYear)"
                >
                    <header>
                        <h3 class="display-3">{{ fiscarYear.anio }}</h3>
                        <CBadge color="primary" position="top-start" shape="rounded-pill">
                            {{ fiscarYear.id }}
                        </CBadge>
                    </header>
                    <small
                        class="upper-case"
                        :class="{
                            'text-success': /actual/i.test(fiscarYear.estatus),
                            'text-warning': /abierto/i.test(fiscarYear.estatus)
                        }"
                    >
                        {{ fiscarYear.estatus }}
                    </small>
                    <small>{{ (fiscarYear.esAprobado && 'Aprobado') || '' }}</small>
                </section>
            </div>
        </CModalBody>
    </CModal>
</template>
<script setup>
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/vue';
import { ref, watchEffect } from 'vue';

const emits = defineEmits(['select']);
const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false,
        required: true
    },
    fiscalYearList: {
        type: Array,
        default: [],
        required: true
    }
});

const closeDialog = (fiscarYear) => {
    emits('select', fiscarYear);
}
const fiscalYearListToShow = ref([]);
const filterFiscalYearByAnioIdStatus = ({target: {value}}) => {
    if (value === '') {
        fiscalYearListToShow.value = [...props.fiscalYearList];
        return;
    }

    fiscalYearListToShow.value = props.fiscalYearList.filter(fy => {
        return [`${fy.id}`, `${fy.anio}`, fy.esAprobado ? 'Aprobado' : ''].join(' ').includes(value) 
    });
}

watchEffect(() => {
    if (props.fiscalYearList.length) {
        fiscalYearListToShow.value = [...props.fiscalYearList];
    }
});

</script>
<style scoped>
.upper-case {
    text-transform: uppercase;
}
.fy-card {
    background-color: #f5f5f5;
    cursor: pointer;
    transition: all 250ms ease-in-out;
}
.fy-card:hover {
    transform: scale(1.1, 1.1);
    background-color: #fff;
}
.padding-input {
    padding-right: 2.5rem;
}

.icon-input {
    padding: 0.2rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    right: 2px;
}
</style>