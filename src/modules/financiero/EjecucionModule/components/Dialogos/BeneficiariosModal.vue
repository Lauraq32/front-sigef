<template>
    <CModal backdrop="static" :visible="showModal" @close="closeModal
        ">
        <CModalHeader>
            <CModalTitle>Beneficiarios</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCardBody>
                <CForm ref="formBeneficiarios" novalidate :validated="formBeneficiariosValidate">
                    <div>
                        <div>
                            <div class="row">
                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom02">
                                        Tipo de Documento</CFormLabel>
                                    <CFormSelect v-model="postBeneficiario.tipoDcto" @change="changeDocument()"
                                        id="postBeneficiario.tipoDcto">
                                        <option value="cedula">Cédula</option>
                                        <option value="pasaporte">Pasaporte</option>
                                        <option value="rnc">RNC</option>
                                    </CFormSelect>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </CCol>

                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Documento</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.rncCedPas" id="cedula" minlength="9" required
                                        :maxlength="IdCodMaxLen" @keypress="checkDocument">
                                    </CFormInput>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </CCol>
                            </div>

                            <div class="row">
                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Nombre</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.nombre" maxlength="20" @keypress="onlyLetter"
                                        required id="validationCustom04">
                                    </CFormInput>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </CCol>
                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Direcci&oacute;n</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.direccion" maxlength="50" required
                                        id="validationCustom04">
                                    </CFormInput>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </CCol>
                            </div>

                            <div class="row">

                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Teléfono 1</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.telefono" maxlength="10" @keypress="onlyNumber"
                                        required id="validationCustom04">
                                    </CFormInput>

                                    <CFormFeedback invalid>
                                        Favor agregar el campo
                                    </CFormFeedback>
                                </CCol>

                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Teléfono 2</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.celular" maxlength="10" @keypress="onlyNumber"
                                        required id="validationCustom04">
                                    </CFormInput>
                                    <CFormFeedback invalid>
                                        Favor agregar el campo
                                    </CFormFeedback>
                                </CCol>

                            </div>
                            <div class="row">
                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Contacto</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.contacto" maxlength="10" @keypress="onlyLetter"
                                        required id="validationCustom04">
                                    </CFormInput>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </CCol>
                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Email</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.email" type="email" maxlength="50" required
                                        id="validationCustom04">
                                    </CFormInput>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </CCol>
                            </div>
                        </div>

                        <div class="row">
                            <CCol class="col-6">
                                <CFormLabel for="validationCustom04">Fecha de Ingreso</CFormLabel>
                                <CFormInput v-model="fechaInicio" type="date" required id="validationCustom04">
                                </CFormInput>
                                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                            </CCol>

                            <CCol class="col-6">
                                <CFormLabel for="validationCustom04">Tipo de Beneficiario</CFormLabel>
                                <CFormSelect v-model="postBeneficiario.tipo" id="validationCustom05">
                                    <option value="ayudas">Ayudas</option>
                                    <option value="empleado">Empleado</option>
                                    <option value="empresa">Empresa</option>
                                    <option value="institucional">Institucional</option>
                                    <option value="pensionado">Pensionado</option>
                                    <option value="personal">Personal</option>
                                    <option value="subvención">Subvenci&oacute;n</option>
                                    <option value="comercial">Comercial</option>
                                    <option value="otros">Otros</option>
                                </CFormSelect>
                            </CCol>
                        </div>
                    </div>

                    <div class="mt-4">
                        <h4>S&oacute;lo para pensionados y/o subvenciones</h4>
                    </div>
                    <div class="row">
                        <CCol class="col-6">
                            <CFormLabel for="validationCustom04">Mensual</CFormLabel>
                            <CurrencyInput class="form-control text-end" required id="presupuestoBco1"
                                :disabled="postBeneficiario.tipo !== 'Pensionado' && postBeneficiario.tipo !== 'Subvención'"
                                v-model="postBeneficiario.mensual" :options="{
                                    locale: 'en-US',
                                    currency: 'USD',
                                    precision: 2,
                                    currencyDisplay: 'hidden',
                                }" />
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </CCol>
                        <CCol class="col-6">
                            <CFormLabel for="validationCustom04">Recomendado</CFormLabel>
                            <CurrencyInput class="form-control text-end" required id="presupuestoBco1"
                                :disabled="postBeneficiario.tipo !== 'Pensionado' && postBeneficiario.tipo !== 'Subvención'"
                                v-model="postBeneficiario.recomienda" :options="{
                                    locale: 'en-US',
                                    currency: 'USD',
                                    precision: 2,
                                    currencyDisplay: 'hidden',
                                }" />
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </CCol>
                    </div>
                    <CModalFooter>
                        <CButton class="btn btn-secondary" v-on:click="closeModal">
                            Cerrar
                        </CButton>
                        <CButton class="btn btn-info btn-block mt-1" v-on:click="createBeneficiarios">
                            Guardar
                        </CButton>
                    </CModalFooter>
                </CForm>
            </CCardBody>
        </CModalBody>
    </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { onlyNumber, onlyLetter } from '@/utils/validator'
