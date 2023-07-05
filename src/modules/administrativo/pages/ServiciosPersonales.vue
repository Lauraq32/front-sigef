<template>
    <button @click="showServicioPeronalesDialog" type="button" class="btn btn-primary">
        Agregar
    </button>
    <div>
        <CSmartTable class="sticky-top" clickableRows :tableProps="{
            striped: true,
            hover: true,
        }" :tableHeadProps="{}" :activePage="1" header :items="servicioDetalleList" :columns="columns" columnFilter
            itemsPerPageSelect :itemsPerPage="5" columnSorter pagination>
            <template #pnap="{ item }">
                <td class="py-2">
                    {{ item.estructuraProgramatica.pnap }}
                </td>

            </template>
            <template #numero="{ item }">
                <td class="py-2">
                    {{ item.estructuraProgramatica.numero }}
                </td>
            </template>
            <template #nombre="{ item }">
                <td class="py-2">
                    {{ item.estructuraProgramatica.nombre }}
                </td>
            </template>
            <template #unidadRespon="{ item }">
                <td class="py-2">
                    {{ item.estructuraProgramatica.unidadRespon }}
                </td>
            </template>
            <template #ctgFuncionId="{ item }">
                <td class="py-2">
                    {{ item.estructuraProgramatica.ctgFuncionId }}
                </td>
            </template>

            <template #show_details="{ item, index }">
                <CDropdown>
                    <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem v-for="action in buttonActions"
                            @click="action.clickHandler && action.clickHandler(item)">
                            {{ action.label }}</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </template>
        </CSmartTable>
    </div>
    <DetalleServiciosPersonales :showModal="servicioPerosnalesDialog" @close="closeMestProgDialog"
        :servicioPersonalesProps="detalleServicio" @postServicioPersonal="getServicios" />
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import Api from '../services/FormulacionServices'
import DetalleServiciosPersonales from '../components/DetalleServiciosPersonales.vue'
import { useToastStore } from '@/store/toast'
import { showReport } from '@/utils/util'
import { mapActions } from 'pinia'
export default {
    components: {
        CSmartTable,

        DetalleServiciosPersonales
    },
    data: function () {
        const _this = this;
        return {
            servicioDetalleList: [],
            detalleServicio: {},
            servicioPerosnalesDialog: false,
            buttonActions: [
                {
                    label: 'Editar',
                    clickHandler: (value) => {
                        _this.servicioPerosnalesDialog = true
                        _this.detalleServicio = value
                    },
                },
                {
                    label: 'Remover',
                    clickHandler: (value) => {
                        _this.deleteServicioPersonal(value.id)
                    },
                },
                {
                    label: 'Imprimir',
                    clickHandler: (value) => {
                        _this.printReportReciboIngreso(value)
                    },
                },
            ],
            columns: [

                { key: 'pnap', label: 'pnap' },
                { key: 'numero', label: 'numero' },
                { key: 'nombre', label: 'nombre' },
                { key: 'unidadRespon', label: 'unidadRespon' },
                { key: 'ctgFuncionId', label: 'ctgFuncionId' },
                {
                    key: 'show_details',
                    label: '',
                    _style: { width: '1%' },
                    filter: false,
                    sorter: false,
                },
            ],
            details: [],
        }
    },
    methods: {
        ...mapActions(useToastStore, ['show']),

        getServicios() {
            Api.getFpServicioPersonal().then(response => {
                this.servicioDetalleList = response.data.data
            })
        },

        async printReportReciboIngreso(item) {
            try {
                await showReport({
                    folderName: 'fep',
                    reportName: 'Rep_FP05_Serviciospersonales',
                    params: [
                        {
                            name: 'ANO',
                            value: 'fiscalYear',
                        },
                        {
                            name: 'CAPITULO_AYTO',
                            value: 'majorityId',
                        },
                    ],
                })
            } catch (error) {
                this.show({
                    content: error,
                    closable: true,
                    color: 'danger',
                    class: 'text-white',
                })
            }
        },

            deleteServicioPersonal(id) {
                Api.deleteFpServicioPersonal(id).then(response => (
                    setTimeout(this.getServicios(), 500)
                )).then((response) => {
                    this.show({
                        content: 'Registro Eliminado con exito',
                        closable: true,
                        color: 'success',
                    })
                })
                    .catch((error) => {
                        this.show({
                            content: error.message,
                            closable: true,
                            color: 'danger',
                        })
                    })

            },

            showServicioPeronalesDialog() {
                this.servicioPerosnalesDialog = true;
            },

            closeMestProgDialog() {
                this.servicioPerosnalesDialog = false;
            }
        },
        mounted() {
            this.getServicios();
        }
    }
</script>

<style lang="scss" scoped></style>