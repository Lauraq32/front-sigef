<template>
    <CModal size="lg" backdrop="static" :visible="showModal" @close="closeDialog()">
        <CModalHeader>
            <CModalTitle>
                Estructura Programatica
            </CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CSmartTable class="sticky-top" clickableRows :tableProps="{
                striped: true,
                hover: true,
            }" :tableHeadProps="{}" :activePage="1" header :items="[]" :columns="columns" columnFilter itemsPerPageSelect
                :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
                <template #status="{ item }">
                    <td>
                        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
                    </td>
                </template>
                <template #show_details="{ item, index }">

                </template>
            </CSmartTable>
        </CModalBody>
    </CModal>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
export default {
    components: {
        CSmartTable,
    },
    props: {
        showModal: false
    },
    data: () => {
        return {
            columns: [
                { key: 'nombre', label: 'Grupos ocupacionales' },
                { key: 'nombre', label: 'Numero de Cargos' },
                { key: 'nombre', label: 'Mensual' },
                { key: 'nombre', label: 'Anual' },
                { key: 'nombre', label: 'Numero de Cargos' },
                { key: 'nombre', label: 'Mensual' },
                { key: 'nombre', label: 'Anual' },
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
        closeDialog(data) {
            this.$emit('close', data);
        }
    },
    mounted() {

    },

}

</script>

<style lang="scss" scoped></style>