<template>
     <CModal
        backdrop="static"
        :keyboard="false"
        alignment="center"
        :visible="isVisible"
        :size="fiscalYearList.length < 5 ? 'lg' : 'xl'"
        @close="closeDialog()"
    >
        <CModalHeader>
            <CModalTitle>
                Selecciona el a&ntilde;o fiscal deseado para [{{ mayority?.descripcion }} ({{ mayority?.codigo }})]
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
                        <h3 class="display-6 fst-italic ls-2">{{ fiscarYear.anio }}</h3>
                        <CBadge color="dark" position="top-start" shape="rounded-pill">
                            {{ fiscarYear.id }}
                        </CBadge>
                    </header>
                    <CBadge
                        class="upper-case mb-1"
                        :color="determineColor(fiscarYear.estatus)"
                    >
                        {{ fiscarYear.estatus }}
                    </CBadge>
                    <CBadge color="danger">{{ (fiscarYear.esAprobado && 'Aprobado') || '' }}</CBadge>
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
    },
    mayority: Object
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
const determineColor = (badgeText) => {
    if (/cerrado|aprobado/i.test(badgeText)) {
        return 'danger';
    }
    if (/actual/i.test(badgeText)) {
        return 'success';
    }

    return 'dark';
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
    transition: all .2s ease-in-out;
}
.fy-card:hover {
    transform: translateY(-10%) scale(1.1, 1.1);
    background-color: #fff;
    z-index: 2;
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
.ls-2 {
    letter-spacing: 2px;
}
</style>