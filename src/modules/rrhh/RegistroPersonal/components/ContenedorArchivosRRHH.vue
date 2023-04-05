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
            <hr/>

            <div>
              <div class="card">
               <CCollapse :visible="visible">
                <img src="https://th.bing.com/th/id/OIP.G8FqRu1n4vJpAGAplGWG1wHaKe?pid=ImgDet&rs=1" class="card-img-top"
                  alt="..." />
              </CCollapse>
                <div class="card-body">
                  <h5 class="card-title">Descripción del documento</h5>
                  <p class="card-text">
                  Curriculum vitae 
                  </p>
                </div>
                <div class="card-body">
                  <CButton color="primary" href="#" @click="visible = !visible">Visualizar</CButton>

            
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
        Subir Documentos
      </button>
    </div>
    </CModal>
  </div>
</template>

<script>
import { CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/vue'
import { CButton, CCollapsePlugin } from '@coreui/vue-pro'
import { CCollapse } from '@coreui/vue'

export default {
  components: {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CButton,
    CCollapsePlugin
},

  data() {

    return {
      lgDemo5: false,
      fullscreenDemo: false,
      visible: false,
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
  },

  props: {
    showModal: Boolean,
  },
}
</script>
<style>
</style>
