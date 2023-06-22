<template>
    <h3 class="text-center mb-4">Conceptos de gastos</h3>

    <AppAccionHeader :actions="pageActions">
        <CButton color="info" @click="openGastoModal">Agregar</CButton>
        <CButton color="secondary" @click="goToGasto">Ir a Formulaci&oacute;n Gasto</CButton>
    </AppAccionHeader>

    <CSmartTable class="sticky-top" clickableRows :tableProps="{
        striped: true,
        hover: true,
    }" :tableHeadProps="{}" :activePage="1" :footer="footerItem" header key="ingreso.id" :items="cenceptoGastos"
        :columns="columns" itemsPerPageSelect columnFilter :itemsPerPage="10"
        :items-per-page-label="'Artículos por página:'" :items-per-page-options="[10, 20, 50, 100, 150]" columnSorter
        :sorterValue="{ column: 'descripcion', state: 'asc' }" pagination>


        <template #show_details="{ item }">
            <td class="py-2">
                <div class="d-flex justify-content-around">

                    <CButton class="mt-1" color="primary" variant="outline" square size="sm"
                        @click="setConceptoGastoAndShowModal(item)">
                        Editar
                    </CButton>
                    <CButton class="mt-1" color="danger" variant="outline" square size="sm"
                        @click="deleteConceptoGasto(item.id)">
                        Eliminar
                    </CButton>
                </div>
            </td>
        </template>
    </CSmartTable>

    <ConceptoGastoModal :showModal="showConceptoGastoModal" @closeModal="closeModal" :conceptoGastoItem="conceptoGastoItem"
        @post-conceptoGasto="submitConceptoGasto" />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import Api from '../services/EjecucionServices'
import { mapActions, mapStores, mapState } from 'pinia'
import XLSX from 'xlsx/xlsx.mjs'
import { CIcon } from '@coreui/icons-vue'
import { useToastStore } from '@/store/toast'
import { useAuthStore } from '@/store/AuthStore'
import router from '@/router'
import { formatPrice } from '../../../../utils/format';
import AppAccionHeader from "../../../../components/AppActionHeader.vue";
import ConceptoGastoModal from "../Dialogs/ConceptoGastoModal.vue"


export default {
    components: {
        CSmartTable,
        CIcon,
        AppAccionHeader,
        ConceptoGastoModal
    },
    data: function () {
        return {
            conceptoGastoItem: null,
            cenceptoGastos: [],
            showConceptoGastoModal: false,
            footerItem: [
            ],
            columns: [
                { key: 'descripcion', label: 'Descripción' },
                { key: 'detalle', label: 'detalle' },
                { key: 'show_details', label: 'Acciones', _style: { width: '10%' } }
            ],
            formatPrice
        }
    },
    methods: {
        ...mapActions(useToastStore, ['show']),


        openGastoModal() {
            this.showConceptoGastoModal = true;
        },

        goToGasto() {
            router.push({ name: 'Formulacion Gasto' })
        },

        submitConceptoGasto(payload) {
            if (payload.id == null) {
                Api.postConceptoGasto(payload).then((response) => {
                    this.show({
                        content: response.data.message,
                        closable: true,
                    })
                })
            } else {
                Api.putConceptoGasto(payload.id, payload).then(response => {
                    this.show({
                        content: response.data.message,
                        closable: true,
                    })
                })
            }
        },

        getConceptoGasto() {
            Api.getConceptoGasto().then((response) => {
                this.cenceptoGastos = response.data.data
                this.footerItem = response.data.data.length
            })
        },

        closeModal() {
            this.showConceptoGastoModal = false;
            this.getConceptoGasto()
        },

        setConceptoGastoAndShowModal(item) {
            this.conceptoGastoItem = { ...item }
            this.showConceptoGastoModal = true
        },

        deleteConceptoGasto(id) {
            Api.deleteConceptoGasto(id).then(response => {
                this.show({
                    content: response.data.message,
                    closable: true,
                })
                this.getConceptoGasto()
            })
        }

    },





    computed: {
        ...mapStores(useAuthStore),
        ...mapState(useAuthStore, ['authInfo']),

    },

    mounted() {
        this.getConceptoGasto()
    },
}
</script>
  
  