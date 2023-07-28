<template>
    <CContainer>
        <CreditoDebitoHeader textBanco="Crédito" @sendDataFilter="getDataFilter" @sendBancoId="getBancoId" />
        <div class="mt-3">
            <div class="d-flex align-item-end justify-content-end">
                <CButton size="md" color="primary" @click="() => showNotaCreditoModal = true">Adicionar +</CButton>
            </div>
            <CSmartTable class="sticky-top mt-2" clickableRows :tableProps="{
                striped: true,
                hover: true,
            }" :tableHeadProps="{}" :activePage="1" header :items="notasCreditoDate" :columns="tableColumnsNotaCredito"
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
    <NotaCreditoModal :modalNotaCredito="showNotaCreditoModal" :bancoId="bancoId" :notaCreditoProp="notaCredito"
        @closeModalNotaCredito="closeNotaCreditoModal" @saveNotaCredito="saveNotaCredito" />
</template>

<script>
import { CContainer, CSmartTable } from "@coreui/vue-pro";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import CreditoDebitoHeader from "../components/CreditoDebitoHeader.vue";
import NotaCreditoModal from "../components/modals/NotaCreditoModal.vue";
import ConciliacionApi from "../services/ConciliacionServices";
import { formatDate } from "@/utils/format";
import { mapActions } from 'pinia';
import { useToastStore } from '@/store/toast';

export default {
    components: { CContainer, CSmartTable, CreditoDebitoHeader, NotaCreditoModal },
    methods: {
        getDataFilter(data) {
            this.bancoId = data.bancoId;
            ConciliacionApi.getNotasCredito(this.bancoId, data).then((response) => {
                this.notasCreditoDate = response.data.data;
            });
        },
        getBancoId(bancoId) {
            this.getDataFilter({ bancoId });
        },
        closeNotaCreditoModal(value) {
            this.showNotaCreditoModal = value;
            this.cleanForm();
        },
        saveNotaCredito(notaCredito) {
            if (!this.notaCredito?.secuencial) {
                this.createNotaCredito(notaCredito);
            } else {
                this.editNotaCredito(notaCredito);
            }
        },
        createNotaCredito(notaCredito) {
            ConciliacionApi.createNotaCredito(this.bancoId, notaCredito).then(({ data }) => {
                this.show({
                    content: data.message || "Registro guardado",
                    closable: true,
                });
                this.cleanForm();
                this.getDataFilter({ bancoId: this.bancoId });
            });
        },
        editNotaCredito(notaCredito) {
            ConciliacionApi.editNotaCredito(notaCredito.secuencial, this.bancoId, notaCredito).then(({ data }) => {
                this.show({
                    content: data.message || "Registro editado",
                    closable: true,
                });
                this.cleanForm();
                this.getDataFilter({ bancoId: this.bancoId });
            });
        },
        cleanForm() {
            this.notaCredito = {
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
            showNotaCreditoModal: false,
            bancoId: 0,
            notasCreditoDate: [],
            notaCredito: {
                documento: "",
                fecha: "",
                auxiliar: "",
                valor: "",
                estatus: "TRANSITO",
                detalle: ""
            },
            tableColumnsNotaCredito: [
                { key: "documento", label: "No. Documento", _style: { width: "10%" } },
                { key: "fecha", label: "Fecha", _style: { width: "15%" } },
                { key: "auxiliar", label: "Concepto", _style: { width: "21%" } },
                { key: "valor", label: "Valor", _style: { width: "10%" } },
                { key: "detalle", label: "Detalle", _style: { width: "18%" } },
                { key: "estatus", label: "Estatus", _style: { width: "8%" } },
                { key: "secuencial", label: "Secuencial", _style: { width: "10%" } },
                { key: 'show_details', label: '', _style: { width: '8%' }, filter: false, sorter: false }
            ],
            buttonActions: [
                {
                    label: 'Editar',
                    clickHandler: (item) => {
                        this.notaCredito = item;
                        console.log(this.notaCredito);
                        this.showNotaCreditoModal = true;
                    },
                },
                {
                    label: 'Eliminar',
                    clickHandler: (item) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: `Estás usted seguro que quieres eliminarlo?`,
                            showConfirmButton: true,
                            confirmButtonText: 'Si',
                            cancelButtonText: 'No',
                            showCancelButton: true,
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            customClass: 'btns',
                        }).then((answer) => {
                            if (answer.isConfirmed) {
                                ConciliacionApi.deleteNotaCredito(item.secuencial, item.bancoId).then((_) => {
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