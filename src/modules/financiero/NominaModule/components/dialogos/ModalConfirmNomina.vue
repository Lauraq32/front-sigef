<template>
    <CModal @close="closeModal" size="lg" :visible="showModal" backdrop="static">
        <CModalHeader>
            <CModalTitle>Confirmaci&oacute;n de N&oacute;mina</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCardBody>
                <CForm class="row g-3 mt-2 needs-validation" novalidate :validated="ingresoRetencionFormValidated"
                    ref="formRef">
                    <div class="row">
                        <div class="col-7">
                            <div class="row">
                                <div class="col-7 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Valor Bruto de la N&oacute;mina:</CFormLabel>
                                </div>
                                <div class="col-5 text-center">
                                    <span>{{ formatPrice(payload.totalBruto) }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-7 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Total Retenciones:</CFormLabel>
                                </div>
                                <div class="col-5 text-center">
                                    <span>{{
                                        formatPrice(payload.totalBruto - payload.totalNeto)
                                    }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-7 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Valor Neto de la N&oacute;mina:</CFormLabel>
                                </div>
                                <div class="col-5 text-center">
                                    <span>{{ formatPrice(payload.totalNeto) }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Fecha 815s y Cheques:</CFormLabel>
                                </div>
                                <div style="width: 42%" class="col-6">
                                    <AppDateField class="form-control" />
                                </div>
                            </div>

                            <div class="text-center mt-4">
                                <h4>DATOS DEL PRESUPUESTO</h4>
                            </div>
                            <div class="row mt-4 mb-1">
                                <div class="col-6 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Cuenta Banco:</CFormLabel>
                                </div>
                                <div class="col-5 text-center inputTamano">
                                    <CFormInput class="text-end" v-model="cuentaBanco.nombreCuenta" required
                                        id="validationCustom04">
                                    </CFormInput>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Estructura Program&aacute;tica:</CFormLabel>
                                </div>
                                <div class="col-6 text-end inputTamano">
                                    <span>{{ dataDepartamento.estructura }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Clasificador:</CFormLabel>
                                </div>
                                <div class="col-6 text-end inputTamano">
                                    <span>{{ dataDepartamento.clasificador?.id ?? '' }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Fuente Financiera:</CFormLabel>
                                </div>
                                <div class="col-6 text-end inputTamano">
                                    <span>{{ dataDepartamento.fuente?.id ?? '' }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Fuente Especifica:</CFormLabel>
                                </div>
                                <div class="col-6 text-end inputTamano">
                                    <span>{{ dataDepartamento.fuenteEspecifica?.id ?? '' }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Organismo Financiador:</CFormLabel>
                                </div>
                                <div class="col-6 text-end inputTamano">
                                    <span>{{
                                        dataDepartamento.organismoFinanciador?.id ?? ''
                                    }}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6 fw-semibold">
                                    <CFormLabel for="validationCustomUsername">Valor Bruto de la N&oacute;mina:</CFormLabel>
                                </div>
                                <div class="col-6 text-end inputTamano">
                                    <span>{{ formatPrice(montoPresupuestado) ?? 0 }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-5">
                            <div>
                                <div class="row">
                                    <div class="col-2">
                                        <CButton>
                                            <CIcon icon="cilShareAll" size="xl" />
                                        </CButton>
                                    </div>
                                    <div class="col-10">
                                        <CFormLabel for="validationCustomUsername">Generar 815 para esta n&oacute;mina
                                            (Automatico)</CFormLabel>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <CButton>
                                            <CIcon icon="cilShareAll" style="color: #33a133" size="xl" />
                                        </CButton>
                                    </div>
                                    <div class="col-10">
                                        <CFormLabel for="validationCustomUsername">Confeccionar 815 para esta n&oacute;mina
                                        </CFormLabel>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-2">
                                        <CButton>
                                            <CIcon icon="cilMagnifyingGlass" size="xl" />
                                        </CButton>
                                    </div>
                                    <div class="col-10">
                                        <CFormLabel for="validationCustomUsername">Seleccionar comprobante</CFormLabel>
                                    </div>
                                </div>
                            </div>

                            <div style="margin-top: 100px">
                                <h4>Nota:</h4>
                                <span>Antes de presionar el boton de Guardar, debe estar seguro de
                                    que desea realizar esta acci&oacute;n ya que la misma no es
                                    reversible y se crearan tantos cheques como empleados tengas
                                    la n&oacute;mina</span>
                            </div>
                        </div>
                    </div>
                    <CModalFooter>
                        <CButton class="btn btn-secondary" @click="closeModal">
                            Cerrar
                        </CButton>
                        <CButton class="btn btn-info btn-block mt-1" @click="confirmNomina">
                            Guardar
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CCardBody>
        </CModalBody>
    </CModal>
</template>
<script>
import { CButton, CModalFooter, CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { formatPrice } from '@/utils/format'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import ApiNomina from '../../services/NominaServices'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import AppDateField from '@/components/AppDateField.vue'

export default {
    name: 'ConfirmNomina',
    components: {
        CSmartTable,
        CModal,
        CModalFooter,
        CButton,
        AppDateField,
    },

    data: function () {
        return {
            formatPrice,
            dataDepartamento: {},
            cuentaBanco: {},
            presupuestoBanco: 0,
            montoPresupuestado: 0,
        }
    },

    methods: {
        ...mapActions(useToastStore, ['show']),
        confirmNomina() {
            if (this.montoPresupuestado < this.payload.totalBruto || this.montoPresupuestado === 0) {
                Swal.fire('El monto total de la nómina es mayor al presupuesto existente para realizar el pago, por favor verifique.')
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: `Está usted seguro que quiere confirmar esta nómina?`,
                    showConfirmButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                    showCancelButton: true,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    customClass: 'btns',
                }).then((answer) => {
                    if (answer.isConfirmed) {
                        ApiNomina.confirmNomina(this.payload.id)
                            .then((response) => {
                                this.show({
                                    content: response.data,
                                    closable: true,
                                })
                                setTimeout(this.filterByDate({}), 500)
                                this.closeModal()
                            })
                            .catch((error) => {
                                this.show({
                                    content: error.response.data,
                                    closable: true,
                                    color: 'danger',
                                    class: 'text-white',
                                })
                            })
                    }
                })
            }
        },

        closeModal() {
            this.$emit('close-modal', false)
            this.clearModal()
        },

        filterByDate(value) {
            ApiNomina.getNominasGeneral(value).then((response) => {
                this.dataNominaGeneral = response.data.data
                this.footerItem[0].label = `Total Items: ${response.data.data.length}`
                this.footerItem[1].label = formatPrice(
                    response.data.data.reduce(
                        (total, item) => total + item.totalBruto,
                        0,
                    ),
                )
                this.footerItem[2].label = formatPrice(
                    response.data.data.reduce((total, item) => total + item.totalNeto, 0),
                )
            })
        },

        getDepartamentoById() {
            ApiNomina.getDepartamentoById(this.payload.departamento.id).then(
                (response) => {
                    this.dataDepartamento = response.data.data
                    this.getPresupeustoBanco(
                        this.dataDepartamento.estructura,
                        this.dataDepartamento.clasificador.id,
                        this.dataDepartamento.fuente.id,
                        this.dataDepartamento.fuenteEspecifica.id,
                        this.dataDepartamento.organismoFinanciador.id,
                    )
                },
            )
        },

        getCuentaBanco() {
            ApiNomina.getCuentaBanco(this.payload.cuentaBancoId).then((response) => {
                this.cuentaBanco = response.data.data
            })
        },

        getPresupeustoBanco(
            estructura,
            clasificador,
            fuente,
            fuenteEspecifica,
            organismoFinanciador,
        ) {
            ApiNomina.validarEstructuraPresupuestada(
                estructura,
                clasificador,
                fuente,
                fuenteEspecifica,
                organismoFinanciador,
            ).then((response) => {
                this.presupuestoBanco = response.data.data;
                this.obtenerTierPorBancoId();
            });
        },

        obtenerTierPorBancoId() {
            const bancoId = this.payload.cuentaBancoId;
            const presupuesto = Number(this.presupuestoBanco[`presupuestoBco${bancoId}`] ?? 0);
            const variacion = Number(this.presupuestoBanco[`variacionBco${bancoId}`] ?? 0);
            const totalPagado = Number(this.presupuestoBanco[`totalPagadoBco${bancoId}`] ?? 0);
            this.montoPresupuestado = presupuesto + variacion - totalPagado;
        },

        clearModal() {
            this.dataDepartamento = {},
                this.cuentaBanco = {},
                this.presupuestoBanco = 0,
                this.montoPresupuestado = 0
        }

    },
    props: {
        showModal: Boolean,
        payload: Object,
    },

    watch: {
        payload() {
            this.getDepartamentoById()
            this.getCuentaBanco()
        },
    },
}
</script>

<style>
.inputTamano {
    width: 42%;
}
</style>
