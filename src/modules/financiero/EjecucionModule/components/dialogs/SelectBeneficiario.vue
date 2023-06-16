<template>
    <CModal backdrop="static" size="lg" :visible="isVisible" @close="closeDialog()">
        <CModalBody>
            <CModalHeader>
                <CModalTitle>Clasificadores</CModalTitle>
            </CModalHeader>
            <div v-if="isLoading" class="d-flex p-4 align-items-center justify-content-center w-100">
                <h3>Espere ....</h3>
            </div>
            <CSmartTable v-else clickableRows :tableProps="{
                striped: true,
                hover: true,
            }" :tableHeadProps="{}" :activePage="1" tableFilter header :items="clasificadores" :columns="columns"
                itemsPerPageSelect :itemsPerPage="5" :items-per-page-options="[5, 10, 20]" columnSorter
                :sorterValue="{ column: 'status', state: 'asc' }" pagination>
                <template #show_details="{ item }">
                    <td class="py-2">
                        <div class="d-flex justify-content-around">
                            <CButton class="mt-1" color="primary" variant="outline" square size="sm"
                                @click="closeDialog(item)">
                                Seleccionar</CButton>
                        </div>
                    </td>
                </template>
            </CSmartTable>
        </CModalBody>
    </CModal>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import Api from '../../services/EjecucionServices'

import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { useToastStore } from '@/store/toast'

const emit = defineEmits(['close'])
const props = defineProps({
    isVisible: Boolean,
    // filtered: {
    //   default: () => true,
    // },
    term: {
        default: '',
    },
});

const toastStore = useToastStore();

const isLoading = ref(true)
const clasificadores = ref([])
const columns = [
    { key: 'id', label: 'Id' },
    { key: 'nombre', label: 'Nombre' },

    {
        key: 'show_details',
        label: '',
        _style: { width: '10%' },
        filter: false,
        sorter: false,
    },
]

const closeDialog = (data) => {
    emit('close', data)
}

watchEffect(() => {
    Api.getBeneficiarios()
        .then((response) => {
            clasificadores.value = response.data.data
            isLoading.value = false
            isLoading.value = false;
            autoSelectClasificator(props.term);
        })
        .catch(() => {
            isLoading.value = false
        })
});

let termPropValue = props.term;
watchEffect(() => {
    if (termPropValue !== props.term) {
        autoSelectClasificator(props.term);
        termPropValue = props.term;
    }
}, { flush: 'post' });
</script>
  