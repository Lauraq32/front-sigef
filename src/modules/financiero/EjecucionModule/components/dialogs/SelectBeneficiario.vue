<template>
    <CModal backdrop="static" size="lg" :visible="isVisible" @close="closeDialog()">
        <CModalBody>
            <CModalHeader class="mb-2">
                <CModalTitle>Beneficiarios</CModalTitle>
            </CModalHeader>
            <CNav variant="tabs" role="tablist">
                <CNavItem>
                    <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 1" @click="() => {
                        tabPaneActiveKey = 1
                    }
                        ">
                        Beneficiario
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink href="javascript:void(0);" :active="tabPaneActiveKey === 2" @click="() => {
                        tabPaneActiveKey = 2
                    }
                        ">
                        Beneficiario x Grupo
                    </CNavLink>
                </CNavItem>
            </CNav>
            <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 1">

                    <div v-if="isLoading" class="d-flex p-4 align-items-center justify-content-center w-100">
                        <h3>Espere ....</h3>
                    </div>
                    <CSmartTable v-else clickableRows :tableProps="{
                        striped: true,
                        hover: true,
                    }" :tableHeadProps="{}" :activePage="1" tableFilter header :items="beneficiarios"
                        :columns="columns" itemsPerPageSelect :itemsPerPage="5" :items-per-page-options="[5, 10, 20]"
                        columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
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

                </CTabPane>
            </CTabContent>
            <CTabContent>
                <CTabPane role="tabpanel" aria-labelledby="home-tab" :visible="tabPaneActiveKey === 2">
                    <div v-if="isLoading" class="d-flex p-4 align-items-center justify-content-center w-100">
                        <h3>Espere ....</h3>
                    </div>
                    <CSmartTable v-else clickableRows :tableProps="{
                        striped: true,
                        hover: true,
                    }" :tableHeadProps="{}" :activePage="1" tableFilter header :items="grupoBeneficiarios"
                        :columns="grupoBeneficiariosColumns" itemsPerPageSelect :itemsPerPage="5" :items-per-page-options="[5, 10, 20]"
                        columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
                        <template #show_details="{ item }">
                            <td class="py-2">
                                <div class="d-flex justify-content-around">
                                    <CButton class="mt-1" color="primary" variant="outline" square size="sm"
                                        @click="selectBeneficiarioPorGrupo(item)">
                                        Seleccionar</CButton>
                                </div>
                            </td>
                        </template>
                    </CSmartTable>
                </CTabPane>
            </CTabContent>


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
    term: {
        default: '',
    },
});

const tabPaneActiveKey = ref(1);

const toastStore = useToastStore();

const isLoading = ref(true)
const beneficiarios = ref([])
const grupoBeneficiarios = ref([])
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
const grupoBeneficiariosColumns = [
    { key: 'id', label: 'Id' },
    { key: 'descripcion', label: 'Nombre' },
    { key: 'cantidadBeneficiarios', label: 'Cantidad' },
    { key: 'montoTotal', label: 'Monto Total' },

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

const selectBeneficiarioPorGrupo = (item) => {
    Api.getGrupoCompensacionBeneficiario(item.id).then(response => {
        closeDialog({grupoBeneficiarioId:item.id,beneficiarioId:response.data.data[0].id,beneficiarioNombre:item.descripcion})
    })
}

watchEffect(() => {
    Api.getBeneficiarios()
        .then((response) => {
            beneficiarios.value = response.data.data
            isLoading.value = false
            isLoading.value = false;
            autoSelectClasificator(props.term);
        })
        .catch(() => {
            isLoading.value = false
        })
    Api.getGrupoCompensacionList()
        .then((response) => {
            grupoBeneficiarios.value = response.data.data
            isLoading.value = false
            isLoading.value = false;
            // autoSelectClasificator(props.term);
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
  