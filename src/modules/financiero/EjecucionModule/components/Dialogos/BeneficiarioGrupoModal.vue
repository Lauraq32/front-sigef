<template>
    <CModal size="sm" :visible="beneficiarioxGrupoModal" @close="closeModalGrupo" backdrop="static">
        <CModalHeader>
            <CModalTitle>Beneficiario por Grupo</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CCardBody>
                <CForm class="needs-validation" novalidate :validated="grupoFormValidated" ref="formRef">
                    <CCol>
                        <CFormLabel for="validationCustom05">Grupo de Pago</CFormLabel>
                        <v-select name="grupoCompensacionData" v-model="selectGrupoCompensancion"
                            :options="grupoCompensacionList" required></v-select>
                        <CFormFeedback invalid
                            :style="{ display: !postBeneficiarioGrupo.grupoCompensacionId && validateField? 'flex' : 'none' }"> Favor agregar
                            el
                            campo </CFormFeedback>
                    </CCol>
                    <CCol>
                        <CFormLabel for="validationCustom05">Beneficiario</CFormLabel>
                        <v-select v-model="selectBeneficiario" required
                            :options="beneficiarioList"></v-select>
                            <CFormFeedback invalid
                            :style="{ display: !postBeneficiarioGrupo.beneficiarioId && validateField ? 'flex' : 'none' }"> Favor agregar
                            el
                            campo </CFormFeedback>
                    </CCol>
                    <CCol>
                        <CFormLabel for="validationCustom04">Cargo Beneficiaro</CFormLabel>
                        <CFormInput id="validationCustom04" @keypress="onlyLetter" required v-model="postBeneficiarioGrupo.cargoBeneficiario">
                        </CFormInput>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <CCol>
                        <CFormLabel for="validationCustom04"> Valor del Pago</CFormLabel>
                        <CFormInput id="validationCustom04" required @keypress="onlyNumber" v-model="postBeneficiarioGrupo.monto" > </CFormInput>
                        <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
                    </CCol>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModalGrupo">
                            Close
                        </button>
                        <button class="btn btn-info btn-block mt-1" v-on:click="saveBeneficiarioGrupo">
                            Guardar
                        </button>
                    </div>
                </CForm>
            </CCardBody>
        </CModalBody>
    </CModal>
</template>

<script>
import { CModal } from '@coreui/vue';
import Api from '../../services/EjecucionServices';
import { onlyLetter,onlyNumber} from '@/utils/validator'
import { formatPrice } from '../../../../../utils/format';
export default {
    name: 'BeneficiarioGrupoModal',
    components: {
        CModal,
    },
    emits: ['post-Beneficiariogrupo', 'close-modal'],
    data: function () {
        return {
            onlyLetter,
            onlyNumber,
            formatPrice,
            grupoFormValidated: false,      
            validateField: false,
            grupoCompensacionList: [],
            beneficiarioList: [],
            postBeneficiarioGrupo: {
                grupoCompensacionId: 0,
                beneficiarioId: 0,
                cargoBeneficiario: null,
                monto: 0

            },
            isLowerSelectedInitDate: false,
            fechaHataValidation: false,
        }
    },

    computed: {
        selectBeneficiario: {
            get() {
                return this.beneficiarioList.find((x) => x.code == this.postBeneficiarioGrupo.beneficiarioId)
            },
            set(util) {
                this.postBeneficiarioGrupo.beneficiarioId = Number(util.code)
            },
        },

        selectGrupoCompensancion:{
            get() {
                return this.grupoCompensacionList.find((x) => x.code == this.postBeneficiarioGrupo.grupoCompensacionId)
            },
            set(util) {
                this.postBeneficiarioGrupo.grupoCompensacionId = Number(util.code)
            },
        }

    },

    methods: {
        saveBeneficiarioGrupo() {
            this.grupoFormValidated = false
            if (this.$refs.formRef.$el.checkValidity() && this.postBeneficiarioGrupo.grupoCompensacionId) {
                this.$emit('post-Beneficiariogrupo', { ...this.postBeneficiarioGrupo })
                this.clearForm()
                return
            }
            this.grupoFormValidated = true
            this.validateField = true
        },

        clearForm() {
            this.id = null
            this.grupoFormValidated = false
            this.isLowerSelectedInitDate = false,
                this.postBeneficiarioGrupo = {
                    grupoCompensacionId: 0,
                    beneficiarioId: 0,
                    cargoBeneficiario: null,
                    monto: 0
                }
            this.validateField = false
        },

        closeModalGrupo() {
            this.$emit('close-modal', false)
            this.clearForm()
        },

        getAllCompensacion() {
            Api.getGrupoCompensacionList().then(({ data: { data } }) => {
                this.grupoCompensacionList = data.map(elem => ({
                    code: elem.id,
                    label: `${elem.id}-${elem.descripcion}`
                })
                );
            })
        },

        getAllBeneficiarios() {
            Api.getBeneficiarios().then(({ data: { data } }) => {
                this.beneficiarioList = data.map(elem => ({
                    code: elem.id,
                    label: `${elem.id}-${elem.nombre}`
                })
                );
            })
        }
    },

    mounted() {
        this.getAllCompensacion()
        this.getAllBeneficiarios()
        this.$refs.formRef?.$el?.checkValidity()
    },

    watch: {
        beneficiarioGroupToUpdate(newGroup) {
            if (newGroup) {
                this.postBeneficiarioGrupo = { ...newGroup,
                grupoCompensacionId: newGroup.grupoCompensacion?.id,
                beneficiarioId: newGroup.beneficiario?.id
                };
                
            }
        },
    },

    props: {
        beneficiarioxGrupoModal: Boolean,
        beneficiarioGroupToUpdate: null,
    },
}
</script>
  