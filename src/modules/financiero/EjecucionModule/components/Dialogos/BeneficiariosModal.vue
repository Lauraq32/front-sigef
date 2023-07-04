<template>
    <CModal :visible="showModal" @close="closeModal
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
                                        <option value="cedula">Cedula</option>
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
                                    <CFormInput v-model="postBeneficiario.nombre" @keypress="onlyLetter" required
                                        id="validationCustom04">
                                    </CFormInput>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </CCol>
                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Direccion</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.direccion" required
                                        id="validationCustom04">
                                    </CFormInput>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </CCol>
                            </div>

                            <div class="row">

                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Teléfono 1</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.telefono" maxlength="10" @keypress="onlyNumber" required
                                        id="validationCustom04">
                                    </CFormInput>

                                    <CFormFeedback invalid>
                                        Favor agregar el campo
                                    </CFormFeedback>
                                </CCol>

                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Teléfono 2</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.celular" maxlength="10" @keypress="onlyNumber" required
                                        id="validationCustom04">
                                    </CFormInput>
                                    <CFormFeedback invalid>
                                        Favor agregar el campo
                                    </CFormFeedback>
                                </CCol>

                            </div>
                            <div class="row">
                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Contacto</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.contacto"  required id="validationCustom04">
                                    </CFormInput>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </CCol>
                                <CCol class="col-6">
                                    <CFormLabel for="validationCustom04">Email</CFormLabel>
                                    <CFormInput v-model="postBeneficiario.email"  required id="validationCustom04">
                                    </CFormInput>
                                    <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                                </CCol>
                            </div>
                        </div>

                        <div class="row">
                            <CCol class="col-6">
                                <CFormLabel for="validationCustom04">Fecha de ingreso</CFormLabel>
                                <CFormInput v-model="fechaInicio" type="date" required id="validationCustom04">
                                </CFormInput>
                                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                            </CCol>

                            <CCol class="col-6">
                                <CFormLabel for="validationCustom04">Tipo de Beneficiario</CFormLabel>
                                <CFormSelect v-model="postBeneficiario.tipo"  id="validationCustom05">
                                    <option>Ayudas</option>
                                    <option>Empleado</option>
                                    <option>Empresa</option>
                                    <option>Institucional</option>
                                    <option>Pensionado</option>
                                    <option>Personal</option>
                                    <option>Subvencion</option>
                                    <option>Comercial</option>
                                    <option>otros</option>
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
                            <CFormInput v-model="postBeneficiario.mensual"  required id="validationCustom04">
                            </CFormInput>
                            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                        </CCol>
                        <CCol class="col-6">
                            <CFormLabel for="validationCustom04">Recomendado</CFormLabel>
                            <CFormInput v-model="postBeneficiario.recomienda" required  id="validationCustom04">
                            </CFormInput>
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
import { CModalFooter, CButton } from '@coreui/vue-pro';
import { watch } from 'vue';
export default {
    name: 'BeneficiarioModal',
    components: {
        CModal,

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
                tipo: null,
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

    computed:{
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
                this.$emit("postBeneficiarios", {...this.postBeneficiario})
                this.clearForm()
            }
            this.formBeneficiariosValidate = true
        },

        closeModal() {
            this.$emit("close-modal", false)
            this.clearForm()
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

        clearForm(){
            this.formBeneficiariosValidate = false
            this.id = null
            this.postBeneficiario = {
                id: 0,
                nombre: null,
                tipoDcto: 'cedula',
                rncCedPas: null,
                ingreso: new Date(Date.now()),
                tipo: null,
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

    watch:{
        beneficiarioToUpdate(newBeneficiary){
            if(newBeneficiary){
                this.postBeneficiario = {...this.beneficiarioToUpdate}
            }
        }
    }
}
</script>
