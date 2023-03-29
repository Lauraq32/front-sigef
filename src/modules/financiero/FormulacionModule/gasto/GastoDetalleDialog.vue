<template>
  <CModal
    backdrop="static"
    :visible="isVisible"
    size="xl"
    @close="closeDialog(null)"
  >
    <div class="row">
      <div class="col-12">
        <CModalHeader>
          <CModalTitle>Registro de la partida del gasto</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <CForm
              class="row g-3 needs-validation"
              novalidate
              ref="detailForm"
            >
              <CCol :md="2"
                ><CFormLabel for="validationCustom01">Clasificador</CFormLabel>
                <div class="position-relative">
                  <input
                    ref="name"
                    required
                    on:keyup.native.enter="getClasificador"
                    class="form-control padding-input"
                    v-model="detalle.ctgClasificadorId"
                    type="number"
                  /><span class="position-absolute icon-input"
                    ><CIcon
                      icon="cisSearch"
                      size="xl"
                      v-on:click="getClasificador"
                  /></span>
                </div>
                <CFormFeedback invalid>
                  Favor agregar el campo
                </CFormFeedback></CCol
              >
              <CCol :md="2">
                <CFormLabel for="cControl">Cta. Control</CFormLabel>
                <CFormInput
                  v-model="detalle.cControl"
                  disabled
                  id="cControl"
                  required
                />
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="nombre">Detalle</CFormLabel>
                <CFormInput
                  v-model="detalle.nombre"
                  disabled
                  id="nombre"
                  required
                />
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <hr />
              <div class="row">
                <div class="col-12">
                  <h3>Seleccionar el origen del financiamiento</h3>
                </div>
              </div>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(20, 1955, 100)"
                  >20/1955/100
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9998, 102)"
                  >30/9998/102
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 103)"
                  >40/9992/103
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('50', '2006', '001')"
                >
                  50/2006/001
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('10', '0100', '100')"
                >
                  10/0100/100</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('10', '0104', '100')"
                >
                  10/0104/100
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9995, 102)"
                  >30/9995/102
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9999, 102)"
                  >30/9999/102
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 112)"
                  >40/9992/112
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('50', '2006', '099')"
                >
                  50/2006/099
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('10', '0100', '104')"
                >
                  10/0100/104
                </CButton>
              </CCol>
              <CCol> </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(30, 9996, 102)"
                  >30/9996/102
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 102)"
                  >40/9992/102
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(40, 9992, 102)"
                >
                  40/9992/102</CButton
                >
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto(50, 5011, 109)"
                  >50/5011/109
                </CButton>
              </CCol>
              <CCol :md="2">
                <CButton
                  style="font-weight: bold"
                  color="info"
                  @click="setValueButtonGasto('10', '0100', '105')"
                >
                  10/0100/105</CButton
                >
              </CCol>

              <CCol :md="3">
                <CFormLabel for="ctgFuenteId"
                  >Fuente Financiamiento</CFormLabel
                >
                <CFormInput
                  v-model="detalle.ctgFuenteId"
                  :disabled="isFieldEditable"
                  id="ctgFuenteId"
                  required
                />
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="3">
                <CFormLabel for="ctgFuenteEspecificaId"
                  >Fuente Especifica</CFormLabel
                >
                <CFormInput
                  v-model="detalle.ctgFuenteEspecificaId"
                  :disabled="isFieldEditable"
                  id="ctgFuenteEspecificaId"
                >
                </CFormInput>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="3">
                <CFormLabel for="ctgOrganismoFinanciadorId"
                  >Organismo Financiador</CFormLabel
                >
                <CFormInput
                  v-model="detalle.ctgOrganismoFinanciadorId"
                  :disabled="isFieldEditable"
                  id="ctgOrganismoFinanciadorId"
                  required
                />
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="3" style="margin-top: 3rem">
                <CButton
                  style="font-weight: bold"
                  @click="toggleFields"
                  color="info"
                >
                  {{ isFieldEditable.value ? 'Editar' : 'Deshabilitar' }}
                </CButton>
              </CCol>

              <hr />
              <div class="row">
                <div class="col-6">
                  <div class="col-12">
                    <div class="row">
                      <h3>Cuenta</h3>
                      <div class="col-4">
                        <CFormLabel for="oriBco1"
                          >Personal</CFormLabel
                        >
                        <CFormInput
                          type="number"
                          v-model="this.detalle.oriBco1"
                          id="oriBco1"
                        >
                        </CFormInput>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>

                      <div class="col-8">
                        <CFormLabel for="TIPO_GASTO1">Tipo</CFormLabel>
                        <CFormSelect
                          v-model="detalle.TIPO_GASTO1"
                          id="TIPO_GASTO1"
                        >
                          <option>11-GASTOS DE PERSONAL 25%</option>
                          <option>
                            311-Para Gastos en Personal (Corto Plazo)
                          </option>
                          <option>
                            321-Para Gastos en Personal (Largo Plazo)
                          </option>
                        </CFormSelect>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="row">
                      <div class="col-4">
                        <CFormLabel for="validationCustom04"
                          >Servicios</CFormLabel
                        >
                        <CFormInput
                          type="number"
                          v-model="this.detalle.oriBco2"
                          id="validationCustom04"
                        >
                        </CFormInput>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>

                      <div class="col-8">
                        <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                        <CFormSelect
                          v-model="detalle.TIPO_GASTO2"
                          id="validationCustom04"
                        >
                          <option>12-SERVICIOS MUNICIPALES 31% (1.S)</option>
                          <option>
                            312-Para Gastos en Servicios (Corto Plazo)
                          </option>
                          <option>
                            322-Para Gastos en Servicios (Largo Plazo)
                          </option>
                        </CFormSelect>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="row">
                      <div class="col-4">
                        <CFormLabel for="oriBco3"
                          >Inversión</CFormLabel
                        >
                        <CFormInput
                          type="number"
                          v-model="this.detalle.oriBco3"
                          id="oriBco3"
                        >
                        </CFormInput>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>

                      <div class="col-8">
                        <CFormLabel for="TIPO_GASTO3">Tipo</CFormLabel>
                        <CFormSelect
                          v-model="detalle.TIPO_GASTO3"
                          id="TIPO_GASTO3"
                        >
                          <option>
                            21-BIENES MUEBLES, INMUEBLES NO CLASIFICADO EN
                            CATEGORIA PROYECTO (I.1)
                          </option>
                          <option>22-OBRAS DE INFRAESTRUCTURA (I.2)</option>
                          <option>
                            23-GASTOS DE PRE INVERSION ASOCIADOS AL DESARROLLO
                            ECONOMICO LOCALl (I-3)
                          </option>
                          <option>
                            314-Para Gastos en Inversion (Corto Plazo) (SI ES
                            PROGRAMA 96)
                          </option>
                          <option>
                            324-Para Gastos en Inversion (Largo Plazo)
                          </option>
                        </CFormSelect>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="row">
                      <div class="col-4">
                        <CFormLabel for="oriBco4"
                          >E/G Salud</CFormLabel
                        >
                        <CFormInput
                          type="number"
                          v-model="this.detalle.oriBco4"
                          id="oriBco4"
                        >
                        </CFormInput>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>

                      <div class="col-8">
                        <CFormLabel for="TIPO_GASTO4">Tipo</CFormLabel>
                        <CFormSelect
                          v-model="detalle.TIPO_GASTO4"
                          id="TIPO_GASTO4"
                        >
                          <option>
                            13-PROGRAMAS DE EDUCACION, GENERO Y SALUD 4% (1.E)
                          </option>
                          <option>
                            313-Para Gastos en Educacion (Corto Plazo)
                          </option>
                          <option>
                            323-Para Gastos en Educacion (Largo Plazo)
                          </option>
                        </CFormSelect>
                        <CFormFeedback invalid>
                          Favor agregar el campo
                        </CFormFeedback>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="vr col-1" style="height: 278px"></div>
                <div class="col-4">
                  <h4>Balance disponible por origen del financiamiento:</h4>
                  <h3>
                    <span style="font-weight: 500 !important">{{
                      sumOfBalance
                    }}</span>
                  </h3>
                </div>
              </div>
            </CForm>
          </CCardBody>
        </CModalBody>
      </div>
    </div>

    <CModalFooter>
      <CButton color="secondary" data-bs-dismiss="modal" @click="closeDialog()"
        >Cancelar</CButton
      >
      <CButton color="primary" @click="guardarDetalleGasto()">Guardar</CButton>
    </CModalFooter>
  </CModal>
  <ClasificadorSelectorDialog
    :isVisible="showClasificatorDialog"
    :filtered="
      (clasificator) =>
        (clasificator.tipo ===
          'DETALLE' && clasificator.origen === 'GASTO' && clasificator?.clasifica?.toString().startsWith('2'))
    "
    @close="onClasificatorDialogClose"
  />