import CurrencyInput from '@/utils/CurrencyInput.vue'

export default {
    name: 'BeneficiarioModal',
    components: {
        CModal,
        CurrencyInput
    },
    emits: ['postBeneficiarios', 'close-modal'],
    data() {
        return {
            onlyNumber,
            onlyLetter,
            formBeneficiariosValidate: false,
            postBeneficiario: {
                id: 0,
                nombre: null,
                tipoDcto: 'cedula',
                rncCedPas: null,
                ingreso: new Date(Date.now()),
                tipo: "Ayudas",
                direccion: null,
                ciudad: null,
                contacto: null,
                telefono: null,
                celular: null,
                email: null,
                estatus: null,
                mensual: 0,
                recomienda: 0,
            }
        }
    },

    computed: {
        fechaInicio: {
            get() {
                let date = this.postBeneficiario.ingreso
                if (
                    this.postBeneficiario.ingreso !== null &&
                    this.postBeneficiario.ingreso?.toString() !== 'Invalid Date'
                ) {
                    if (typeof this.postBeneficiario.ingreso === 'string') {
                        date =
                            typeof date === 'string'
                                ? new Date(this.postBeneficiario.ingreso)
                                : date
                        return date.toISOString().split('T')[0]
                    }
                }
                return date?.toISOString()?.split('T')?.[0]
            },
            set(value) {
                this.postBeneficiario.ingreso = new Date(`${value}T00:00:00`)
            },
        },
    },

    methods: {
        createBeneficiarios() {
            this.formBeneficiariosValidate = false
            if (this.$refs.formBeneficiarios.$el.checkValidity()) {
                this.$emit("postBeneficiarios", { ...this.postBeneficiario })
                this.closeModal()
            }
            this.formBeneficiariosValidate = true
        },

        closeModal() {
            this.$emit("close-modal", false)
            this.clearForm()
            console.log(this.clearForm())
        },
        checkDocument(e) {
            if (this.postBeneficiario.tipoDcto === 'cedula') {
                this.IdCodMaxLen = 11;
                return onlyNumber(e);
            }
        },

        changeDocument() {
            this.IdCodMaxLen = this.postBeneficiario.tipoDcto === 'cedula' ? 11 : 15
            this.postBeneficiario.rncCedPas = ""
        },

        clearForm() {
            this.formBeneficiariosValidate = false
            this.id = null
            this.postBeneficiario = {
                nombre: null,
                tipoDcto: 'cedula',
                rncCedPas: null,
                ingreso: new Date(Date.now()),
                tipo: "Ayudas",
                direccion: null,
                ciudad: null,
                contacto: null,
                telefono: null,
                celular: null,
                email: null,
                estatus: null,
                mensual: 0,
                recomienda: 0,
            }
            
        }
    },

    props: {
        showModal: Boolean,
        beneficiarioToUpdate: Object
    },

    watch: {
        beneficiarioToUpdate(newBeneficiary) {
            if (newBeneficiary) {
                this.postBeneficiario = { ...this.beneficiarioToUpdate }

            }
        },

        showModal() {
            // this.postBeneficiario = { ...this.beneficiarioToUpdate }
            this.postBeneficiario.mensual = 0
            this.postBeneficiario.recomienda = 0
            this.formBeneficiariosValidate = false
        },

        'postBeneficiario.tipo': function () {
            if (this.postBeneficiario.tipo !== "Pensionado" || this.postBeneficiario.tipo !== "Subvención") {
                this.postBeneficiario.mensual = 0
                this.postBeneficiario.recomienda = 0
            }
        }
    }
}
</script>
