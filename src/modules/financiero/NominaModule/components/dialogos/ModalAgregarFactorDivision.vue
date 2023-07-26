<template>
  <CModal backdrop="static" :visible="showModal" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Conceptos de Ingresos y Retenciones</CModalTitle>
    </CModalHeader>

    <CModalBody>
      <CCard>
        <CCardBody>
          <CForm>
            <CNav variant="tabs" role="tablist">
              <CNavItem>
                <CNavLink
                  href="javascript:void(0);"
                  :active="tabPaneActiveKey === 1"
                  @click="
                    () => {
                      tabPaneActiveKey = 1
                    }
                  "
                >
                  General
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="javascript:void(0);"
                  :active="tabPaneActiveKey === 2"
                  @click="
                    () => {
                      tabPaneActiveKey = 2
                    }
                  "
                >
                  Observacion
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane
                role="tabpanel"
                aria-labelledby="home-tab"
                :visible="tabPaneActiveKey === 1"
              >
                <div class="row mt-2">
                  <div class="col-6">
                    <h6 class="mx-4">Ingreos:</h6>
                  </div>
                  <div class="col-6">
                    <h6 class="mx-2">Retenciones:</h6>
                  </div>
                </div>
                <div class="d-flex">
                  <div class="d-flex">
                    <div class="d-flex flex-column">
                      <div style="margin-right: 10px">
                        <div class="mt-2">
                          <CFormInput id="excento" placeholder="Sueldo Fijo" />
                        </div>
                        <div class="mt-2">
                          <CFormInput id="excento" placeholder="Horas Extras" />
                        </div>
                        <div class="mt-2">
                          <CFormInput
                            id="excento"
                            placeholder="Servicio Esp."
                          />
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-column w-50">
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                      <div class="mt-2">
                        <CFormInput class="input-style" id="excento" />
                      </div>
                      <div class="mt-2">
                        <CFormInput class="input-style" id="excento" />
                      </div>
                    </div>
                  </div>
                  <div class="d-flex">
                    <div style="margin-right: 10px" class="d-flex flex-column">
                      <div class="mt-2">
                        <CFormInput id="excento" placeholder="Sueldo Fijo" />
                      </div>
                      <div class="mt-2">
                        <CFormInput id="excento" placeholder="Horas Extras" />
                      </div>
                      <div class="mt-2">
                        <CFormInput id="excento" placeholder="Servicio Esp." />
                      </div>
                      <div class="mt-2">
                        <CFormInput id="excento" placeholder="Servicio Esp." />
                      </div>
                      <div class="mt-2">
                        <CFormInput id="excento" placeholder="Servicio Esp." />
                      </div>
                      <div class="mt-2">
                        <CFormInput id="excento" placeholder="Servicio Esp." />
                      </div>
                      <div class="mt-2">
                        <CFormInput id="excento" placeholder="Servicio Esp." />
                      </div>
                      <div class="mt-2">
                        <CFormInput id="excento" placeholder="Servicio Esp." />
                      </div>
                      <div class="mt-2">
                        <CFormInput id="excento" placeholder="Servicio Esp." />
                      </div>
                      <div class="mt-2">
                        <CFormInput id="excento" placeholder="Servicio Esp." />
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                      <div class="mt-2">
                        <CFormInput
                          v-model="number"
                          type="number"
                          class="input-style"
                          id="excento"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CTabPane>
              <CTabPane
                role="tabpanel"
                aria-labelledby="profile-tab"
                :visible="tabPaneActiveKey === 2"
              >
                <CCard style="width: 25rem">
                  <div class="mt-3 mb-3 mx-3">
                    <h6><u>Valores que se pueden utilizar:</u></h6>
                  </div>

                  <CListGroup flush>
                    <CListGroupItem
                      >0 - Imprime los valores originales en
                      cero</CListGroupItem
                    >
                    <CListGroupItem
                      >1 - Impresion normal de los valores
                      originales</CListGroupItem
                    >
                    <CListGroupItem
                      >2 - Imprime un 50% de los valores
                      originales</CListGroupItem
                    >
                    <CListGroupItem
                      >3 - Imprime una 3ra parte de los valores
                      originales</CListGroupItem
                    >
                    <CListGroupItem
                      >4 - Imprime un 25% de los valores
                      originales</CListGroupItem
                    >
                    <CListGroupItem>5 - Otros</CListGroupItem>
                  </CListGroup>
                </CCard>
              </CTabPane>
            </CTabContent>
          </CForm>
        </CCardBody>
      </CCard>
    </CModalBody>

    <CModalFooter>
      <CButton color="secondary" @click="closeModal">Cerrar</CButton>
      <CButton color="primary">Guardar</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CFormInput, CFormLabel } from '@coreui/vue-pro'
export default {
  name: 'ModalFactorDivision',
  components: {
    CModal,
    CFormLabel,
    CFormInput,
  },

  data: function () {
    return {
      number: 0,
      tabPaneActiveKey: 1,
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal', false)
    },
  },

  props: {
    showModal: Boolean,
  },
}
</script>

<style>
.input-style {
  width: 51px;
}
</style>
