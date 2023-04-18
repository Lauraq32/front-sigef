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
            <div class="container-fluid d-flex flex-wrap justify-content-center">
                <section
                    v-for="fiscarYear of fiscalYearList"
                    :key="fiscarYear.id"
                    class="fy-card d-flex flex-column m-2 border border-primary shadow-sm p-3"
                    @click="closeDialog(fiscarYear)"
                >
                    <header>
                        <h3 class="display-3">{{ fiscarYear.anio }}</h3>
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
</style>