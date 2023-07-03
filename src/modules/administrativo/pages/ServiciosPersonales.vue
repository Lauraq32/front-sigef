<template>

    <div>
        <CSmartTable class="sticky-top" clickableRows :tableProps="{
                    striped: true,
                    hover: true,
                }" :tableHeadProps="{}" :activePage="1" header :items="serviciosItems" :columns="columns" columnFilter
            itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
            <template #status="{ item }">
                <td>
                    <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
                </td>
            </template>
            <template #show_details="{ item, index }">

            </template>
        </CSmartTable>
    </div>
    <DetalleServiciosPersonales :showModal="MestProgDialog" @close="closeMestProgDialog"/>
    <!-- <SelectMestProgDialog :showModal="MestProgDialog" @close="closeMestProgDialog" />
    <DetalleServiciosPersonales :showModal="DetalleServiciosPersonalesDialog" @saveDetalle="saveDetalle"
        @close="closeDetalleMestProg" /> -->
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import SelectMestProgDialog from './modal/SelectMestProgDialog.vue'
import DetalleServiciosPersonales from './modal/ServiciosPersonalesDetalle.vue'
import Api from '../services/FormulacionServices'
import DetalleServiciosPersonales from '../components/DetalleServiciosPersonales.vue'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
export default {
    components: {
        CSmartTable,
        SelectMestProgDialog,
        DetalleServiciosPersonales
    },
    data: () => {
        return {
            columns: [
                // { key: 'cantidad', label: 'Grupos ocupacionales' },
                { key: 'cantidad', label: 'Numero de Cargos' },
                { key: 'mensual', label: 'Mensual' },
                { key: 'AnualActual', label: 'Anual' },
                { key: 'cantidadsolicitada', label: 'Numero de Cargos' },
                { key: 'mensualsolicitado', label: 'Mensual' },
                { key: 'AnualSolicitado', label: 'Anual' },
                {
                    key: 'show_details',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                    // _props: { color: 'primary', class: 'fw-semibold'}
                },
            ],
            details: [],
        }
    },
    methods: {
        ...mapActions(useToastStore, ['show']),
    },
    mounted() {
        this.getServicioDetalle();
    }
}
</script>

<style lang="scss" scoped></style>