<template>
    <CModal @close="closeModal" size="lg" :visible="showModal" backdrop="static">
        <CModalHeader>
            <CModalTitle>Concepto de Gasto</CModalTitle>
        </CModalHeader>
        <CForm novalidate :validated="isFormEventTypeValidated" ref="eventTypeForm">
            <CModalBody>
                <div class="row">
                    <CCol :md="12">
                        <CFormLabel for="fechaIngreso">Descripcion</CFormLabel>
                        <CFormInput v-model="conceptoGasto.descripcion" id="Descripcion" required />
                    </CCol>
                    <CCol :md="12">
                        <CFormLabel for="fechaIngreso">Detalle</CFormLabel>
                        <CFormInput v-model="conceptoGasto.detalle" id="Descripcion" required />
                    </CCol>
                </div>
            </CModalBody>
            <CModalFooter>
                <button @click="sendData" class="btn btn-info btn-block mt-1">Agregar</button>
            </CModalFooter>

        </CForm>

    </CModal>
</template>
<script>

import Api from '../services/EjecucionServices'
import { mapActions, mapStores, mapState } from 'pinia'

import { CIcon } from '@coreui/icons-vue'
import { useToastStore } from '@/store/toast'
import { useAuthStore } from '@/store/AuthStore'
import router from '@/router'

export default {
    components: {
        CIcon,
    },
    data: function () {
        return {
            isFormEventTypeValidated: false,
            conceptoGasto: {
                id: null,
                descripcion: null,
                detalle: null
            }
        }
    },
    inject: ['LoginInfo'],
    methods: {
        ...mapActions(useToastStore, ['show']),
        openModal() {
            this.showPartidaPresupuestodeIngresoDialog = true;
        },
        closeModal() {
            this.$emit('closeModal')
        },

        clearForm() {
            this.conceptoGasto = {
                id: null,
                descripcion: null,
                detalle: null
            }
        },

        goToGasto() {
            router.push({ name: 'Formulacion Gasto' })
        },

        getConceptoGasto() {
            Api.getConceptoGasto().then((response) => {
                this.cenceptoGastos = response.data.data
            })
        },

        sendData() {
            this.isFormEventTypeValidated = false
            if (this.$refs.eventTypeForm.$el.checkValidity()) {
                return this.saveConceptoGasto()
            }
            this.isFormEventTypeValidated = true
        },

        saveConceptoGasto() {
            this.$emit('post-conceptoGasto', {
                ...this.conceptoGasto
            })
        }
    },

    watch: {
        conceptoGastoItem() {
            this.conceptoGasto = this.conceptoGastoItem
        },
        showModal() {
            this.clearForm()
        }
    },


    computed: {
        ...mapStores(useAuthStore),
        ...mapState(useAuthStore, ['authInfo']),

    },

    mounted() {
    },

    props: {
        showModal: Boolean,
        conceptoGastoItem: null
    },
}
</script>
  
  