<template>
  <div>
    <CModal @close="CloseModal" size="lg" :visible="showModal">
      <CModalHeader>
        <CModalTitle>Captura de imagenes Asociadas al Documento</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div class="tab-context">
          <div class="row">
            <h3>Empleado : Yonaiky Matos</h3>
            <hr />

            <div>
              <div v-for="(documento, index) in documentos" :key="index">
                <div class="card">
                  <CCollapse :visible="documento.visible">
                    <canva :src="documento.src" class="card-img-top" :alt="documento.alt" />
                  </CCollapse>
                  <div class="card-body">
                    <h5 class="card-title">Descripción del documento</h5>
                    <p class="card-text">{{ documento.descripcion }}</p>
                  </div>
                  <div class="card-body">
                    <CButton color="primary" href="#" @click="toggle(index)">Visualizar</CButton>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </CModalBody>
      <div class="modal-footer">
        <button type="button" color="info" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" color="info" class="btn btn-primary" v-on:click="submitForm">
          Guardar
        </button>

      </div>
    </CModal>
  </div>
</template>

<script>
import { CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/vue'
import { CButton, CCollapsePlugin } from '@coreui/vue-pro'
import { CCollapse } from '@coreui/vue'
import { CIcon } from '@coreui/icons-vue'

export default {
  components: {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CButton,
    CIcon,
    CCollapsePlugin
  },

  data() {

    return {
      lgDemo5: false,
      fullscreenDemo: false,
      visible: false,
      file: null


      
    }

  },
  methods: {
    focusInput() {
      this.$refs.name.focus()
      this.$refs.klk.focus()
    },

    unaVez() {
      this.focusInput()
    },
    openModal() {
      this.xlDemo = true
      setTimeout(this.unaVez, 200)
    },
    CloseModal() {
      this.$emit('closeModal', false)
    },
  
    handleFileUpload(event) {
      this.file = event.target.files[0]
    }
  },

  props: {
    showModal: Boolean,
  },
}
</script>
<style scoped>
.file-select>.select-button {
  padding: 0.5rem;

  line-height: 1.5;
  color: white;
  background-color: #375b80;

  border-radius: 0.3rem;
  cursor: pointer;
  text-align: center;
}

.file-select>input[type='file'] {
  display: none;
}
</style>
