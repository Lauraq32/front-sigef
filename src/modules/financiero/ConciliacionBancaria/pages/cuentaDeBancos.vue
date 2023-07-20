<template>
    <h3 class="text-center mb-5">Cuentas de banco</h3>

    <AppActionHeader :showFiscalYearList="false">
        <CButton color="info" @click="() => {
            showModal = true
        }
            ">Agregar</CButton>
    </AppActionHeader>

    <CSmartTable class="mt-3" clickableRows :tableProps="{
        striped: true,
        hover: true,
    }" :tableHeadProps="{}" :activePage="1" header columnFilter :items="cuentasBancos" :columns="columns"
        itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
        <template #fechaFinConciliacion="{ item }">
            <td>
                {{ formatDate(item.fechaFinConciliacion) }}
            </td>
        </template>
        <template #show_details="{ item }">
            <td>
                <CDropdown>
                    <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem v-for="action in actionsTable"
                            @click="action.clickHandler && action.clickHandler(item)">{{ action.label }}</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </td>
        </template>
    </CSmartTable>

    <modalCuentaBanco :showModal="showModal" @closeModal="closeModal" @sendData="sendData" />
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import modalCuentaBanco from '../components/Dialogs/ModalCuentaBanco.vue'
import Api from '../services/ConciliacionServices'
import { CSmartTable } from '@coreui/vue-pro'
import { formatDate } from '@/utils/format'
import AppActionHeader from '@/components/AppActionHeader.vue'
import { useToastStore } from '@/store/toast'

const props = defineProps({})
const toastStore = useToastStore()
const columns = reactive([
    {
        key: 'bancoId',
        label: 'Codigo',
        _style: { width: '5%' },
    },
    {
        key: 'numeroCuenta',
        label: 'Numero De La Cuenta',
        _style: { width: '20%' },
    },
    {
        key: 'nombreCuenta',
        label: 'Nombre De la Cuenta',
        _style: { width: '22%' },
    },
    {
        key: 'balanceLibro',
        label: 'Balance Segun Libro',
        _style: { width: '15%' },
    },
    {
        key: 'balanceBanco',
        label: 'Balance Banco',
        _style: { width: '12%' },
    },
    {
        key: 'fechaFinConciliacion',
        label: 'Fecha Ult. Corte',
        _style: { width: '15%' },
    },
    {
        key: 'ultimoNumeroFisico',
        label: 'Ult. No. Fisico',
        _style: { width: '10%' },
    },
    {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
    },
])
const actionsTable = ref([
    {
        label: 'Editar',
        clickHandler: (value) => { },
    },
    {
        label: 'Eliminar',
        clickHandler: (value) => { },
    },
])
const showModal = ref(false)
const cuentasBancos = ref([])

const closeModal = () => {
    showModal.value = false
}


const sendData = (payload) => {
    if (payload.id) {
        Api.putConciliacioncuentaBanco().then((response) => {
            toastStore.show({
                content: response.data,
                closable: true,
            })
        }).catch((e) => {
            toastStore.show({
                content: response.data,
                closable: true,
                color: 'danger',
                class: 'text-white',
            })
        })
    } else {
        Api.postCuentaBancoConciliacion(payload).then((response) => {
            toastStore.show({
                content: response.data,
                closable: true,

            })
        }).catch((e) => {
            toastStore.show({
                content: e.response.data,
                closable: true,
                color: 'danger',
                class: 'text-white',
            })
        })
    }
}

onMounted(() => {
    Api.getBancos().then((response) => {
        cuentasBancos.value = response.data.data
    })
})

watch(
    () => props.someProp,
    (newValue, oldValue) => { },
)
</script>
