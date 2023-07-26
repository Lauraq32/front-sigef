<template>
    <CContainer>
        <CreditoDebitoHeader textBanco="Debito" @sendDataFilter="getDataFilter" />
        <div class="mt-3">
            <div class="d-flex align-item-end justify-content-end">
                <CButton size="md" color="primary" @click="() => showNotaDebitoModal = true">Adicionar +</CButton>
            </div>
            <CSmartTable class="sticky-top mt-2" clickableRows :tableProps="{
                striped: true,
                hover: true,
            }" :tableHeadProps="{}" :activePage="1" header :items="[]" :columns="tableColumnsNotaDebito"
                :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
                <template #show_details="{ item }">
                    <td class="py-2">
                        <CDropdown>
                            <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem v-for="action in buttonActions"
                                    @click="action.clickHandler && action.clickHandler(item)">{{ action.label }}
                                </CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </td>
                </template>
            </CSmartTable>
        </div>
    </CContainer>
    <NotaDebitoModal :modalNotaDebito="showNotaDebitoModal" @closeModalNotaDebito="closeNotaDebitoMoadl"/>
</template>

<script>
import { CContainer, CSmartTable } from "@coreui/vue-pro";
import CreditoDebitoHeader from "../components/CreditoDebitoHeader.vue";
import NotaDebitoModal from "../components/modals/NotaDebitoModal.vue";
import ConciliacionApi from "../services/ConciliacionServices";

export default {
    components: { CContainer, CSmartTable, CreditoDebitoHeader, NotaDebitoModal },
    methods: {
        getDataFilter(data) {
            ConciliacionApi.getNotasDebito();
        },
        closeNotaDebitoMoadl(value) {
            this.showNotaDebitoModal = value;
        }
    },
    data: function () {
        return {
            showNotaDebitoModal: false,
            tableColumnsNotaDebito: [
                { key: "a", label: "No. Cuenta", _style: { width: "12%" } },
                { key: "e", label: "Fecha", _style: { width: "15%" } },
                { key: "i", label: "Concepto", _style: { width: "25%" } },
                { key: "o", label: "Valor", _style: { width: "10%" } },
                { key: "u", label: "Detalle", _style: { width: "20%" } },
                { key: "d", label: "Estatus", _style: { width: "10%" } },
                { key: 'show_details', label: '', _style: { width: '8%' }, filter: false, sorter: false }
            ],
            buttonActions: [
                {
                    label: 'Editar',
                    clickHandler: (item) => {
                    },
                },
                {
                    label: 'Eliminar',
                    clickHandler: (item) => {
                    },
                },
            ],
        }
    }
}
</script>