</template>
<script>
import ClasificadorSelectorDialog from './ClasificadorSelectorDialog.vue'
import { CCol } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { computed, ref } from 'vue'
import { formatPrice } from '@/utils/format'

export default {
  props: {
    detalle: {
      required: true,
      type: Object,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {emit}) {
    const showClasificatorDialog = ref(false);
    const isFieldEditable = ref(true);
    const detailForm = ref();
    const closeDialog = (data) => {
      emit('close', data);
    }
    const sumOfBalance = computed(() => {
      return formatPrice(
        Number(props.detalle.oriBco1 || 0) +
        Number(props.detalle.oriBco2 || 0) +
        Number(props.detalle.oriBco3 || 0) +
        Number(props.detalle.oriBco4 || 0)
      )
    });
    const setValueButtonGasto = (
      fuenteFinanciamiento,
      fuenteEspecifica,
      organismoFinanciador,
    ) => {
      props.detalle.ctgFuenteId = fuenteFinanciamiento;
      props.detalle.ctgFuenteEspecificaId = fuenteEspecifica;
      props.detalle.ctgOrganismoFinanciadorId = organismoFinanciador;
    }
    const guardarDetalleGasto = () => {
        console.log(detailForm.value);
        if (detailForm.value?.checkValidity()) {
            closeDialog({ ...props.detalle });
        }
    }
    const getClasificador = () => {
      showClasificatorDialog.value = true
    }
    const onClasificatorDialogClose = (clasificador) => {
      if (clasificador) {
        props.detalle.ctgClasificadorId = clasificador.clasifica;
        props.detalle.cControl = clasificador.cControl;
        props.detalle.nombre = clasificador.nombre;
      }

      showClasificatorDialog.value = false
    }
    const toggleFields = () => {
      isFieldEditable.value = !isFieldEditable.value
    }

    return {
      setValueButtonGasto,
      closeDialog,
      guardarDetalleGasto,
      getClasificador,
      showClasificatorDialog,
      onClasificatorDialogClose,
      toggleFields,
      isFieldEditable,
      sumOfBalance,
      detailForm
    }
  },
  components: { ClasificadorSelectorDialog, CModal, CCol },
}
</script>
<style>
.padding-input {
  padding-right: 2.5rem;
}
.icon-input {
  padding: 0.2rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  right: 2px;
}
</style>
