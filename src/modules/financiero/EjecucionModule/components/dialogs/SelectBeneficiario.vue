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
const allClasificator = ref([])
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
    // if (allClasificator.value.length === 0) {
        Api.getBeneficiarios()
            .then((response) => {
                //clasificadores.value = response.data.data
                clasificadores.value = response.data.data
                isLoading.value = false
                // clasificadores.value = allClasificator.value.filter(props.filtered)
                isLoading.value = false;
                autoSelectClasificator(props.term);
            })
            .catch(() => {
                isLoading.value = false
            })
    //}
});

let termPropValue = props.term;
watchEffect(() => {
    if (termPropValue !== props.term) {
        autoSelectClasificator(props.term);
        termPropValue = props.term;
    }
}, { flush: 'post' });

//if the typed clasificator is found is auto filled and the dialog is closed
// function autoSelectClasificator(term) {
//     if (allClasificator.value.length && term) {
//         const found = clasificadores.value.find(
//             (clasificador) => clasificador.clasifica == term,
//         )
//         if (found) {
//             closeDialog(found);
//         }
//         if (String(term).length >= 6 && !found) {
//             toastStore.show({
//                 content: `Clasificador ${term} no encontrado`,
//                 closable: false,
//                 color: 'warning',
//                 time: 5_000
//             })
//         }
//     }
// }
</script>
  