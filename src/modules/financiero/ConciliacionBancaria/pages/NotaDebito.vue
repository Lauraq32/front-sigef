<template>
    <CContainer>
        <CreditoDebitoHeader textBanco="Débito" @sendDataFilter="getDataFilter" @sendBancoId="getBancoId" />
        <div class="mt-3">
            <div class="d-flex align-item-end justify-content-end">
                <CButton size="md" color="info" @click="() => showNotaDebitoModal = true">Adicionar</CButton>
            </div>
            <CSmartTable class="sticky-top mt-2" clickableRows :tableProps="{
                striped: true,
                hover: true,
            }" :tableHeadProps="{}" :activePage="1" header :items="notasDebitoDate" :columns="tableColumnsNotaDebito"
                :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
                <template #fecha="{ item }">
                    <td>
                        {{ formatDate(item.fecha) }}
                    </td>
                </template>
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
    <NotaDebitoModal :modalNotaDebito="showNotaDebitoModal" :bancoId="bancoId" :notaDebitoProp="notaDebito"
        @closeModalNotaDebito="closeNotaDebitoModal" @saveNotaDebito="saveNotaDebito" />
</template>

<script>
import { CContainer, CSmartTable } from "@coreui/vue-pro";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import CreditoDebitoHeader from "../components/CreditoDebitoHeader.vue";
import NotaDebitoModal from "../components/modals/NotaDebitoModal.vue";
import ConciliacionApi from "../services/ConciliacionServices";
import { formatDate } from "@/utils/format";
import { mapActions } from 'pinia';
import { useToastStore } from '@/store/toast';

export default {
    components: { CContainer, CSmartTable, CreditoDebitoHeader, NotaDebitoModal },
    methods: {
        getDataFilter(data) {
            this.bancoId = data.bancoId;
            ConciliacionApi.getNotasDebito(this.bancoId, data).then((response) => {
                this.notasDebitoDate = response.data.data;
            });
        },
        getBancoId(bancoId) {
            this.getDataFilter({ bancoId });
        },
        closeNotaDebitoModal(value) {
            this.showNotaDebitoModal = value;
            this.cleanForm();
        },
        saveNotaDebito(notaDebito) {
            if (!this.notaDebito?.secuencial) {
                this.createNotaDebito(notaDebito);
            } else {
                this.editNotaDebito(notaDebito);
            }
        },
        createNotaDebito(notaDebito) {
            ConciliacionApi.createNotaDebito(this.bancoId, notaDebito).then(({ data }) => {
                this.show({
                    content: data.message || "Registro guardado",
                    closable: true,
                });
                this.cleanForm();
                this.getDataFilter({ bancoId: this.bancoId });
            });
        },
        editNotaDebito(notaDebito) {
            ConciliacionApi.editNotaDebito(notaDebito.secuencial, this.bancoId, notaDebito).then(({ data }) => {
                this.show({
                    content: data.message || "Registro editado",
                    closable: true,
                });
                this.cleanForm();
                this.getDataFilter({ bancoId: this.bancoId });
            });
        },
        cleanForm() {
            this.notaDebito = {
                documento: "",
                fecha: "",
                auxiliar: "",
                valor: "",
                estatus: "TRANSITO",
                detalle: ""
            }
        },
        ...mapActions(useToastStore, ['show']),
    },
    data: function () {
        return {
            showNotaDebitoModal: false,
            bancoId: 0,
            notasDebitoDate: [],
            notaDebito: {
                documento: "",
                fecha: "",
                auxiliar: "",
                valor: "",
                estatus: "TRANSITO",
                detalle: ""
            },
            tableColumnsNotaDebito: [
                { key: "documento", label: "No. Documento", _style: { width: "12%" } },
                { key: "fecha", label: "Fecha", _style: { width: "15%" } },
                { key: "auxiliar", label: "Concepto", _style: { width: "25%" } },
                { key: "valor", label: "Valor", _style: { width: "10%" } },
                { key: "detalle", label: "Detalle", _style: { width: "20%" } },
                { key: "estatus", label: "Estatus", _style: { width: "10%" } },
                { key: 'show_details', label: '', _style: { width: '8%' }, filter: false, sorter: false }
            ],
            buttonActions: [
                {
                    label: 'Editar',
                    clickHandler: (item) => {
                        this.notaDebito = item;
                        this.showNotaDebitoModal = true;
                    },
                },
                {
                    label: 'Eliminar',
                    clickHandler: (item) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Estás seguro que quieres eliminar esta nota de débito?',
                            showConfirmButton: true,
                            confirmButtonText: 'Si',
                            cancelButtonText: 'No',
                            showCancelButton: true,
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            customClass: 'btns',
                        }).then((answer) => {
                            if (answer.isConfirmed) {
                                ConciliacionApi.deleteNotaDebito(item.secuencial, item.bancoId).then((_) => {
                                    this.show({
                                        content: "Registro eliminado",
                                        closable: true,
                                        color: 'success'
                                    });
                                    this.getDataFilter({ bancoId: this.bancoId })
                                });
                            }
                        })
                    },
                },
            ],
            formatDate
        }
    },
    mounted() {
        this.getDataFilter({ bancoId: 1 })
    }
}
</script>